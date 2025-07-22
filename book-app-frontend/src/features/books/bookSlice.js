import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook 
} from '../../services/bookService';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await getBooks();
  return response;
});

export const fetchBookById = createAsyncThunk('books/fetchBookById', async (id) => {
  const response = await getBookById(id);
  return response;
});

export const addBook = createAsyncThunk('books/addBook', async (bookData) => {
  const response = await createBook(bookData);
  return response;
});

export const editBook = createAsyncThunk('books/editBook', async ({ id, bookData }) => {
  const response = await updateBook(id, bookData);
  return response;
});

export const removeBook = createAsyncThunk('books/removeBook', async (id) => {
  await deleteBook(id);
  return id;
});

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    currentBook: null,
    status: 'idle',
    error: null
  },
  reducers: {
    clearCurrentBook: (state) => {
      state.currentBook = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchBookById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(editBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(book => book._id === action.payload._id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.books = state.books.filter(book => book._id !== action.payload);
      });
  }
});

export const { clearCurrentBook } = bookSlice.actions;
export default bookSlice.reducer;