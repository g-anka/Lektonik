import React, { useState, useEffect } from "react";
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
        formState: { errors },
        handleSubmit,
        setValue,
        getValues,
    } = useForm({ mode: "onTouched" });

    console.log("errors: ", errors)
    console.log("пароль вход: ", getValues("password"))
    console.log("пароль 1: ", getValues("passwordSignUp1"))
    console.log("пароль 2: ", getValues("passwordSignUp2"))

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
    const [signInShown, setSignInShown] = useState(false);
    const [signUpShown, setSignUpShown] = useState(true);

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
                            disabled={errors.email || errors.password || getValues("email") === undefined || getValues("email") === "" || getValues("password") === ""}
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
                <div className="auth__text">Придумайте пароль</div>
                <form className="auth__form">
                    <div className="auth__form__input-wrapper">
                        <input className="form__input"
                               type={ hiddenSignUp1 ? "password" : "text" }
                               placeholder="Пароль"
                               style={{borderBottom: errors.passwordSignUp1 ? "1px solid var(--add-pink)" : ""}}
                               {...register("passwordSignUp1", {
                                   required: true,
                                   minLength: 8
                               })}/>
                        {errors.passwordSignUp1?.type == "required" && <div className="form__input-error">Заполните поле</div>}
                        {errors.passwordSignUp1?.type == "minLength" && <div className="form__input-error">Минимум 8 знаков</div>}
                        <img
                            className="password-icon password1"
                            src={ hiddenSignUp1 ? eyeClose : eyeOpen}
                            alt={ hiddenSignUp1 ? "показать" : "скрыть"}
                            onClick={handleHiddenSignUp1}
                        />
                    </div>

                    <div className="auth__form__input-wrapper">
                        <input className="form__input password2"
                               type={ hiddenSignUp2 ? "password" : "text" }
                               placeholder="Повторите пароль"
                               style={{borderBottom: errors.passwordSignUp2 ? "1px solid var(--add-pink)" : ""}}
                               {...register("passwordSignUp2", {
                                   required: true,
                                   minLength: 8
                               })} />
                               {errors.passwordSignUp2?.type == "required" && <div className="form__input-error">Заполните поле</div>}
                               {errors.passwordSignUp2?.type == "minLength" && <div className="form__input-error">Минимум 8 знаков</div>}
                               {getValues("passwordSignUp1") !== getValues("passwordSignUp2") && (getValues("passwordSignUp2") ) !== "" && <div className="form__input-error">Пароль не совпадает</div>}
                        <img
                            className="password-icon"
                            src={ hiddenSignUp2 ? eyeClose : eyeOpen}
                            alt={ hiddenSignUp2 ? "показать" : "скрыть"}
                            onClick={handleHiddenSignUp2}
                        />
                    </div>

                    <button className="btn auth__form__btn signUp"
                            type="submit"
                            disabled={errors.passwordSignUp1 || errors.passwordSignUp2 || getValues("passwordSignUp1") === undefined || getValues("passwordSignUp1") === "" || getValues("passwordSignUp2") === ""}>Продолжить</button>
                </form>
            </div>
        </div>
    )
};

export default Authorization;
