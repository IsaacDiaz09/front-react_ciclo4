import $ from 'jquery';
import Constants from "./constants";
import { Navigate } from 'react-router-dom';

const setTiTitleTo = (title) => {
    $(document).prop('title', title);
}
const isLoggedIn = () => {
    return localStorage.getItem("email") !== null && localStorage.length > 0;
}

const redirectBasedOnRole = () => {
    const role = localStorage.getItem("role");

    switch (role) {
        case Constants.TYPE_ADM:
            return (<Navigate to="/admin-dashboard"></Navigate>);
        case Constants.TYPE_ASE:
            return (<Navigate to="/orders"></Navigate>);
        case Constants.TYPE_COORD:
            return (<Navigate to="orders-management"></Navigate>);
        default:
            return (<Navigate to="/login"></Navigate>);
    }
}
export { setTiTitleTo, isLoggedIn, redirectBasedOnRole };