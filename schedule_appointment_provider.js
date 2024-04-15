import axios from "axios";
import { useEffect, useState } from "react";
import phyImg from "../../assets/provider-physician.jpeg";
import urls from "../../assets/urls.json";
import proImg from "../../assets/proImg.png";
import { useSelector, useDispatch } from "react-redux";
import { setValue, book, reset } from "../../store/store";
import "./schedule_appointment_provider.css";
import { useNavigate } from "react-router-dom";

function GetCard(props) {
  const dispatch = useDispatch();
  const dr = useSelector((state) => state.appointment.value);

  return (
    <div
      className="card"
      onClick={() => {
        dispatch(setValue({ provider_name: props.name }));
      }}
      style={
        dr.provider_name === props.name
          ? { borderRadius: 10, border: "1.5px solid #000" }
          : {}
      }
    >
      <div className="img-card" id={props.name} style={{ marginBottom: 10 }}>
        <img
          src={phyImg}
          alt=""
          height="100%"
          width="100%"
          style={{ borderRadius: 10 }}
        />
      </div>
      <div className="drname">
        <p>{props.name}</p>
      </div>
      <div className="occ">
        <p>{props.qualification}</p>
      </div>
      <div className="line" />
      <div className="details-col">
        <div className="details">
          <div className="head">Years of practice</div>
          <div className="head-val">{props.yoe}</div>
        </div>
        <div className="details">
          <div className="head">
            <p>Specialization</p>
          </div>
          <div className="head-val">
            <p>{props.qualification}</p>
          </div>
        </div>
        <div className="details">
          <div className="head">
            <p>Availibility</p>
          </div>
          <div className="head-val">
            <p>{props.available.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const shortFormDay = {
  0: "Sun",
  1: "Mon",
  2: "Tues",
  3: "Wed",
  4: "Thurs",
  5: "Fri",
  6: "Sat",
};

export default function ScheduleAppointmentProvider() {
  const [providers, setProviders] = useState([]);
  const [emptyErr, setEmptyErr] = useState(false);
  const [occupiedEr, setOccupiedErr] = useState(false);
  const appointment = useSelector((state) => state.appointment.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackButton = () => {
    dispatch(reset());
    navigate(-1);
  };

  useEffect(() => {
    setEmptyErr(false);
    setOccupiedErr(false);

    if (appointment.slot === "NA") setOccupiedErr(true);
    else {
      const doa = new Date(appointment.doa);
      console.log(appointment);
      console.log(doa.getDay());
      axios
        .post(
          urls.getProvidersDay,
          { day: shortFormDay[doa.getDay()] },
          { withCredentials: true }
        )
        .then((rep) => {
          console.log("rep => ", rep);
          if (rep?.data?.success) {
            setProviders(rep.data.providers);
          }
        });
    }
  }, [appointment]);

  return (
    <div className="schedule-appointment-providers">
      <div className="top_head">
        <h2>HealthEASE</h2>
        <div className="proImg">
          <img src={proImg} alt="profile_pic" width="35px" />
        </div>
      </div>
      <div className="schedule-appointment">
        <div className="tit">Schedule Appointment</div>
        <div className="det det1">
          Enter the patient's full name and details
        </div>
        <div className="det det2">Select Helathcare Provider (4)</div>
        <div className="appointments">
          {providers.map((element) => (
            <GetCard {...element} />
          ))}
        </div>
        {emptyErr && (
          <div className="error-msg">
            <p style={{ color: "red" }}>*Please select a healthcare provider</p>
          </div>
        )}
        {occupiedEr && (
          <div className="error-msg">
            <p style={{ color: "red" }}>
              *This date and slot is already booked. Please select different
              date and slot
            </p>
          </div>
        )}
        <div
          className="btn"
          onClick={() => {
            if (appointment.provider_name) {
              dispatch(book());
              navigate("/dashboard");
            } else {
              setEmptyErr(true);
            }
          }}
        >
          <button>Confirm my Appointment</button>
        </div>
        <div className="btn" onClick={handleBackButton}>
          <button
            style={{
              backgroundColor: "red",
              color: "black",
              borderWidth: "0px",
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
