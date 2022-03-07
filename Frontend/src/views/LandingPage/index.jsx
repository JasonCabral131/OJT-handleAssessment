import React, { useState } from "react";
import "./style.scss";
import coverpage from "./../../assets/background.jpg";
import logo from "./../../assets/logo.png";
import { BsShieldLock } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { EmailValidator } from "./../../reusable/index";
import CircularProgress from "@mui/material/CircularProgress";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "./../../redux/actions/";
const initialState = {
  email: { email: "", valid: false },
  password: "",
  loginAs: null,
};
function LandingPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userInformation, setUserInformation] = useState(initialState);
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setUserInformation((prev) => {
      return {
        ...prev,
        email: { email: value, valid: EmailValidator(value) },
      };
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (userInformation.email.email.length < 1) {
      swal.fire({
        icon: "error",
        text: "Email Required",
      });
      return;
    }
    if (!userInformation.email.valid) {
      swal.fire({
        icon: "error",
        text: "Invalid Email",
      });
      return;
    }
    if (userInformation.password.length < 1) {
      swal.fire({
        icon: "error",
        text: "Password Required",
      });
    }
    try {
      setLoading(true);
      const res = await dispatch(
        login({
          email: userInformation.email.email,
          password: userInformation.password,
        })
      );
      setLoading(false);

      if (!res.result) {
        swal.fire({
          icon: "warning",
          text: res.message,
        });
      }
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <div className="landing-Page-container">
      <div className="cover-page">
        <img
          src={coverpage}
          className="cover-page-img"
          alt={Math.random().toString()}
        />
        <div className="cover-card">
          <p className="heading-msg landingin-page-title">TL University</p>
          <p className="heading-context">
            The more that you read, the more things you will know, the more that
            you learn, the more places you’ll go.
          </p>
        </div>
        <div className="card-login scale-up-center ">
          <div className="logo-container">
            <img src={logo} className={"telmo-logo"} alt={Math.random()} />
            <h1 className="welcome">Welcome Back</h1>
          </div>
          <p className="welcome-message">
            Please, provide login credential to proceed and have access
          </p>
          <form className="login-form">
            <div className="form_control">
              <input
                type="email"
                placeholder="Email Address"
                className="inputx input_input"
                value={userInformation.email.email}
                onChange={handleEmailChange}
              />
              <HiOutlineMail className="icon" size={25} />
              {userInformation.email.email.length > 0 ? (
                userInformation.email.valid ? (
                  <AiOutlineCheckCircle
                    size={25}
                    className="text-success password-icon"
                    style={{ cursor: "default" }}
                    color={"#05d405"}
                  />
                ) : (
                  <AiOutlineCloseCircle
                    size={25}
                    color={"rgb(253, 48, 48)"}
                    className="text-danger password-icon"
                    style={{ cursor: "default" }}
                  />
                )
              ) : null}
            </div>
            <div className="form_control">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="inputx input_input"
                value={userInformation.password}
                onChange={(e) =>
                  setUserInformation((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
              />
              <BsShieldLock className="icon" size={25} />
              {showPassword ? (
                <FaEye
                  size={25}
                  className="password-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEyeSlash
                  size={25}
                  className="password-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <button
              className="submit inputx"
              style={{ cursor: loading ? "wait" : "pointer" }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
