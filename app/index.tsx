import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import "../global.css";
import { getForeCastByCity } from "../Redux/ForeCastSlice";
import { getWeatherByLocation } from "../Redux/WeatherSlice";
import ForeCastOneDay from "./components/ForeCastOneDay";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import News from "./components/News";

export default function Index() {
  const weatherData = useSelector((state: any) => state.weather.weatherData);
  // ovo any moramo ovako da dodamo, jer gore u useEffect, dispatch ocekuje neki objekat a ne Thunk func
  const dispatch = useDispatch<any>();
  const currentCity = useSelector((state: any) => state.weather.currentCity);

  // Sada ovde nemamo disptach za onaj prazan state jer smo to odradili u Thunku
  useEffect(() => {
    //Ovde samo pozovemo tu Thunk funckiju (ona radi i dispatch i fetch podataka)
    dispatch(getWeatherByLocation("Belgrade"));
    // a ovo je Thunk za Forecast
    dispatch(getForeCastByCity("Belgrade"));

    // Ovo Belgrade i u jednom i u drugom znaci da ce Boegrad biti inicijalni gard
    // odnosno kada neko prvi put koristi bice mu podaci za Beograd
  }, [currentCity]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View
          // className=" px-[12px]"
          style={{ zIndex: 100, pointerEvents: "box-none" }}
        >
          <Header />
          <HeroSlider />
          <News />
          <ForeCastOneDay />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     width: "90%",
//     backgroundColor: "green",
//   },
//   temp: {
//     fontSize: 28,
//     fontWeight: 800,
//   },
// });
