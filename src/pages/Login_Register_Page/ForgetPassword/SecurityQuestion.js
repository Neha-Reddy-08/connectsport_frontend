import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../../Styles/Login_Register_Page/forgetPassword.css";
import ReusableForm from "../../../Components/common/reusableForm";

const SecurityQuestionsComponent = ({ questions = [], onVerifyAnswers }) => {
  // Default questions to an empty array
  // Initialize answers based on questions, handle case where questions might be undefined
  const [answers, setAnswers] = useState(
    questions.reduce((acc, question) => {
      acc[question] = "";
      return acc;
    }, {})
  );

  const handleChange = (event, question) => {
    setAnswers({ ...answers, [question]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onVerifyAnswers(answers);
  };

  // Render only if questions are available
  return questions && questions.length > 0 ? (
    <ReusableForm onSubmit={handleSubmit}>
      <Form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <Form.Group key={index}>
            <Form.Label>{question}</Form.Label>
            <Form.Control
              type="text"
              value={answers[question]}
              onChange={(e) => handleChange(e, question)}
              required
            />
          </Form.Group>
        ))}
        <Button type="submit">Submit Answers</Button>
      </Form>
    </ReusableForm>
  ) : (
    <ReusableForm onSubmit={handleSubmit}>
    <div style={{ textAlign: "center", width: "100%" }}>
      No security questions found
    </div>
    </ReusableForm>
  );
};

export default SecurityQuestionsComponent;
