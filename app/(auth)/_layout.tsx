import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
const AuthLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name='sign-in'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='sign-up'
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
