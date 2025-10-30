import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const endpoint = isSignUp ? '/api/users/register' : '/api/users/login';
            const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (data.error) {
                setError(data.error);
                return;
            }

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', data.email);
                setSuccess(isSignUp ? 'Account created! Redirecting...' : 'Login successful!');
                setTimeout(() => navigate('/'), 1500);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="login">
            <h1>{isSignUp ? '🎮 Sign Up' : '🎮 Sign In'}</h1>
            <p className="subtitle">
                {isSignUp ? 'Create your GameZone account' : 'Welcome back to GameZone'}
            </p>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                />
                <button type="submit">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                </button>
            </form>
            
            <div className="toggle-auth">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button 
                    className="toggle-btn" 
                    onClick={() => {
                        setIsSignUp(!isSignUp);
                        setError('');
                        setSuccess('');
                    }}
                >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </div>
        </div>
    );
}
