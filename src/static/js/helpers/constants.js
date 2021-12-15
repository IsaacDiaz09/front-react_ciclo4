const Constants = {
    REGEX_EMAIL:
        /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
    URL_BASE_DEV: "http://127.0.0.1:8080/api",
    URL_BASE_PROD: "http://129.151.108.97:8080/api",
    TOAST_PRIMARY: "primary",
    TOAST_DANGER: "danger",
    TOAST_SUCCESS: "success",
    TYPE_ADM: "ADM",
    TYPE_ASE: "ASE",
    TYPE_COORD: "COORD",
    DEFAULT_PRODUCT: {
        id: '',
        brand: '',
        category: '',
        name: '',
        description: '',
        price: 0,
        availability: true,
        quantity: 0,
        photography: ''
    },
    HEADERS: {
        'Content-Type': 'application/json'
    },
}
export default Constants;