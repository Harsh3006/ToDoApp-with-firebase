import "./Account.css";
import google from "../img/google-logo.png";
import login from "../img/login.svg";
import signup from "../img/signup.svg";
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider } from "../Firebase";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [page, setPage] = useState("sign in");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const naigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleSignIn = (event) => {
    event.preventDefault();
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          naigate("/todos");
        })
        .catch((error) => alert(error.message));
    }
  };

  const signInWithGoogle = (event) => {
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then(() => {
        naigate("/todos");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    if (email && password && confirmPassword && password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setPage("sign in");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Password and Confirm Password must be same");
    }
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        alert("Password Reset Email Sent");
        setPopupVisible(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const togglePage = () => {
    if (page === "sign in") {
      setPage("sign up");
    } else {
      setPage("sign in");
    }
  };
  return (
    <>
      <section className={page === "sign in" ? "flex" : "active flex"}>
        <div className="container">
          <div className="user login">
            <div className="img-box">
              <img src={login} alt="" />
            </div>
            <div className="form-box flex">
              <form className="form">
                <div className="form-control">
                  <h2 className="text-center">Hello Again!</h2>
                  <p className="text-center">Login to check your todos.</p>
                  <div className="input-field">
                    <label htmlFor="email-1">Email Address</label>
                    <input
                      type="email"
                      id="email-1"
                      placeholder="you@example.com"
                      onChange={handleEmailChange}
                      value={email}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="password-1">Password</label>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password-1"
                      placeholder="Your Password"
                      onChange={handlePasswordChange}
                      value={password}
                      required
                      autoComplete="on"
                    />
                    <i
                      className={
                        passwordVisible
                          ? "fa-regular fa-eye"
                          : "fa-regular fa-eye-slash"
                      }
                      onClick={() => {
                        setPasswordVisible(!passwordVisible);
                      }}
                    ></i>
                    <span
                      className="link"
                      onClick={() => {
                        setPopupVisible(!popupVisible);
                      }}
                    >
                      Forgot Password?
                    </span>
                  </div>
                  <button type="submit" onClick={handleSignIn}>
                    Login
                  </button>
                </div>
                <div className="form-control">
                  <p>or continue with</p>
                  <div className="icons">
                    <button onClick={signInWithGoogle}>
                      <img src={google} alt="" /> Google
                    </button>
                  </div>
                  <p>
                    Didn't have an account yet?
                    <span className="link" onClick={togglePage}>
                      {" "}
                      Sign Up
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="user signup">
            <div className="form-box flex">
              <form className="form">
                <div className="form-control">
                  <h2 className="text-center">Welcome!</h2>
                  <p className="text-center">It's good to have you.</p>
                  <div className="input-field">
                    <label htmlFor="email-2">Email Address</label>
                    <input
                      type="email"
                      id="email-2"
                      placeholder="you@example.com"
                      onChange={handleEmailChange}
                      value={email}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="password-2">Password</label>
                    <input
                      type="password"
                      id="password-2"
                      placeholder="Your Password"
                      onChange={handlePasswordChange}
                      value={password}
                      required
                      autoComplete="on"
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm-password"
                      placeholder="Your Confrim Password"
                      onChange={handleConfirmPasswordChange}
                      value={confirmPassword}
                      required
                      autoComplete="on"
                    />
                  </div>
                  <button type="submit" onClick={handleSignUp}>
                    Sign Up
                  </button>
                </div>
                <div className="form-control">
                  <p>or continue with</p>
                  <div className="icons">
                    <button>
                      <img src={google} alt="" onClick={signInWithGoogle} />{" "}
                      Google
                    </button>
                  </div>
                  <p>
                    Already have an account?
                    <span className="link" onClick={togglePage}>
                      {" "}
                      Log In
                    </span>
                  </p>
                </div>
              </form>
            </div>
            <div className="img-box">
              <img src={signup} alt="" />
            </div>
          </div>
        </div>
        <div className={`forgot-password flex ${popupVisible ? "active" : ""}`}>
          <div className="reset-container flex">
            <i
              className="fa-solid fa-xmark"
              onClick={() => {
                setPopupVisible(!popupVisible);
              }}
            ></i>
            <h2 className="text-center">Forgot Password?</h2>
            <p className="text-center">
              Don't worry you can reset your password
            </p>
            <div className="row flex">
              <div className="col">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  onChange={(event) => {
                    setResetEmail(event.target.value);
                  }}
                  value={resetEmail}
                  required
                />
              </div>
              <div className="col-auto">
                <button onClick={handleForgotPassword}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
