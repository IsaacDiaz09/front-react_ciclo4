import { Button, Container, Form, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import favicon from "../../../static/img/favicon.png";

const Header = () => {
    const logout = () => {
            localStorage.clear();
            window.location.href = "/";
    }
    
    return (
        <div>
            <Navbar bg="dark" expand="lg">
                <Container fluid>
                    <img src={favicon} alt="" width={60} />
                    <Navbar.Brand>
                        {" "}
                        <p className="text-white">
                            <strong>EL MERCADER LTDA</strong>
                        </p>
                    </Navbar.Brand>

                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    ></Nav>
                    <Form className="d-flex">
                        <Button variant="outline-danger" onClick={()=> logout()}>
                            Cerrar Sesión
                        </Button>
                    </Form>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;