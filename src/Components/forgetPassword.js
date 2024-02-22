import React, { useState } from 'react';
import IdentityVerificationComponent from './IdentifyUser';
import SecurityQuestionsComponent from './SecurityQuestion';
import OtpVerificationComponent from './OtpVerification';
import NewPasswordComponent from './NewPassword';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState({ email: '', questions: [] }); // Add more details as required

  const handleIdentityVerified = (details) => {
    setUserDetails(details); // Details should include email and security questions
    setStep(2); // Move to security questions
  };

  const handleQuestionsAnswered = (answers) => {
    // Validate answers then:
    setStep(3); // Move to OTP verification
  };

  const handleOtpVerified = () => {
    setStep(4); // Move to new password
  };

  const handlePasswordChanged = () => {
    // Password has been successfully changed
    // Redirect to login page or show success message
  };

  return (
    <div>
      {step === 1 && <IdentityVerificationComponent onVerifyIdentity={handleIdentityVerified} />}
      {step === 2 && <SecurityQuestionsComponent questions={userDetails.questions} onVerifyAnswers={handleQuestionsAnswered} />}
      {step === 3 && <OtpVerificationComponent onVerifyOtp={handleOtpVerified} />}
      {step === 4 && <NewPasswordComponent onChangePassword={handlePasswordChanged} />}
    </div>
  );
};

export default ForgotPasswordPage;
