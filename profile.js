import { useDispatch, useSelector } from "react-redux";
import defaulDpImg from "../../assets/default_dp.jpg";
import "./profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import urls from "../../assets/urls.json";
import { login } from "../../store/store";

function formatDate(dt) {
  var date = new Date(dt);
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "-" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
  );
}

export default function Profile() {
  const user = useSelector((state) => state.user.value);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [emptyErr, setEmptyErr] = useState(false);
  const [isNotSame, setIsNotSame] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setDob(user.dob);
  }, [user]);

  const dispatch = useDispatch();

  const handleSaveMyDetailsButton = () => {
    if (
      !oldPassword ||
      !newPassword ||
      !confirmNewPassword ||
      !firstName ||
      !lastName ||
      !dob
    ) {
      setEmptyErr(true);
    } else if (newPassword !== confirmNewPassword) {
      setIsNotSame(true);
    } else {
      axios
        .post(
          urls.updateInfo,
          { firstName, lastName, dob, oldPassword, newPassword },
          { withCredentials: true }
        )
        .then((rep) => {
          if (rep.data.success) {
            alert(`Details Saved Successfully`);
            dispatch(
              login({
                firstName,
                lastName,
                dob,
                email: user.email,
                verified: user.verified,
              })
            );
          } else if (rep.data.message === "incorrect old password") {
            setIncorrectPassword(true);
          } else {
            console.log("rep => ", rep);
          }
        });
    }
  };

  return (
    <div className="profile-head">
      <div className="profile-pic">
        <div className="left">
          <img src={defaulDpImg} alt="profile-pic" />
          <div className="name">{user.firstName + " " + user.lastName}</div>
        </div>
        <div className="right">
          <button onClick={handleSaveMyDetailsButton}>Save my details</button>
        </div>
      </div>
      <div className="profile-details">
        <div className="err">
          {emptyErr && (
            <p style={{ color: "red" }}>*please fill all required fields</p>
          )}
          {isNotSame && <p style={{ color: "red" }}>*passwords do not match</p>}
          {incorrectPassword && (
            <p style={{ color: "red" }}>*invalid old password</p>
          )}
        </div>
        <div className="sec">
          <div className="label">First Name</div>
          <div className="inp">
            <input
              type="text"
              defaultValue={user.firstName}
              onChange={(e) => {
                setEmptyErr(false);
                setIsNotSame(false);
                setIncorrectPassword(false);
                setFirstName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="sec">
          <div className="label">Last Name</div>
          <div className="inp">
            <input
              type="text"
              defaultValue={user.lastName}
              onChange={(e) => {
                setEmptyErr(false);
                setIsNotSame(false);
                setIncorrectPassword(false);
                setLastName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="sec">
          <div className="label">Date of Birth</div>
          <div className="inp">
            <input
              type="date"
              defaultValue={formatDate(user.dob)}
              onChange={(e) => {
                setEmptyErr(false);
                setIsNotSame(false);
                setIncorrectPassword(false);
                setDob(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="sec">
          <div className="label">Old Password</div>
          <div className="inp">
            <input
              type="password"
              onChange={(e) => {
                setEmptyErr(false);
                setIsNotSame(false);
                setIncorrectPassword(false);
                setOldPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="sec">
          <div className="label">New Password</div>
          <div className="inp">
            <input
              type="password"
              onChange={(e) => {
                setEmptyErr(false);
                setIsNotSame(false);
                setIncorrectPassword(false);
                setNewPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="sec">
          <div className="label">Confirm New Password</div>
          <div className="inp">
            <input
              type="password"
              onChange={(e) => {
                setEmptyErr(false);
                setIsNotSame(false);
                setIncorrectPassword(false);
                setConfirmNewPassword(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
