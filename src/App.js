import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login.jsx";
import AdminDashboard from "./components/admin-dashboard/admin-dashboard.jsx";
import Users from "./components/admin-dashboard/users/users.jsx";
import Gadgets from "./components/admin-dashboard/gadgets/gadgets.jsx";
import Orders from "./components/orders/orders.jsx";
import OrderManagement from "./components/orders-management/orders-management.jsx";
import { Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import favicon from "./static/img/favicon.png";
import { Form } from "react-bootstrap";
import { Nav } from "react-bootstrap";

function App() {
  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <img src={favicon} width={60} />
          <Navbar.Brand href="#">
            {" "}
            <p class="text-white">
              <strong>EL MERCADER</strong>
            </p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              <Button variant="warning" href="login">
                Cerrar Sesión
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container">
                
          <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />

            <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
            <Route exact path="/admin-dashboard/users" element={<Users />} />
            <Route
              exact
              path="/admin-dashboard/gadgets"
              element={<Gadgets />}
            />

            <Route exact path="/orders" element={<Orders />} />
            <Route
              exact
              path="/orders-management"
              element={<OrderManagement />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
