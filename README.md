# GameZone - Game Store Platform

A full-stack game store application with React frontend, Node.js/Express backend, MongoDB database, and complete DevOps pipeline.

## Features

- Browse and search games
- User authentication and authorization
- Shopping cart functionality
- Admin panel for game management
- Responsive design
- Docker containerization
- CI/CD pipelines
- Infrastructure as Code (Terraform)
- Configuration management (Ansible)

## Tech Stack

### Frontend
- React 18
- React Router
- Vite
- CSS3

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- bcrypt

### DevOps
- Docker & Docker Compose
- Terraform (AWS - EC2, VPC, ECR, IAM)
- GitHub Actions (CI/CD)

## Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- MongoDB (or use Docker)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gamezone.git
cd gamezone
```

2. Start with Docker Compose:
```bash
docker-compose up -d
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Manual Setup

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

#### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

## API Endpoints

### Games
- GET /api/games - Get all games
- GET /api/games/:id - Get game by ID
- POST /api/games - Create game (Admin)
- PUT /api/games/:id - Update game (Admin)
- DELETE /api/games/:id - Delete game (Admin)

### Users
- POST /api/users/register - Register user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile (Protected)

## Infrastructure Deployment

### Prerequisites
- AWS Account with credentials configured
- GitHub repository with secrets configured

### GitHub Secrets Required
Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):
- `AWS_ACCESS_KEY_ID` - Your AWS access key
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
- `AWS_KEY_NAME` - Your AWS SSH key pair name

### Terraform Deployment
```bash
cd terraform
terraform init
terraform plan -var="key_name=your-key-name"
terraform apply -var="key_name=your-key-name"
```

### CI/CD Pipeline

GitHub Actions automatically:
1. Builds and tests on every push
2. Runs Terraform plan on pull requests
3. Deploys to AWS on push to main:
   - Builds Docker images
   - Pushes to AWS ECR
   - Provisions infrastructure with Terraform
   - Deploys application to EC2

## Project Structure

```
gamezone/
├── frontend/          # React frontend
├── backend/           # Node.js backend
├── terraform/         # Infrastructure as Code (AWS)
├── .github/workflows/ # GitHub Actions CI/CD
└── docker-compose.yml # Local development
```

## License

MIT
