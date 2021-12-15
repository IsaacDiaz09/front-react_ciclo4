import { Button, Modal } from "react-bootstrap";

/**
 * Modal reutilizable para desplegar los formularios al usuario, recibe titulo,
 * variante para el btn de guardar, un mensaje y un contenido 
 */
const MyModal = (props) => {
    return (
        <Modal
            size="lg"
            show={props.show}
            backdrop="static"
            keyboard={false}
            onHide={() => props.onClick()}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => props.onClose()}>
                    Cancelar
                </Button>
                <Button variant="success">{props.message_btn}</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default MyModal;