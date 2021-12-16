import { Button, Container, Form, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import favicon from "../../../static/img/favicon.png";

const Header = () => {
    return (
        <div>
            <Navbar bg="dark" expand="lg">
                <Container fluid>
                    <img src={favicon} alt="" width={60} />
                    <Navbar.Brand href="#">
                        {" "}
                        <p class="text-white">
                            <strong>EL MERCADER LTDA</strong>
                        </p>
                    </Navbar.Brand>

                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    ></Nav>
                    <Form className="d-flex">
                        <Button variant="danger" href="#">
                            Cerrar Sesión
                        </Button>
                    </Form>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;