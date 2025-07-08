import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/posts?page=${page}`);
      setPosts((prev) => [...prev, ...res.data.posts]);
      setHasMore(res.data.hasMore);
    } catch (err) {
      console.error("❌ Error fetching posts:", err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
        />
      ))}

      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={() => setPage(page + 1)}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;