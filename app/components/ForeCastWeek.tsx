import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function ForeCastWeek() {
  const weatherData = useSelector((state: any) => state.weather.weatherData);
  // a ovde smo selektovali taj forecast state, ali iz njega targetirali tacno listu, jer znamo da on ima listu od 40 podataka
  const listFromRedux = useSelector(
    (state: any) => state.forecast.forecastData?.list,
  );

  // ovo smo samo kopirali iz prolse sekcije da bi mogao da nam vrati datum
  const formatDate = (timeParse: any) => {
    // sa ovim new Date mi kreiramo nas date objekat
    const date = new Date(timeParse * 1000); // uvek ga mnozimo sa 1000
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // ovo je samo funkcija gde filtriramo bas svaki dan tacno u 12 popodne
  const getWeekForecast = (list: any) => {
    if (!list) return [];
    // Ako su list podaci stigli onda ih filtriraj
    return list.filter((item: any) => item.dt_txt.includes("12:00:00"));
  };

  // e a ovde sada kazemo uslov da ako u listi ima nesto onda ti tu listu filtriraj kroz tu funkciju
  const weekData = getWeekForecast(listFromRedux);

  return (
    <View className="w-[95%] mx-auto mt-[30px]">
      <Text className="text-[20px] font-semibold mb-[12px]">Forecast</Text>

      <View className="bg-white p-[16px] rounded-[20px]">
        {/* Gornji deo: Opis i Datum */}
        <View className="mb-[32px]">
          <Text className="opacity-70">
            {weatherData?.weather?.[0].description}
          </Text>
          <Text className="text-[22px] font-semibold opacity-90">
            {formatDate(weatherData?.dt)}
          </Text>
          <Text style={{ textAlign: "right", opacity: 0.6 }}>Max/Min</Text>
        </View>

        {/* Lista dana */}
        {weekData.map((day: any, index: number) => {
          // znaci metoda za dobijanje svakog dana u nedelji
          // prvo moramo da ih definisemo
          const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          // zatim smo ovde kreirali nas Date objekat
          const date = new Date(day.dt * 1000);
          const dayName = days[date.getDay()];

          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              {/**Leva strana**/}
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: "rgba(29, 78, 216, 0.7)", // bg-blue-700/70
                    borderRadius: 24,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
                    }}
                    className="w-12 h-12 bg-blue-700/70 rounded-full"
                  />
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    marginLeft: 16,
                  }}
                >
                  {dayName}
                </Text>
              </View>

              {/** Desna strana **/}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 14, fontWeight: "700" }}>
                  {Math.round(day.main.temp_max)}°C
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    opacity: 0.5,
                    marginLeft: 4,
                  }}
                >
                  / {Math.round(day.main.temp_min - 8)}°C
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
