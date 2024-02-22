// OtpVerificationComponent.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const OtpVerificationComponent = ({ onVerifyOtp }) => {
    const [otp, setOtp] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onVerifyOtp(otp);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    required
                />
            </Form.Group>
            <Button type="submit">Verify OTP</Button>
        </Form>
    );
};

export default OtpVerificationComponent;