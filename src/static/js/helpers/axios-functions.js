import axios from "axios";
import Constants from "../../../static/js/helpers/constants";

const header = Constants.HEADERS;

/**
 *  Guarda un obj segun los argumentos pasados a la funcion: hace la peticion post, muestra toast y vuelve a consultar todos
 * @param {*} url 
 * @param {*} object 
 * @param {*} showToast 
 * @param {*} msgToast 
 * @param {*} showForm 
 * @param {*} queryAll 
 */
const saveObj = (url, object, showToast, msgToast, showForm, queryAll) => {
    axios.post(url, object, { header }).then(response => {
        showForm(false);
        queryAll();
        showToast("Éxito", msgToast, Constants.TOAST_SUCCESS);
    }).catch(error => {
        console.log(error.code);
        console.log(error.message);
        console.log(error.stack);
    });
}

/**
 *  Edita un obj segun los argumentos pasados a la funcion: hace la peticion put, muestra toast y vuelve a consultar todos
 * @param {*} url 
 * @param {*} object 
 * @param {*} showToast 
 * @param {*} msgToast 
 * @param {*} showForm 
 * @param {*} queryAll 
 */
const updateObj = (url, object, showToast, msgToast, showForm, queryAll) => {
    axios.put(url, object, { header }).then(response => {
        showForm(false);
        queryAll();
        showToast("Confirmación", msgToast, Constants.TOAST_PRIMARY);
    }).catch(error => {
        console.log(error.code);
        console.log(error.message);
        console.log(error.stack);
    });

}

/**
 * Elimina un obj segun los argumentos pasados a la funcion: hace la peticion delete, muestra toast y vuelve a consultar todos
 * @param {*} url 
 * @param {*} msgToast 
 * @param {*} showForm 
 * @param {*} queryAll 
 */
const deleteObj = (url, showToast, msgToast, queryAll) => {
    axios.delete(url).then(response => {
        queryAll();
        showToast("Confirmación", msgToast, Constants.TOAST_PRIMARY);
    }).catch(error => {
        console.log(error.code);
        console.log(error.message);
        console.log(error.stack);
    });

}

export { saveObj, updateObj, deleteObj };