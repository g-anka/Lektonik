import React from "react";
import "../styles/Header.css";


function Header(props){

    return(
      <header className="header">
          <img className="header-logo" src={require("../img/header_logo.svg").default} alt="логотип" />

          <nav className="header__nav">
              <img className="header__nav-search"
                   src={require("../img/icon-search.svg").default}
                   alt="поиск" />

              <img className="header__nav-profile"
                   src={props.src}
                   alt="ваш профиль"
                   onClick={props.onOpenAuth} />
          </nav>
      </header>
    )
};

export default Header;