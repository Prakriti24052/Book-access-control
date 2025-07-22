import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Book Manager</h1>
      
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Hello, {user.username} ({user.role})
          </h2>
          <div className="space-y-4">
            <Link 
              to="/books" 
              className="block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Browse Books
            </Link>
            {user.role === 'admin' && (
              <>
                <Link
                  to="/add-book"
                  className="block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Add New Book
                </Link>
                <Link
                  to="/admin/users"
                  className="block bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                >
                  Manage Users
                </Link>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Please login or register</h2>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;