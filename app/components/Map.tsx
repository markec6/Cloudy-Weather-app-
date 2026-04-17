import React from "react";
import { Platform, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";

export default function Map() {
  const weatherData = useSelector((state: any) => state.weather.weatherData);

  if (!weatherData) return null;

  const lat = weatherData.coord.lat;
  const lon = weatherData.coord.lon;

  // OpenStreetMap - koristimo za mapu, ne treba key vec samo njihov url
  // dinamicki ovde dodajemo lat i lon i koliki hocemo zoom mape
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.05},${lat - 0.05},${lon + 0.05},${lat + 0.05}&layer=mapnik&marker=${lat},${lon}`;

  // Za browser koristimo iframe tag
  if (Platform.OS === "web") {
    return (
      <View className="w-[95%] mx-auto rounded-[20px] h-[450px]">
        <Text className="text-[20px] font-semibold mb-[12px] mt-[20px]">
          Map
        </Text>
        <iframe src={osmUrl} className="h-full" />
        <View className="p-[12px] border-x border-b border-slate-200 rounded-b-[20px] flex flex-col gap-[6px] bg-white">
          <Text className="opacity-60 text-[12px]">Location</Text>
          <Text className="text-[18px] font-semibold">{weatherData.name}</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="w-[95%] mx-auto h-[350px] rounded-[20px]">
      <Text className="text-[20px] font-semibold mb-[12px] mt-[20px]">Map</Text>
      {/** a za telefon koristimo webView tag**/}
      <WebView source={{ uri: osmUrl }} />
      <View className="p-[12px] border-x border-b border-slate-200 rounded-b-[20px] flex flex-col gap-[6px] bg-white">
        <Text className="opacity-60 text-[12px]">Location</Text>
        <Text className="text-[18px] font-semibold">{weatherData.name}</Text>
      </View>
    </View>
  );
}
