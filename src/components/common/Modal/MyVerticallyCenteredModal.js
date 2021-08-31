import React from 'react';
import { Modal } from 'react-bootstrap';
import './index.scss'

function MyVerticallyCenteredModal(props) {
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {props.children}
            </Modal>
        </div>
    );
}

export default MyVerticallyCenteredModal;