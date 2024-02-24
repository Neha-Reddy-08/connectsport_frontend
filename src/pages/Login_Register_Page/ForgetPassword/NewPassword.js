// NewPasswordComponent.js
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReusableForm from "../../../Components/common/reusableForm";

const NewPasswordComponent = ({ onChangePassword }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      onChangePassword(password);
    } else {
      alert("Passwords don't match.");
    }
  };

  return (
    <ReusableForm onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm New Password</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </Form.Group>
      <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="w-20">
            Change Password
          </Button>
        </div>
    </ReusableForm>
  );
};

export default NewPasswordComponent;
