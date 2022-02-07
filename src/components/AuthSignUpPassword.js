import React, { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import "../styles/Authorization.css";
import "../styles/style.css";
import eyeOpen from "../public/eyeOpen.svg";
import eyeClose from "../public/eyeClose.svg";
import 'regenerator-runtime/runtime';
import { baseURL } from "../ProjectConstants.js";

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
        await fetch(`${baseURL}/api/auth/login/`, {
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

//стейты для вывода ошибок с сервера при регистрации пароля
    const [errorSignUpPassword, setErrorSignUpPassword] = useState("");

//отправка email и пароля на сервер
    let userSignUp = {
        email: window.sessionStorage.getItem("email"),
        password: signUpValue.password
    };
    console.log("USER Sign Up JSON: ", JSON.stringify(userSignUp));

    async function onSubmitSignUp(e) {
        e.preventDefault();
        await fetch(`${baseURL}/api/auth/signup/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userSignUp)
        })
            .then((response) => {
                console.log("RESPONSE SIGNUP: ", response);
                return response.json();
            }).then((data) => {
                console.log("data: ", data);
                if ("password" in data) {
                    setErrorSignUpPassword(data.password[0])
                }
    })
            //пока не решен вопрос с критериями пароля

               /* if (response.status == 201) {
                    return fetch(`${baseURL}/api/auth/login/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(userSignUp)
                    }).then((response) => {
                        console.log("RESPONSE LOGIN: ", response);
                        return response.json();
                    }).then((data) => {
                        console.log("data: ", data);
                        localStorage.setItem("auth_token", data.auth_token);
                        navigate("/user_info-form");
                    })
                }
            })*/
            .catch((error) => {
                console.log("ERROR: ", error);
                console.log("ERROR DATA: ", error.response.data)
            })
    }



//переключение блоков Вход и Регистрация
    const [signInShown, setSignInShown] = useState(false);
    const [signUpShown, setSignUpShown] = useState(true);

    function handleSignInShow() {
        setSignInShown(true);
        setSignUpShown(false);
        setEmailForgottenShown(false);
    }

    function handleSignUpShow() {
        setSignInShown(false);
        setSignUpShown(true);
        setEmailForgottenShown(false);
    }

//Показать / скрыть пароль на входе
    const [hiddenSignIn, setHiddenSignIn] = useState(true);

    function handleHiddenSignIn() {
        setHiddenSignIn(!hiddenSignIn)
    }

//Показать / скрыть пароль на регистрации
   const [hiddenSignUp, setHiddenSignUp] = useState(true);

    function handleHiddenSignUp() {
        setHiddenSignUp(!hiddenSignUp)
    }


//Блок Забыл пароль, смена пароля
    const [emailForgottenShown, setEmailForgottenShown ] = useState(false);
    const [emailChangePassword, setEmailChangePassword] = useState("");

    function onEmailChangePassword(e) {
        setEmailChangePassword(e.target.value);
        console.log("xtr, ", emailChangePassword)
    }

    function handlePasswordForgotten() {
        setSignInShown(false);
        setEmailForgottenShown (true);
    }

    function onSubmitPasswordChange() {
        //пока нет api
        navigate("/change_password")
    }

    return (
        <div className="auth">
            <div className="auth__header">
                <h2 onClick={handleSignInShow}
                    style={{color: signInShown || emailForgottenShown ? "var(--main-blue)" : "var(--add-darkGrey)"}}>Вход</h2>

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

                    <div className="auth__form__password-forgotten"
                         onClick={handlePasswordForgotten}>Забыли пароль?</div>

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

                {/* пока вход через соц сети не используется
                <div className="auth__socials">
                    <span>или</span>
                    <button className="auth__socials__btn-google"><public src={require("../public/google-icon.svg").default}/>Войти через Google</button>
                    <button className="auth__socials__btn-fb"><public src={require("../public/fb-icon.svg").default}/>Войти через Facebook</button>
                    <button className="auth__socials__btn-vk"><public src={require("../public/vk-icon.svg").default}/>Войти через VK</button>
                </div> */}

                <div className="auth__bottom-text">Ещё нет аккаунта? <h5 onClick={handleSignUpShow}>Зарегистрироваться</h5></div>

            </div>

            {/* Блок Регистрация Пароль*/}
            <div style={{display: signUpShown ? "block" : "none"}}>
                <div className="auth__text">Придумайте пароль
                <p>Не менее 8 символов, латиница, минимум одна заглавная буква, минимум одна цифра</p></div>
                <form className="auth__form">
                    <div className="auth__form__input-wrapper">
                        <input className="form__input"
                               name="password"
                               type={ hiddenSignUp ? "password" : "text" }
                               placeholder="Пароль"
                               value={signUpValue.password}
                               onChange={onChangeSignUp}
                               style={{borderBottom: errorSignUpPassword ? "1px solid var(--add-pink)" : ""}}
                        />
                        <img
                            className="password-icon password1"
                            src={ hiddenSignUp ? eyeClose : eyeOpen}
                            alt={ hiddenSignUp ? "показать" : "скрыть"}
                            onClick={handleHiddenSignUp} />
                    </div>

                    <div className="auth__form__input-wrapper">
                        <input className="form__input password2"
                               name="password2"
                               type={ hiddenSignUp ? "password" : "text" }
                               placeholder="Повторите пароль"
                               value={signUpValue.password2}
                               onChange={onChangeSignUp}
                               style={{borderBottom: errorSignUpPassword || ((signUpValue.password && signUpValue.password2) && (signUpValue.password !== signUpValue.password2)) ? "1px solid var(--add-pink)" : ""}}
                        />
                        {errorSignUpPassword && <div className="form__input-error">{errorSignUpPassword}</div>}
                        <img
                            className="password-icon"
                            src={ hiddenSignUp ? eyeClose : eyeOpen}
                            alt={ hiddenSignUp ? "показать" : "скрыть"}
                            onClick={handleHiddenSignUp} />
                    {(signUpValue.password && signUpValue.password2) && (signUpValue.password !== signUpValue.password2) && <div className="form__input-error">Пароль не совпадает</div>}
                    </div>

                    <button className="btn auth__form__btn signUp"
                                type="submit"
                                onClick={onSubmitSignUp}
                        /*disabled={(!signUpValue.password || !signUpValue.password2) || (signUpValue.password !== signUpValue.password2)}*/>Продолжить</button>
                    </form>
            </div>

            {/* Блок Забыл пароль*/}
            <div className="auth__password-forgotten"
                 style={{display: emailForgottenShown ? "block" : "none"}}>
                <div className="auth__text">Смена пароля</div>
                <form className="auth__form">
                    <div className="auth__form__input-wrapper">
                        <input className="form__input"
                               name="email_password-forgotten"
                               type="email"
                               placeholder="E-mail"
                               value={emailChangePassword}
                               onChange={onEmailChangePassword} />
                        <div className="auth__password-forgotten__text">Ссылка на смену пароля будет выслана вам по e-mail</div>
                    </div>

                    <button className="btn"
                            type="submit"
                            onClick={onSubmitPasswordChange}>Продолжить</button>
                    <h5 className="auth__password-forgotten__text-bottom"
                        onClick={handleSignInShow}>Авторизоваться</h5>
                </form>
            </div>

        </div>
    )
};

export default AuthSignUpPassword;