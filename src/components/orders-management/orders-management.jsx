import "../../static/css/orders.css";
import { useEffect, useState } from "react";
import { setTiTitleTo } from "../../static/js/helpers/utils";
import { Button, Table } from "react-bootstrap";
import { updateObj } from "../../../src/static/js/helpers/axios-functions";
import Header from "../shared/header/header";
import CustomToast from "../../../src/components/shared/toast/toast";
import Constants from "../../static/js/helpers/constants";
import MyModal from "../../../src/components/shared/modal/modal";
import axios from "axios";

const OrderManagement = () => {

    useEffect(() => {
        queryOrdersAndUser();
    }, []);

    setTiTitleTo("Gestion de ordenes | El mercader LTDA");

    let [ordersZone, setOrdersZone] = useState([]);
    let [ordersFiltered, setOrdersFiltered] = useState([]);
    let [user, setUser] = useState(Constants.DEFAULT_USER);
    // modal
    let [showForm, setShowForm] = useState(false);
    let [modalTitle, setModalTitle] = useState("");
    let [msgBtn, setmsgBtn] = useState("");
    let [date, setDate] = useState("");

    // toast
    let [showt, setShowt] = useState(false);
    let [titlet, setTitlet] = useState("");
    let [messaget, setMessaget] = useState("");
    let [variantt, setVariantt] = useState("");

    const queryOrdersAndUser = () => {
        axios.get(`${Constants.URL_BASE_PROD}/order/state/${Constants.ORDER_PENDING}/${localStorage.getItem("id")}`)
            .then(response => {
                setOrdersFiltered(response.data);
            }).catch(error => {
                console.log(error.code);
                console.log(error.message);
                mostrarToast("Error", "Ha sucedido un error al cargar las ordenes pendientes", Constants.TOAST_DANGER);
            })

        axios.get(`${Constants.URL_BASE_PROD}/order/salesman/${localStorage.getItem("id")}`)
            .then(response => {
                setOrdersZone(response.data);
            }).catch(error => {
                console.log(error.code);
                console.log(error.message);
                mostrarToast("Error", "Ha sucedido un error al cargar las ordenes", Constants.TOAST_DANGER);
            })

        axios.get(`${Constants.URL_BASE_PROD}/user/${localStorage.getItem("id")}`)
            .then(response => {
                setUser(response.data);
            })
    }

    const mostrarToast = (title, message, variant) => {
        setTitlet(title);
        setMessaget(message);
        setVariantt(variant);
        setShowt(true);
    }
    const showMyOrders = () => {
        setShowForm(true);
        setModalTitle(`Ordenes zona ${localStorage.getItem("id")}`)
        setmsgBtn("OK")
    }

    const queryFilteredOrders = () => {
        axios.get(`${Constants.URL_BASE_PROD}/order/salesman/${localStorage.getItem("id")}`)
            .then(response => {
                setOrdersFiltered(response.data);
            }).catch(error => {
                console.log(error.code);
                console.log(error.message);
            })
    }

    const aprobar = (order, boolean) => {
        if (boolean === true) {
            order.status = Constants.ORDER_APROVED;
        }
        else {
            order.status = Constants.ORDER_REJECTED;
        }
        updateObj(
            `${Constants.URL_BASE_PROD}/order/update`, order, mostrarToast,
            `Se ha editado el estado de la orden correctamente`, setShowForm,queryFilteredOrders
        );
    }

    const handleChangeDate = (e) => {
        setDate(e.target.value)
        let d = new Date(date).toISOString().split('T')[0];
        axios.get(`${Constants.URL_BASE_PROD}/order/date/${d}/${localStorage.getItem("id")}`)
            .then(response => {
                setOrdersFiltered(response.data);
            }).catch(error => {
                console.log(error.code);
                console.log(error.message);
                mostrarToast("Error", "Ha sucedido un error al cargar las ordenes por fecha", Constants.TOAST_DANGER);
            })

        //Ejemplo:http://BASE_URL/api/order/date/2021-11-15/6

    }
    return (
        <div>
            <Header />
            <div className="container">
                <div className="row h-100">
                    <div className="m-2">
                        <Button variant="secondary" size="sm" onClick={() => showMyOrders()}>
                            Ordenes de la zona <b>{localStorage.getItem("id")}</b>
                        </Button>

                        <h6 style={{ marginTop: 5 }}>Filtrar por fecha:{" "}
                            <input type="date" value={date} onChange={handleChangeDate} onMouseLeave={handleChangeDate} /> </h6>

                        <Button style={{ marginTop: 5 }} variant="primary" size="sm" onClick={() => console.log("Hola")}>
                            Reiniciar filtros</Button>
                        <div className="text-center">
                            <h3><b><i>Listado de ordenes</i></b></h3>
                            <hr />
                            <div>
                                {
                                    ordersFiltered.length > 0 ?
                                        <div>
                                            <div className="text-center">
                                                <Table variant="light" striped bordered hover responsive="md" >
                                                    <thead>
                                                        <tr>
                                                            <th>Fecha</th>
                                                            <th>Productos</th>
                                                            <th>Cantidades</th>
                                                            <th>Total</th>
                                                            <th>Estado</th>
                                                            <th colSpan={2}>Acciones</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {ordersFiltered.map((order, index) => {
                                                            let size = Object.keys(order.products).length;
                                                            let productsName = [];
                                                            let sum = 0;
                                                            let quantites = [];

                                                            // Ya que pueden haber varios productos, se recorren y se obtiene el total y sus nombres
                                                            for (let index = 0; index < size; index++) {

                                                                if (index !== size - 1) {
                                                                    productsName.push(`${order.products[index + 1].name}, `);
                                                                    sum += order.products[index + 1].price;
                                                                    quantites.push(`${order.quantities[index + 1]}, `)
                                                                } else {
                                                                    productsName.push(order.products[index + 1].name);
                                                                    sum += order.products[index + 1].price;
                                                                    quantites.push(order.quantities[index + 1])

                                                                }
                                                            }
                                                            let classAlert = "";
                                                            if (order.status === Constants.ORDER_PENDING) {
                                                                classAlert = "alert alert-warning";
                                                            } else if (order.status === Constants.ORDER_APROVED) {
                                                                classAlert = "alert alert-success";
                                                            } else if (order.status === Constants.ORDER_REJECTED) {
                                                                classAlert = "alert alert-danger";
                                                            }
                                                            let strDate = new Date(order.registerDay).toISOString().split('T')[0];

                                                            return (
                                                                <tr key={index}>
                                                                    <td>{strDate}</td>
                                                                    <td>[{productsName}]</td>
                                                                    <td>[{quantites}]</td>
                                                                    <td>${sum}</td>
                                                                    <td className={classAlert} role="alert"><i>{order.status}</i></td>
                                                                    <td><Button variant="success" onClick={() => aprobar(order, true)}> Aprobar </Button></td>
                                                                    <td><Button variant="danger" onClick={() => aprobar(order, false)}> Rechazar </Button></td>
                                                                </tr>
                                                            );
                                                        })
                                                        }
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div> : null
                                }

                                <MyModal show={showForm} title={modalTitle} onClick={() => setShowForm(false)} onClose={() => setShowForm(false)} onSave={() => setShowForm(false)} message_btn={msgBtn}>
                                    {
                                        ordersZone.length > 0 ?
                                            <div className="text-center">
                                                <Table variant="light" bordered hover responsive="md" size="sm" >
                                                    <thead>
                                                        <tr>
                                                            <th>Fecha</th>
                                                            <th>Productos</th>
                                                            <th>Cantidades</th>
                                                            <th>Total</th>
                                                            <th>Estado</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {ordersZone.map((order, index) => {
                                                            let size = Object.keys(order.products).length;
                                                            let productsName = [];
                                                            let sum = 0;
                                                            let quantites = [];

                                                            // Ya que pueden haber varios productos, se recorren y se obtiene el total y sus nombres
                                                            for (let index = 0; index < size; index++) {

                                                                if (index !== size - 1) {
                                                                    productsName.push(`${order.products[index + 1].name}, `);
                                                                    sum += order.products[index + 1].price;
                                                                    quantites.push(`${order.quantities[index + 1]}, `)
                                                                } else {
                                                                    productsName.push(order.products[index + 1].name);
                                                                    sum += order.products[index + 1].price;
                                                                    quantites.push(order.quantities[index + 1])

                                                                }
                                                            }
                                                            let classAlert = "";
                                                            if (order.status === Constants.ORDER_PENDING) {
                                                                classAlert = "alert alert-warning";
                                                            } else if (order.status === Constants.ORDER_APROVED) {
                                                                classAlert = "alert alert-success";
                                                            } else if (order.status === Constants.ORDER_REJECTED) {
                                                                classAlert = "alert alert-danger";
                                                            }
                                                            let strDate = new Date(order.registerDay).toISOString().split('T')[0];

                                                            return (
                                                                <tr key={index}>
                                                                    <td>{strDate}</td>
                                                                    <td>[{productsName}]</td>
                                                                    <td>[{quantites}]</td>
                                                                    <td>${sum}</td>
                                                                    <td className={classAlert} role="alert"><i>{order.status}</i></td>
                                                                </tr>
                                                            );
                                                        })
                                                        }
                                                    </tbody>
                                                </Table>
                                            </div>
                                            : <small className="text-muted">No hay ordenes que mostrar</small>}
                                </MyModal>

                            </div >
                            <CustomToast show={showt} title={titlet} variant={variantt} message={messaget} onClose={() => setShowt(false)}></CustomToast>
                        </div >
                    </div>
                </div>
            </div >
        </div >
    );
}

export default OrderManagement;