import {View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {router, useLocalSearchParams} from "expo-router";
import {useAppwrite} from "@/lib/useAppwrite";
import {getProperties} from "@/lib/appwrite";
import {SafeAreaView} from "react-native-safe-area-context";
import Search from "@/components/Search";
import NoResults from "@/components/NoResults";
import {Card} from "@/components/Cards";
import Filters from "@/components/Filters";
import icons from "@/constants/icons";

const Explore = () => {
    const params = useLocalSearchParams<{ query?: string, filter?: string }>();
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
        <FlatList data={[1]} contentContainerClassName='px-5 pb-32' ListHeaderComponent={<View>
            <View>
                <View className='flex flex-row items-center justify-between mt-5'>
                    <TouchableOpacity onPress={() => router.back()}
                                      className='flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center'>
                        <Image source={icons.backArrow} className='size-5'/>
                    </TouchableOpacity>
                    <Text className='text-base mr-2 text-center font-rubik-medium text-black-300'>
                        Search for Your Ideal Home
                    </Text>
                    <Image source={icons.bell} className='size-6'/>
                </View>
            </View>
            <Search/>
            <View className='mt-5'>
                <Text className='text-xl font-rubik-bold text-black-300 mt-5'>
                    Found {properties?.length} properties.
                </Text>
            </View>
        </View>} renderItem={() =>
            <View className='my-5'>
                <Filters/>
                {loading ? <ActivityIndicator size='large'
                                              className='text-primary-300 mt-5'/> : !properties || properties.length === 0 ?
                    <NoResults/> : <FlatList data={properties}
                                             renderItem={({item}) => <Card item={item}
                                                                           onPress={() => handleCardPress(item.$id)}/>}
                                             contentContainerClassName='flex gap-5 mt-5' numColumns={2}
                                             keyExtractor={item => item.$id}/>}
            </View>}/>
    </SafeAreaView>
}
export default Explore
