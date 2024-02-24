// IdentityVerificationComponent.js
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../../Styles/Login_Register_Page/forgetPassword.css";
import BackgroundImage from "../../../assets/images/background.jpg";
import ReusableForm from "../../../Components/common/reusableForm";
import axios from 'axios'; 

const IdentityVerificationComponent = ({ onVerifyIdentity }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call your API to send an email
      await axios.post('YOUR_API_ENDPOINT', { email }); // Replace 'YOUR_API_ENDPOINT' with your actual endpoint
      onVerifyIdentity(email);
      // Here you can set state to show success feedback
    } catch (error) {
      console.error('Failed to send email:', error);
      // Here you can set state to show error feedback
    }
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
            Verify
          </Button>
        </div>
      </ReusableForm>
    </div>
  );
};

export default IdentityVerificationComponent;
