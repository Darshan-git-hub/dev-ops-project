resource "aws_vpc" "gamezone_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name = "gamezone-vpc"
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.gamezone_vpc.id
  cidr_block              = var.public_subnet_cidr
  availability_zone       = var.availability_zone
  map_public_ip_on_launch = true
  tags = {
    Name = "gamezone-public-subnet"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.gamezone_vpc.id
  tags = {
    Name = "gamezone-igw"
  }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.gamezone_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = {
    Name = "gamezone-public-rt"
  }
}

resource "aws_route_table_association" "public_rta" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_security_group" "gamezone_sg" {
  name        = "gamezone-sg"
  description = "Security group for GameZone"
  vpc_id      = aws_vpc.gamezone_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "gamezone-sg"
  }
}

resource "aws_instance" "gamezone_server" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.public_subnet.id
  vpc_security_group_ids = [aws_security_group.gamezone_sg.id]
  key_name               = var.key_name

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y docker.io docker-compose git
              systemctl start docker
              systemctl enable docker
              usermod -aG docker ubuntu
              
              # Install AWS CLI
              apt-get install -y awscli
              
              # Login to ECR and pull images
              aws ecr get-login-password --region ${var.aws_region} | docker login --username AWS --password-stdin ${aws_ecr_repository.frontend.repository_url}
              
              # Create docker-compose file
              cat > /home/ubuntu/docker-compose.yml <<'COMPOSE'
              version: '3.8'
              services:
                frontend:
                  image: ${aws_ecr_repository.frontend.repository_url}:latest
                  ports:
                    - "80:80"
                  depends_on:
                    - backend
                
                backend:
                  image: ${aws_ecr_repository.backend.repository_url}:latest
                  ports:
                    - "5000:5000"
                  environment:
                    - MONGO_URI=mongodb://mongo:27017/gamezone
                    - JWT_SECRET=${var.jwt_secret}
                  depends_on:
                    - mongo
                
                mongo:
                  image: mongo:7
                  volumes:
                    - mongo-data:/data/db
              
              volumes:
                mongo-data:
              COMPOSE
              
              cd /home/ubuntu
              docker-compose up -d
              EOF

  tags = {
    Name = "gamezone-server"
  }
}

resource "aws_ecr_repository" "frontend" {
  name                 = "gamezone-frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "gamezone-frontend"
  }

  lifecycle {
    prevent_destroy = false
    ignore_changes  = [name]
  }
}

resource "aws_ecr_repository" "backend" {
  name                 = "gamezone-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "gamezone-backend"
  }

  lifecycle {
    prevent_destroy = false
    ignore_changes  = [name]
  }
}

resource "aws_iam_role" "ec2_ecr_role" {
  name = "gamezone-ec2-ecr-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecr_read_only" {
  role       = aws_iam_role.ec2_ecr_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "gamezone-ec2-profile"
  role = aws_iam_role.ec2_ecr_role.name
}
