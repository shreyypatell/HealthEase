import { useState } from "react";
import { useNavigate } from "react-router-dom";
import proImg from "../../assets/proImg.png";
import "./email.css";
import axios from "axios";
import urls from "../../assets/urls.json";
import { login } from "../../store/store.js";
import { useDispatch } from "react-redux";

export default function Email() {
  const [emailFeild, setEmailfeild] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setIsValidEmail(true);
    setEmailfeild(e.target.value);
  };
  const handleSubmit = () => {
    axios
      .post(
        urls.forgot_password.email,
        { email: emailFeild },
        { withCredentials: true }
      )
      .then((rep) => {
        const res = rep.data;
        if (
          res.message === "email is not yet registered" ||
          res.message === "invalid request"
        ) {
          setIsValidEmail(false);
        } else if (res.success) {
          dispatch(
            login({
              email: emailFeild,
              firstName: "",
              lastName: "",
              gender: "",
              dob: "",
              verified: true,
            })
          );
          navigate("/forgot_password_otp");
        } else {
          console.log(rep);
          navigate("/error");
        }
      });
  };
  return (
    <div className="email_fp">
      <div className="top_head">
        <h2 style={{ backgroundColor: "white" }}>HealthEASE</h2>
        <div className="proImg">
          <img src={proImg} alt="profile_pic" width="35px" />
        </div>
      </div>
      <div className="form">
        <b>
          <label for="email" style={{ backgroundColor: "white" }}>
            Email
          </label>
          <br />
        </b>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleEmailChange}
          required
        />
        <br />
        {!isValidEmail && (
          <p style={{ color: "red", backgroundColor: "#ffffff" }}>
            *email not found
            <br />
          </p>
        )}
        <div className="sub">
          <button
            className="submit"
            onClick={handleSubmit}
            style={{
              backgroundColor: "black",
              borderWidth: "0px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
