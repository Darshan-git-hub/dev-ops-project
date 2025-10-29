# GameZone Deployment Guide

## Prerequisites Checklist

✅ GitHub Secrets configured:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_KEY_NAME` = "gamezonekey"

✅ AWS SSH Key Pair created:
- Key name: `gamezonekey`
- Private key downloaded and saved

## Local Development

### 1. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Configure Environment Variables

Backend (.env):
```bash
cd backend
cp .env.example .env
# Edit .env and change JWT_SECRET
```

Frontend (.env.local):
```bash
cd frontend
# Already configured for local development
```

### 3. Run with Docker Compose

```bash
# From project root
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

## AWS Deployment

### Option 1: Automatic Deployment (Recommended)

Simply push to main branch:
```bash
git add .
git commit -m "deploy to AWS"
git push origin main
```

GitHub Actions will automatically:
1. Build and test the application
2. Build Docker images
3. Push images to AWS ECR
4. Run Terraform to provision infrastructure
5. Deploy containers to EC2

### Option 2: Manual Terraform Deployment

```bash
cd terraform

# Initialize Terraform
terraform init

# Review the plan
terraform plan

# Apply infrastructure
terraform apply

# Get outputs
terraform output
```

After deployment, Terraform will output:
- `application_url` - Your application URL
- `instance_public_ip` - EC2 instance IP
- `ecr_frontend_repository_url` - Frontend ECR repo
- `ecr_backend_repository_url` - Backend ECR repo

## Post-Deployment

### Access Your Application

After deployment completes (5-10 minutes):
```bash
# Get the application URL
cd terraform
terraform output application_url
```

Visit the URL in your browser!

### SSH into EC2 Instance

```bash
# Get the instance IP
terraform output instance_public_ip

# SSH into the instance
ssh -i /path/to/gamezonekey.pem ubuntu@<INSTANCE_IP>

# Check running containers
docker ps

# View logs
docker-compose logs -f
```

## Monitoring

### Check GitHub Actions

1. Go to your repository
2. Click "Actions" tab
3. View workflow runs and logs

### Check AWS Resources

1. **EC2 Console**: View your running instance
2. **ECR Console**: View Docker images
3. **VPC Console**: View network configuration

## Troubleshooting

### GitHub Actions Fails

Check:
- GitHub secrets are correctly set
- AWS credentials have proper permissions
- SSH key name matches in AWS

### Application Not Accessible

1. Check security group allows port 80:
```bash
cd terraform
terraform show | grep security_group
```

2. SSH into instance and check containers:
```bash
ssh -i gamezonekey.pem ubuntu@<IP>
docker ps
docker-compose logs
```

3. Check EC2 instance status in AWS console

### Docker Images Not Pulling

1. Verify ECR repositories exist
2. Check IAM role attached to EC2
3. SSH into instance and manually pull:
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ECR_URL>
docker pull <ECR_URL>:latest
```

## Updating the Application

### Update Code
```bash
git add .
git commit -m "update: description of changes"
git push origin main
```

GitHub Actions will automatically rebuild and redeploy.

### Update Infrastructure
```bash
# Modify terraform/*.tf files
cd terraform
terraform plan
terraform apply
```

## Cleanup

### Destroy All Resources
```bash
cd terraform
terraform destroy
```

This will remove:
- EC2 instance
- VPC and networking
- Security groups
- ECR repositories (images will be deleted)

### Cost Considerations

Current setup uses:
- t2.micro EC2 (Free tier eligible)
- ECR storage (minimal cost)
- Data transfer (minimal for testing)

Estimated cost: $0-5/month (mostly free tier)

## Security Best Practices

1. ✅ Change JWT_SECRET in terraform.tfvars
2. ✅ Use strong passwords for MongoDB
3. ✅ Restrict security group rules to specific IPs
4. ✅ Enable HTTPS with SSL certificate (future enhancement)
5. ✅ Rotate AWS credentials regularly
6. ✅ Never commit .env files or secrets

## Next Steps

- [ ] Set up custom domain name
- [ ] Configure SSL/TLS certificate
- [ ] Set up CloudWatch monitoring
- [ ] Configure automated backups for MongoDB
- [ ] Add health checks and auto-scaling
- [ ] Implement proper logging solution
