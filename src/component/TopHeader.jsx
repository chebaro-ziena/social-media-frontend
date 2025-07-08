
import { useState } from "react";
import { FaBell, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import axios from "axios";

const TopHeader = ({ onSignOut }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const q = e.target.value;
    setSearchTerm(q);

    if (q.trim().length === 0) {
      setResults([]);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:8080/api/users/search?query=${q}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(res.data);
    } catch (err) {
      console.error("Search error:", err.message);
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/users/add-friend",
        { friendId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Friend added!");
    } catch (err) {
      console.error("Add friend error:", err.message);
      alert("Failed to add friend.");
    }
  };

  return (
    <header className="bg-purple-800 text-white px-6 py-4 shadow-md flex justify-between items-center relative">
      <h1 className="text-xl font-bold">MERN App</h1>

      <div className="flex gap-4 items-center">
        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-3 py-1 rounded-full bg-purple-600 text-white placeholder-purple-300 focus:outline-none focus:ring"
        />

        {/* Notification Button */}
        <button
          className="bg-purple-700 hover:bg-purple-600 p-2 rounded-full transition"
          title="Notifications"
        >
          <FaBell size={18} />
        </button>

        {/* Sign Out Button */}
        <button
          onClick={onSignOut}
          className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-full font-semibold transition flex items-center gap-2"
        >
          <FaSignOutAlt />
          <span>Sign Out</span>
        </button>
      </div>

      {/* 🔍 Search Results */}
      {results.length > 0 && (
        <div className="absolute top-16 right-6 bg-purple-900 border border-purple-600 rounded-lg w-64 shadow-lg z-50">
          <ul className="divide-y divide-purple-700">
            {results.map((user) => (
              <li key={user._id} className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user.username}</span>
                </div>
                <button
                  onClick={() => handleAddFriend(user._id)}
                  className="text-green-400 hover:text-green-300"
                  title="Add Friend"
                >
                  <FaUserPlus />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default TopHeader;