
import { useState } from "react";
import axios from "axios";
import { Image, Tag, MapPin, Smile } from "lucide-react";

const AddPost = () => {
  const [content, setContent] = useState("");

  const handlePost = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to post.");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/posts",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent("");
      console.log("✅ Post created:", res.data);
      // Optional: trigger reload or notify parent component
    } catch (err) {
      console.error("❌ Error creating post:", err);
      alert("Failed to post.");
    }
  };

  return (
    <div className="bg-purple-800 rounded-2xl p-4 shadow-lg text-white space-y-4">
      <input
        className="w-full bg-zinc-800 p-3 rounded-xl outline-none placeholder-gray-400"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex space-x-4">
          <span className="flex items-center gap-1 cursor-pointer">
            <Image className="w-4 h-4 text-red-500" /> Photo
          </span>
          <span className="flex items-center gap-1 cursor-pointer">
            <Tag className="w-4 h-4 text-blue-500" /> Tag
          </span>
          <span className="flex items-center gap-1 cursor-pointer">
            <MapPin className="w-4 h-4 text-green-500" /> Location
          </span>
          <span className="flex items-center gap-1 cursor-pointer">
            <Smile className="w-4 h-4 text-yellow-500" /> Feeling
          </span>
        </div>
        <button
          onClick={handlePost}
          className="bg-purple-700 hover:bg-purple-800 transition px-4 py-2 rounded-xl text-white"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default AddPost;