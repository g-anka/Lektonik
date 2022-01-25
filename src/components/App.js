import React from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/style.css";
import Main from "./Main";
import VerifyEmail from "./VerifyEmail";
import ContinueRegistration from "./ContinueRegistration";
import PersonalDetailsForm from "./PersonalDetailsForm";
import NotFoundPage from "./NotFoundPage";
import Footer from "./Footer";


function App(){
 //   const isAuthentikated = !!token;

    return(
        <div className="App">
            <Routes>
                <Route path ="/" element={<Main />} />
                <Route path ="/verify_email" element={<VerifyEmail />} />
                <Route path ="/continue_registration" element={<ContinueRegistration />} />
                <Route path ="/user_info-form" element={<PersonalDetailsForm />} />
                <Route path ="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App;