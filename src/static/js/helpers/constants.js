const Constants = {
    REGEX_EMAIL:
        /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
    REGEX_URL: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
    URL_BASE_DEV: "http://127.0.0.1:8080/api",
    URL_BASE_PROD: "http://129.151.108.97:8080/api",
    TOAST_PRIMARY: "primary",
    TOAST_DANGER: "danger",
    TOAST_SUCCESS: "success",
    TYPE_ADM: "ADM",
    TYPE_ASE: "ASE",
    TYPE_COORD: "COORD",
    ORDER_PENDING: "Pendiente",
    ORDER_APROVED: "Aprobada",
    ORDER_REJECTED: "Rechazada",
    DEFAULT_PRODUCT: {
        id: 0,
        brand: "",
        category: "",
        name: "",
        description: "",
        price: 0,
        availability: true,
        quantity: 0,
        photography: ""
    },
    DEFAULT_USER: {
        id: 0,
        identification: 0,
        name: "",
        birthtDay: new Date(),
        monthBirthtDay: 0,
        address: "",
        cellPhone: 0,
        email: "",
        password: "",
        zone: "",
        type: ""
    },
    DEFAULT_ORDER: {
        id: 0,
        registerDay: new Date(),
        status: "Pendiente",
        salesMan: {},
        products: {},
        quantities: {}
    },
    HEADERS: {
        "Content-Type": "application/json"
    },
}
export default Constants;