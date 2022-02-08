import React, {useState} from "react";
import "../styles/PhotoIcon.css";
import photoIcon from "../public/photo-icon.svg";
import photoIconHover from "../public/photo-icon-hover.svg";

export default function Icons(props) {


    return(
        <div className={`icon-wrapper ${props.className}`}
             onClick={props.onClick}>
            <img className="icon-normal"
                 src={props.srcNormal}
                 alt="фото"/>
            <img className="icon-hovered"
                 src={props.srcHovered}
                 alt="фото"/>
        </div>
    )
}