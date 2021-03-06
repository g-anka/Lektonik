import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/Authorization.css";
import "../styles/style.css";
import eyeOpen from "../img/eyeOpen.svg";
import eyeClose from "../img/eyeClose.svg";
import 'regenerator-runtime/runtime';

function Authorization() {

    const navigate = useNavigate(); //Для перехода

    //вывод текста ошибки под инпутами
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");

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
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userSignIn),
        })
            .then((response) => {
                console.log("RESPONSE SignIn: ", response);
                setErrorMessageEmail(""); //очищаем стейты, чтоб при новом запросе они исчезли
                setErrorMessagePassword("");
                return response.json();
            }).then((data) => {
               console.log("data: ", data);
               //ниже идет проверка наличия ключа в объекте дата.
                // Они именуются по-разному и в каждом описана своя ошибка. Надо подумать как еще это решить.
               if ("email" in data) {
                   setErrorMessageEmail(data.email[0]);
               } if ("non_field_errors" in data) {
                   if (data.non_field_errors[0] == "Неверный пароль") {
                       setErrorMessagePassword(data.non_field_errors[0]);
                   } else {
                       setErrorMessageEmail(data.non_field_errors[0]);
                   }
                } if ("detail" in data) {
                    setErrorMessageEmail(data.detail);
                } if ("auth_token" in data) {
                    localStorage.setItem("auth_token", data.auth_token);
                    navigate("/user_profile");
                }
            })
            .catch((error) => {
                console.log("ERROR SignIn: ", error);
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
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    function onChangeSignUp(e) {
        setSignUpValue ( {...signUpValue, [e.target.name]: e.target.value})
        console.log("VALUE: ", signUpValue)
    }

//отправка данных на сервер
//ввод e-mail (временно так, пока не готово api с отправкой письма на почту)
    function onSubmitSignUpEmail(e) {
        e.preventDefault();
        window.sessionStorage.setItem("email", signUpValue.email);
        console.log("this session e-mail: ", window.sessionStorage.getItem("email"));
        navigate("/verify_email");
    }

//Checkbox согласие на обработку персональных данных
    const [agree, setAgree] = useState(false);

    function handleAgree(){
        setAgree(!agree)
    }

//переключение блоков Вход и Регистрация
    const [signInShown, setSignInShown] = useState(true);
    const [signUpShown, setSignUpShown] = useState(false);

    function handleSignInShow() {
        setSignInShown(true);
        setSignUpShown(false);
    }

    function handleSignUpShow() {
        setSignInShown(false);
        setSignUpShown(true);
    }

//Показать / скрыть пароль
    const [hiddenSignIn, setHiddenSignIn] = useState(true);

    function handleHiddenSignIn() {
        setHiddenSignIn(!hiddenSignIn)
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
                           onChange={onChangeSignIn}
                           style={{borderBottom: errorMessageEmail ? "1px solid var(--add-pink)" : ""}}/>
                    {errorMessageEmail && <div className="form__input-error">{errorMessageEmail}</div>}
                    </div>

                    <div className="auth__form__input-wrapper">
                    <input className="form__input"
                           name="password"
                           type={ hiddenSignIn ? "password" : "text" }
                           placeholder="Пароль"
                           value={signInValue.password}
                           onChange={onChangeSignIn}
                           style={{borderBottom: errorMessagePassword ? "1px solid var(--add-pink)" : ""}}/>
                    {errorMessagePassword && <div className="form__input-error">{errorMessagePassword}</div>}
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

            {/* Блок Регистрация Почта*/}
            <div style={{display: signUpShown ? "block" : "none"}}>
                <div className="auth__text">Для регистрации введите Ваш e-mail</div>
                <form className="auth__form">
                    <div className="auth__form__input-wrapper">
                    <input className="form__input signUpEmail"
                           name="email"
                           type="email"
                           placeholder="E-mail"
                           value={signUpValue.email}
                           onChange={onChangeSignUp} />
                    </div>

                    <div className="auth__form__checkbox-wrapper">
                        <input className="auth__form__checkbox-switch"
                               id="checkbox"
                               type="checkbox"
                               checked={agree}
                               onChange={handleAgree} />
                        <label id="auth__form__checkbox-signUpLabel" htmlFor="checkbox">Я даю согласие на обработку персональных данных</label>
                    </div>

                    <button className="btn auth__form__btn signUp"
                                type="submit"
                                disabled={!agree}
                                onClick={onSubmitSignUpEmail}>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    )
};

export default Authorization;
