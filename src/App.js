import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login.jsx';
import AdminDashboard from './components/admin-dashboard/admin-dashboard.jsx';
import Users from './components/admin-dashboard/users/users.jsx';
import Gadgets from './components/admin-dashboard/gadgets/gadgets.jsx';
import Orders from './components/orders/orders.jsx';
import OrderManagement from './components/orders-management/orders-management.jsx';


function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />

          <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
            <Route exact path="/admin-dashboard/users" element={<Users />} />
          <Route exact path="/admin-dashboard/gadgets" element={<Gadgets />} />

          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/orders-management" element={<OrderManagement />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;