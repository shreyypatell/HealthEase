import { useEffect, useState } from "react";
import "./scheduleAppForm.css";
import { useDispatch } from "react-redux";
import { setValue, reset } from "../../store/store";
import { useNavigate } from "react-router-dom";
import proImg from "../../assets/proImg.png";

function validatePhoneNumberAndMIN(phoneNumber) {
  var phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export default function ScheduleAppointmentForm() {
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [MeIN, setMIN] = useState("");
  const [dt, setDt] = useState();

  const [emptyError, setEmptyError] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
  const [invalidMIN, setInvalidMIN] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNextButton = () => {
    if (!(slot && name && number && MeIN && isValidDate(dt))) {
      setEmptyError(true);
    } else if (!validatePhoneNumberAndMIN(number)) {
      setInvalidPhoneNumber(true);
    } else if (!validatePhoneNumberAndMIN(MeIN)) {
      setInvalidMIN(true);
    } else {
      dispatch(
        setValue({
          doa: dt,
          name: name,
          slot: slot,
          number: number,
          MIN: MeIN,
        })
      );
      navigate("/schedule_appointment_providers");
    }
  };

  const handleBackButton = () => {
    dispatch(reset());
    navigate(-1);
  };

  return (
    <div className="schedule-appointment-form">
      <div className="top_head">
        <h2>HealthEASE Login</h2>
        <div className="proImg">
          <img src={proImg} alt="profile_pic" width="35px" />
        </div>
      </div>
      <div className="form">
        <b>
          <h3>Schedule appointment</h3>
        </b>
        <b>
          <label htmlFor="full_name">Full Name</label>
          <br />
        </b>
        <input
          type="full_name"
          id="full_name"
          name="full_name"
          required=""
          onChange={(e) => {
            setEmptyError(false);
            setInvalidPhoneNumber(false);
            setInvalidMIN(false);
            setName(e.target.value);
          }}
        />
        <br />
        <b>
          <label htmlFor="Num">Phone Number</label>
          <br />
        </b>
        <input
          type="Num"
          id="Number"
          name="Number"
          required=""
          onChange={(e) => {
            setEmptyError(false);
            setInvalidPhoneNumber(false);
            setInvalidMIN(false);
            setNumber(e.target.value);
          }}
        />
        <br />
        <b>
          <label htmlFor="Num">Medical Insurance Number</label>
          <br />
        </b>
        <input
          type="Num"
          id="Number"
          name="Number"
          required=""
          onChange={(e) => {
            setEmptyError(false);
            setInvalidPhoneNumber(false);
            setInvalidMIN(false);
            setMIN(e.target.value);
          }}
        />
        <br />
        <b>
          <label htmlFor="A_Date">Appointment Date</label>
        </b>
        <input
          type="date"
          id="A_Date"
          name="A_Date"
          onChange={(e) => {
            setEmptyError(false);
            setInvalidPhoneNumber(false);
            setInvalidMIN(false);
            setDt(new Date(e.target.value));
          }}
        />
        <b>
          <label htmlFor="Slot">Appointment Slot</label>
        </b>
        <div className="ss">
          <button
            className={slot === "9:30 AM" ? "btn2" : "btn"}
            onClick={() => {
              setEmptyError(false);
              setInvalidPhoneNumber(false);
              setInvalidMIN(false);
              setSlot("9:30 AM");
            }}
          >
            9:30 AM
          </button>
          <button
            className={slot === "10:30 AM" ? "btn2" : "btn"}
            onClick={() => {
              setEmptyError(false);
              setInvalidPhoneNumber(false);
              setInvalidMIN(false);
              setSlot("10:30 AM");
            }}
          >
            10:30 AM
          </button>
          <button
            className={slot === "11:30 AM" ? "btn2" : "btn"}
            onClick={() => {
              setEmptyError(false);
              setInvalidPhoneNumber(false);
              setInvalidMIN(false);
              setSlot("11:30 AM");
            }}
          >
            11:30 AM
          </button>
          <button
            className={slot === "12:30 AM" ? "btn2" : "btn"}
            onClick={() => {
              setEmptyError(false);
              setInvalidPhoneNumber(false);
              setInvalidMIN(false);
              setSlot("12:30 AM");
            }}
          >
            12:30 AM
          </button>
          <button
            className={slot === "9:30 PM" ? "btn2" : "btn"}
            onClick={() => {
              setEmptyError(false);
              setInvalidPhoneNumber(false);
              setInvalidMIN(false);
              setSlot("9:30 PM");
            }}
          >
            9:30 PM
          </button>
          <button
            className={slot === "10:30 PM" ? "btn2" : "btn"}
            onClick={() => {
              setEmptyError(false);
              setInvalidPhoneNumber(false);
              setInvalidMIN(false);
              setSlot("10:30 PM");
            }}
          >
            10:30 PM
          </button>
          <button
            className={slot === "11:30 PM" ? "btn2" : "btn"}
            onClick={() => {
              setEmptyError(false);
              setInvalidPhoneNumber(false);
              setInvalidMIN(false);
              setSlot("11:30 PM");
            }}
          >
            11:30 PM
          </button>
          <button
            className={slot === "12:30 PM" ? "btn2" : "btn"}
            onClick={() => {
              setEmptyError(false);
              setInvalidPhoneNumber(false);
              setInvalidMIN(false);
              setSlot("12:30 PM");
            }}
          >
            12:30 PM
          </button>
          <br />
          {emptyError && (
            <p style={{ color: "red" }}>*Please fill required field</p>
          )}
          {invalidPhoneNumber && (
            <p style={{ color: "red" }}>*Please enter a valid phone number</p>
          )}
          {invalidMIN && (
            <p style={{ color: "red" }}>
              *Please enter a valid Medical Insurance Number
            </p>
          )}
        </div>
        <button className="submit" onClick={handleNextButton}>
          Next
        </button>
        <br />
        <button
          className="submit"
          onClick={handleBackButton}
          style={{ backgroundColor: "red", color: "black" }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
