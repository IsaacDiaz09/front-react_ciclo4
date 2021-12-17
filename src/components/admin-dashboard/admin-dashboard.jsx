import "../../static/css/admin-dashboard.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../shared/header/header";
import { setTiTitleTo } from "../../static/js/helpers/utils";

const AdminDashboard = () => {
    setTiTitleTo("Admin Dashboard | El mercader LTDA");
    return (
        <>
            <Header />
            <Container>
                <div className="row">
                    <div className="col-lg-4 col-sm-6">
                        <div className="card-box bg-blue">
                            <div className="inner">
                                <h3>PRODUCTOS</h3>
                            </div>
                            <div className="icon">
                                <i className="fa fa-list" aria-hidden="true"></i>
                            </div>
                            <Link to='./gadgets' className="card-box-footer">Ver Mas <i className="fa fa-arrow-circle-right"></i></Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="card-box bg-green">
                            <div className="inner">
                                <h3>USUARIOS</h3>
                            </div>
                            <div className="icon">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </div>
                            <Link to='./users' className="card-box-footer">Ver Mas <i className="fa fa-arrow-circle-right"></i></Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default AdminDashboard;