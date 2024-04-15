import "./providers.css";
import phyImg from "../../assets/provider-physician.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import urls from "../../assets/urls.json";
import { useNavigate } from "react-router-dom";

function GetCard(props) {
  return (
    <div className="card">
      <div className="img-card" style={{ marginBottom: 10 }}>
        <img
          src={phyImg}
          alt=""
          height="260px"
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

function GetTitleCard(props) {
  const { title, providers } = props;
  return (
    <div className="upcoming">
      <div className="title">
        {String(title)} ({providers.length})
      </div>
      <div className="appointments upcoming">
        {providers.map((element) => {
          return <GetCard {...element} />;
        })}
      </div>
    </div>
  );
}

function getDict(providers) {
  console.log("getDict => ", providers);
  let dict = {};
  providers.forEach((element) => {
    const qual = element.qualification;
    if (dict[qual] === undefined) dict[qual] = [element];
    else dict[qual].push(element);
  });
  return dict;
}

export default function Providers() {
  const [dict, setDict] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(urls.getProviders, { withCredentials: true }).then((rep) => {
      if (rep.data.success) {
        const newDict = getDict(rep.data.providers);
        setDict(newDict);
      } else {
        console.log(rep);
      }
    });
  }, []);

  return (
    <div className="providers-home-head">
      <div className="schedule">
        <div className="title">Healthcare Provider</div>
        <div
          className="btn"
          onClick={() => navigate("/schedule_appointment_form")}
        >
          <button>
            <span>+</span> Schedule Appointment
          </button>
        </div>
      </div>
      {Object.keys(dict).map((key) => (
        <GetTitleCard providers={dict[key]} title={key} />
      ))}
    </div>
  );
}
