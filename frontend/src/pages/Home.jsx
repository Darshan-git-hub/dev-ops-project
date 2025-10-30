import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';

// Mock games data for demo
const mockGames = [
  {
    _id: 'mock1',
    title: 'Cyber Warriors 2077',
    description: 'An epic futuristic RPG adventure in a dystopian world',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop'
  },
  {
    _id: 'mock2',
    title: 'Fantasy Quest Online',
    description: 'Embark on a magical journey through enchanted lands',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop'
  },
  {
    _id: 'mock3',
    title: 'Speed Racers Ultimate',
    description: 'High-octane racing action with stunning graphics',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop'
  },
  {
    _id: 'mock4',
    title: 'Zombie Apocalypse',
    description: 'Survive the undead in this thrilling survival horror',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=300&fit=crop'
  },
  {
    _id: 'mock5',
    title: 'Space Explorers',
    description: 'Explore the vast universe and discover new worlds',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=300&fit=crop'
  },
  {
    _id: 'mock6',
    title: 'Medieval Legends',
    description: 'Build your kingdom and conquer rival territories',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop'
  }
];

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          // Use mock data if no real games exist
          setGames(mockGames);
          setUseMockData(true);
        } else {
          setGames(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        // Fallback to mock data on error
        setGames(mockGames);
        setUseMockData(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">🎮 Loading games...</div>;

  return (
    <div className="home">
      <div className="hero-section">
        <h1>🎮 Welcome to GameZone</h1>
        <p className="hero-subtitle">Discover Amazing Games at Great Prices</p>
        {useMockData && (
          <div className="demo-badge">
            ✨ Demo Mode - Showing sample games
          </div>
        )}
      </div>
      
      <div className="games-grid">
        {games.map(game => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
}
