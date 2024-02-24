import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from 'axios'; // Ensure axios is installed for HTTP requests
import ReusableForm from "../../../Components/common/reusableForm";

const NewPasswordComponent = ({ onChangePassword }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State for backend error messages
  const [isPasswordChanged, setIsPasswordChanged] = useState(false); // State to track if the password has been successfully changed

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match."); // Consider using a state-driven message instead of alert for consistency
      return;
    }
    
    try {
      const response = await axios.post('/api/change-password', { newPassword: password });
      if (response.data.success) {
        onChangePassword(password); // You can use this if you need to do something with the password
        setIsPasswordChanged(true); // Update state to indicate password change was successful
      } else {
        setError('Failed to change password. Please try again.');
      }
    } catch (err) {
      console.error('Error changing password:', err);
      setError(err.response?.data?.message || 'An error occurred while changing the password.');
    }
  };

  if (isPasswordChanged) {
    return (
      <div>
        <Alert variant="success">Password changed successfully. Please <a href="/login">log in</a> with your new password.</Alert>
      </div>
    );
  }

  return (
    <ReusableForm onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
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
        <Button variant="primary" type="submit">
          Change Password
        </Button>
      </div>
    </ReusableForm>
  );
};

export default NewPasswordComponent;
