import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { setTiTitleTo } from "../../../static/js/helpers/utils";
import CustomToast from "../../shared/toast/toast";
import Constants from "../../../static/js/helpers/constants";
import MyModal from "../../shared/modal/modal";
import { saveObj, updateObj, deleteObj } from "../../../static/js/helpers/axios-functions";
import axios from "axios";
import Moment from 'moment';
import { validateUserForm } from "./users-functions";
import Header from "../../shared/header/header";



const Users = () => {
    useEffect(() => {
        queryUsers();
    }, [])

    setTiTitleTo("Usuarios | El mercader LTDA");

    // users
    let [users, setUsers] = useState([]);
    let [user, setUser] = useState(Constants.DEFAULT_USER);

    // modal
    let [showForm, setShowForm] = useState(false);
    let [editForm, setEditForm] = useState(false);
    let [modalTitle, setModalTitle] = useState("");
    let [msgBtn, setmsgBtn] = useState("");

    // toast
    let [showt, setShowt] = useState(false);
    let [titlet, setTitlet] = useState("");
    let [messaget, setMessaget] = useState("");
    let [variantt, setVariantt] = useState("");

    const queryUsers = () => {
        axios.get(`${Constants.URL_BASE_PROD}/user/all`)
            .then(response => {
                setUsers(response.data);
            }).catch(error => {
                console.log(error.code);
                console.log(error.message);
                mostrarToast("Error", "Ha sucedido un error al cargar los usuarios",Constants.TOAST_DANGER );
            })
    }

    const addUser = () => {
        setUser(Constants.DEFAULT_USER);
        setEditForm(false);
        setShowForm(true);
        setModalTitle("Nuevo usuario")
        setmsgBtn("Guardar")
    }

    const openEditModalForm = (user) => {
        setUser(user);
        setEditForm(true);
        setShowForm(true);
        setModalTitle("Actualizar usuario")
        setmsgBtn("Editar")
    }

    const deleteUser = (user) => {
        deleteObj(`${Constants.URL_BASE_PROD}/user/${user.id}`, mostrarToast, `Se ha eliminado el usuario "${user.name}"`, queryUsers);
    }

    const save = () => {
        if (validateUserForm(user, mostrarToast) === true) {
        if (editForm) {
            user.birthtDay = new Date(user.birthtDay);
            updateObj(
                `${Constants.URL_BASE_PROD}/user/update`, user, mostrarToast,
                `Se ha editado el usuario correctamente`, setShowForm,
                queryUsers);
        } else {
            saveObj(
                `${Constants.URL_BASE_PROD}/user/new`, user, mostrarToast,
                `Se ha guardado el usuario "${user.name}"`, setShowForm,
                queryUsers);
        }
    }
    }
    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value })
    };


    const mostrarToast = (title, message, variant) => {
        setTitlet(title);
        setMessaget(message);
        setVariantt(variant);
        setShowt(true);
    }

    return (
        <div>
            <Header />
            <div className="container">
                <div className="text-center m-2">
                    <h3><b><i>Usuarios</i></b></h3>
                    <Button variant="primary" size="sm" onClick={() => addUser()}>
                        ~ Agregar usuario ~
                    </Button>
                    <hr />
                    {users.length > 0 ?
                        <Table variant="light" striped bordered hover responsive="md" size="sm" >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Identificacion</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Nacimiento</th>
                                    <th>Dirección</th>
                                    <th>Celular</th>
                                    <th>Rol</th>
                                    <th>Zona</th>
                                    <th colSpan={2}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.id}</td>
                                            <td>{user.identification}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{Moment(user.birthtDay).format("YYYY-MM-DD")}</td>
                                            <td>{user.address}</td>
                                            <td>{user.cellPhone}</td>
                                            <td>{user.type}</td>
                                            <td>{user.zone}</td>
                                            <td><Button variant="warning" onClick={() => openEditModalForm(user)}>Editar</Button></td>
                                            <td><Button variant="danger" onClick={() => deleteUser(user)}>Borrar</Button></td>
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
                                <input type="number" min="1" className="form-control" id="id" name="id"
                                    placeholder="ID" onChange={handleInputChange} value={user.id} disabled={editForm} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>Identificacion</label>
                                <input type="number" className="form-control" id="identification" name="identification"
                                    placeholder="Identificacion" onChange={handleInputChange} value={user.identification} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>Nombre</label>
                                <input type="text" min="1" className="form-control" id="name" name="name"
                                    placeholder="Nombre" onChange={handleInputChange} value={user.name} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>Fecha de nacimiento</label>
                                <input type="date" className="form-control" value={user.birthtDay} onChange={handleInputChange} id="birthtDay" />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>Direccion</label>
                                <input type="text" min="1" className="form-control" id="address" name="address"
                                    placeholder="Direccion" onChange={handleInputChange} value={user.address} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>Celular</label>
                                <input type="number" className="form-control" id="cellPhone" name="cellPhone"
                                    placeholder="Celular" onChange={handleInputChange} value={user.cellPhone} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>Email</label>
                                <input type="text" min="1" className="form-control" id="email" name="email"
                                    placeholder="name@domain.com" onChange={handleInputChange} value={user.email} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>Contraseña</label>
                                <input type="password" className="form-control" id="password" name="password"
                                    placeholder="******" onChange={handleInputChange} value={user.password} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>Rol</label>
                                <select value={user.type} onChange={handleInputChange} className="form-control" id="type">
                                    <option value="ADM">Administrador</option>
                                    <option value="ASE">Asesor comercial</option>
                                    <option value="COORD">Coordinador de zona</option>
                                </select>
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>Zona</label>
                                <input type="text" className="form-control" id="zone" name="zone"
                                    placeholder="Zona" onChange={handleInputChange} value={user.zone} />
                            </div>
                        </div>
                    </MyModal>

                </div >
                <CustomToast show={showt} title={titlet} variant={variantt} message={messaget} onClose={() => setShowt(false)}></CustomToast>
            </div >
        </div>
    );
}

export default Users;