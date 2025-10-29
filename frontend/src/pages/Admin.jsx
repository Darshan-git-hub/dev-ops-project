import { useState, useEffect } from 'react';

export default function Admin() {
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({ title: '', price: '', description: '', image: '' });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games`)
      .then(res => res.json())
      .then(data => setGames(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await fetch(`${import.meta.env.VITE_API_URL}/api/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    setFormData({ title: '', price: '', description: '', image: '' });
    fetchGames();
  };

  const deleteGame = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`${import.meta.env.VITE_API_URL}/api/games/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchGames();
  };

  return (
    <div className="admin">
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
        <input placeholder="Price" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
        <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
        <input placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
        <button type="submit">Add Game</button>
      </form>
      <div className="games-list">
        {games.map(game => (
          <div key={game._id}>
            <h3>{game.title}</h3>
            <button onClick={() => deleteGame(game._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
