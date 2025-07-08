import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Signin({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('http://localhost:8080/api/auth/login', {
      email,
      password,
    });

    const { user, token } = res.data;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    console.log("Logged in user:", user);

    setIsAuthenticated(true);
    navigate('/');
  } catch (err) {
    console.error(err);
    alert('Login failed. Please check your credentials.');
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-purple-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 rounded bg-gray-900 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 rounded"
        >
          Sign In
        </button>

        <p className="text-center mt-4 text-sm text-gray-300">
          Don’t have an account?{' '}
          <Link to="/register" className="text-purple-300 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}


export default Signin;