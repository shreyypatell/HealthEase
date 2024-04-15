import React, { useEffect } from "react";
import "./login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import proImg from "../assets/proImg.png";
import { login } from "../store/store";
import { useDispatch } from "react-redux";

const urls = require("../assets/urls.json");

function Login() {
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [emptyErr, setEmptyErr] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSignup = () => {
    navigate("/signup");
  };

  useEffect(() => {
    axios
      .post(urls.login, {}, { withCredentials: true })
      .then((rep) => {
        const res = rep.data;
        console.log("response (reply):", rep);
        if (res.success) {
          dispatch(
            login({
              email: res.email,
              firstName: res.firstName,
              lastName: res.lastName,
              gender: res.gender,
              dob: res.dob.toString(),
              verified: true,
            })
          );
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log("axios error:", err);
        navigate("/error");
      });
  }, [navigate, dispatch]);

  const handleLogin = () => {
    if (!pass || !email) {
      setEmptyErr(true);
    } else {
      axios
        .post(
          urls.login,
          { email: email, password: pass },
          { withCredentials: true }
        )
        .then((rep) => {
          const res = rep.data;
          console.log("response (reply):", rep);
          if (res.success) {
            dispatch(
              login({
                email: res.email,
                firstName: res.firstName,
                lastName: res.lastName,
                gender: res.gender,
                dob: res.dob.toString(),
                verified: true,
              })
            );
            navigate("/dashboard");
          } else if (res.message === "invalid credentials") {
            setInvalidCredentials(true);
          } else {
            navigate("/error");
          }
        })
        .catch((err) => {
          console.log("axios error:", err);
          navigate("/error");
        });
    }
  };

  return (
    <div className="login-head">
      <div className="top_head">
        <h2>HealthEASE</h2>
        <div className="proImg" style={{ backgroundColor: "#ffffff" }}>
          <img src={proImg} alt="profile_pic" width="35px" />
        </div>
      </div>
      <div className="form">
        <h3 style={{ fontWeight: "bold", backgroundColor: "#ffffff" }}>
          Log in
        </h3>

        <label for="email" style={{ fontWeight: "bold" }}>
          Email
        </label>
        <br />

        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => {
            setInvalidCredentials(false);
            setEmail(e.target.value);
          }}
          required
        />
        <br />

        <label for="password" style={{ fontWeight: "bold" }}>
          Password
        </label>
        <br />

        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => {
            setInvalidCredentials(false);
            setPass(e.target.value);
          }}
        />
        <br />

        {invalidCredentials && (
          <p style={{ color: "red", backgroundColor: "#ffffff" }}>
            *invalid email id or password
          </p>
        )}
        {emptyErr && (
          <div
            className="er-msg"
            style={{ color: "red", backgroundColor: "#ffffff" }}
          >
            *please select/fill all fields
          </div>
        )}

        <br />

        <p1 style={{ backgroundColor: "#ffffff" }}>
          <button
            className="forgot_password"
            onClick={() => navigate("/forgot_password_email")}
          >
            Forgot password?
          </button>
        </p1>

        <br />
        <div className="btn" style={{ backgroundColor: "#ffffff" }}>
          <button
            onClick={handleLogin}
            className="login-btn"
            style={{ textDecoration: "underline" }}
          >
            Log in
          </button>
        </div>

        <p style={{ backgroundColor: "#ffffff" }}>
          Don't have an account?{" "}
          <button className="forgot_password" onClick={handleSignup}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
