import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Row, Col} from "react-bootstrap";
import axios from 'axios'; // Ensure axios is installed for HTTP requests
import ReusableForm from "../../../Components/common/reusableForm";

const OtpVerificationComponent = ({ onVerifyOtp }) => {
  const [otp, setOtp] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [timer, setTimer] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let countdown = null;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown); // Stop the countdown when it reaches zero
    }

    return () => clearInterval(countdown); // Clean up the interval on component unmount
  }, [timer]);

  const handleServiceChange = (event) => {
    const newService = event.target.value;
    setSelectedService(newService);
    setTimer(30); // Start the countdown when a new service is selected
    sendOtp(newService);
  };

  const sendOtp = (service) => {
    // Reset error messages and resend OTP
    setError(""); 
    axios.post('/api/send-otp', { service })
      .then(() => {
        // OTP sent successfully, timer is already running
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        setError('Failed to send OTP, please try again.');
        // Keep the timer running even if there's an error
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/verify-otp', { otp })
      .then((response) => {
        if (response.data.success) {
          onVerifyOtp(true); // Handle successful verification
        } else {
          setError('Incorrect OTP. Please try again.'); // Set error for incorrect OTP
        }
      })
      .catch((error) => {
        console.error('Error verifying OTP:', error);
        setError('Error during OTP verification. Please try again.'); // Set error for verification failure
      });
  };

  const handleResendClick = () => {
    if (!selectedService) {
      setError("Please select a service before resending OTP."); // Check if a service is selected
      return;
    }
    sendOtp(selectedService); // Resend OTP for the selected service
    setTimer(30); // Restart the countdown
  };

  return (
    <ReusableForm onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <fieldset>
            <Col xs={12}>
              <Form.Label><strong>Select OTP Service:</strong></Form.Label>
            </Col>
          <Form.Group as={Row} className="mb-3 justify-content-center">
            <Col xs={12}>
              <Form.Check type="radio" label="Email" name="otpService" value="Email" checked={selectedService === "Email"} onChange={handleServiceChange} />
              <Form.Check type="radio" label="Text Message" name="otpService" value="Text Message" checked={selectedService === "Text Message"} onChange={handleServiceChange} />
              <Form.Check type="radio" label="Duo" name="otpService" value="Duo" checked={selectedService === "Duo"} onChange={handleServiceChange} />
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Col xs={12} md={8} lg={8}>
            <Form.Control type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          </Col>
        </Form.Group>
        <Row className="justify-content-center mb-2">
          <Col xs="auto">
            <Button variant="primary" type="submit">
              Verify OTP
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button variant="secondary" size="sm" onClick={handleResendClick} disabled={timer > 0}>
              Resend OTP {timer > 0 ? `(${timer}s)` : ""}
            </Button>
          </Col>
        </Row>
      </Form>
    </ReusableForm>
  );
};


export default OtpVerificationComponent;
