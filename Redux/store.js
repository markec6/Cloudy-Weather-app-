import { configureStore } from "@reduxjs/toolkit";
import WeatherRedcuer from "./WeatherSlice";

const store = configureStore({
  reducer: {
    weather: WeatherRedcuer,
  },
});

export default store;
