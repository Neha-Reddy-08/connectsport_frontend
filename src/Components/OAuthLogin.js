import React from 'react';

function OAuthLogin({ onOAuthLogin }) {
  const handleOAuthLogin = (provider) => {
    onOAuthLogin(provider);
  };

  return (
    <div>
      <button onClick={() => handleOAuthLogin('google')}>Login with Google</button>
      <button onClick={() => handleOAuthLogin('facebook')}>Login with Facebook</button>
      {/* Add more providers as needed */}
    </div>
  );
}

export default OAuthLogin;
