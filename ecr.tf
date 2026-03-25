resource "aws_ecr_repository" "backend" {
  name = "prodops-backend"
}

resource "aws_ecr_repository" "frontend" {
  name = "prodops-frontend"
}