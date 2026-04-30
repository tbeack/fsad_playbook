terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VULNERABILITY: S3 bucket with public-read ACL — all objects world-readable
resource "aws_s3_bucket" "data" {
  bucket = "my-app-data-bucket"
  acl    = "public-read"
}

# No aws_s3_bucket_server_side_encryption_configuration block — bucket has no SSE

# VULNERABILITY: RDS instance not encrypted at rest; accessible from the public internet
resource "aws_db_instance" "main" {
  identifier          = "main-db"
  engine              = "mysql"
  engine_version      = "8.0"
  instance_class      = "db.t3.micro"
  allocated_storage   = 20
  db_name             = "appdb"
  username            = var.db_username
  password            = var.db_password
  skip_final_snapshot = true
  storage_encrypted   = false
  deletion_protection = false
  publicly_accessible = true
}
