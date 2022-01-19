import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/Authorization.css";
import "../styles/style.css";
import eyeOpen from "../img/eyeOpen.svg";
import eyeClose from "../img/eyeClose.svg";
import 'regenerator-runtime/runtime';

function AuthStep2() {


    //!!!ниже будет повторение кода из Authorisation.js, пока так, лаконичное решение будет позже

    const navigate = useNavigate(); //Для перехода

    //переключение блоков Вход и Регистрация
    const [signInShown, setSignInShown] = useState(false);
    const [signUpShown, setSignUpShown] = useState(true);

    function signInHandler() {
        setSignInShown(true);
        setSignUpShown(false);
    }

    function signUpHandler() {
        setSignInShown(false);
        setSignUpShown(true);
    }

    //Показать / скрыть пароль
    const [hidden, setHidden] = useState(true);

    function handleHidden(e) {
        e.target = setHidden(!hidden)
    }

    //ВХОД
    //изменение значений в инпутах
    const [signInValue, setSignInValue] = useState({
        email: "",
        password: ""
    });

    function handleSignInChange(e) {
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

    function handleLoggedIn(){
        setLoggedIn(!loggedIn)
    }

    //РЕГИСТРАЦИЯ
    //изменение значений в инпутах
    const [signUpValue, setSignUpValue] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    function handleSignUpChange(e) {
        setSignUpValue ( {...signUpValue, [e.target.name]: e.target.value})
        console.log("VALUE: ", signUpValue)
    }

    //отправка пароля на сервер
    //в процессе




    return (
        <div className="auth">
            <div className="auth__header">
                <p className="auth__header-signIn"
                   onClick={signInHandler}
                   style={{color: signInShown ? "#0025FF" : "#B4B4B4"}}>Вход</p>

                <p className="auth__header-signUp"
                   onClick={signUpHandler}
                   style={{color: signUpShown ? "#0025FF" : "#B4B4B4"}}>Регистрация</p>
            </div>

            {/* Блок Вход*/}
            <div style={{display: signInShown ? "block" : "none"}}>
                <div className="auth__text">Войдите в свой аккаунт</div>
                <form className="auth__form">
                    <input name="email"
                           type="email"
                           className="auth__form__input"
                           placeholder="E-mail"
                           value={signInValue.email}
                           onChange={handleSignInChange}
                    />
                    <div className="auth__form__input-wrapper">
                        <input name="password"
                               type={ hidden ? "password" : "text" }
                               className="auth__form__input"
                               placeholder="Пароль"
                               value={signInValue.password}
                               onChange={handleSignInChange}
                        />
                        <img
                            className="password-icon"
                            src={ hidden ? eyeClose : eyeOpen}
                            alt="показать/скрыть"
                            onClick={handleHidden}
                        />
                    </div>
                    <div className="auth__form__password-forgotten">Забыли пароль?</div>

                    <div className="auth__form__checkbox signIn">
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
                            onClick={onSubmitSignIn}>Войти</button>
                </form>

                <div className="auth__socials">
                    <span>или</span>
                    <button className="btn auth__socials__btn-google"><img src={require("../img/google-icon.svg").default}/>Войти через Google</button>
                    <button className="btn auth__socials__btn-fb"><img src={require("../img/fb-icon.svg").default}/>Войти через Facebook</button>
                    <button className="btn auth__socials__btn-vk"><img src={require("../img/vk-icon.svg").default}/>Войти через VK</button>
                    <p>Ещё нет аккаунта? <span onClick={signUpHandler}>Зарегистрироваться</span></p>
                </div>
            </div>

            {/* Блок Регистрация*/}
            <div style={{display: signUpShown ? "block" : "none"}}>
                <div className="auth__text">Придумайте пароль</div>
                <form className="auth__form">
                    <div className="auth__form__input-wrapper">
                        <input name="password"
                               type={ hidden ? "password" : "text" }
                               className="auth__form__input"
                               placeholder="Пароль"
                               value={signUpValue.password}
                               onChange={handleSignUpChange}
                        />
                        <img
                            className="password-icon"
                            src={ hidden ? eyeClose : eyeOpen}
                            alt="показать/скрыть"
                            onClick={handleHidden}
                        />
                    </div>

                    <div className="auth__form__input-wrapper">
                        <input name="password2"
                               type={ hidden ? "password" : "text" }
                               className="auth__form__input password2"
                               placeholder="Повторите пароль"
                               value={signUpValue.password2}
                               onChange={handleSignUpChange}
                               style={{borderBottom: ((signUpValue.password && signUpValue.password2) && (signUpValue.password !== signUpValue.password2)) ? "1px solid #FF00C1" : "1px solid #000000"}}
                        />
                        <img
                            className="password-icon"
                            src={ hidden ? eyeClose : eyeOpen}
                            alt="показать/скрыть"
                            onClick={handleHidden}
                        />
                    </div>
                    {(signUpValue.password && signUpValue.password2) && (signUpValue.password !== signUpValue.password2) && <div className="auth__form__input-error">Пароли не совпадают</div>}
                    <button className="btn auth__form__btn signUp"
                                type="submit"
                                disabled={(!signUpValue.password || !signUpValue.password2) || (signUpValue.password !== signUpValue.password2)}>Продолжить</button>
                </form>
            </div>
        </div>
    )
};

export default AuthStep2;