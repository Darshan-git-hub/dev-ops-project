# Local Development Guide

## Run Locally with Docker Compose

### 1. Set Up Environment Files

**Backend (.env):**
```bash
cd backend
copy .env.example .env
# Edit .env and set:
# - MONGO_URI=mongodb://mongo:27017/gamezone
# - JWT_SECRET=your-local-secret
```

**Frontend (.env.local):**
```bash
cd frontend
copy .env.local.example .env.local
# Should contain:
# VITE_API_URL=http://localhost:5000
```

### 2. Start Everything with Docker Compose

```bash
# From project root
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

### 3. Access Locally

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **MongoDB**: localhost:27017

### 4. Development Workflow

**Make changes and rebuild:**
```bash
# Rebuild specific service
docker-compose up -d --build frontend
docker-compose up -d --build backend

# Or rebuild all
docker-compose up -d --build
```

**View logs:**
```bash
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mongo
```

**Restart services:**
```bash
docker-compose restart frontend
docker-compose restart backend
```

## Run Without Docker (Manual)

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### MongoDB
Install MongoDB locally or use Docker:
```bash
docker run -d -p 27017:27017 --name mongo mongo:7
```

## Comparison

| Aspect | Local Docker | AWS Deployment |
|--------|-------------|----------------|
| Purpose | Development & Testing | Production |
| Location | Your Computer | AWS Cloud |
| Access | localhost | Public IP |
| Database | Local MongoDB | EC2 MongoDB |
| Cost | Free | AWS charges |
| Speed | Instant | ~10 min deploy |

## When to Use What?

**Use Local Docker when:**
- Developing new features
- Testing changes quickly
- Debugging issues
- Working offline

**Use AWS Deployment when:**
- Sharing with others
- Production environment
- Testing with real infrastructure
- Demonstrating the project

## Quick Commands

```bash
# Start local development
docker-compose up -d

# Check what's running
docker ps

# Stop everything
docker-compose down

# Clean up (remove volumes too)
docker-compose down -v

# Deploy to AWS
git push origin main
```
