variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "db_username" {
  description = "RDS master username"
}

variable "db_password" {
  description = "RDS master password"
  sensitive   = true
}
