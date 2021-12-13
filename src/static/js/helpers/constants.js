const Constants = {
    REGEX_EMAIL :
    /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
    URL_BASE_DEV:"http://127.0.0.1:8080/api",
    URL_BASE_PROD:"http://ip:8080",
}
export default Constants;