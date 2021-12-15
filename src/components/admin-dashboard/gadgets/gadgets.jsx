import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { setTiTitleTo } from "../../../static/js/helpers/utils";
import CustomToast from "../../shared/toast/toast";
import Constants from "../../../static/js/helpers/constants";
import "../../../static/css/alert.css";
import MyModal from "../../shared/modal/modal";
import { saveObj, updateObj, deleteObj } from "../../../static/js/helpers/axios-functions";
import axios from "axios";

const Gadgets = () => {
    useEffect(() => {
        queryGadgets();
    }, [])

    setTiTitleTo("Productos | El mercader LTDA");

    // gadgets
    let [gadgets, setGadgets] = useState([]);
    let [gadget, setGadget] = useState(Constants.DEFAULT_PRODUCT);
    // modal
    let [showForm, setShowForm] = useState(false);
    let [editForm, setEditForm] = useState(false);
    let [modalTitle, setModalTitle] = useState("");
    let [msgBtn, setmsgBtn] = useState("");
    let [selectSiNo, setSelectSiNo] = useState(true);
    // toast
    let [showt, setShowt] = useState(false);
    let [titlet, setTitlet] = useState("");
    let [messaget, setMessaget] = useState("");
    let [variantt, setVariantt] = useState("");

    const queryGadgets = () => {
        axios.get(`${Constants.URL_BASE_PROD}/gadget/all`)
            .then(response => {
                setGadgets(response.data);
            }).catch(error => {
                console.log(error.code);
                console.log(error.message);
                console.log(error.stack);
            })
    }

    const addGadget = () => {
        setGadget(Constants.DEFAULT_PRODUCT);
        setEditForm(false);
        setShowForm(true);
        setModalTitle("Nuevo producto")
        setmsgBtn("Guardar")
    }

    const openEditModalForm = (gadget) => {
        setSelectSiNo(gadget.availability);
        setGadget(gadget);
        setEditForm(true);
        setShowForm(true);
        setModalTitle("Actualizar producto")
        setmsgBtn("Editar")
    }

    const deleteGaddget = (gadget) => {
        deleteObj(`${Constants.URL_BASE_PROD}/gadget/${gadget.id}`, mostrarToast, `Se ha eliminado el producto "${gadget.name}"`, queryGadgets);
    }

    const save = () => {
        if (editForm) {
            updateObj(
                `${Constants.URL_BASE_PROD}/gadget/update`, gadget, mostrarToast,
                `Se ha editado el producto correctamente`, setShowForm,
                queryGadgets);
        } else {
            saveObj(
                `${Constants.URL_BASE_PROD}/gadget/new`, gadget, mostrarToast,
                `Se ha guardado el producto "${gadget.name}"`, setShowForm,
                queryGadgets);
        }
    }

    const handleInputChange = (e) => {
        setSelectSiNo(e.currentTarget.value);
        setGadget({
            ...gadget,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    const mostrarToast = (title, message, variant) => {
        setTitlet(title);
        setMessaget(message);
        setVariantt(variant);
        setShowt(true);
    }

    return (
        <div>
            <div className="text-center m-2">
                <h2><b><i>Productos</i></b></h2>
                <Button variant="primary" size="sm" onClick={() => addGadget()}>
                    ~ Agregar producto ~
                </Button>
                <hr />
                {gadgets.length > 0 ?
                    <Table variant="light" striped bordered hover responsive="md" size="sm" >
                        <thead>
                            <tr>
                                <th>ID</th>
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
                                        <td>{gadget.id}</td>
                                        <td>{gadget.name}</td>
                                        <td>{gadget.brand}</td>
                                        <td>{gadget.category}</td>
                                        <td>{gadget.description}</td>
                                        <td>{gadget.price}</td>
                                        <td>{gadget.quantity}</td>
                                        <td>{gadget.availability ? "SI" : "NO"}</td>
                                        <td><img src={gadget.photography} alt={gadget.name} height={50} /></td>
                                        <td><Button variant="warning" onClick={() => openEditModalForm(gadget)}>Editar</Button></td>
                                        <td><Button variant="danger" onClick={() => deleteGaddget(gadget)}>Borrar</Button></td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </Table> : null}
                <MyModal show={showForm} title={modalTitle} onClick={() => setShowForm(false)} onClose={() => setShowForm(false)} onSave={() => save()} message_btn={msgBtn}>
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
                            <label>Marca</label>
                            <input type="text" className="form-control" id="brand"
                                placeholder="Marca" onChange={handleInputChange} value={gadget.brand} />
                        </div>
                        <div className="col-xs-12 col-lg-6">
                            <label>Descripcion</label>
                            <textarea rows={3} className="form-control" id="description"
                                placeholder="Descripcion" onChange={handleInputChange} value={gadget.description}></textarea>
                        </div>
                        <div className="col-xs-12 col-lg-6">
                            <label>Disponible</label>
                            <select value={selectSiNo} onChange={handleInputChange} className="form-control" id="availability">
                                <option value="true">SI</option>
                                <option value="false">NO</option>
                            </select>
                        </div>
                        <div className="col-xs-12 col-lg-6">
                            <label>Precio</label>
                            <input type="number" min="0" className="form-control" id="price"
                                placeholder="Precio" onChange={handleInputChange} value={gadget.price} />
                        </div>
                        <div className="col-xs-12 col-lg-6">
                            <label>Cantidad</label>
                            <input type="number" min="0" className="form-control" id="quantity"
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
            <CustomToast show={showt} title={titlet} variant={variantt} message={messaget} onClose={() => setShowt(false)}></CustomToast>
        </div>
    );
}
export default Gadgets;