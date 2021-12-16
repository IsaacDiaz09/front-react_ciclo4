import "../../static/css/orders.css";
import { useEffect, useState } from "react";

const Orders = () => {

    let [showAddBtn, setShowAddBtn] = useState(false);
    return (
        <div className="container h-100">
            <div className="row h-100">
                <div className="m-3">
                    <button type="button" className="btn btn-secondary btn-sm" id="show-orders">Ver mis pedidos</button>
                    <div className="text-center">
                        <h3>Orden de pedido</h3>
                        <button type="button" className="btn btn-primary" id="btn-add-product">Agregar producto</button>
                        <hr />
                        <h4 id="detail"></h4>
                        <div id="order"></div>
                        <span>
                            {showAddBtn ?
                                <button type="button" id="save-order" className="btn btn-primary">Guardar orden</button> : null
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;