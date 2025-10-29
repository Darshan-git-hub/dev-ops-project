import { Link } from 'react-router-dom';

export default function GameCard({ game }) {
  return (
    <div className="game-card">
      <img src={game.image} alt={game.title} />
      <h3>{game.title}</h3>
      <p className="price">${game.price}</p>
      <Link to={`/game/${game._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}
