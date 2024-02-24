import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import "../../Styles/Login_Register_Page/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/common/footer";
import ReusableForm from "../../Components/common/reusableForm.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import app from "../../services/firebase";
import BackgroundImage from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo.png";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const GoogleSignIn = async (event) => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const signInWithFacebook = async (event) => {
    const provider = new FacebookAuthProvider();

    const auth = getAuth(app);

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const user = result.user;
        // Access token if needed: const token = FacebookAuthProvider.credentialFromResult(result).accessToken;
        // Perform actions with the user's info here
        console.log("Facebook sign in success", user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.error("Error during Facebook sign in", errorCode, errorMessage);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Replace 'http://localhost:3000/login' with your actual login endpoint
    const loginUrl = `${process.env.REACT_APP_API_URL}/login`;

    const loginData = {
      userId: inputUsername,
      password: inputPassword,
    };

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store JWT token
        navigate(`/home/${data.userId}`);
      } else {
        setShow(true); // Show error alert
      }
    } catch (error) {
      setShow(true); // Show error alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="sign-in__backdrop"></div>

      <ReusableForm onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center">Sign In</div>

        <Button
          variant="outline-primary"
          className="mb-2 w-100 google-sign-in"
          onClick={GoogleSignIn}
        >
          <FontAwesomeIcon icon={faGoogle} className="social-icon" />
          Sign in with Google
        </Button>

        <Button
          variant="outline-primary"
          className="mb-2 w-100 facebook-sign-in"
          onClick={signInWithFacebook}
        >
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
          Sign in with Facebook
        </Button>

        {/* Divider with 'or' Text */}
        <div className="divider-or">
          <div className="divider-line"></div>
          <span>or</span>
          <div className="divider-line"></div>
        </div>

        {show && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        )}

        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Username"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}

        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={() => navigate("/forgot-password")} // Update this line
          >
            Forgot password?
          </Button>
        </div>
        {/* Registration Prompt */}
        <div className="text-center registration-prompt">
          Not a member? <Link to="/register">Register</Link>
        </div>
      </ReusableForm>
      <Footer />
    </div>
  );
};

export default Login;
