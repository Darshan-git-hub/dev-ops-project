const mongoose = require('mongoose');
require('dotenv').config();

// Game model
const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);

// Sample games data
const games = [
  {
    title: 'Cyber Warriors 2077',
    description: 'An epic futuristic RPG adventure in a dystopian world with stunning graphics and immersive gameplay',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop'
  },
  {
    title: 'Fantasy Quest Online',
    description: 'Embark on a magical journey through enchanted lands filled with mythical creatures and epic quests',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop'
  },
  {
    title: 'Speed Racers Ultimate',
    description: 'High-octane racing action with stunning graphics and realistic physics. Race against the best!',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop'
  },
  {
    title: 'Zombie Apocalypse',
    description: 'Survive the undead in this thrilling survival horror game. Fight, craft, and stay alive!',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=300&fit=crop'
  },
  {
    title: 'Space Explorers',
    description: 'Explore the vast universe and discover new worlds. Build your fleet and conquer the galaxy!',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=300&fit=crop'
  },
  {
    title: 'Medieval Legends',
    description: 'Build your kingdom and conquer rival territories in this epic strategy game set in medieval times',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop'
  },
  {
    title: 'Battle Royale Arena',
    description: 'Drop into the arena and be the last one standing. Fast-paced action with 100 players!',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop'
  },
  {
    title: 'Ninja Warrior Chronicles',
    description: 'Master the art of stealth and combat in this action-packed ninja adventure game',
    price: 42.99,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing games
    await Game.deleteMany({});
    console.log('🗑️  Cleared existing games');

    // Insert new games
    const result = await Game.insertMany(games);
    console.log(`✅ Successfully added ${result.length} games to the database!`);

    // Display the games
    console.log('\n📦 Games added:');
    result.forEach((game, index) => {
      console.log(`${index + 1}. ${game.title} - $${game.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
