import {Text, View} from "react-native";
import {Link} from "expo-router";

const Index = () =>
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }}>
        <Text>
            Edit app/index.tsx to edit this screen.
        </Text>
        <Link href='/sign-in'>
            Sign In
        </Link>
        <Link href='/explore'>
            Explore
        </Link>
        <Link href='/profile'>
            Profile
        </Link>
        <Link href='/properties/1'>
            Property
        </Link>
    </View>;

export default Index;