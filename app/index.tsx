import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import "../global.css";
import { getForeCastByCity } from "../Redux/ForeCastSlice";
import {
  getWeatherByLocation,
  setCurrentCity,
  setRehydrated,
} from "../Redux/WeatherSlice";
import Footer from "./components/Footer";
import ForeCastOneDay from "./components/ForeCastOneDay";
import ForeCastWeek from "./components/ForeCastWeek";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import Map from "./components/Map";
import News from "./components/News";
import SunCondition from "./components/SunCondition";

export default function Index() {
  const weatherData = useSelector((state: any) => state.weather.weatherData);
  // ovo any moramo ovako da dodamo, jer gore u useEffect, dispatch ocekuje neki objekat a ne Thunk func
  const dispatch = useDispatch<any>();
  const currentCity = useSelector((state: any) => state.weather.currentCity);
  const isRehydrated = useSelector((state: any) => state.weather.isRehydrated);

  // ovo je za linkovanje za neku drugu stranicu
  const router = useRouter();

  // Sada ovde nemamo disptach za onaj prazan state jer smo to odradili u Thunku
  useEffect(() => {
    // on nece nastaviti da dobija podatke ni za BG ako je ovo true
    // if (!isRehydrated) return;

    //Ovde samo pozovemo tu Thunk funckiju (ona radi i dispatch i fetch podataka)
    dispatch(getWeatherByLocation(currentCity));
    // a ovo je Thunk za Forecast
    dispatch(getForeCastByCity(currentCity));

    // Ovo Belgrade i u jednom i u drugom znaci da ce Boegrad biti inicijalni gard
    // odnosno kada neko prvi put koristi bice mu podaci za Beograd
  }, [currentCity, isRehydrated]);

  useEffect(() => {
    const loadCity = async () => {
      // ovde kazemo await, da ne ide dalje dok ne vidi sta je u selectedCity u memoriji telefona
      const savedCity = await AsyncStorage.getItem("selectedCity");
      // kazemo ako tamo ima neki grad, onda ga azuriraj podatke bas za taj grad
      if (savedCity) {
        dispatch(setCurrentCity(savedCity));
      }
      // psoot je inicijalno false, ovde kazemo ako si nasao zeljeni grad i azurirao podatke za njega
      // onda zavrsi proveru sa ovim true
      dispatch(setRehydrated(true));
    };
    loadCity();
  }, []); // samim tim sto je ovo prazno [], rekli smo uradi ovo samo jednom kada se app pokrene

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View
          // className=" px-[12px]"
          style={{ zIndex: 100, pointerEvents: "box-none" }}
        >
          <Header />
          <HeroSlider />
          {/** da bi prikazali nesto mora da bude u TouchableOpacity**/}
          <TouchableOpacity
            // a sa ovim router.push gadjamo nasu rutu /
            onPress={() => router.push("/CaseStudy")}
            className="active:opacity-50"
          >
            <News />
          </TouchableOpacity>
          <ForeCastOneDay />
          <ForeCastWeek />
          <Map />
          <SunCondition />
          <Footer />
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
