// OtpVerificationComponent.js
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReusableForm from "../../../Components/common/reusableForm";

const OtpVerificationComponent = ({ onVerifyOtp }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onVerifyOtp(otp);
  };

  return (
    <ReusableForm onSubmit={handleSubmit}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter OTP</Form.Label>
          <Form.Control
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="w-20">
            Verify OTP
          </Button>
        </div>
      </Form>
    </ReusableForm>
  );
};

export default OtpVerificationComponent;
