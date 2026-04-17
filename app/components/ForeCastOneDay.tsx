import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function ForeCastOneDay() {
  const foreCastData = useSelector((state: any) => state.forecast.forecastData);
  const weatherData = useSelector((state: any) => state.weather.weatherData);

  // posto ovaj API salje datum u sekundama, moramo to da pretvorimo u normalan datum
  const formatDate = (timeParse: any) => {
    // sa ovim new Date mi kreiramo nas date objekat
    const date = new Date(timeParse * 1000); // uvek ga mnozimo sa 1000
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    const formatted = date.toLocaleDateString("en-US", options);
    return formatted;
  };

  // ovo je funkcija za dobijanje tacno sata, na primer 2PM
  const formatToHour = (timeString: any) => {
    const date = new Date(timeString);
    // en-US (uvek prvi arg, onako kako ga pisu Ameri)
    return date.toLocaleTimeString("en-US", {
      // a ovo su nase opcije
      hour: "numeric", // a po ovome se zna da je sat u pitanju
      hour12: true, // Ovo dodaje AM/PM
    });
  };

  return (
    <View className="w-[95%] mx-auto mt-[30px]">
      <Text className="text-[20px] font-semibold mb-[12px]">Forecast</Text>
      <View className="bg-white p-[16px] rounded-[20px]">
        <View className="mb-[32px]">
          <Text className="opacity-70">
            {weatherData?.weather?.[0].description}
          </Text>
          <Text className="text-[22px] font-semibold opacity-90">
            {/** pristupamo mu: uvek ta parse funkcija(i unutra pristupimo APi datumu koji je u sekundama)**/}
            {formatDate(weatherData?.dt)}
          </Text>
        </View>
        <View className="flex flex-row justify-between items-center">
          {foreCastData?.list ? (
            foreCastData.list.slice(0, 5).map((day: any, index: number) => (
              <View
                key={index}
                className="flex flex-col gap-[6px] items-center"
              >
                <Text className="text-[12px] opacity-70">
                  {formatToHour(day.dt_txt)}
                </Text>
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
                  }}
                  className="w-10 h-10 bg-blue-700/70 rounded-full"
                />
                <Text className="font-semibold mt-[5px]">
                  {Math.round(day.main?.temp)}°C
                </Text>
              </View>
            ))
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
      <View></View>
    </View>
  );
}
