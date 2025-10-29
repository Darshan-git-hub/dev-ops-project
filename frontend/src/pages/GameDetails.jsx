import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games/${id}`)
      .then(res => res.json())
      .then(data => setGame(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!game) return <div>Loading...</div>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(game);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  return (
    <div className="game-details">
      <img src={game.image} alt={game.title} />
      <h1>{game.title}</h1>
      <p className="price">${game.price}</p>
      <p>{game.description}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
