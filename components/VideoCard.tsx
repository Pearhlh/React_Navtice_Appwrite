import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ResizeMode, Video } from "expo-av";
const { width } = Dimensions.get("window"); // Get the screen width

const VideoCard = ({
  video: {
    title,
    thumnail,
    video,
    creator: { username, avatar },
  },
}: {
  video: any;
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className='flex-col items-center px-4 mb-14'>
      <View className='flex-row gap-3 items-start'>
        <View className='justify-center items-center flex-row flex-1'>
          <View className='w-[46px] h-[46px] rounded-lg border-secondary justify-center items-center p-0.5'>
            <Image
              source={{ uri: avatar }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>
          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text
              className='text-white font-psemibold'
              numberOfLines={1}>
              {title}
            </Text>
            <Text
              className='text-xs text-gray-100 font-pregular'
              numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View className='pt-2'>
          <Ionicons
            name='menu-outline'
            color='white'
            size={28}></Ionicons>
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className='bg-white/10 w-full h-60 rounded-xl mt-3'
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay
          // onPlaybackStatusUpdate={(status: any) => {
          //   if (status.didJustFinish) {
          //     setPlay(false);
          //   }
          // }}
        />
      ) : (
        <TouchableOpacity
          className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}>
          <Image
            source={{ uri: thumnail }}
            className='w-full h-full rounded-xl opacity-[0.82]'
            resizeMode='cover'
          />

          <AntDesign
            name='playcircleo'
            size={40}
            color='white'
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -20 }, { translateY: -20 }],
            }} // Correct centering
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
