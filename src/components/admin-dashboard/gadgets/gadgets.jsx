import { Alert, Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { setTiTitleTo } from "../../../static/js/helpers/utils";
import CustomToast from "../../shared/toast/toast";
import Constants from "../../../static/js/helpers/constants";
import axios from "axios";
import "../../../static/css/alert.css";
import MyModal from "../../shared/modal/modal";

const Gadgets = () => {
    useEffect(() => {
        queryGadgets();
    }, [])

    setTiTitleTo("Productos | El mercader LTDA");

    let [gadgets, setGadgets] = useState([]);
    let [gadget, setGadget] = useState(Constants.DEFAULT_PRODUCT);
    let [showForm, setShowForm] = useState(false);
    let [editForm, setEditForm] = useState(false);
    let [modalTitle, setModalTitle] = useState("");
    let [msgBtn, setmsgBtn] = useState("");

    const queryGadgets = () => {
        axios.get(`${Constants.URL_BASE_DEV}/gadget/all`).then(response => {
            setGadgets(response.data);
        })
    }

    const addGadget = () => {
        setGadget(Constants.DEFAULT_PRODUCT);
        setEditForm(false);
        setShowForm(true);
        setModalTitle("Nuevo producto")
        setmsgBtn("Guardar")
    }

    const editGaddget = () => {
    }

    const deleteGaddget = () => {
    }

    const notEmpyGadgets = () => {
        return !gadgets.length;
    }

    const msgNoGadgets = () => {
        return (
            <div className="alert">
                <Alert variant="warning">
                    Ups, parece que no hay productos todavia...<br />
                    <Alert.Link href="#">Empieza agregando uno!</Alert.Link>
                </Alert>
            </div>)
            ;
    }

    const handleInputChange = (e) => {
        setGadget({
            ...gadget,
            [e.currentTarget.id]: e.currentTarget.value
        })
        console.log(gadget);
    }

    return (
        <div className="text-center m-2">
            <h2><b><i>Productos</i></b></h2>
            <Button variant="primary" size="sm" onClick={() => addGadget()}>
                ~ Agregar producto ~
            </Button>
            <hr />
            {notEmpyGadgets() ? setTimeout(msgNoGadgets(), 250) :
                <Table variant="light" striped bordered hover responsive="md" size="sm" >
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Categoria</th>
                            <th>Descripcion</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Disponible</th>
                            <th>Foto</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gadgets.map((gadget, index) => {
                            return (
                                <tr key={index}>
                                    <td>{gadget.name}</td>
                                    <td>{gadget.brand}</td>
                                    <td>{gadget.category}</td>
                                    <td>{gadget.description}</td>
                                    <td>{gadget.price}</td>
                                    <td>{gadget.quantity}</td>
                                    <td>{gadget.availability ? "SI" : "NO"}</td>
                                    <td><img src={gadget.photography} alt={gadget.name} height={50} /></td>
                                    <td><Button variant="warning" onClick={() => editGaddget()}>Editar</Button></td>
                                    <td><Button variant="danger" onClick={() => deleteGaddget()}>Borrar</Button></td>
                                </tr>
                            );
                        })
                        }
                    </tbody>
                </Table>
            }
            <MyModal show={showForm} title={modalTitle} onClick={() => setShowForm(false)} onClose={() => setShowForm(false)} message_btn={msgBtn}>
                <div className="row">
                    <div className="col-xs-12 col-lg-6">
                        <label>ID</label>
                        <input type="number" min="1" className="form-control" id="id"
                            placeholder="ID" onChange={handleInputChange} value={gadget.id} disabled={editForm} />
                    </div>
                    <div className="col-xs-12 col-lg-6">
                        <label>Nombre</label>
                        <input type="text" className="form-control" id="name"
                            placeholder="Nombre" onChange={handleInputChange} value={gadget.name} />
                    </div>
                    <div className="col-xs-12 col-lg-6">
                        <label>Categoria</label>
                        <input type="text" className="form-control" id="category"
                            placeholder="Categoria" onChange={handleInputChange} value={gadget.category} />
                    </div>
                    <div className="col-xs-12 col-lg-6">
                        <label>Precio</label>
                        <input type="number" className="form-control" id="price"
                            placeholder="Precio" onChange={handleInputChange} value={gadget.price} />
                    </div>
                    <div className="col-xs-12 col-lg-6">
                        <label>Descripcion</label>
                        <input type="textarea" className="form-control" id="description"
                            placeholder="Descripcion" onChange={handleInputChange} value={gadget.description} />
                    </div>
                    <div className="col-xs-12 col-lg-6">
                        <label>Stock</label>
                        <input type="number" min="1" className="form-control" id="quantity"
                            placeholder="Cantidad" onChange={handleInputChange} value={gadget.quantity} />
                    </div>
                    <div className="col-xs-12 col-lg-6">
                        <label>URL de foto del Producto</label>
                        <input type="text" className="form-control" id="photography"
                            placeholder="URL de la foto" onChange={handleInputChange} value={gadget.photography} />
                    </div>
                </div>
            </MyModal>
        </div>
    );
}
export default Gadgets;