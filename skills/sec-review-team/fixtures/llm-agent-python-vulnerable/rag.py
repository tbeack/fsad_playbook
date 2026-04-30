import requests


def ingest_external(url: str) -> str:
    """Fetch external URL content for the RAG pipeline — no trust boundary."""
    # VULNERABILITY: external content ingested without sanitization or provenance tracking;
    # an attacker-controlled page can inject instructions directly into the model's context
    response = requests.get(url, timeout=10)
    return response.text


def build_rag_prompt(user_query: str, docs: list) -> str:
    # VULNERABILITY: user query embedded in RAG retrieval prompt via f-string concat;
    # user can break out of the query role with injected instruction text
    context = "\n---\n".join(docs)
    return f"Answer this query: {user_query}\n\nContext:\n{context}"
