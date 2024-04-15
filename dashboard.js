import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/store";
import axios from "axios";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./dashboard/home";
import Providers from "./dashboard/providers";
import Support from "./dashboard/support";
import Profile from "./dashboard/profile";

const urls = require("../assets/urls.json");

const Dashboard = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tarComp, setTarComp] = useState("Home");

  console.log("dashboard page:", user);

  const handleLogout = async () => {
    const rep = await axios.get(urls.logout, { withCredentials: true });
    if (!rep.data.success) {
      console.log(`cookie not cleared`);
    }
    dispatch(logout());
  };

  const formatDate = (dt) => {
    var date = new Date(dt);
    return (
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      " / " +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      " / " +
      date.getFullYear()
    );
  };

  useEffect(() => {
    if (!user.verified) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="dashboard">
      <div className="main-head">
        <div className="logo">
          <h2>
            <span className="logo-fst">Health</span>EASE
          </h2>
        </div>
        <div className="header">
          <div className="greet">Welcome, {user.firstName}!</div>
          <div className="logout-btn" id="logout-sec" onClick={handleLogout}>
            <i className="fa-solid fa-door-open" />
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="navigation">
          <div className="nav-items">
            <div
              className={tarComp === "Home" ? "item active" : "item"}
              onClick={() => setTarComp("Home")}
            >
              <div className="comb">
                <i className="fa-solid fa-house" />
                <button>Dashboard</button>
              </div>
              <div className="side" />
            </div>
            <div
              className={tarComp === "Providers" ? "item active" : "item"}
              id="Providers"
              onClick={() => setTarComp("Providers")}
            >
              <div className="comb">
                <i className="fa-solid fa-user" />
                <button>Healthcare Providers</button>
              </div>
              <div className="side" />
            </div>
            <div
              className={tarComp === "Support" ? "item active" : "item"}
              onClick={() => setTarComp("Support")}
            >
              <div className="comb">
                <i className="fa-solid fa-phone" />
                <button>Support</button>
              </div>
              <div className="side" />
            </div>
            <div
              className={tarComp === "Profile" ? "item active" : "item"}
              onClick={() => setTarComp("Profile")}
            >
              <div className="comb">
                <i className="fa-solid fa-user" />
                <button>Profile</button>
              </div>
              <div className="side" />
            </div>
          </div>
        </div>
        <div
          className="target"
          style={
            tarComp === "Profile"
              ? { backgroundColor: "#fff", padding: "1rem" }
              : {}
          }
        >
          {tarComp == "Home" && <Home />}
          {tarComp == "Providers" && <Providers />}
          {tarComp == "Support" && <Support />}
          {tarComp == "Profile" && <Profile />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
