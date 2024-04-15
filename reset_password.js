import { useState } from "react";
import proImg from "../../assets/proImg.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./reset_password.css";

const urls = require("../../assets/urls.json");

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSame, setIsSame] = useState(true);
  const [empErr, setEmptyErr] = useState(false);

  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("verify_fp: ", user);

  const handlePasswordChange = (e) => {
    setIsSame(true);
    setEmptyErr(false);
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setIsSame(true);
    setEmptyErr(false);
    setConfirmPassword(e.target.value);
  };

  const handleSubmitButton = () => {
    if (!password || !confirmPassword) {
      setEmptyErr(true);
    } else if (password !== confirmPassword) {
      setIsSame(false);
    } else {
      axios
        .post(
          urls.forgot_password.changePassword,
          {
            email: user.email,
            password: password,
          },
          { withCredentials: true }
        )
        .then((rep) => {
          console.log(rep);
          const res = rep.data;
          if (rep.status === 200) {
            dispatch(logout());
            navigate("/login");
          } else {
            navigate("/error");
          }
        });
    }
  };

  return (
    <div className="changePassword-fp-head">
      <div className="top_head">
        <h2 style={{ backgroundColor: "white" }}>HealthEASE</h2>
        <div className="proImg">
          <img src={proImg} alt="profile_pic" width="35px" />
        </div>
      </div>
      <div className="form">
        <b>
          <label for="password" style={{ backgroundColor: "white" }}>
            New Password
          </label>
          <br />
        </b>
        <input
          type="password"
          id="newpassword"
          name="newpassword"
          onChange={handlePasswordChange}
          required
        />
        <br />
        <b>
          <label for="confirmpassword" style={{ backgroundColor: "white" }}>
            Confirm New Password
          </label>
          <br />
        </b>
        <input
          type="password"
          id="confirmnewpassword"
          name="confirmnewpassword"
          onChange={handleConfirmPasswordChange}
          required
        />
        {!isSame && (
          <p style={{ color: "red", backgroundColor: "#ffffff" }}>
            *password do not match
            <br />
          </p>
        )}
        {empErr && (
          <p style={{ color: "red", backgroundColor: "#ffffff" }}>
            *please fill required fields
            <br />
          </p>
        )}
        <br />
        <div className="sub2" style={{ width: "100%", display: "block" }}>
          <button
            className="submit-btn"
            style={{
              backgroundColor: "black",
              borderWidth: "0px",
              color: "white",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={handleSubmitButton}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
