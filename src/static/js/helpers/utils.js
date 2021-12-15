import $ from 'jquery';
import { Alert } from "react-bootstrap";

const setTiTitleTo = (title) => {
    $(document).prop('title', title);
}

const msgNoGadgets = () => {
    return (
        <div className="alert">
            <Alert variant="warning">
                Ups, parece que no hay productos todavia...<br />
                <Alert.Link href="#">Empieza agregando uno!</Alert.Link>
            </Alert>
        </div>);
}

const isLoggedIn = () => {
    return localStorage.getItem("loggedIn") !== null;
}

export { setTiTitleTo, isLoggedIn, msgNoGadgets};
