import React from "react";
import {Link} from "react-router-dom";
import "../styles/VerifyEmail.css";
import Header from "./Header";


function VerifyEmail(){

    return(
        <>
            <Header src={require("../public/header_profile-selected.svg").default}/>

            <div className="verify__wrapper">
                <h2>Подтверждение e-mail</h2>
                <p>Мы отправили письмо на электронную почту</p>
                <p id="verify__email">{window.sessionStorage.getItem("email")}</p>
                <p>Для завершения регистрации перейдите по ссылке, указанной в письме.<br/>Если письмо не пришло, пожалуйста, проверьте папку Спам.</p>
                <p className="verify__email__text-bottom">Ошиблись в вводе данных? <h5>Ввести корректный e-mail</h5></p>

                <Link to="/continue_registration">
                    <button className="btn temporary__btn">Продолжить регистрацию</button>
                </Link>
            </div>
        </>
    )
};

export default VerifyEmail;