import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/NotFoundPage.css";

export default function NotFoundPage() {
    return (
        <>
            <Header />
            <div className="not-found__text">
                <h2>Ошибка</h2>
                <p>Что-то пошло не так! Страница, которую Вы запрашиваете, не существует.<br/>Возможно, она была удалена или был введён неверный адрес в адресной строке.</p>
            </div>
            <div className="not-found__lectonic">
                <div className="not-found__lectonic__head">
                    <div className="not-found__lectonic__head-face"></div>
                </div>
                <div className="not-found__lectonic__eye-left"></div>
                <div className="not-found__lectonic__eye-right"></div>
                <div className="not-found__lectonic__body"></div>
                <div className="not-found__lectonic__number">404</div>
            </div>
        </>

    )
};