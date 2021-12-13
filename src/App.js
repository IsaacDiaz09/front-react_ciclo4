import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login.jsx';
// to-do
// pag home
// pag gadgets - crud
// pag users - crud
// pag orders(ase) - create_order
// pag tracking(coord) - reject/aprove orders/details
// my profile
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