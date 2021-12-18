import "../../static/css/orders.css";
import { useEffect, useState } from "react";
import Header from "../shared/header/header";
import { setTiTitleTo } from "../../static/js/helpers/utils";
import { Button, Table } from "react-bootstrap";
import CustomToast from "../../../src/components/shared/toast/toast";
import Constants from "../../static/js/helpers/constants";
import MyModal from "../../../src/components/shared/modal/modal";
import { saveObj } from "../../../src/static/js/helpers/axios-functions";
import axios from "axios";

const Orders = () => {
    
    useEffect(() => {
        queryOrdersAndGadgets();
    }, []);

    let [myOrders, setMyOrders] = useState([]);
    let [gadgets, setGadgets] = useState([]);
    let [gadgetsTable, setGadgetsTable] = useState([]);
    let [quantity, setQuantities] = useState({});
    let [user, setUser] = useState(Constants.DEFAULT_USER);
    // modal
    let [showForm, setShowForm] = useState(false);
    let [modalTitle, setModalTitle] = useState("");
    let [msgBtn, setmsgBtn] = useState("");
    // toast
    let [showt, setShowt] = useState(false);
    let [titlet, setTitlet] = useState("");
    let [messaget, setMessaget] = useState("");
    let [variantt, setVariantt] = useState("");

    setTiTitleTo("Mis ordenes | El mercader LTDA");

    const mostrarToast = (title, message, variant) => {
        setTitlet(title);
        setMessaget(message);
        setVariantt(variant);
        setShowt(true);
    }

    const openModal = (msgTitle, msg) => {
        setShowForm(true);
        setModalTitle(msgTitle)
        setmsgBtn(msg)
    }
    const showOrders = () => {
        console.log("SHOW ORDERS")
    }
    const selectGadget = (gadget) => {
        setShowForm(false);
        setGadgetsTable([...gadgetsTable, gadget]);
        let newGadgets = gadgets.filter(g => g !== gadget);
        setGadgets(newGadgets);
    }

    const queryOrdersAndGadgets = () => {
        axios.get(`${Constants.URL_BASE_DEV}/order/salesman/${localStorage.getItem("id")}`)
            .then(response => {
                setMyOrders(response.data);
            }).catch(error => {
                console.log(error.code);
                console.log(error.message);
                mostrarToast("Error", "Ha sucedido un error al cargar las ordenes", Constants.TOAST_DANGER);
            })

        axios.get(`${Constants.URL_BASE_DEV}/gadget/all`)
            .then(response => {
                const gadgetsFilter = response.data;
                let availablesGadgets = gadgetsFilter.filter(p => p.availability === true);
                setGadgets(availablesGadgets);
            }).catch(error => {
                console.log(error.code);
                console.log(error.message);
                mostrarToast("Error", "Ha sucedido un error al cargar los productos disponibles", Constants.TOAST_DANGER);
            })

        axios.get(`${Constants.URL_BASE_DEV}/user/${localStorage.getItem("id")}`)
            .then(response => {
                console.log(response.data)
                setUser(response.data);
            })
            setGadgetsTable([]);
    }
    // se construye el obj orden con los datos recopilados
    const save = () => {
        let order = { salesMan: user, quantities: quantity, registerDay: new Date(), status: Constants.ORDER_PENDING, products: {} };

        for (let i = 0; i < gadgetsTable.length; i++) {
            order.products[i + 1] = gadgetsTable[i];
        }

        if (order.quantities[1] === undefined){
            mostrarToast("Error", "Debe especificar la cantidad a pedir", Constants.TOAST_DANGER);
        } else { 
            saveObj(`${Constants.URL_BASE_DEV}/order/new`, order, mostrarToast, `Su pedido se ha registrado exitosamente`,setShowForm, queryOrdersAndGadgets);
        }
    }

    const handleQuantityChange = (e) => {
        setQuantities({ ...quantity, [e.target.id]: e.target.value });
    }

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row h-100">
                    <div className="m-3">
                        <Button variant="secondary" size="sm" onClick={() => showOrders()}>
                            Mis pedidos
                        </Button>
                        <div className="text-center">
                            <h3><b><i>Ordenes de pedido</i></b></h3>
                            <Button variant="primary" onClick={() => openModal("Elegir producto","OK")}>
                                ~ Agregar producto ~
                            </Button>
                            <hr />
                            <span>
                                {
                                    gadgetsTable.length > 0 ?
                                        <div>
                                            <Table variant="light" striped bordered hover responsive="md" size="sm" >
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Precio</th>
                                                        <th scope="col">Cantidad</th>
                                                        <th scope="col">Foto</th>
                                                        <th scope="col">Cantidad</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {gadgetsTable.map((gadget, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{gadget.name}</td>
                                                                <td>{gadget.price}</td>
                                                                <td>{gadget.quantity}</td>
                                                                <td><img src={gadget.photography} alt={gadget.name} height="50" /> </td>
                                                                <td><input type="number" min={1} id={index + 1} max={gadget.quantity} onChange={handleQuantityChange} /></td>
                                                            </tr>
                                                        );
                                                    })
                                                    }
                                                </tbody>
                                            </Table>
                                            <Button variant="primary" onClick={() => save()}>
                                                Generar orden
                                            </Button>
                                        </div> : null
                                }
                            </span>

                            <MyModal show={showForm} title={modalTitle} onClick={() => setShowForm(false)} onClose={() => setShowForm(false)} onSave={() => setShowForm(false)} message_btn={msgBtn}>
                                {
                                    gadgets.length > 0 ?
                                        <div className="text-center">
                                            <Table variant="light" striped bordered hover responsive="md" size="sm" >
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Precio</th>
                                                        <th scope="col">Cantidad</th>
                                                        <th scope="col">Foto</th>
                                                        <th scope="col">Agregar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {gadgets.map((gadget, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{gadget.name}</td>
                                                                <td>{gadget.price}</td>
                                                                <td>{gadget.quantity}</td>
                                                                <td><img src={gadget.photography} alt={gadget.name} height="50" /> </td>
                                                                <td><button className="btn btn-outline-primary" onClick={() => selectGadget(gadget)}>Seleccionar</button></td>
                                                            </tr>
                                                        );
                                                    })
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                        : <small className="text-muted">No hay ningun producto disponible</small>}
                            </MyModal>
                        </div >
                        <CustomToast show={showt} title={titlet} variant={variantt} message={messaget} onClose={() => setShowt(false)}></CustomToast>
                    </div >
                </div>
            </div>
        </div>
    );
}

export default Orders;