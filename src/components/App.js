import React from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/style.css";
import Main from "./Main";
import VerifyEmail from "./VerifyEmail";
import ContinueRegistration from "./ContinueRegistration";
import PersonalDetailsForm from "./PersonalDetailsForm";
import NotFoundPage from "./NotFoundPage";
import Footer from "./Footer";
import UserProfile from "./UserProfile";
import Header from "./Header";
import ChangePassword from "./ChangePassword";
import ChooseRole from "./ChooseRole";


function App(){
 //   const isAuthentikated = !!token;

    return(
        <>
            <main>
                <Routes>
                    <Route path ="/" element={<Main />} />
                    <Route path ="/verify_email" element={<VerifyEmail />} />
                    <Route path ="/continue_registration" element={<ContinueRegistration />} />
                    <Route path ="/user_basic-info" element={<PersonalDetailsForm />} />
                    <Route path ="/user_choose-role" element={<ChooseRole />} />
                    <Route path ="/user_profile" element={<UserProfile />} />
                    <Route path ="/change_password" element={<ChangePassword />} />
                    <Route path ="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App;