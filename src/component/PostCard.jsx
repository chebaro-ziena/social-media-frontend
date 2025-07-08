import axios from "axios";
import { useState } from "react";

const PostCard = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload(); // or remove post from state
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/posts/${post._id}`,
        { content: editedContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      window.location.reload(); // optional
    } catch (err) {
      console.error("Edit error", err);
    }
  };

  return (
    <div className="bg-purple-600 p-5 rounded-lg shadow-md space-y-2">
      <div className="flex justify-between text-sm text-gray-200">
        <span className="font-semibold">{post.user?.username || "Unknown"}</span>
        <span className="text-xs text-gray-300">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            className="w-full p-2 rounded text-black"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleEdit} className="text-sm bg-green-600 px-3 py-1 rounded">
            Save
          </button>
        </div>
      ) : (
        <p className="text-white">{post.content}</p>
      )}

      <div className="flex gap-2 text-sm">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-yellow-300 hover:underline"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <button
          onClick={handleDelete}
          className="text-red-300 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;

