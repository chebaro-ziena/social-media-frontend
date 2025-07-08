import { useState } from "react";
import axios from "axios";

const UserCard = ({ user }) => {
  const [bio, setBio] = useState(user.bio || "");
  const [name, setName] = useState(user.name || user.username);
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [editing, setEditing] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Convert image to base64 (or upload to Cloudinary if needed)
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:8080/api/users/me",
        { name, bio, avatar },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err.message);
    }
  };

  return (
    <div className="bg-purple-800 p-4 rounded-lg shadow-lg text-center space-y-4">
      <img
        src={avatar || "/default-avatar.png"}
        alt="User Avatar"
        className="w-24 h-24 rounded-full mx-auto object-cover"
      />

      {editing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-1 text-black rounded"
            placeholder="Your name"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-1 text-black rounded"
            placeholder="Your bio"
          />
          <input type="file" onChange={handleImageUpload} className="text-sm" />

          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-purple-200">{bio}</p>
          <button
            onClick={() => setEditing(true)}
            className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default UserCard;