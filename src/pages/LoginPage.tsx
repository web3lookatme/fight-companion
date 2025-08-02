import React, { useState } from 'react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/motion/AnimatedPage';

const LoginPage: React.FC = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, pass: password });
    if (useStore.getState().isAuthenticated) {
      navigate('/');
    }
  };

  return (
    <AnimatedPage>
      <div className="max-w-md mx-auto bg-charcoal p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl text-gold font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-onyx border border-gold/50 text-white text-lg rounded-lg p-3 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-onyx border border-gold/50 text-white text-lg rounded-lg p-3 w-full"
          />
          <button type="submit" className="w-full bg-gold text-charcoal font-bold py-3 rounded-lg uppercase">
            Login
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default LoginPage;
