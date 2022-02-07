import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";


function Header(props){

    return(
      <header className="header">
          <Link to="/">
              <img className="header-logo" src={require("../public/header_logo.svg").default} alt="логотип" />
          </Link>

          <nav className="header__nav">
              <img className="header__nav-search"
                   src={require("../public/icon-search.svg").default}
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