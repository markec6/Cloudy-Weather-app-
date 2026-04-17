import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function SunCondition() {
  const weatherData = useSelector((state: any) => state.weather.weatherData);
  if (!weatherData) {
    return null;
  }

  // i ovde smo samo dodali i timezone kao arg, zbog zone
  const formatToHour = (timeString: any, timezone: any) => {
    const date = new Date((timeString + timezone) * 1000);
    // en-US (uvek prvi arg, onako kako ga pisu Ameri)
    return date.toLocaleTimeString("en-US", {
      // a ovo su nase opcije
      hour: "numeric", // a po ovome se zna da je sat u pitanju
      hour12: true, // Ovo dodaje AM/PM
      minute: "2-digit",
      timeZone: "UTC", // kljucno za vremensku zonu
    });
  };

  return (
    <View className="w-[95%] mx-auto mt-[20px]">
      <Text className="text-[20px] font-semibold mb-[12px]">Sun Condition</Text>
      <View className="p-[12px] bg-white rounded-[10px] flex flex-col gap-[32px]">
        <View className="flex flex-row justify-between pt-[10px]">
          <View>
            <Text className="text-[12px] opacity-70">Conditions</Text>
            <Text className="text-[18px] font-semibold">Sun</Text>
          </View>
          <View>
            <Text className="text-[12px] opacity-70">Timezone</Text>
            <Text className="text-[18px] font-semibold">
              {weatherData.timezone}
            </Text>
          </View>
        </View>
        <View className="w-[90%] mx-auto">
          <View className="w-[100%] h-[2px] bg-black/50"></View>
          <View className="flex flex-row justify-between mt-[5px]">
            <Text className="text-[14px] font-semibold opacity-80">
              {formatToHour(weatherData.sys.sunrise, weatherData.timezone)}
            </Text>
            <Text className="text-[14px] font-semibold opacity-80">
              {formatToHour(weatherData.sys.sunset, weatherData.timezone)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
