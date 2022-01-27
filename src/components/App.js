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


function App(){
 //   const isAuthentikated = !!token;

    return(
        <div className="App">
            <main className="main">

            <Routes>
                <Route path ="/" element={<Main />} />
                <Route path ="/verify_email" element={<VerifyEmail />} />
                <Route path ="/continue_registration" element={<ContinueRegistration />} />
                <Route path ="/user_info-form" element={<PersonalDetailsForm />} />
                <Route path ="/user_profile" element={<UserProfile />} />
                <Route path ="*" element={<NotFoundPage />} />
            </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App;