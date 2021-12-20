import Constants from "../../static/js/helpers/constants";

const validateForm = (email, password) => {
    return (email.trim().length > 0 && password.length > 0) && validateEmail(email);
}

const validateEmail = (email) => {
    if (email.trim().length === 0) {
        return true;
    }
    return Constants.REGEX_EMAIL.test(email);
}

export { validateForm, validateEmail };