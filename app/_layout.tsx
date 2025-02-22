import "./globals.css";
import {SplashScreen, Stack} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import GlobalProvider from "@/lib/global-provider";

const RootLayout = () => {
    const [fontsLoaded] = useFonts({
        "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
        "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
        "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
        "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
        "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
        "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    });

    useEffect(() => {
        if(fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if(!fontsLoaded) return null;

    return (<GlobalProvider>
        <Stack screenOptions={{headerShown: false}}/>
    </GlobalProvider>)
};

export default RootLayout;