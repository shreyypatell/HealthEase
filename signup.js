import "./signup.css";
import proImg from "../assets/proImg.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/store";

const urls = require("../assets/urls.json");

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [pass, setPass] = useState("");
  const [CFPass, setCFPass] = useState("");
  const [dob, setDob] = useState();
  const [acceptTNC, setAcceptTNC] = useState(false);

  const [emailErr, setEmailErr] = useState(false);
  const [cfPWErr, setcfpwErr] = useState(false);
  const [emptyErr, setEmptyErr] = useState(false);

  const remErr = () => {
    setEmailErr(false);
    setcfpwErr(false);
    setEmptyErr(false);
  };

  const handleChangeGender = (e) => {
    remErr();
    setGender(e.target.value);
  };

  const handleSignup = () => {
    if (
      !(
        firstName !== "" &&
        lastName !== "" &&
        gender !== "" &&
        dob !== null &&
        email !== "" &&
        pass !== "" &&
        CFPass !== "" &&
        acceptTNC !== false
      )
    ) {
      setEmptyErr(true);
    } else if (pass !== CFPass) {
      setcfpwErr(true);
    } else {
      axios
        .post(
          urls.signup,
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            dob: dob,
            gender: gender,
            password: pass,
          },
          {
            withCredentials: true,
          }
        )
        .then((rep) => {
          const res = rep.data;
          console.log("in:", res);
          if (res.success) {
            dispatch(
              login({
                email: email,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                dob: dob.toString(),
                verified: false,
              })
            );
            navigate("/verify");
          } else if (res.message == "email already registered") {
            setEmailErr(true);
          } else {
            navigate("/error");
          }
        })
        .catch((error) => {
          console.log("out", error);
          navigate("/error");
        });
    }
  };

  return (
    <div className="signup-head">
      <div class="top_head">
        <h2>HealthEASE</h2>
        <div class="proImg">
          <img src={proImg} alt="profile_pic" width="35px" />
        </div>
      </div>
      <div className="form" action="" method="post">
        <b>
          <h3 style={{ backgroundColor: "#ffffff" }}>Let's get started</h3>
        </b>
        <b>
          <label for="firstname">First Name</label>

          <br />
        </b>
        <input
          type="firstname"
          id="firstname"
          name="firstname"
          required
          onChange={(e) => {
            remErr();
            setfirstName(e.target.value);
          }}
        />
        <br />
        <b>
          <label for="lastname">Last Name</label>
          <br />
        </b>
        <input
          type="lastname"
          id="lastname"
          name="lastname"
          required
          onChange={(e) => {
            remErr();
            setLastName(e.target.value);
          }}
        />
        <br />
        <b>
          <label for="Date of birth">Date Of Birth:</label>
        </b>
        <br />
        <input
          type="date"
          id="Date of birth"
          name="Date of birth"
          onChange={(e) => {
            remErr();
            setDob(new Date(e.target.value));
          }}
        />
        <br />
        <b>
          <label for="Gender">Gender:</label>
        </b>
        <br />
        <div
          className="gender"
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#ffffff",
          }}
        >
          <label>
            <input
              type="radio"
              name="options"
              value="male"
              checked={gender === "male"}
              onChange={handleChangeGender}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="options"
              value="female"
              checked={gender === "female"}
              onChange={handleChangeGender}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="options"
              value="other"
              checked={gender === "other"}
              onChange={handleChangeGender}
            />
            Other
          </label>
        </div>
        <br />
        <b>
          <label for="email">Email</label>
          <br />
        </b>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => {
            remErr();
            setEmail(e.target.value);
          }}
        />

        <br />
        <b>
          <label for="password">Password</label>
          <br />
        </b>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => {
            remErr();
            setPass(e.target.value);
          }}
        />
        <br />
        <b>
          <label for="confirmpassword">Confirm Password</label>
          <br />
        </b>
        <input
          type="password"
          id="confirmpassword"
          name="confirmpassword"
          required
          onChange={(e) => {
            remErr();
            setCFPass(e.target.value);
          }}
        />
        <br />
        <label for="terms">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            onChange={(e) => {
              remErr();
              setAcceptTNC(!acceptTNC);
            }}
          />
          Accept{" "}
          <a href="" style={{ backgroundColor: "#ffffff" }}>
            Terms and Conditions
          </a>{" "}
          by checking this box to continue
        </label>
        <br />
        {emailErr && (
          <div
            className="er-msg"
            style={{ color: "red", backgroundColor: "#ffffff" }}
          >
            *email already exist
          </div>
        )}
        {emptyErr && (
          <div
            className="er-msg"
            style={{ color: "red", backgroundColor: "#ffffff" }}
          >
            *please select/fill all fields
          </div>
        )}
        {cfPWErr && (
          <div
            className="er-msg"
            style={{ color: "red", backgroundColor: "#ffffff" }}
          >
            *passwords do not match
          </div>
        )}
        <div className="btn">
          <button onClick={handleSignup}>Create Account</button>
        </div>
      </div>
    </div>
  );
}
