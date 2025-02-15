import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [userEmail, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // You can get the email from localStorage if it's stored there
    const email = localStorage.getItem("email");
    setUserEmail(email); // Set the email to state
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    // Send the request to backend for password reset
    fetch(`${process.env.REACT_APP_API_BASE_URL}/postData/reset-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        email: userEmail,
        newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          let countdown = 5;
      
          // Show initial message
          setSuccess(`password reset successfully \n Redirecting to homepage in ${countdown} seconds...`);
          setError('');
      
          // Update message every second
          const interval = setInterval(() => {
            countdown -= 1;
            setSuccess(`password reset successfully \n Redirecting to homepage in ${countdown} seconds...`);
      
            if (countdown <= 0) {
              clearInterval(interval); // Stop the countdown
              window.location.href = process.env.REACT_APP_FRONTEND_BASE_URL; // Redirect to homepage
            }
          }, 1000);
        } else {
          setError(data.message || 'Error resetting password');
        }
      })
      
      .catch((error) => {
        setError("An error occurred. Please try again later.");
      });
  };

  return (
    <Wrapper>
      <div className="reset-password-container">
        <div className="reset-password-box">
          <h2>Reset Password</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <p style={{ whiteSpace: 'pre-line' ,color:' green'}}>{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={userEmail} readOnly />
            </div>

            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

export default ResetPassword;

const Wrapper = styled.div`
  .reset-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f7fa;
  }

  .reset-password-box {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }

  .reset-password-box h2 {
    margin-bottom: 20px;
    color: #333;
  }

  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }

  .form-group label {
    display: block;
    font-size: 14px;
    color: #333;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }

  .form-group input:focus {
    border-color: #007bff;
  }

  .submit-btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  .submit-btn:hover {
    background-color: #0056b3;
  }

  .error-message {
    color: red;
    margin-bottom: 15px;
  }
`;
