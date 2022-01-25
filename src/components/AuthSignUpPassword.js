import React, { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import "../styles/Authorization.css";
import "../styles/style.css";
import eyeOpen from "../img/eyeOpen.svg";
import eyeClose from "../img/eyeClose.svg";
import 'regenerator-runtime/runtime';

function AuthSignUpPassword() {

//!!!ниже будет повторение кода из Authorisation.js, пока так, лаконичное решение будет позже

//Для перехода
    const navigate = useNavigate();

//ВХОД
//изменение значений в инпутах
    const [signInValue, setSignInValue] = useState({
        email: "",
        password: ""
    });

    function onChangeSignIn(e) {
        setSignInValue ( {...signInValue, [e.target.name]: e.target.value})
        console.log("VALUE: ", signInValue)
    }

//отправка данных на сервер
    let userSignIn = {
        email: signInValue.email,
        password: signInValue.password
    };
    console.log("USER Sign In: ", userSignIn);

    async function onSubmitSignIn(e) {
        e.preventDefault();
        await fetch('https://dev.lectonic.ru/api/auth/login/', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(userSignIn),

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

    function onChangeLoggedIn(){
        setLoggedIn(!loggedIn)
    }



//РЕГИСТРАЦИЯ
//изменение значений в инпутах
    const [signUpValue, setSignUpValue] = useState({
        email: "",
        password: "",
        password2: ""
    });

    function onChangeSignUp(e) {
        setSignUpValue ( {...signUpValue, [e.target.name]: e.target.value})
        console.log("VALUE: ", signUpValue)
    }

//отправка email и пароля на сервер
    let userSignUp = {
        email: window.sessionStorage.getItem("email"),
        password: signInValue.password
    };
    console.log("USER Sign Up: ", userSignUp);

    async function onSubmitSignUp(e) {
        e.preventDefault();
        //пока не решена проблема с сервером
        navigate("/user_info-form");

       /*
       await fetch('https://dev.lectonic.ru/api/auth/signup/', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(userSignUp)
        })
            .then((response) => {
                console.log("RESPONSE: ", response);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                console.log("ERROR DATA: ", error.response.data)
            })*/
    }



//переключение блоков Вход и Регистрация
    const [signInShown, setSignInShown] = useState(false);
    const [signUpShown, setSignUpShown] = useState(true);

    function handleSignInShow() {
        setSignInShown(true);
        setSignUpShown(false);
    }

    function handleSignUpShow() {
        setSignInShown(false);
        setSignUpShown(true);
    }

//Показать / скрыть пароль на входе
    const [hiddenSignIn, setHiddenSignIn] = useState(true);

    function handleHiddenSignIn() {
        setHiddenSignIn(!hiddenSignIn)
    }

//Показать / скрыть пароль на регистрации
    const [hiddenSignUp1, setHiddenSignUp1] = useState(true);
    const [hiddenSignUp2, setHiddenSignUp2] = useState(true);

    function handleHiddenSignUp1() {
        setHiddenSignUp1(!hiddenSignUp1)
    }

    function handleHiddenSignUp2() {
        setHiddenSignUp2(!hiddenSignUp2)
    }


    return (
        <div className="auth">
            <div className="auth__header">
                <h2 onClick={handleSignInShow}
                    style={{color: signInShown ? "var(--main-blue)" : "var(--add-darkGrey)"}}>Вход</h2>

                <h2 onClick={handleSignUpShow}
                    style={{color: signUpShown ? "var(--main-blue)" : "var(--add-darkGrey)"}}>Регистрация</h2>
            </div>

            {/* Блок Вход*/}
            <div style={{display: signInShown ? "block" : "none"}}>
                <div className="auth__text">Войдите в свой аккаунт</div>
                <form className="auth__form">
                    <div className="auth__form__input-wrapper">
                        <input className="form__input"
                               name="email"
                               type="email"
                               placeholder="E-mail"
                               value={signInValue.email}
                               onChange={onChangeSignIn} />
                    </div>

                    <div className="auth__form__input-wrapper">
                        <input className="form__input"
                               name="password"
                               type={ hiddenSignIn ? "password" : "text" }
                               placeholder="Пароль"
                               value={signInValue.password}
                               onChange={onChangeSignIn}
                        />
                        <img
                            className="password-icon"
                            src={ hiddenSignIn ? eyeClose : eyeOpen}
                            alt={ hiddenSignIn ? "показать" : "скрыть"}
                            onClick={handleHiddenSignIn} />
                    </div>

                    <div className="auth__form__password-forgotten">Забыли пароль?</div>

                    <div className="auth__form__checkbox-wrapper signIn">
                        <input className="auth__form__checkbox-switch"
                               id="checkbox"
                               type="checkbox"
                               checked={loggedIn}
                               onChange={onChangeLoggedIn}
                        />
                        <label htmlFor="checkbox">Не выходить из системы</label>
                    </div>

                    <button className="btn auth__form__btn"
                            type="submit"
                            onClick={onSubmitSignIn}>Войти</button>
                </form>

                <div className="auth__socials">
                    <span>или</span>
                    <button className="auth__socials__btn-google"><img src={require("../img/google-icon.svg").default}/>Войти через Google</button>
                    <button className="auth__socials__btn-fb"><img src={require("../img/fb-icon.svg").default}/>Войти через Facebook</button>
                    <button className="auth__socials__btn-vk"><img src={require("../img/vk-icon.svg").default}/>Войти через VK</button>
                </div>

                <div className="auth__bottom-text">Ещё нет аккаунта? <h5 onClick={handleSignUpShow}>Зарегистрироваться</h5></div>

            </div>

            {/* Блок Регистрация Пароль*/}
            <div style={{display: signUpShown ? "block" : "none"}}>
                <div className="auth__text">Придумайте пароль</div>
                <form className="auth__form">
                    <div className="auth__form__input-wrapper">
                        <input className="form__input"
                               name="password"
                               type={ hiddenSignUp1 ? "password" : "text" }
                               placeholder="Пароль"
                               value={signUpValue.password}
                               onChange={onChangeSignUp}
                        />
                        <img
                            className="password-icon password1"
                            src={ hiddenSignUp1 ? eyeClose : eyeOpen}
                            alt={ hiddenSignUp1 ? "показать" : "скрыть"}
                            onClick={handleHiddenSignUp1} />
                    </div>

                    <div className="auth__form__input-wrapper">
                        <input className="form__input password2"
                               name="password2"
                               type={ hiddenSignUp2 ? "password" : "text" }
                               placeholder="Повторите пароль"
                               value={signUpValue.password2}
                               onChange={onChangeSignUp}
                               style={{borderBottom: ((signUpValue.password && signUpValue.password2) && (signUpValue.password !== signUpValue.password2)) ? "1px solid var(--add-pink)" : ""}}
                        />
                        <img
                            className="password-icon"
                            src={ hiddenSignUp2 ? eyeClose : eyeOpen}
                            alt={ hiddenSignUp2 ? "показать" : "скрыть"}
                            onClick={handleHiddenSignUp2} />
                    {(signUpValue.password && signUpValue.password2) && (signUpValue.password !== signUpValue.password2) && <div className="form__input-error">Пароли не совпадают</div>}
                    </div>

                    <button className="btn auth__form__btn signUp"
                                type="submit"
                                onClick={onSubmitSignUp}
                                disabled={(!signUpValue.password || !signUpValue.password2) || (signUpValue.password !== signUpValue.password2)}>Продолжить</button>
                    </form>
            </div>
        </div>
    )
};

export default AuthSignUpPassword;