import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Signin';
import Register from './pages/signup';
import Welcome from './pages/Welcome';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // This checks once when app mounts
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-950 text-white font-sans">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/welcome" replace />
          }
        />
        <Route path="/welcome" element={<Welcome />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/register"
          element={<Register setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </div>
  );
}

export default App;


//"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath="c:\data\db"
//--legacy-peer-deps