import { StyleSheet, Text, View } from "react-native";
import React from "react";
interface InfoBoxProps {
  title: any;
  subtitle?: any;
  containerStyles?: any;
  titleStyles?: any;
}
const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-semibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className='text-sm text-gray-100 text-center font-regular'>
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
