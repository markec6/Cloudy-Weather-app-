import { Dimensions, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import za Carousel slide
import { getForeCastByCity } from "@/Redux/ForeCastSlice";
import { setCurrentCity, setWeatherData } from "@/Redux/WeatherSlice";
import { weatherIcons } from "@/weatherIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function HeroSlider() {
  // state za samu listu gradova iz menu
  const historyLocations = useSelector(
    (state: any) => state.weather.historyLocation,
  );

  // treba nam i state za ceo objekat za cellu app
  const weatherData = useSelector((state: any) => state.weather.weatherData);
  const dispatch: any = useDispatch();

  return (
    <View className="px-[12px] items-center mt-[20px]">
      {/* Carousel je paket za slide za expo**/}
      <Carousel
        key={historyLocations.length}
        // dodamo sve ovo nepohodno
        loop={false}
        // mode="parallax"
        width={width}
        height={250}
        style={{ width: width }}
        autoPlay={false}
        // koristimo reverse na vec postojeci niz jer ga on menja
        // stavlja najnoviji search grad na prvo mesto na slideu
        data={[...historyLocations].reverse().slice(0, 3)}
        scrollAnimationDuration={1000}
        // Ovde cemo da odradimo logiku za promenu slide da se automatski promene podaci na celoj prilagodjeni za taj grad
        // ovaj onSNapToItem je props koji dolazi uz ovaj slide kao props koji radi na promenu indexa
        onSnapToItem={(index) => {
          // ovde kazemo da je hstory iz menu jednak trenutnom indexu
          // ali isto tako ovaj reverse direknto menja vec postojeci state iz reduxa
          const selectedCity = [...historyLocations].reverse().slice(0, 3)[
            index
          ];
          // if (ako je promena tacna)
          if (selectedCity) {
            // ovde samo kazemo da je trenutni grad bas ovaj iz uslova if koji promenimo na slide
            // jer je u slice inicijalno "Beograd"
            dispatch(setCurrentCity(selectedCity.name));
            // znaci na slide mi samo u taj weather state dodamo da na slide da podatke (za celu app) bas za taj grad
            dispatch(setWeatherData(selectedCity));
            // takodje moramo da napunimo foreacast state na promenu slide zbog vremena za naredne dane
            dispatch(getForeCastByCity(selectedCity.name));
          }
        }}
        // render je ono sto prikazuje jedan slide
        renderItem={({ item: city }: { item: any }) => (
          // ovo je samo container za jedan slide
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {/* Ovo je zapravo jedan slide */}
            <View className="bg-blue-600 w-[95%] p-6 rounded-[30px] shadow-lg">
              {/*Gornji deo jednog slide  */}
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <Text className="text-white/60 text-[14px]">
                    Air density: {city.wind?.gust || "0"}
                  </Text>
                  <Text className="text-white text-[24px] font-bold capitalize">
                    {city.weather[0]?.description}
                  </Text>

                  {/* ovo je lokcaija */}
                  <View className="flex-row items-center mt-2 opacity-80">
                    <Entypo name="location-pin" size={16} color="white" />
                    <Text className="text-white text-[16px] ml-1">
                      {city.name}
                    </Text>
                  </View>
                </View>

                {/* Ovo je ikonica  */}
                <View>{weatherIcons[city.weather[0]?.icon]}</View>
              </View>

              {/* Ovo je donji deo*/}
              <View className="flex-row items-end justify-between mt-2">
                {/* TEMPERATURA SA CELZIJUSOM */}
                <Text className="text-white text-[48px] font-bold">
                  {/*mora da se koristi Math.round zbog decimala, da ne bi dobili ,1234 nego da ga zaokruzimo na celi broj*/}
                  {Math.round(city.main.temp)}°C
                </Text>

                {/* ovo su podatci u donjem desnom uglu */}
                <View className="flex-row gap-4 mb-2">
                  {/* vlaznost vazduha po podacima */}
                  <View className="items-center">
                    <Text className="text-white/60 text-[10px]">Humidity</Text>
                    <Text className="text-white font-semibold">
                      {city.main.humidity}%
                    </Text>
                  </View>
                  {/* Jacina vetra u sekundi*/}
                  <View className="items-center">
                    <Text className="text-white/60 text-[10px]">Wind</Text>
                    <Text className="text-white font-semibold">
                      {Math.round(city.wind.speed)}m/s
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
