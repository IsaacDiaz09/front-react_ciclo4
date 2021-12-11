import { Button, Col, Form, FormControl, InputGroup } from "react-bootstrap";
import "../../static/css/login.css";
import img from "../../static/img/icon_login.png";
import setTiTitleTo from "../../static/js/helpers/utils.js";

const Login = () => {
    setTiTitleTo("Login");
    return (
        <div className="row">
            <div className="col-sm-8 col-md-6 col-lg-4 mx-auto d-table h-100">
                <div className="card">
                    <div className="card-body">
                        <div className="text-center">
                            <h4 className="card-title mb-2 mt-1">Iniciar sesión</h4>
                            <hr />
                            <img src={img} />
                        </div>
                        <form className="mt-4">

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="email"><i className="fa fa-user"></i>
                                </InputGroup.Text>
                                <FormControl
                                    placeholder="Email"
                                    type="email"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="password"><i className="fa fa-lock"></i>
                                </InputGroup.Text>
                                <FormControl
                                    placeholder="********"
                                    type="password"
                                />
                            </InputGroup>

                            <div className="text-center">
                            <Button variant="primary">Ingresar</Button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Login;