import { Alert, Button, FormControl, InputGroup, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { setTiTitleTo } from "../../../static/js/helpers/utils";
import CustomToast from "../../shared/toast/toast";
import Constants from "../../../static/js/helpers/constants";
import axios from "axios";

const Gadgets = () => {
    setTiTitleTo("Productos | El mercader LTDA");

    let [gadgets, setGadgets] = useState([]);

    useEffect(() => {
        queryGadgets();
    }, [])

    const queryGadgets = () => {
        axios.get(`${Constants.URL_BASE_PROD}/gadget/all`).then(response => {
            console.log(response.data)
            setGadgets(response.data);
        })
    }

    return (

        <div className="text-center m-2">
            <h2><b><i>Productos</i></b></h2>
            <hr />
            {gadgets.length === 0 ?
                <div>
                    <Alert variant="danger">
                        Ups parece que no hay productos todavia...<br/>
                        <Alert.Link href="#">Empieza agregando uno!</Alert.Link>
                    </Alert>
                </div> :
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
                                </tr>
                            );

                        })
                        }
                    </tbody>
                </Table>
            }
        </div>
    );
}
export default Gadgets;