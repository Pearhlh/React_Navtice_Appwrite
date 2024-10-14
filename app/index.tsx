import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href='/(tabs)' />;
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='w-full justify-center items-center min-h-[85vh] px-4'>
          <Image
            source={require("../assets/images/react-logo.png")}
            className='w-[130px] h-[130px]'
            resizeMode='contain'
          />
          <CustomButton
            title='Continue with Email'
            handlePress={() => router.push("/sign-in")}
            containerStyles='w-full mt-7'></CustomButton>
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor='#161622'
        style='light' // Sử dụng barStyle thay vì style
      />
    </SafeAreaView>
  );
}
