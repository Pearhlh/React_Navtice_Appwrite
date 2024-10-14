import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type FormFieldProps = {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
};

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType = "default",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='relative border-2 border-black-200 w-full h-16 bg-black-100 rounded-2xl'>
        <TextInput
          className='w-full h-full px-4 text-white font-psemibold text-[16px]'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity
            className='absolute right-4 h-full flex justify-center items-center'
            onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              className='px-3'
              size={24}
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              color='white'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
