resource "aws_ecs_cluster" "main" {
  name = "prodops-platform-cluster"
}

resource "aws_ecs_task_definition" "backend" {
  family                   = "prodops-backend"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"

  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name  = "backend"
      image = "placeholder" # updated by CI/CD
      portMappings = [{
        containerPort = 8000
      }]
    }
  ])
}

resource "aws_ecs_task_definition" "frontend" {
  family                   = "prodops-frontend"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"

  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name  = "frontend"
      image = "placeholder"
      portMappings = [{
        containerPort = 3000
      }]
    }
  ])
}