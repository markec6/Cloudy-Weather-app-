import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import "../global.css";
import { getWeatherByLocation } from "../Redux/WeatherSlice";
import Header from "./components/Header";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);

  // ovo bi nam bio UseEffect gde mi tom Servicu samo kazemo oji cemo grad

  // useEffect(() => {
  //   const finalData = async () => {
  //     try {
  //       const res = await fetchWeatherData("Belgrade");
  //       dispatch(setWeatherData(res));
  //       setIsLoading(true);
  //       console.log(res);
  //     } catch (err) {
  //       console.log("Neka je greska ", err);
  //     }
  //   };

  //   finalData();
  // }, []);

  // Posto mi imamo Thunk funkciju u weatherSlice (koja redi sav dispatch i logiku za gradove)

  useEffect(() => {
    //Ovde samo pozovemo tu Thunk funckiju (ona radi i dispatch i fetch podataka)
    dispatch(getWeatherByLocation("Belgrade"));
  }, []);

  const weatherData = useSelector((state: any) => state.weather.weatherData);
  // ovo any moramo ovako da dodamo, jer gore u useEffect, dispatch ocekuje neki objekat a ne Thunk func
  const dispatch = useDispatch<any>();

  return (
    <SafeAreaView>
      <View
        className=" px-[12px]"
        style={{ zIndex: 100, pointerEvents: "box-none" }}
      >
        <Header />
        <Text>
          {weatherData ? `${Math.round(weatherData.main.temp)}°C` : "..."}
        </Text>
        <Text className="font-bold">Temperature:</Text>
      </View>
    </SafeAreaView>
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
