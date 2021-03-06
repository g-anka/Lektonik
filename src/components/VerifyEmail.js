import React from "react";
import {Link} from "react-router-dom";
import "../styles/VerifyEmail.css";
import Header from "./Header";


function VerifyEmail(){

    return(
        <>
            <Header src={require("../img/header_profile-selected.svg").default}/>

            <div className="verify__wrapper">
                <h1>Подтверждение e-mail</h1>
                <p>Мы отправили письмо на электронную почту</p>
                <p id="verify__email">{window.sessionStorage.getItem("email")}</p>
                <p>Для завершения регистрации перейдите по ссылке, указанной в письме.<br/>Если письмо не пришло, пожалуйста, проверьте папку Спам.</p>

                <Link to="/continue_registration">
                    <button className="btn temporary__btn">Продолжить регистрацию</button>
                </Link>
            </div>
        </>
    )
};

export default VerifyEmail;