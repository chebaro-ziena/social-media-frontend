import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();

  const userData = {
    username,
    email,
    password,
  };

  console.log("Sending register data:", userData); // ✅ See what you're sending

  try {
    const res = await axios.post('http://localhost:8080/api/auth/register', userData);

    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
    setIsAuthenticated(true);
    navigate('/');
  } catch (err) {
    console.error(err);
    alert('Registration failed. Please check your inputs.');
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <form
        onSubmit={handleRegister}
        className="bg-purple-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <label className="block mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;