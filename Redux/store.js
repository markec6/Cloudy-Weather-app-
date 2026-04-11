import { configureStore } from "@reduxjs/toolkit";
import ForeCastReducer from "./ForeCastSlice";
import WeatherRedcuer from "./WeatherSlice";

const store = configureStore({
  reducer: {
    weather: WeatherRedcuer,
    forecast: ForeCastReducer,
  },
});

export default store;
