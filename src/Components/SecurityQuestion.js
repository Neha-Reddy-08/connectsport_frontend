import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SecurityQuestionsComponent = ({ questions = [], onVerifyAnswers }) => { // Default questions to an empty array
    // Initialize answers based on questions, handle case where questions might be undefined
    const [answers, setAnswers] = useState(questions.reduce((acc, question) => {
        acc[question] = '';
        return acc;
    }, {}));

    const handleChange = (event, question) => {
        setAnswers({ ...answers, [question]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onVerifyAnswers(answers);
    };

    // Render only if questions are available
    return questions && questions.length > 0 ? (
        <Form onSubmit={handleSubmit}>
            {questions.map((question, index) => (
                <Form.Group key={index}>
                    <Form.Label>{question}</Form.Label>
                    <Form.Control
                        type="text"
                        value={answers[question]}
                        onChange={e => handleChange(e, question)}
                        required
                    />
                </Form.Group>
            ))}
            <Button type="submit">Submit Answers</Button>
        </Form>
    ) : <div>No security questions found</div>; // Or any other fallback UI
};


export default SecurityQuestionsComponent;