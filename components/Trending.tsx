import AntDesign from "@expo/vector-icons/AntDesign";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window"); // Get the screen width

type TrendingProps = {
  posts: any;
};

const zoomIn: any = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};
const zoomOut: any = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};
const TrendingItem = ({ activeItem, item }: { activeItem: any; item: any }) => {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (activeItem !== item.$id && play) {
      setPlay(false);
    }
  }, [activeItem]);
  return (
    <Animatable.View
      className='mr-5'
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}>
      {play ? (
        <Video
          source={{ uri: item.video }}
          className='ml-5 mt-3 bg-white/10'
          style={{
            width: width * 0.82, // 80% chiều rộng màn hình
            height: 200, // Chiều cao cố định như mong muốn
            borderRadius: 20,
          }}
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
          className='relative justify-center items-center ml-5'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}>
          <ImageBackground
            source={{ uri: item.thumnail }}
            style={{
              width: width * 0.82, // 80% chiều rộng màn hình
              height: 200, // Chiều cao cố định như mong muốn
              borderRadius: 20,
            }}
            resizeMode='cover'
            className='my-5 overflow-hidden shadow-lg shadow-black/40 opacity-90'
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
            }} //
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
const Trending: React.FC<TrendingProps> = ({ posts = [] }) => {
  const [activeItem, setActiveItem] = useState(posts[1]?.$id);
  const viewableItemsChange = ({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.$id);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem
          activeItem={activeItem}
          item={item}
        />
      )}
      onViewableItemsChanged={viewableItemsChange}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      horizontal></FlatList>
  );
};

export default Trending;
