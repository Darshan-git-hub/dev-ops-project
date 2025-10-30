# Troubleshooting Guide

## Issue: "Connection Refused" when accessing EC2 IP

Your EC2 instance is running but containers aren't started yet.

### Quick Fix Options:

## Option 1: Wait for GitHub Actions (Recommended)

The deployment might still be running. Check:
1. Go to: https://github.com/Darshan-git-hub/dev-ops-project/actions
2. Wait for the workflow to complete
3. The containers will auto-start

## Option 2: Manual SSH Deployment

### Step 1: SSH into your EC2 instance

```bash
ssh -i /path/to/gamezonekey.pem ubuntu@13.203.206.140
```

### Step 2: Check if Docker is installed

```bash
docker --version
docker ps
```

### Step 3: Clone your repository

```bash
git clone https://github.com/Darshan-git-hub/dev-ops-project.git
cd dev-ops-project
```

### Step 4: Create simple docker-compose.yml

```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGO_URI=mongodb://mongo:27017/gamezone
      - JWT_SECRET=production-secret
      - NODE_ENV=production
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
EOF
```

### Step 5: Start containers

```bash
sudo docker-compose up -d
```

### Step 6: Check logs

```bash
sudo docker-compose logs -f
```

## Option 3: Check Security Group

Make sure port 80 is open:

1. Go to AWS Console > EC2 > Security Groups
2. Find: **gamezone-sg**
3. Check Inbound Rules:
   - Port 80 (HTTP) - 0.0.0.0/0
   - Port 5000 - 0.0.0.0/0
   - Port 443 (HTTPS) - 0.0.0.0/0

## Common Issues:

### 1. Docker not installed
```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose
sudo systemctl start docker
sudo usermod -aG docker ubuntu
```

### 2. Containers not running
```bash
sudo docker ps -a  # See all containers
sudo docker-compose up -d  # Start them
```

### 3. Port already in use
```bash
sudo lsof -i :80
sudo lsof -i :5000
# Kill the process if needed
sudo kill -9 <PID>
```

### 4. Check container logs
```bash
sudo docker-compose logs frontend
sudo docker-compose logs backend
sudo docker-compose logs mongo
```

## Quick Test Commands

```bash
# Test if backend is responding
curl http://localhost:5000/health

# Test if frontend is serving
curl http://localhost:80

# Check what's listening on ports
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :5000
```

## Your Instance Details

- **IP**: 13.203.206.140
- **Instance ID**: i-07fffeea014dd9289
- **Type**: t3.micro
- **Region**: ap-south-1 (Mumbai)
- **Key**: gamezonekey
- **Security Group**: gamezone-sg

## Access URLs (once containers are running)

- Frontend: http://13.203.206.140
- Backend API: http://13.203.206.140:5000
- Health Check: http://13.203.206.140:5000/health

## Need Help?

1. Check GitHub Actions logs
2. SSH into EC2 and run: `sudo docker ps`
3. Check logs: `sudo docker-compose logs -f`
4. Verify security group allows port 80
