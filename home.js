import axios from "axios";
import urls from "../../assets/urls.json";
import { useState, useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

function formatDate(dt) {
  var date = new Date(dt);
  return (
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    " / " +
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    " / " +
    date.getFullYear()
  );
}

function GetCard(props) {
  const navigate = useNavigate();
  console.log(props._id);
  const today_dt = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    })
  );

  const apt_dt = new Date(
    new Date(props.doa).toLocaleString("en-US", {
      timeZone: "America/New_York",
    })
  );

  const rem_days = Math.floor(
    (apt_dt.getTime() - today_dt.getTime()) / (1000 * 60 * 60 * 24)
  );

  let classes = "card";
  let tag = "";

  if (rem_days <= 0) {
    if (props.head === "upcoming") {
      classes += " none";
    }
    classes += " done";
    tag = "Completed";
  } else if (rem_days < 7) {
    if (props.head === "past") {
      classes += " none";
    }
    classes += " urgent";
    if (rem_days === 1) tag = `tomorrow`;
    else tag = `coming in ${rem_days} days`;
  } else {
    if (props.head === "past") {
      classes += " none";
    }
    classes += " late";
    tag = "1 week after";
  }

  return (
    <div className={classes} style={{ minWidth: "20rem" }}>
      <div className="tim">
        <span>{tag}</span>
      </div>
      <div className="drname">
        <p>{props.provider_name}</p>
      </div>
      <div className="line" />
      <div className="details-col">
        <div className="details">
          <div className="head">Patient Name</div>
          <div className="head-val">{props.name}</div>
        </div>
        <div className="details">
          <div className="head">
            <p>Date</p>
          </div>
          <div className="head-val">
            <p>{formatDate(apt_dt)}</p>
          </div>
        </div>
        <div className="details">
          <div className="head">
            <p>Time</p>
          </div>
          <div className="head-val">
            <p>{props.slot}</p>
          </div>
        </div>
        <div className="details" style={{ justifyContent: "center" }}>
          <button
            onClick={() => {
              axios
                .post(
                  urls.cancelAppointment,
                  { _id: props._id },
                  { withCredentials: true }
                )
                .then((rep) => {
                  console.log(rep.data);
                  window.location.reload();
                });
            }}
            style={{
              backgroundColor: "white",
              borderWidth: "0px",
              width: "50%",
              padding: "3px",
              textDecoration: "underline",
              color: "blue",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [pastAppointment, setPastAppointment] = useState([]);
  const [upcomingAppointment, setUpcomingAppointment] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(urls.upcomingAppointment, { withCredentials: true })
      .then((rep) => {
        console.log(rep);
        if (rep?.data?.success) {
          setUpcomingAppointment((upcomingAppointment) => [
            ...upcomingAppointment,
            ...rep.data.appointments,
          ]);
          setPastAppointment((pastAppointment) => [
            ...pastAppointment,
            ...rep.data.appointments,
          ]);
        }
      });

    axios.get(urls.pastAppointment, { withCredentials: true }).then((rep) => {
      console.log(rep);
      if (rep?.data?.success) {
        setPastAppointment((pastAppointment) => [
          ...pastAppointment,
          ...rep.data.appointments,
        ]);
      }
    });
  }, []);

  return (
    <div className="home-head">
      <div className="schedule">
        <div className="title">Want to schedule an appointment ?</div>
        <div className="btn">
          <button onClick={() => navigate("/schedule_appointment_form")}>
            <span>+</span> Schedule Appointment
          </button>
        </div>
      </div>
      <div className="upcoming">
        <div className="title">Upcoming Appointments</div>
        <div className="appointments upcoming">
          {upcomingAppointment.map((app) => {
            return <GetCard {...app} head="upcoming" />;
          })}
        </div>
      </div>
      <div className="upcoming">
        <div className="title">Past Appointments</div>
        <div className="appointments upcoming">
          {pastAppointment.map((app) => {
            return <GetCard {...app} head="past" />;
          })}
        </div>
      </div>
    </div>
  );
}
