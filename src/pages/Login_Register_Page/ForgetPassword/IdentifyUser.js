// IdentityVerificationComponent.js
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../../Styles/Login_Register_Page/forgetPassword.css";
import BackgroundImage from "../../../assets/images/background.jpg";
import Logo from "../../../assets/images/logo.png";
import ReusableForm from "../../../Components/common/reusableForm";

const IdentityVerificationComponent = ({ onVerifyIdentity }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onVerifyIdentity(email);
  };

  return (
    <div
      className="forget__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="forget__backdrop"></div>
      <ReusableForm onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email or Username</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="w-20">
            Register
          </Button>
        </div>
      </ReusableForm>
    </div>
  );
};

export default IdentityVerificationComponent;
