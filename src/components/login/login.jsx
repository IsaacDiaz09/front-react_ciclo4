import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { setTiTitleTo, isLoggedIn, redirectBasedOnRole } from "../../static/js/helpers/utils";
import { validateForm, validateEmail } from "./functions-login";
import img from "../../static/img/icon_login.png";
import "../../static/css/login.css";
import CustomToast from "../shared/toast/toast";
import axios from "axios";
import Constants from "../../static/js/helpers/constants";

const Login = () => {
    setTiTitleTo("Login | El mercader LTDA");

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [showt, setShowt] = useState(false);
    let [titlet, setTitlet] = useState("");
    let [messaget, setMessaget] = useState("");
    let [variantt, setVariantt] = useState("");

    const mostrarToast = (title, message, variant) => {
        setTitlet(title);
        setMessaget(message);
        setVariantt(variant);
        setShowt(true);
    }

    const handleLogin = (email, password) => {
        axios.get(`${Constants.URL_BASE_DEV}/user/${email}/${password}`)
            .then(response => {
                if (response.data.id != null) {
                    localStorage.setItem("identification", response.data.identification);
                    localStorage.setItem("name", response.data.name);
                    localStorage.setItem("email", response.data.email);
                    localStorage.setItem("role", response.data.type);
                    localStorage.setItem("zone", response.data.zone);
                    mostrarToast("Bienvenido", "Inicio de sesion correcto", Constants.TOAST_SUCCESS);
                } else {
                    console.log("No existe")
                    mostrarToast("Error", "Usuario no existe", Constants.TOAST_DANGER);
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    }
    if (isLoggedIn()) {
        redirectBasedOnRole();
    } else {
        return (
            <div className="row">
                <div className="col-sm-8 col-md-6 col-lg-4 mx-auto d-table h-100">
                    <div className="card" id="card-login">
                        <div className="card-body">
                            <div className="text-center">
                                <h4 className="card-title mb-2 mt-1">Iniciar sesión</h4>
                                <hr />
                                <img alt="" src={img} id="img-login" />
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
                    <CustomToast show={showt} title={titlet} variant={variantt} message={messaget} onClose={() => setShowt(false)}></CustomToast>
                </div>
            </div>
        );
    }
}
export default Login;