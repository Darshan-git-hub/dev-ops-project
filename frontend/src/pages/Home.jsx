import { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games`)
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div className="loading">Loading games...</div>;

  return (
    <div className="home">
      <h1>Featured Games</h1>
      <div className="games-grid">
        {games.map(game => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
}
