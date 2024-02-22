// IdentityVerificationComponent.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const IdentityVerificationComponent = ({ onVerifyIdentity }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onVerifyIdentity(email);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email or Username</Form.Label>
                <Form.Control
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    );
};

export default IdentityVerificationComponent;