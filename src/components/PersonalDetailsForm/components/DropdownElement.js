import React, { useState } from "react";
import "./dropdownelement.css";
import arrow from "../assets/Vector.svg";

export default function DropDownElement(props) {
  // let { selectDetails, setSelectDetails } = useState(props.selectDetails);
  let { selectDetails } = props;
  let [options, setOptions] = useState([...selectDetails.options]);
  let [selectIsOpen, setSelectIsOpen] = useState(false);
  let [choosenValue, setChoosenValue] = useState("");

  function handleOpenSelect() {
    let value = selectIsOpen;
    setSelectIsOpen(!value);
  }

  function handleChooseItem(value) {
    setChoosenValue(value);
    handleOpenSelect();
  }

  function handleInputChange(e) {
    setChoosenValue(e.target.value);
    if (choosenValue) {
      let res = options.filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(res);
      setOptions(res);
    }
  }

  return (
    <div className="select-section">
      {/* <p className="input-name">{selectDetails.title}</p> */}
      <div className="select">
        <div className="select-top" onClick={() => handleOpenSelect()}>
          {/* <p className={choosenValue ? "select-choosen" : "select-default"}>
            {choosenValue ? choosenValue : selectDetails.default}
          </p> */}
          <input
            className={choosenValue ? "select-choosen" : "select-default"}
            value={choosenValue}
            onChange={(e) => handleInputChange(e)}
          ></input>
          <img
            className={selectIsOpen ? "img-open" : "img-close"}
            src={arrow}
            alt="select-icon"
          ></img>
        </div>
        {selectIsOpen && (
          <div className="sub-select">
            {choosenValue
              ? options.map((item) => {
                  return (
                    <div
                      key={item}
                      className="select-item"
                      onClick={() => handleChooseItem(item)}
                    >
                      {item}
                    </div>
                  );
                })
              : selectDetails.options.map((item) => {
                  return (
                    <div
                      key={item}
                      className="select-item"
                      onClick={() => handleChooseItem(item)}
                    >
                      {item}
                    </div>
                  );
                })}
          </div>
        )}
      </div>
    </div>
  );
}
