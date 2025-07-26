import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { FaBook, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaUserCog, FaPlus } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FaBook className="text-xl" />
          <span className="text-xl font-bold">Book Manager</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/books" className="hover:text-blue-200">
                Books
              </Link>
              
              {user?.role === 'admin' && (
                <>
                  <Link to="/add-book" className="flex items-center hover:text-blue-200">
                     Add Book
                  </Link>
                  <Link to="/admin/users" className="flex items-center hover:text-blue-200">
                     Users
                  </Link>
                </>
              )}
              
              <button 
                onClick={handleLogout} 
                className="flex items-center hover:text-blue-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center hover:text-blue-200">
                Login
              </Link>
              <Link to="/register" className="flex items-center hover:text-blue-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;