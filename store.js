import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import urls from "../assets/urls.json";

const userInitialState = {
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  verified: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: { value: userInitialState },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = userInitialState;
    },
  },
});

const appointmentInitialState = {
  name: "",
  doa: new Date(),
  slot: "",
  provider_name: "",
  number: "",
  MIN: "",
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: { value: appointmentInitialState },
  reducers: {
    setValue: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    reset: (state, action) => {
      state.value = appointmentInitialState;
    },
    book: (state, action) => {
      axios
        .post(urls.scheduleAppointment, state.value, { withCredentials: true })
        .then((rep) => {
          if (!rep?.body?.success) {
            console.log(rep);
          } else {
            state.value = appointmentInitialState;
          }
        });
    },
  },
});

export const { login, logout } = userSlice.actions;
export const { setValue, reset, book } = appointmentSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    appointment: appointmentSlice.reducer,
  },
});
