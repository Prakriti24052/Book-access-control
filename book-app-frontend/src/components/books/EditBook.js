// src/components/books/EditBook.js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById, editBook } from '../../features/books/bookSlice';
import BookForm from './BookForm';
import Spinner from '../shared/Spinner';

const EditBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentBook, status } = useSelector((state) => state.books);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: '',
    isbn: ''
  });

  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (currentBook) {
      setFormData({
        title: currentBook.title || '',
        author: currentBook.author || '',
        description: currentBook.description || '',
        publishedYear: currentBook.publishedYear || '',
        isbn: currentBook.isbn || ''
      });
    }
  }, [currentBook]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editBook({ id, bookData: formData }));
      navigate(`/books/${id}`);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  if (status === 'loading' || !currentBook) {
    return <Spinner />;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Book</h2>
      <BookForm 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Update Book"
      />
    </div>
  );
};

export default EditBook;