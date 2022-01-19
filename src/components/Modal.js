import React from "react";
import "../styles/Modal.css";

const Modal = props => {

    return (
        <div className={`modal__wrapper ${props.isOpened ? "open" : "close"}`} style={{...props.style}}>
            <div className="modal__body">
                <img className="modal__close"
                     src={require("../img/icon-close.svg").default}
                     alt="закрыть"
                     onClick={props.onModalClose} />

                     {props.children}

            </div>
        </div>
    )
}

export default Modal;