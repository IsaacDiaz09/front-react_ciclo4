import "../../static/css/orders.css";
import { useEffect, useState } from "react";
import Header from "../shared/header/header";

const Orders = () => {

    // let [showAddBtn, setShowAddBtn] = useState(false);
    return (

        <div className="h-100">
            <Header />
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

                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;