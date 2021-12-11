import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login.jsx';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
      </div>
  );
}

export default App;