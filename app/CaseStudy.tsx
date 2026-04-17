import { useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CaseStudyData } from "./components/CaseStudyData";

// ovo su importi kao za vizualizaciju koda za koje sam dao objasnsenja

export default function NewsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <ScrollView>
      <View className="mt-[20px] w-[95%] mx-auto">
        <Text className="font-semibold">
          Za svaki file imam objasnjenje i kod:
        </Text>
        <View className="mt-[20px] flex flex-row flex-wrap gap-[16px] justify-center">
          {CaseStudyData.map((link, index) => (
            <View key={index}>
              <Text
                className={`text-[16px] rounded-[6px] font-semibold py-[6px] px-[12px] ${currentIndex === index ? "bg-blue-700/60 text-white" : "bg-gray-300/70 text-black"}`}
                onPress={() => setCurrentIndex(index)}
              >
                {link.title}
              </Text>
            </View>
          ))}
        </View>
        <View className="mt-[40px] ">
          <Text className="text-[28px]">
            {CaseStudyData[currentIndex].title}
          </Text>
          <View className="mt-[20px] bg-[#1e1e1e] rounded-[10px] p-[15px] border border-slate-700 shadow-xl h-[400px]">
            {/* Header prozora kao u VS Code-u */}
            <View className="flex-row gap-2 mb-3 border-b border-slate-800 pb-2">
              <View className="w-3 h-3 rounded-full bg-red-500" />
              <View className="w-3 h-3 rounded-full bg-yellow-500" />
              <View className="w-3 h-3 rounded-full bg-green-500" />
            </View>

            <ScrollView
              nestedScrollEnabled={true} // Bitno jer imaš ScrollView unutar ScrollView-a
              className="p-4"
              horizontal={false}
              // showsHorizontalScrollIndicator={false}
              // showsVerticalScrollIndicator={false}
            >
              <ScrollView showsHorizontalScrollIndicator={true}>
                <Text className="text-[#9cdcfe] font-mono text-[13px]">
                  {CaseStudyData[currentIndex].code.trim()}
                </Text>
              </ScrollView>
            </ScrollView>
          </View>
          <Text className="my-[26px]">{CaseStudyData[currentIndex].des}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
