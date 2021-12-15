import $ from 'jquery';

const setTiTitleTo = (title) => {
    $(document).prop('title', title);
}

const isLoggedIn = () => {
    return localStorage.getItem("loggedIn") !== null;
}

export { setTiTitleTo, isLoggedIn,};
