import React from "react";
import Header from "./Header";
import "../styles/UserProfile.css";
import avatarDefault from "../public/avatar-default.svg";
import photoIcon from "../public/photo-icon.svg";
import photoIconHover from "../public/photo-icon-hover.svg";
import roleIcon from "../public/role-icon.svg";
import Icons from "./Icons";
import AddRole from "./AddRole";
import addRoleIcon from "../public/addRole-icon.svg";
import addRoleIconHover from "../public/addRole-icon-hover.svg";
import additionalIcon from "../public/additional-icon.svg";
import additionalIconHover from "../public/additional-icon-hover.svg";

function UserProfile(){



    return(
       <div>
           <Header />
           <div className="profile">
               <div className="profile__up">
                   <div className="profile__up__avatar-wrapper">
                       <img className="profile__up__avatar"
                            src={avatarDefault}/>
                       <Icons className="profile__up__avatar-photoIcon"
                              srcNormal={photoIcon}
                              srcHovered={photoIconHover}/>
                   </div>
                   <div className="profile__up__name-wrapper">
                       <h1>Имя</h1>
                       <h1>Фамилия</h1>
                       <h1>Отчество</h1>
                   </div>
               </div>
               <div className="profile__middle">
                   <img src={roleIcon}
                        alt="иконка"/>
                   <p className="role-text">Слушатель</p>
                   <AddRole />
               </div>
               <div className="profile__bottom">
                   <Icons srcNormal={additionalIcon}
                          srcHovered={additionalIconHover}/>
                   <p className="additional-text">Дополнительная информация</p>
               </div>
           </div>
       </div>
    )
};

export default UserProfile;