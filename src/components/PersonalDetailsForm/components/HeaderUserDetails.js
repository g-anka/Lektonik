import React from "react";
import logoMain from "../assets/logo-main.svg";
import searchIcon from "../assets/icon_search.svg";
import personIcon from "../assets/icon_lk.svg";

import "./header.css";
export default function HeaderMain() {
  return (
    <>
      <header className="header-user-details">
        <div className="container">
          <div className="header-left">
            <div>
              <img className="logo-main" alt="logo-main" src={logoMain}></img>
            </div>
          </div>
          <div className="header-right">
            <div className="small-container btn-search">
              <div className="icon-container">
                <img
                  className="icon-small"
                  alt="search-icon"
                  src={searchIcon}
                ></img>
              </div>
            </div>
            <div className="small-container  btn-user-details">
              <div className="icon-container">
                <img
                  className="icon-small"
                  alt="search-icon"
                  src={personIcon}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
