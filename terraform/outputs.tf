output "instance_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.gamezone_server.public_ip
}

output "application_url" {
  description = "Application URL"
  value       = "http://${aws_instance.gamezone_server.public_ip}"
}

output "vpc_id" {
  description = "VPC ID"
  value       = data.aws_vpc.default.id
}

output "security_group_id" {
  description = "Security group ID"
  value       = aws_security_group.gamezone_sg.id
}

output "ecr_frontend_repository_url" {
  description = "ECR repository URL for frontend"
  value       = aws_ecr_repository.frontend.repository_url
}

output "ecr_backend_repository_url" {
  description = "ECR repository URL for backend"
  value       = aws_ecr_repository.backend.repository_url
}
