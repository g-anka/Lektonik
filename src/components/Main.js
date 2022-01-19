import React, {useState} from "react";
import Header from "./Header";
import Modal from "./Modal";
import Authorization from "./Authorization";
import profileSelected from "../img/header_profile-selected.svg";
import profile from "../img/header_profile.svg";


function Main(){

    const [open, setOpen] = useState(false); //открыто модальное окно или нет

    return(
        <div className="main">
            <Header
                src={open ? profileSelected : profile}
                onOpenAuth={() => setOpen(true)}/>
            <Modal
                isOpened={open}
                onModalClose={() => setOpen(false)}>
                <Authorization />
            </Modal>
        </div>
    )
}

export default Main;