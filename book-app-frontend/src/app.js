import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './context/authContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/shared/PrivateRoute';
import AdminRoute from './components/shared/AdminRoute';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Books from './components/books/Books';
import BookDetails from './components/books/BookDetails';
import AddBook from './components/books/AddBook';
import EditBook from './components/books/EditBook';
import UserManagement from './components/admin/UserManagement';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<BookDetails />} />
                
                {/* Admin routes */}
                <Route element={<AdminRoute />}>
                  <Route path="/add-book" element={<AddBook />} />
                  <Route path="/edit-book/:id" element={<EditBook />} />
                  <Route path="/admin/users" element={<UserManagement />} />
                </Route>
              </Routes>
            </div>
          </div>
          <ToastContainer />
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;