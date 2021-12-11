import $ from 'jquery';

const setTiTitleTo = (title) => {
    $(document).prop('title', title);
}

export {setTiTitleTo};