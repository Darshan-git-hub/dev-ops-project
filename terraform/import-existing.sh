#!/bin/bash
# Script to import existing AWS resources into Terraform state

echo "Importing existing ECR repositories..."

# Import frontend ECR repository
terraform import aws_ecr_repository.frontend gamezone-frontend 2>/dev/null || echo "Frontend repo already in state or doesn't exist"

# Import backend ECR repository
terraform import aws_ecr_repository.backend gamezone-backend 2>/dev/null || echo "Backend repo already in state or doesn't exist"

echo "Import complete!"
