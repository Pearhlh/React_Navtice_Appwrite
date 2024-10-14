import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getAllPosts, getLastestPosts } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts, reFetch } = useAppwrite(getAllPosts);
  const { data: latestPost } = useAppwrite(getLastestPosts);

  const [refreshing, setRefreshing] = useState(false);
  const onRefesh = async () => {
    setRefreshing(true);
    await reFetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 -space-x-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='text-gray-100 text-sm font-pmedium'>
                  Welcome back
                </Text>
                <Text className='font-semibold text-xl text-white'>
                  {user?.username}
                </Text>
              </View>
            </View>
            <SearchInput />
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 font-pregular mb-3 text-lg'>
                Latest Videos
              </Text>
              <Trending posts={latestPost} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos found'
            subtitle='Be the first one to upload a video'
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefesh}
          />
        }></FlatList>
    </SafeAreaView>
  );
}
