import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='create'
        options={{
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                borderWidth: focused ? 1 : 0, // 1px border when focused, no border otherwise
                borderColor: focused ? "white" : "transparent", // Border color
                borderRadius: 25, // Ensures the shape is a circle
                overflow: "hidden", // Ensures the avatar stays inside the circle
                width: 30, // Width and height must be the same for the circle
                height: 30,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbwwMBPicmjNtg-IabxVH3dRzILFpzhkgOUg&s", // Replace with the avatar URL
                }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 24, // Make the avatar image round
                }}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
