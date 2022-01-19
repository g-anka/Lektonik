import React, { useState } from "react";
import DropDownElement from "./DropdownElement";
import Header from "./HeaderUserDetails";
import "./personaldetailsform.css";
import placeIcon from "../assets/icon_place.svg";
export default function PersonalDetailsForm() {
  let defaultUserDetails = {
    userSurname: "",
    userFirstName: "",
    userMiddleName: "",
    userCity: "",
    dayOfBirth: "",
    monthOfBirth: "",
    yearOfBirth: "",
    userSelfDescription: "",
  };

  let [userDetails, setUserDetails] = useState({ ...defaultUserDetails });

  function handleInputChange(event, input) {
    setUserDetails((prev) => {
      return {
        ...prev,
        [input]: event.target.value,
      };
    });
  }

  function handleAddEvent(e) {
    e.preventDefault();
    if (
      userDetails.userFirstName &&
      userDetails.userMiddleName &&
      userDetails.userSurname
    ) {
      console.log(userDetails);
      setUserDetails({ ...defaultUserDetails });
    }
  }

  let citySelect = {
    class: "city-select",
    default: "Ваш город",
    options: ["Москва", "Санкт-Петербург", "Воронеж"],
  };

  return (
    <>
      <Header></Header>

      <div className="user-details-wrapper">
        <h2 className="submain-title">Информация базового профиля</h2>
        <p className="general-text">Заполните информацию профиля.</p>
        <p className="general-text">
          Это даст Вам возможность пользоваться сервисом
        </p>
        <form className="user-details-form" onSubmit={(e) => handleAddEvent(e)}>
          <div className="input-container">
            <input
              className={
                userDetails.userSurname ? "input input-active" : "input"
              }
              value={userDetails.userSurname}
              type="text"
              placeholder="Фамилия"
              onChange={(e) => handleInputChange(e, "userSurname")}
            ></input>
            <p className="special-sign">*</p>
          </div>
          <div className="input-container">
            <input
              value={userDetails.userFirstName}
              className={
                userDetails.userFirstName ? "input input-active" : "input"
              }
              type="text"
              placeholder="Имя"
              onChange={(e) => handleInputChange(e, "userFirstName")}
            ></input>
            <p className="special-sign">*</p>
          </div>
          <div className="input-container">
            <input
              value={userDetails.userMiddleName}
              className={
                userDetails.userMiddleName ? "input input-active" : "input"
              }
              type="text"
              placeholder="Отчество"
              onChange={(e) => handleInputChange(e, "userMiddleName")}
            ></input>
            <p className="special-sign">*</p>
          </div>
          <div className="input-container">
            <div className="small-container place">
              <img
                className="icon-small"
                alt="search-icon"
                src={placeIcon}
              ></img>
            </div>
            <DropDownElement
              selectDetails={citySelect}
              className="select-city"
            ></DropDownElement>
            <p className="special-sign">*</p>
          </div>
          {/* <div className="input-container">
            <div className="small-container"></div>
            <DropDownElement selectDetails={citySelect}></DropDownElement>
            <DropDownElement selectDetails={citySelect}></DropDownElement>
            <DropDownElement selectDetails={citySelect}></DropDownElement>
            <p className="special-sign">*</p>
          </div> */}
          <textarea
            value={userDetails.userSelfDescription}
            placeholder="Напишите о себе"
            onChange={(e) => handleInputChange(e, "userSelfDescription")}
          ></textarea>
          <button className="btn btn-main" onClick={(e) => handleAddEvent(e)}>
            <div>Завершить регистрацию</div>
          </button>
        </form>
      </div>
    </>
  );
}
