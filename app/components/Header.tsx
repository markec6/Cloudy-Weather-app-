import { getWeatherByLocation, setCurrentCity } from "@/Redux/WeatherSlice";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Header() {
  // state za sam API weather object
  const weatherData = useSelector((state: any) => state.weather.weatherData);
  // state za prikaz gradova iz searcha
  const historyLocation = useSelector(
    (state: any) => state.weather.historyLocation,
  );
  // state za promenu slide da nam se automatski u header ispise ime trenutnog grada
  const currentCity = useSelector((state: any) => state.weather.currentCity);

  const [isOpen, setIsOpen] = useState(false);
  const [inSearch, setInSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch<any>();

  return (
    // dva uslova 1. za search location, 2. za menu

    // USLOV ZA SEARCH LOCATION
    <View style={{ zIndex: 10 }} className="px-[12px]">
      {inSearch ? (
        <View style={{ zIndex: 1000 }}>
          <View className="flex flex-row items-center justify-between pt-[10px] pb-[5px]">
            <TextInput
              placeholder="Search a city"
              autoFocus={true}
              value={searchValue}
              onChangeText={(text) => setSearchValue(text)}
              className=" outline-none border-2 border-blue-700/60 p-[12px] w-[90%] rounded-[6px] text-[16px]"
              onSubmitEditing={() => {
                if (searchValue.trim().length > 0) {
                  dispatch(getWeatherByLocation(searchValue));
                  dispatch(setCurrentCity(searchValue));
                  setInSearch(false);
                  setSearchValue("");
                }
              }}
            ></TextInput>
            <View>
              <Entypo
                name="cross"
                size={30}
                color="black"
                onPress={() => setInSearch(false)}
              />
            </View>
          </View>
        </View>
      ) : (
        <>
          {/** Ovo je galvni Header, kada je state false **/}
          <View className="flex-row w-full justify-between items-center py-[12px] mt-[10px]">
            <TouchableOpacity onPress={() => setIsOpen(true)}>
              <Ionicons name="menu" size={26} color="black" />
            </TouchableOpacity>

            <Text className="text-[20px] font-semibold">
              {currentCity || "Belgrade"}
            </Text>

            <TouchableOpacity onPress={() => setInSearch(true)}>
              <Feather name="search" size={26} color="black" />
            </TouchableOpacity>
          </View>

          {/** Menu kada je otvoren **/}
          {isOpen && (
            <View
              className="flex flex-col justify-between items-start justify-items-start"
              style={{
                position: "absolute",
                top: 0, // Da pokrije i padding roditelja
                left: -20,
                width: "120%",
                height: height,
                backgroundColor: "#2563eb",
                zIndex: 999,
                padding: 24,
                paddingTop: 20,
              }}
            >
              <View className="flex flex-col gap-[24px] px-[12px]">
                <TouchableOpacity onPress={() => setIsOpen(false)}>
                  <Entypo name="cross" size={30} color="white" />
                </TouchableOpacity>

                <View>
                  <Text className="text-[14px] text-white opacity-80 mb-[8px]">
                    Current location
                  </Text>
                  <Text className="text-[20px] text-white font-semibold">
                    {weatherData?.name}
                  </Text>
                </View>
              </View>

              <View className="flex flex-col gap-[10px] px-[12px]">
                <Text className="text-[16px] font-semibold text-white">
                  Search history:
                </Text>
                {historyLocation && historyLocation.length > 0 ? (
                  [...historyLocation]
                    .reverse()
                    .slice(0, 3)
                    .map((city: any, index: number) => (
                      <View
                        className="flex flex-row items-center gap-[6px]"
                        key={index}
                      >
                        <Entypo name="location-pin" size={24} color="black" />
                        <Text className="text-white font-bold text-[20px]">
                          {city.name}
                        </Text>
                      </View>
                    ))
                ) : (
                  <Text className="text-white opacity-80 font-semibold">
                    Empty search History
                  </Text>
                )}
              </View>

              <View className="flex flex-col gap-[12px] px-[12px]">
                <Text className="text-white font-semibold">Settings</Text>
                <Text className="text-white font-semibold">Share this app</Text>
                <Text className="text-white font-semibold">Rate this app</Text>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
}
