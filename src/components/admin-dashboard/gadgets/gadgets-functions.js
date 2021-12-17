import { isEmpty } from "../../../static/js/helpers/utils";
import Constant from "../../../static/js/helpers/constants";

const validateGadgetForm = (gadget, msgToast) => {
    console.log(gadget)
    if (isEmpty(gadget.id) || isEmpty(gadget.brand) || isEmpty(gadget.category)
        || isEmpty(gadget.name) || isEmpty(gadget.description) || isEmpty(gadget.photography)
        || isEmpty(gadget.price) || isEmpty(gadget.quantity)) {
        msgToast("Error de validación", "Todos los campos son requeridos", Constant.TOAST_DANGER);
        return false;
    }

    if (gadget.price <= 0) {
        msgToast("Error de validación", "El precio no puede ser negativo", Constant.TOAST_DANGER);
        return false;
    }

    if (gadget.quantity <= 0) {
        msgToast("Error de validación", "La cantidad no puede ser negativa", Constant.TOAST_DANGER);
        return false;
    }

    if (!Constant.REGEX_URL.test(gadget.photography)) {
        msgToast("Error de validación", "El formato de la url de la imagen es inválido, verifiquelo en intente de nuevo", Constant.TOAST_DANGER);
        return false;
    }

    return true;
}

export { validateGadgetForm };