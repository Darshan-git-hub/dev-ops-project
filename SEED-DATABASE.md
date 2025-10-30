# Seed Database with Games

## Option 1: Run on EC2 (Recommended)

SSH into your EC2 instance and run:

```bash
ssh -i ~/gamezonekey.pem ubuntu@13.203.206.140

cd ~/projects/dev-ops-project

# Pull latest changes
git pull

# Run the seed script inside the backend container
sudo docker exec gamezone-backend npm run seed
```

## Option 2: Run Locally

If you want to seed your local database:

```bash
cd backend
npm install
npm run seed
```

## What it does:

- Clears existing games from the database
- Adds 8 sample games with:
  - Titles
  - Descriptions
  - Prices
  - Images (from Unsplash)
- Displays confirmation of added games

## After seeding:

Visit http://13.203.206.140 and you'll see real games from the database instead of mock data!

The frontend will automatically:
- Fetch games from the API
- Display them in the grid
- Remove the "Demo Mode" badge
- Show real data from MongoDB
