import React from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/style.css";
import Main from "./Main";
import VerifyEmail from "./VerifyEmail";
import ContinueRegistration from "./ContinueRegistration";
import PersonalDetailsForm from "./PersonalDetailsForm/components/PersonalDetailsForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/verify_email" element={<VerifyEmail />} />
        <Route
          path="/continue_registration"
          element={<ContinueRegistration />}
        />
        <Route path="/personal_details" element={<PersonalDetailsForm />} />
      </Routes>
    </div>
  );
}

export default App;
