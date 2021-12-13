import Constants from "../../static/js/helpers/constants";
import axios from 'axios';

const validateForm = (email, password) => {
    return (email.trim().length > 0 && password.length > 0) && validateEmail(email);
}

const validateEmail = (email) => {
    if (email.trim().length === 0) {
        return true;
    }
    return Constants.REGEX_EMAIL.test(email);
}

const handleLogin = (email, password) => {
    axios.get(`${Constants.URL_BASE_DEV}/user/${email}/${password}`)
        .then(response => {
            console.log(response.data.id!=null ? "Autenticado" : "No existe");
        })

}

export { validateForm, validateEmail, handleLogin };