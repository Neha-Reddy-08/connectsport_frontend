// NewPasswordComponent.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const NewPasswordComponent = ({ onChangePassword }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            onChangePassword(password);
        } else {
            alert("Passwords don't match.");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Button type="submit">Change Password</Button>
        </Form>
    );
};

export default NewPasswordComponent;