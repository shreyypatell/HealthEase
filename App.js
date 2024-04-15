import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Signup from "./components/signup";
import Verify from "./components/verify";
import Login from "./components/login";
import Email from "./components/forget_password/email";
import Verify_fp from "./components/forget_password/otp";
import ChangePassword from "./components/forget_password/reset_password";
import ScheduleAppointmentForm from "./components/dashboard/schedule_appointment_form";
import ScheduleAppointmentProvider from "./components/dashboard/schedule_appointment_provider";
import Error from "./components/error";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot_password_email" element={<Email />} />
            <Route path="/forgot_password_otp" element={<Verify_fp />} />
            <Route
              path="/forgot_password_change_password"
              element={<ChangePassword />}
            />
            <Route
              path="/schedule_appointment_form"
              element={<ScheduleAppointmentForm />}
            />
            <Route
              path="/schedule_appointment_providers"
              element={<ScheduleAppointmentProvider />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
