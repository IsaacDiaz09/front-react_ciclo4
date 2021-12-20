import { isEmpty } from "../../../static/js/helpers/utils";
import Constant from "../../../static/js/helpers/constants";


const validateUserForm = (user, msgToast) => {
    console.log(user)
    if (isEmpty(user.id) || isEmpty(user.identification) || isEmpty(user.name)
        || isEmpty(user.email) || isEmpty(user.password) || isEmpty(user.birthtDay) 
        || isEmpty(user.address) || isEmpty(user.cellPhone) || isEmpty(user.type)
        || isEmpty(user.zone)) {
        msgToast("Error de validación", "Todos los campos son requeridos", Constant.TOAST_DANGER);
        return false;
    }

    if (user.password.length <= 0) {
        msgToast("Error de validación", "La contraseña debe tener minimo 8 caracteres", Constant.TOAST_DANGER);
        return false;
    }

    if (!Constant.REGEX_EMAIL.test(user.email)) {
        msgToast("Error de validación", "El formato del correo es inválido, verifiquelo en intente de nuevo", Constant.TOAST_DANGER);
        return false;
    }

    return true;
    
}

export { validateUserForm };