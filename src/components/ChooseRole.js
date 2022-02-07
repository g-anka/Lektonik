import React, {useState} from "react";
import Header from "./Header";
import "../styles/ChooseRole.css";
import DropDownElement from "./DropdownElement";

//оказалось, что макет ещё не утвержден, поэтому пока в разработке


export default function ChooseRole() {

    const [lecturerOpen, setLecturerOpen] = useState(false) //раскрытие блока Лектора
    const [customerOpen, setCustomerOpen] = useState(false) //раскрытие блока Заказчика

    function openLecturer() {
        setLecturerOpen(true);
        setCustomerOpen(false);
    }

    function openCustomer() {
        setLecturerOpen(false);
        setCustomerOpen(true);
    }

    let topicSelect = {
        class: "topic-select",
        default: "Выберете тему лекции",
        options: ["Лидеры-доноры", "Клуб Эльбрус", "Экология", "Медицина"],
    };

    return(
        <>
            <Header src={require("../public/header_profile-selected.svg").default}/>
            <div className="choose-role">
                <h2>Выбор роли</h2>
                <p>Выберете вашу основную роль на сервисе: Лектор или Заказчик лекций. В дальнейшем на нашем сервисе один пользователь сможет добавлять себе несколько ролей и переключаться между ними.</p>
                <div className="choose-role__btn-wrapper">
                    <div>Кто вы?</div>
                    <span className="required-sign first">*</span>
                    <button className={`choose-role__btn ${lecturerOpen ? "open" : ""}`}
                            onClick={openLecturer}
                            >Лектор</button>
                    <button className={`choose-role__btn ${customerOpen ? "open" : ""}`}
                            onClick={openCustomer}>Заказчик</button>
                </div>

                {/*Блок Лектор*/}
                <div className="choose-role__lecturer"
                style={{display: lecturerOpen ? "block" : "none"}}>
                    <p>Тематика лекций:</p>
                    <div className="choose-role__lecturer__topics">
                        <button className="choose-role__btn example">Лидеры-доноры</button>
                        <button className="choose-role__btn example">Клуб Эльбрус</button>
                        <DropDownElement  selectDetails={topicSelect}
                                          className="topic-select"/>
                    </div>

                </div>
                <button className="btn finish-register">Завершить регистрацию</button>
            </div>
        </>
    )
};