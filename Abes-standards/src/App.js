import { AuthProvider } from './context/AuthContext';
import Books from './components/Books';
import Home from './components/Home';
import About from './components/About';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/books">Books</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/about" element={<About />} />
            {/* Add more routes as needed */}
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;