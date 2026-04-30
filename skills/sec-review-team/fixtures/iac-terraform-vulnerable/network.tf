resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

# VULNERABILITY: security group permits SSH (22) and MySQL (3306) from any IP
resource "aws_security_group" "app" {
  name        = "app-sg"
  vpc_id      = aws_vpc.main.id

  # SSH open to the entire internet
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # MySQL port open to the entire internet
  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
