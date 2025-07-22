// src/components/books/BookDetails.js
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById, clearCurrentBook } from '../../features/books/bookSlice';
import Spinner from '../shared/Spinner';
import { useAuth } from '../../context/authContext';

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentBook, status } = useSelector((state) => state.books);
  const { user } = useAuth();

  useEffect(() => {
    dispatch(fetchBookById(id));
    
    return () => {
      dispatch(clearCurrentBook());
    };
  }, [id, dispatch]);

  if (status === 'loading' || !currentBook) {
    return <Spinner />;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">{currentBook.title}</h2>
      <div className="space-y-3">
        <p><span className="font-semibold">Author:</span> {currentBook.author}</p>
        {currentBook.publishedYear && (
          <p><span className="font-semibold">Published Year:</span> {currentBook.publishedYear}</p>
        )}
        {currentBook.isbn && (
          <p><span className="font-semibold">ISBN:</span> {currentBook.isbn}</p>
        )}
        {currentBook.description && (
          <p><span className="font-semibold">Description:</span> {currentBook.description}</p>
        )}
        <p><span className="font-semibold">Added by:</span> {currentBook.createdBy?.username || 'Unknown'}</p>
      </div>
      
      <div className="mt-6 flex space-x-4">
        <Link 
          to="/books" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Books
        </Link>
        
        {user?.role === 'admin' && (
          <Link 
            to={`/edit-book/${currentBook._id}`} 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Edit Book
          </Link>
        )}
      </div>
    </div>
  );
};

export default BookDetails;