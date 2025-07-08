import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserCard from "../component/UserCard";
import FriendList from "../component/FriendList";
import AddPost from "../component/AddPost/addPost";
import TopHeader from '../component/TopHeader';
import PostList from "../component/PostList.jsx";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/welcome"); // Redirect to welcome page
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/welcome");
        return;
      }

      try {
        const res = await axios.get("http://localhost:8080/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user", err);
        navigate("/welcome"); // If token is invalid or user not found
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) return <p className="text-center text-white">Loading user...</p>;

  return (
    <div>
      <TopHeader onSignOut={handleSignOut} />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <UserCard user={user} />
        </div>
        <div className="md:col-span-2 space-y-4">
          <AddPost />
        </div>
        <FriendList friends={user.friends || []} />
        <div className="md:col-span-2 space-y-4">
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;