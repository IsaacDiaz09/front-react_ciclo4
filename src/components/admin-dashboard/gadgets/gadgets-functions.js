import { isEmpty } from "../../../static/js/helpers/utils";
import Constant from "../../../static/js/helpers/constants";

const validateGadgetForm = (gadget, gadgets, msgToast) => {
    if (isEmpty(gadget.name) || isEmpty(gadget.category) || isEmpty(gadget.brand)
        || isEmpty(gadget.description) || isEmpty(gadget.photography) || isEmpty(gadget.id)
        || isEmpty(gadget.price) || isEmpty(gadget.quantity)) {
        msgToast("Error de validación", "Todos los campos son requeridos", Constant.TOAST_DANGER);
        return false;
    }

    if (gadget.price < 0) {
        msgToast("Error de validación", "El precio no puede ser negativo", Constant.TOAST_DANGER);
        return false;
    }


    if (gadget.quantity < 0) {
        msgToast("Error de validación", "La cantidad no puede ser negativa", Constant.TOAST_DANGER);
        return false;
    }

    if (inUseId(gadget, gadgets)) {
        msgToast("Error de validación", "El ID seleccionado ya se encuentra en uso", Constant.TOAST_DANGER);
        return false;
    }

    if (!Constant.REGEX_URL.test(gadget.photography)) {
        msgToast("Error de validación", "El formato de la url de la imagen es inválido, verifiquelo en intente de nuevo", Constant.TOAST_DANGER);
        return false;
    }

    return true;
}

const inUseId = (gadget, gadgets) => {
    gadgets.forEach(function (p) {
        if (p.id === gadget.id) {
            return true;
        }
    })
    return false;
}

export { validateGadgetForm };