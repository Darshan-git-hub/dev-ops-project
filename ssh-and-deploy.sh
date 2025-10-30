#!/bin/bash
# SSH into EC2 and manually deploy the application

EC2_IP="13.203.206.140"
KEY_PATH="path/to/gamezonekey.pem"

echo "Connecting to EC2 instance: $EC2_IP"
echo "Make sure to update KEY_PATH variable with your actual key location"
echo ""

# SSH command to run on EC2
ssh -i "$KEY_PATH" ubuntu@$EC2_IP << 'ENDSSH'
    echo "=== Installing Docker and Docker Compose ==="
    sudo apt-get update
    sudo apt-get install -y docker.io docker-compose git
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker ubuntu
    
    echo "=== Creating docker-compose.yml ==="
    cat > ~/docker-compose.yml << 'EOF'
version: '3.8'

services:
  frontend:
    image: node:18-alpine
    working_dir: /app
    ports:
      - "80:5173"
    volumes:
      - ./frontend:/app
    command: sh -c "npm install && npm run dev -- --host 0.0.0.0"
    environment:
      - VITE_API_URL=http://13.203.206.140:5000
    depends_on:
      - backend

  backend:
    image: node:18-alpine
    working_dir: /app
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
    command: sh -c "npm install && npm start"
    environment:
      - PORT=5000
      - MONGO_URI=mongodb://mongo:27017/gamezone
      - JWT_SECRET=production-secret-key
      - NODE_ENV=production
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
EOF
    
    echo "=== Cloning repository ==="
    if [ -d "dev-ops-project" ]; then
        cd dev-ops-project
        git pull
    else
        git clone https://github.com/Darshan-git-hub/dev-ops-project.git
        cd dev-ops-project
    fi
    
    echo "=== Starting containers ==="
    sudo docker-compose up -d
    
    echo "=== Checking container status ==="
    sudo docker ps
    
    echo ""
    echo "=== Deployment Complete! ==="
    echo "Frontend: http://13.203.206.140"
    echo "Backend: http://13.203.206.140:5000"
    echo ""
    echo "To view logs: sudo docker-compose logs -f"
ENDSSH
