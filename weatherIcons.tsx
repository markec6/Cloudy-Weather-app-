import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

// Tipizacija za TypeScript, jer je rigorizan
interface WeatherIconType {
  [key: string]: React.ReactNode;
}

export const weatherIcons: WeatherIconType = {
  // sunce i noc
  "01d": (
    <MaterialCommunityIcons name="weather-sunny" size={100} color="#FFD700" />
  ),
  "01n": (
    <MaterialCommunityIcons name="weather-night" size={100} color="white" />
  ),

  // slabo oblacno
  "02d": (
    <MaterialCommunityIcons
      name="weather-partly-cloudy"
      size={100}
      color="white"
    />
  ),
  "02n": (
    <MaterialCommunityIcons
      name="weather-night-partly-cloudy"
      size={100}
      color="white"
    />
  ),

  // Scattered clouds
  "03d": (
    <MaterialCommunityIcons name="weather-cloudy" size={100} color="white" />
  ),
  "03n": (
    <MaterialCommunityIcons name="weather-cloudy" size={100} color="white" />
  ),

  // Overcast clouds
  "04d": (
    <MaterialCommunityIcons name="weather-cloudy" size={100} color="white" />
  ),
  "04n": (
    <MaterialCommunityIcons name="weather-cloudy" size={100} color="white" />
  ),

  // Kisa
  "09d": (
    <MaterialCommunityIcons name="weather-pouring" size={100} color="#add8e6" />
  ),
  "09n": (
    <MaterialCommunityIcons name="weather-pouring" size={100} color="#add8e6" />
  ),
  "10d": (
    <MaterialCommunityIcons name="weather-rainy" size={100} color="#add8e6" />
  ),
  "10n": (
    <MaterialCommunityIcons name="weather-rainy" size={100} color="#add8e6" />
  ),

  // Grmljavina
  "11d": (
    <MaterialCommunityIcons
      name="weather-lightning"
      size={100}
      color="#add8e6"
    />
  ),
  "11n": (
    <MaterialCommunityIcons
      name="weather-lightning"
      size={100}
      color="#add8e6"
    />
  ),

  // Sneg
  "13d": (
    <MaterialCommunityIcons name="weather-snowy" size={100} color="white" />
  ),
  "13n": (
    <MaterialCommunityIcons name="weather-snowy" size={100} color="white" />
  ),

  // Magla
  "50d": <MaterialCommunityIcons name="weather-fog" size={100} color="white" />,
  "50n": <MaterialCommunityIcons name="weather-fog" size={100} color="white" />,
};
