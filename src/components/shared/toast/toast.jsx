import { Toast, ToastContainer } from "react-bootstrap";

const CustomToast = (props) => {

    return (
        <ToastContainer className="p-3" position="top-end">
            <Toast className="d-inline-block m-1" onClose={() => props.onClose()} show={props.show}
                delay={3000} autohide bg={props.variant}>
                <Toast.Header>
                    <strong className="me-auto">{props.title}</strong>
                </Toast.Header>
                <Toast.Body className={props.variant}>
                    {props.message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}
export default CustomToast;