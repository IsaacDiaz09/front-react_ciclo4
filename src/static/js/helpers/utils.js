import $ from 'jquery';

// Regresa boolean, verifica si un campo se dejo en blanco
const isEmpty = (valor) => {
    if (typeof valor === "number"){
        return valor === null;
    }
    return valor.trim() === "";
}

// Modifica el titulo de la pag
const setTiTitleTo = (title) => {
    $(document).prop('title', title);
}

// Verifica el localStorage para saber si un usuario ha iniciado sesion
const isLoggedIn = () => {
    return localStorage.getItem("loggedIn") !== null;
}

// Cierra la sesion de un usuario limpiando el localStorage
const logout = () => {
    localStorage.clear();
}

const verifyRole = (role) => {
    
}
export { setTiTitleTo, isLoggedIn, logout, isEmpty};
