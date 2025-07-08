const FriendList = ({ friends }) => {
  return (
    <div className="bg-purple-700 mt-6 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-white">Friends</h3>
      {friends.length === 0 ? (
        <p className="text-purple-300">No friends yet 😢</p>
      ) : (
        <ul className="space-y-3">
          {friends.map((friend) => (
            <li key={friend._id} className="flex items-center space-x-3">
              <img
                src={friend.avatar || "/default-avatar.png"}
                alt={friend.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-white">{friend.username}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendList;