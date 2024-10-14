import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import { searchPosts } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const { query } = useLocalSearchParams();
  const { data: posts, reFetch } = useAppwrite(() => searchPosts(query + ""));
  useEffect(() => {
    reFetch();
  }, [query]);
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>
            <Text className='text-gray-100 text-sm font-pmedium'>
              Search Results
            </Text>
            <Text className='font-semibold text-xl text-white'>{query}</Text>
            <SearchInput initialQuery={query} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos found'
            subtitle='No videos found for this search query'
          />
        )}></FlatList>
    </SafeAreaView>
  );
}
