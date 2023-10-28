import React from "react";
import "./register.css";

const Register = () => {
  return (
    <div className="wrapper">
      <div className="left"></div>

      <div className="right">
        <div className="form">
          <form id="create-account-form">
            <div className="header">
              <h1>Create an Account</h1>
            </div>
            <div className="first-name">
              <label htmlFor="firstName">First Name:</label>
              <input
                className="css-1lo2pik"
                type="text"
                id="first-name-section"
                aria-required="true"
                required
                maxLength="31"
              />
            </div>
            <div className="last-name">
              <label htmlFor="lastName">Last Name:</label>
              <input
                className="css-1lo2pik"
                type="text"
                id="last-name-section"
                aria-required="true"
                required
                maxLength="31"
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email:</label>
              <input
                className="css-1lo2pik"
                type="email" // Use type="email" for email input
                id="email-section"
                aria-required="true"
                required
                maxLength="31"
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password:</label>
              <input
                className="css-1lo2pik"
                type="password" // Use type="password" for password input
                id="password"
                required
                maxLength="100"
                aria-autocomplete="list"
              />
              <button type="button" className="vector">
                <img src="./Vector.svg" alt="" />
              </button>
            </div>
            <div className="register-button">
              <button className="css-vfxkzw" id="form-submission">
                Create an Account
              </button>
            </div>
            <div className="bank-info">
              <a href="">Add Banking Info</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
