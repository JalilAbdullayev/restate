import {ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {Card, FeaturedCard} from "@/components/Cards";
import Filters from "@/components/Filters";
import {useGlobalContext} from "@/lib/global-provider";
import {router, useLocalSearchParams} from "expo-router";
import {useAppwrite} from "@/lib/useAppwrite";
import {getLatestProperties, getProperties} from "@/lib/appwrite";
import {useEffect} from "react";
import NoResults from "@/components/NoResults";

const Index = () => {
    const {user} = useGlobalContext();
    const params = useLocalSearchParams<{ query?: string, filter?: string }>();
    const {data: latestProperties, loading: latestPropertiesLoading} = useAppwrite({
        fn: getLatestProperties
    });
    const {data: properties, loading, refetch} = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 6
        }, skip: true
    });

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    useEffect(() => {
        refetch({
            filter: params.filter!,
            query: params.query!,
            limit: 6
        });
    }, [params.filter, params.query]);

    return <SafeAreaView className='bg-white h-full'>
        <FlatList data={[1]} contentContainerClassName='px-5 pb-32'
                  ListHeaderComponent={<View className='flex flex-row items-center justify-between mt-5'>
                      <View className='flex flex-row'>
                          <Image source={{uri: user?.avatar}} className='size-12 rounded-full'/>
                          <View className='flex flex-col items-start ml-2 justify-center'>
                              <Text className='text-xs font-rubik text-black-100'>
                                  Good Morning
                              </Text>
                              <Text className='text-base font-rubik-medium text-black-300'>
                                  {user?.name}
                              </Text>
                          </View>
                      </View>
                      <Image source={icons.bell} className='size-6'/>
                  </View>} renderItem={() => <>
            <Search/>
            <View className='my-5'>
                <View className='flex flex-row items-center justify-between'>
                    <Text className='text-xl font-rubik-bold text-black-300'>
                        Featured
                    </Text>
                    <TouchableOpacity>
                        <Text className='text-base font-rubik-bold text-primary-300'>
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
                {latestPropertiesLoading ?
                    <ActivityIndicator size='large'
                                       className='text-primary-300 mt-5'/> : !latestProperties || latestProperties.length === 0 ?
                        <NoResults/> : <FlatList data={latestProperties}
                                                 renderItem={({item}) => <FeaturedCard item={item}
                                                                                       onPress={() => handleCardPress(item.$id)}/>}
                                                 horizontal bounces={false} showsHorizontalScrollIndicator={false}
                                                 keyExtractor={item => item.$id}
                                                 contentContainerClassName='flex gap-5 my-5'/>}
                <View className='flex flex-row items-center justify-between'>
                    <Text className='text-xl font-rubik-bold text-black-300'>
                        Our Recommendation
                    </Text>
                    <TouchableOpacity>
                        <Text className='text-base font-rubik-bold text-primary-300'>
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
                <Filters/>
                {loading ?
                    <ActivityIndicator size='large'
                                       className='text-primary-300 mt-5'/> : !properties || properties.length === 0 ?
                        <NoResults/> : <FlatList data={properties}
                                                 renderItem={({item}) => <Card item={item}
                                                                               onPress={() => handleCardPress(item.$id)}/>}
                                                 contentContainerClassName='flex gap-5 mt-5' numColumns={2}
                                                 keyExtractor={item => item.$id}/>}
            </View>
        </>}/>
    </SafeAreaView>;
}
export default Index;