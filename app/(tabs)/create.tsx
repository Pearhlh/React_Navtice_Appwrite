import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FormField from "@/components/FormField";
import { ResizeMode, Video } from "expo-av";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

import { router } from "expo-router";
import { createVideoPost } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
// Định nghĩa kiểu của video có thể là string hoặc một đối tượng với uri

interface FormProps {
  title?: string;
  video?: any | null;
  thumbnail?: any | null;
  prompt?: string;
}
const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  } as FormProps);
  const openPicker = async (selectType: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedAsset = result.assets[0]; // Get the selected asset

      // Ensure the selected asset has the required fields before setting it to the form
      if (selectedAsset && selectedAsset.uri) {
        const validFile = {
          uri: selectedAsset.uri,
          fileName: selectedAsset.fileName || "unknown", // Use a default name if missing
          mimeType: selectedAsset.mimeType,
          fileSize: selectedAsset.fileSize || 0, // Default to 0 if fileSize is missing
        };

        if (selectType === "image") {
          setForm({ ...form, thumbnail: validFile });
        } else if (selectType === "video") {
          setForm({ ...form, video: validFile });
        }
      } else {
        Alert.alert("Error", "Selected file is not valid. Please try again.");
      }
    } else {
      Alert.alert("Document picker canceled.");
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("Please fill in all the fields");
    }

    // Check if the selected files are valid
    if (!form.thumbnail.uri || !form.video.uri) {
      return Alert.alert(
        "Invalid file: Please select valid video and thumbnail files."
      );
    }

    setUploading(true);
    try {
      await createVideoPost({ ...form, userId: user.$id });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/(tabs)");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-semibold'>Upload video</Text>
        <FormField
          title='Video title'
          value={form.title || ""}
          placeholder='Give your video a catchy title...'
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles='mt-10'
        />
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className='w-full h-64 rounded-2xl'
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                  <MaterialCommunityIcons
                    name='upload'
                    size={50}
                    color='white'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className='mt-7 space-x-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode='cover'
                className='w-full h-64 rounded-2xl'
              />
            ) : (
              <View className='w-full h-20 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='flex-row w-7 h-7 border border-dashed border-secondary-100 justify-center items-center'>
                  <MaterialCommunityIcons
                    name='upload'
                    size={25}
                    color='white'
                  />
                </View>
                <Text className='text-base text-gray-100 font-pmedium'>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title='AI Prompt'
          value={form.prompt || ""}
          placeholder='The prompt you used to create this video'
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles='mt-7'
        />
        <CustomButton
          title='Submit & Publish'
          handlePress={submit}
          containerStyles='mt-7'
          textStyles='font-semibold'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
