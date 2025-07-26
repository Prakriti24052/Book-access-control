import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-[#f9fafb] min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-[#1f2937] text-center">
        Welcome to Book Manager
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-md transition-all duration-300">
        {user ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-[#1f2937]">
              Hello, {user.username} ({user.role})
            </h2>
            <div className="space-y-4">
              <Link
                to="/books"
                className="block bg-[#3b82f6] text-white py-2 px-4 rounded-lg hover:bg-[#2563eb] transition"
              >
                Browse Books
              </Link>
              {user.role === 'admin' && (
                <>
                  <Link
                    to="/add-book"
                    className="block bg-[#10b981] text-white py-2 px-4 rounded-lg hover:bg-[#059669] transition"
                  >
                    Add New Book
                  </Link>
                  <Link
                    to="/admin/users"
                    className="block bg-[#8b5cf6] text-white py-2 px-4 rounded-lg hover:bg-[#7c3aed] transition"
                  >
                    Manage Users
                  </Link>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-[#1f2937]">
              Please login or register
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/login"
                className="bg-[#3b82f6] text-white py-2 px-6 rounded-lg hover:bg-[#2563eb] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#10b981] text-white py-2 px-6 rounded-lg hover:bg-[#059669] transition"
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
