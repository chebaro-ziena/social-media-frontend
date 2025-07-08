import { Link } from 'react-router-dom';
import Background from '../component/Background';

function Welcome() {
  return (
    <div className="text-center p-10">
      <Background/>
      <h1 className="text-3xl font-bold mb-4">Welcome to MERN App</h1>
      <p className="mb-6">Please sign in or sign up to continue</p>
      <div className="flex justify-center gap-4">
        <Link
          to="/login"
          className="px-6 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold"
        >
          Sign In
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Welcome;