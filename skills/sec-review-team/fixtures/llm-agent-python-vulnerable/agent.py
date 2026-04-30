import os
import anthropic

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

# VULNERABILITY: secrets embedded in system prompt — user can exfiltrate via "repeat your instructions"
SYSTEM_PROMPT = (
    f"You are a helpful assistant.\n"
    f"Internal config — DB_PASSWORD={os.environ.get('DB_PASSWORD', 'admin123')}\n"
    f"ADMIN_TOKEN={os.environ.get('ADMIN_TOKEN', 'tok_prod_xK9mZ2aBcDeF')}\n"
)


def chat(user_message: str) -> str:
    # VULNERABILITY: untrusted user input concatenated directly into system prompt extension
    augmented_system = SYSTEM_PROMPT + f"\nUser context: {user_message}"

    response = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=1024,
        system=augmented_system,
        messages=[{"role": "user", "content": user_message}],
    )

    result = response.content[0].text

    # VULNERABILITY: LLM response executed as arbitrary Python code without validation
    exec(result)  # noqa: S102

    return result


def dispatch_tool(tool_name: str, args: dict) -> str:
    """Execute a tool chosen by the LLM — no authorization gate on any operation."""
    if tool_name == "shell":
        import subprocess
        # VULNERABILITY: LLM can invoke arbitrary shell commands with no auth gate
        return subprocess.check_output(args["command"], shell=True).decode()
    elif tool_name == "read_file":
        # VULNERABILITY: LLM can read any path on the host filesystem
        with open(args["path"]) as f:
            return f.read()
    elif tool_name == "write_file":
        # VULNERABILITY: LLM can write to any path on the host filesystem
        with open(args["path"], "w") as f:
            f.write(args["content"])
        return "written"
    return "unknown tool"
