import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/Authorization.css";
import "../styles/style.css";
import eyeOpen from "../img/eyeOpen.svg";
import eyeClose from "../img/eyeClose.svg";
import 'regenerator-runtime/runtime';

function Authorization() {

//Для перехода
    const navigate = useNavigate();

//формы реализованы с помощью react-hook-form
    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        getValues,
    } = useForm({
        mode: "onTouched"
    });

    console.log("errors: ", errors)
    console.log("emailSignUp value: ", getValues("emailSignUp"))

//ВХОД
//отправка данных на сервер
   async function onSubmitSignIn (dataSignIn, event) {
        event.preventDefault();
        fetch('https://dev.lectonic.ru/api/auth/login/', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(dataSignIn),
        })
            .then((response) => {
                console.log("RESPONSE: ", response);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                console.log("ERROR DATA: ", error.response.data)
            })
    }

//Checkbox не выходить из системы
    const [loggedIn, setLoggedIn] = useState(false);

    function handleLoggedIn(){
        setLoggedIn(!loggedIn)
    }



//РЕГИСТРАЦИЯ
//отправка данных на сервер
//ввод e-mail (временно так, пока не готово api с отправкой письма на почту)
    function onSubmitSignUpEmail(event) {
       event.preventDefault();
       window.sessionStorage.setItem("email", getValues("emailSignUp"));
        console.log("this session e-mail: ", window.sessionStorage.getItem("email"));
        navigate("/verify_email");
    }


   /* let userSignUp = {
        name: signUpValue.name,
        email: signUpValue.email,
        password: signUpValue.password
    };
    console.log("USER Sign Up: ", userSignUp);
    console.log("REQ MY: ", JSON.stringify(userSignUp));

    async function onSubmitSignUp(e) {
        e.preventDefault();
        await fetch('', {
            method: 'POST',
            body: JSON.stringify(userSignUp)
        })
            .then((response) => {
                console.log("RESPONSE: ", response);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                console.log("ERROR DATA: ", error.response.data)
            })
    }*/

//Checkbox согласие на обработку персональных данных
    const [agree, setAgree] = useState(false);

    function handleAgree(){
        setAgree(!agree)
    }

//переключение блоков Вход и Регистрация
    const [signInShown, setSignInShown] = useState(true);
    const [signUpShown, setSignUpShown] = useState(false);

    function handleSignIn() {
        setSignInShown(true);
        setSignUpShown(false);
    }

    function handleSignUp() {
        setSignInShown(false);
        setSignUpShown(true);
    }

//Показать / скрыть пароль на входе
    const [hiddenSignIn, setHiddenSignIn] = useState(true);

    function handleHiddenSignIn() {
       setHiddenSignIn(!hiddenSignIn)
    }


    return (
        <div className="auth">
            <div className="auth__header">
                <h2 onClick={handleSignIn}
                    style={{color: signInShown ? "var(--main-blue)" : "var(--add-darkGrey)"}}>Вход</h2>

                <h2 onClick={handleSignUp}
                    style={{color: signUpShown ? "var(--main-blue)" : "var(--add-darkGrey)"}}>Регистрация</h2>
            </div>

            {/* Блок Вход*/}
            <div style={{display: signInShown ? "block" : "none"}}>
                <div className="auth__text">Войдите в свой аккаунт</div>
                <form className="auth__form">
                    <div className="auth__form__input-wrapper">
                        <input className="form__input"
                               placeholder="E-mail"
                               style={{borderBottom: errors.email ? "1px solid var(--add-pink)" : ""}}
                               {...register("email", {
                                   required: true
                               })} />
                        {errors.email && <div className="form__input-error">Заполните поле</div>}
                    </div>

                    <div className="auth__form__input-wrapper">
                    <input type={ hiddenSignIn ? "password" : "text" }
                           className="form__input"
                           placeholder="Пароль"
                           style={{borderBottom: errors.password ? "1px solid var(--add-pink)" : ""}}
                           {...register("password", {
                               required: true
                           })} />
                    {errors.password && <div className="form__input-error">Заполните поле</div>}

                    <img
                        className="password-icon"
                        src={ hiddenSignIn ? eyeClose : eyeOpen}
                        alt="показать/скрыть"
                        onClick={handleHiddenSignIn} />
                    </div>

                    <div className="auth__form__password-forgotten">Забыли пароль?</div>

                    <div className="auth__form__checkbox-wrapper signIn">
                        <input className="auth__form__checkbox-switch"
                               id="checkbox"
                               type="checkbox"
                               checked={loggedIn}
                               onChange={handleLoggedIn}
                        />
                        <label htmlFor="checkbox">Не выходить из системы</label>
                    </div>

                    <button className="btn auth__form__btn"
                            type="submit"
                            disabled={errors.email || errors.password}
                            onClick={handleSubmit(onSubmitSignIn)}>Войти</button>
                </form>

                <div className="auth__socials">
                    <span>или</span>
                    <button className="auth__socials__btn-google"><img src={require("../img/google-icon.svg").default}/>Войти через Google</button>
                    <button className="auth__socials__btn-fb"><img src={require("../img/fb-icon.svg").default}/>Войти через Facebook</button>
                    <button className="auth__socials__btn-vk"><img src={require("../img/vk-icon.svg").default}/>Войти через VK</button>
                </div>

                <div className="auth__bottom-text">Ещё нет аккаунта? <h5 onClick={handleSignUp}>Зарегистрироваться</h5></div>
            </div>

            {/* Блок Регистрация*/}
            <div style={{display: signUpShown ? "block" : "none"}}>
                <div className="auth__text">Для регистрации введите Ваш e-mail</div>
                <form className="auth__form">
                    <div className="auth__form__input-wrapper">
                    <input className="form__input signUpEmail"
                           placeholder="E-mail"
                           style={{borderBottom: errors.emailSignUp ? "1px solid var(--add-pink)" : ""}}
                           {...register("emailSignUp", {
                               required: true,
                               pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                           })} />
                    {errors.emailSignUp?.type == "required" && <div className="form__input-error">Заполните поле</div>}
                    {errors.emailSignUp?.type == "pattern" && <div className="form__input-error">Некорректная почта</div>}
                    </div>

                    <div className="auth__form__checkbox-wrapper">
                        <input className="auth__form__checkbox-switch"
                               id="checkbox"
                               type="checkbox"
                               checked={agree}
                               onChange={handleAgree}
                        />
                        <label id="auth__form__checkbox-signUpLabel" htmlFor="checkbox">Я даю согласие на обработку персональных данных</label>
                    </div>
                    <button className="btn auth__form__btn signUp"
                                type="submit"
                                disabled={!agree || errors.emailSignUp}
                                onClick={onSubmitSignUpEmail}>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    )
};

export default Authorization;
