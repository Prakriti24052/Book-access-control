// src/components/books/BookItem.js
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useDispatch } from 'react-redux';
import { removeBook } from '../../features/books/bookSlice';

const BookItem = ({ book }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      dispatch(removeBook(book._id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-1">Author: {book.author}</p>
        {book.publishedYear && (
          <p className="text-gray-600 mb-1">Year: {book.publishedYear}</p>
        )}
        <p className="text-gray-600 mb-4">Added by: {book.createdBy?.username || 'Unknown'}</p>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/books/${book._id}`} 
            className="text-blue-600 hover:text-blue-800"
          >
            View Details
          </Link>
          
          {user?.role === 'admin' && (
            <div className="flex space-x-2">
              <Link 
                to={`/edit-book/${book._id}`} 
                className="text-green-600 hover:text-green-800"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookItem;