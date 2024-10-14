import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";

type SearchProps = {
  initialQuery?: any;
};

const SearchInput: React.FC<SearchProps> = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className='relative border-2 border-black-200 w-full h-16 bg-black-100 rounded-2xl space-x-4'>
      <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular ml-3'
        value={query}
        placeholder='Search for a video topic'
        placeholderTextColor='#CDCDE0'
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
        className='absolute right-4 h-full flex justify-center items-center'>
        <Ionicons
          className='px-3'
          size={24}
          name='search-outline'
          color='white'
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
