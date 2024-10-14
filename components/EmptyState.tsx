import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}
const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View className='justify-center items-center px-4'>
      <Ionicons
        color='white'
        name='search-outline'
        size={100}></Ionicons>
      <Text className='text-gray-100 mt-2 tex-sm font-pmedium'>{title}</Text>
      <Text className='text-white text-center mt-2 text-xl font-semibold'>
        {subtitle}
      </Text>
      <CustomButton
        title='Create video'
        handlePress={() =>
          router.push({
            pathname: "/(tabs)/create",
          })
        }
        containerStyles='w-full my-5'
        textStyles='text-base font-bold'
      />
    </View>
  );
};

export default EmptyState;
