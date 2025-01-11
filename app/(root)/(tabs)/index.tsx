import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {Card, FeaturedCard} from "@/components/Cards";
import Filters from "@/components/Filters";
import {useGlobalContext} from "@/lib/global-provider";

const Index = () => {
    const {user} = useGlobalContext();
    return <SafeAreaView className='bg-white h-full'>
        <FlatList data={[1]} contentContainerClassName='px-5 pb-32' renderItem={() => <>
            <View className='flex flex-row items-center justify-between mt-5'>
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
            </View>
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
                <FlatList data={[1, 2, 3]} renderItem={item => <FeaturedCard/>} horizontal bounces={false}
                          showsHorizontalScrollIndicator={false} contentContainerClassName='flex gap-5 my-5'/>
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
                <FlatList data={[1, 2, 3, 4]} renderItem={item => <Card/>} contentContainerClassName='flex gap-5 mt-5'
                          numColumns={2}/>
            </View>
        </>}/>
    </SafeAreaView>;
}
export default Index;