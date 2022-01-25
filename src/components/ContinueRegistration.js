import React, {useState} from "react";
import Header from "./Header";
import Modal from "./Modal";
import profileSelected from "../img/header_profile-selected.svg";
import profile from "../img/header_profile.svg";
import AuthStep2 from "./AuthStep2";
import AuthSignUpEmail from "./AuthSignUpEmail";


function ContinueRegistration(){

    const [open, setOpen] = useState(true); //открыто модальное окно или нет

    return(
        <div className="main">
            <Header
                src={open ? profileSelected : profile}
                onOpenAuth={() => setOpen(true)}/>
            <Modal
                isOpened={open}
                onModalClose={() => setOpen(false)}>
                <AuthSignUpEmail />
            </Modal>
        </div>
    )
}

export default ContinueRegistration;