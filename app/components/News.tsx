import { Image, Text, View } from "react-native";

export default function CaseStudy() {
  return (
    <View className="w-[95%] mx-auto mt-[30px] ">
      <Text className="text-[20px] font-semibold mb-[12px]">
        Case Study for this app
      </Text>
      <View className="w-full">
        <Image
          className="min-w-full object-cover h-auto rounded-t-[20px]"
          source={require("../../assets/images/News-slika.png")}
        />
      </View>
      <View className="px-[10px] pt-[6px] pb-[12px] bg-white rounded-b-[20px]">
        <Text className="opacity-70 leading-normal">
          Feel free to click and it will take you to a page where you can see a
          description of the plan of how I did this whole app. I will explain
          what each station does, and exactly what data it contains and where it
          came from.
        </Text>
        <Text className="font-semibold text-[12px] mt-[20px]">
          This app is made by Aleksa Marjanovic
        </Text>
      </View>
    </View>
  );
}
