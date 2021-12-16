import "../../static/css/login.css";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { setTiTitleTo, isLoggedIn } from "../../static/js/helpers/utils";
import { validateForm, validateEmail } from "./functions-login";
import img from "../../static/img/icon_login.png";
import CustomToast from "../shared/toast/toast";
import axios from "axios";
import Constants from "../../static/js/helpers/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {

    useEffect(() => {
        redirectBasedOnRole();
    }, [])

    setTiTitleTo("Login | El mercader LTDA");

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    // toast
    let [showt, setShowt] = useState(false);
    let [titlet, setTitlet] = useState("");
    let [messaget, setMessaget] = useState("");
    let [variantt, setVariantt] = useState("");

    const navigate = useNavigate();

    const mostrarToast = (title, message, variant) => {
        setTitlet(title);
        setMessaget(message);
        setVariantt(variant);
        setShowt(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    }
    const handleLogin = (email, password) => {
        axios.get(`${Constants.URL_BASE_PROD}/user/${email}/${password}`)
            .then(response => {
                if (response.data.id != null) {
                    localStorage.setItem("loggedIn", true);
                    localStorage.setItem("id", response.data.id);
                    redirectBasedOnRole();
                } else {
                    mostrarToast("Error", "Usuario no existe", Constants.TOAST_DANGER);
                }
            })
    }

    const redirectBasedOnRole = () => {
        if (isLoggedIn()) {
            axios.get(`${Constants.URL_BASE_PROD}/user/${localStorage.getItem("id")}`)
                .then(response => {
                    if (response.data.type === Constants.TYPE_ADM) {
                        navigate("/admin-dashboard");
                    } if (response.data.type === Constants.TYPE_ASE) {
                        navigate("/orders");
                    } if (response.data.type === Constants.TYPE_COORD) {
                        navigate("/orders-management");
                    }
                });
        }
    }

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
        </div>);
}
export default Login;