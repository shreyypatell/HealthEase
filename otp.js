import { useNavigate } from "react-router-dom";
import "./otp.css";
import proImg from "../../assets/proImg.png";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const urls = require("../../assets/urls.json");

export default function Verify_fp() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  const [otp, setOtp] = useState("");

  const [otpErr, setOtpErr] = useState(false);
  const [emptyErr, setEmptyErr] = useState(false);

  const handleVerifyBtn = () => {
    if (!otp || !user.email) {
      setEmptyErr(true);
    } else {
      axios
        .post(
          urls.forgot_password.otp,
          { email: user.email, otp: otp },
          { withCredentials: true }
        )
        .then((rep) => {
          const res = rep.data;
          console.log(rep);
          if (res.success) {
            navigate("/forgot_password_change_password");
          } else if (res.status === 203) {
            setOtpErr(true);
          } else {
            navigate("/error");
          }
        })
        .catch((error) => {
          console.log(error);
          navigate("/error");
        });
    }
  };

  return (
    <div className="verify-fp-head">
      <div class="top_head">
        <h2 style={{ backgroundColor: "#ffffff" }}>HealthEASE</h2>
        <div class="proImg">
          <img src={proImg} alt="profile_pic" width="35px" />
        </div>
      </div>
      <div className="form">
        <b>
          <label for="Otp" style={{ backgroundColor: "#ffffff" }}>
            An OTP has been sent to your email. Please enter the OTP to verify
          </label>
          <br />
        </b>
        <input
          required
          type="Otp"
          autocomplete="one-time-code"
          inputmode="numeric"
          maxlength="4"
          pattern="\d{4}"
          placeholder="OTP"
          onChange={(e) => {
            setOtpErr(false);
            setEmptyErr(false);
            setOtp(e.target.value);
          }}
        />
        {otpErr && (
          <div
            className="er-msg"
            style={{ color: "red", backgroundColor: "#ffffff" }}
          >
            <br />
            *invalid OTP
          </div>
        )}
        {emptyErr && (
          <div
            className="er-msg"
            style={{ color: "red", backgroundColor: "#ffffff" }}
          >
            *please enter OTP
          </div>
        )}
        <br />
        <div className="btn">
          <button onClick={handleVerifyBtn}>Verify</button>
        </div>
      </div>
    </div>
  );
}
