import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios"; // Make sure axios is installed
import ReusableForm from "../../../Components/common/reusableForm"; // Make sure this path is correct

const SecurityQuestionsComponent = ({ userId, onVerificationSuccess }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/security-questions/${userId}`);
        setQuestions(response.data);
        // Initialize answers
        setAnswers(
          response.data.reduce((acc, question) => {
            acc[question] = "";
            return acc;
          }, {})
        );
      } catch (err) {
        console.error("Error fetching security questions:", err);
        setError("Failed to load security questions.");
      }
    };
    fetchQuestions();
  }, [userId]);

  const handleChange = (event, question) => {
    setAnswers({ ...answers, [question]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/verify-answers", {
        userId,
        answers,
      });
      if (response.data.success) {
        onVerificationSuccess(); // Callback or redirect logic
      } else {
        setError("Incorrect answers. Please try again.");
      }
    } catch (err) {
      console.error("Error verifying answers:", err);
      setError("Error during verification. Please try again.");
    }
  };

  return (
    <div>
      <ReusableForm onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        {questions.length > 0 ? (
          <>
            {questions.map((question, index) => (
              <Form.Group key={index} className="mb-3">
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
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            No security questions found.
          </div>
        )}
      </ReusableForm>
    </div>
  );
};
export default SecurityQuestionsComponent;
