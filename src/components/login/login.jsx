import { Button, FormControl, InputGroup } from "react-bootstrap";
import "../../static/css/login.css";
import img from "../../static/img/icon_login.png";
import { setTiTitleTo } from "../../static/js/helpers/utils";
import { useEffect, useState } from "react";
import { validateForm, validateEmail, handleLogin } from "./functions-login";

const Login = () => {
    setTiTitleTo("Login | El mercader LTDA");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        handleLogin(email, password);
    }

    return (
        <div className="row">
            <div className="col-sm-8 col-md-6 col-lg-4 mx-auto d-table h-100">
                <div className="card">
                    <div className="card-body">
                        <div className="text-center">
                            <h4 className="card-title mb-2 mt-1">Iniciar sesión</h4>
                            <hr />
                            <img alt="" src={img} />
                            {!(validateEmail(email)) ?
                                <p className="text-danger mt-2">Email inválido</p> : null}
                        </div>
                        <form className="mt-4" onSubmit={handleSubmit}>

                            <InputGroup className="mb-3">

                                <InputGroup.Text><i className="fa fa-user"></i>
                                </InputGroup.Text>
                                <FormControl
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder="Email"
                                    type="text"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text><i className="fa fa-lock"></i>
                                </InputGroup.Text>
                                <FormControl
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    placeholder="******"
                                    type="password"
                                />
                            </InputGroup>

                            <div className="text-center">
                                <Button type="submit" variant="primary" disabled={!validateForm(email, password)}>Ingresar</Button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Login;