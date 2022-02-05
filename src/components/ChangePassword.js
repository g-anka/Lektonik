import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/ChangePassword.css";

export default function ChangePassword() {

    const navigate = useNavigate();
    function backToRegistration() {
        navigate("/")
    }

    return (
        <>
            <Header src={require("../img/header_profile-selected.svg").default}/>
            <img className="change-password__back-arrow"
                 src={require("../img/back-arrow.svg").default}
                 onClick={backToRegistration}/>
            <div className="change-password__text">
                <h2>Смена пароля</h2>
                <p>На Ваш e-mail отправлена ссылка для смены пароля.</p>
            </div>
        </>
    )
};