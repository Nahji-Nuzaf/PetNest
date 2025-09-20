import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp, NativeStackNavigatorProps } from "@react-navigation/native-stack";
import { RootParamList } from "../App";

type SplashNavigationProps = NativeStackNavigationProp<RootParamList,"Splash">;

export default function SplashScreen() {

    const navigator = useNavigation<SplashNavigationProps>();

    return (
        <View style={styles.container}>

            <Image source={require("./img/img.png")} style={styles.image} />

            <Text style={styles.mainText}>
                Caring for your pets, made simple.
            </Text>

            <Text style={styles.subText}>
                Manage your pet’s health, reminders, and appointments with ease.
            </Text>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.logInButton} onPress={()=>{navigator.navigate("SignIn")}}>
                    <Text style={styles.logInButtonText}>Log In</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.registerText} onPress={()=>{navigator.navigate("SignUp")}}>New to PetNest ? Register</Text>
                </Pressable>
            </View>



            <StatusBar style="auto" />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 320,
        height: 320,
        resizeMode: "contain",  // cover, stretch, center
        marginBottom: 20
    },
    mainText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#EB6A1A",
        paddingHorizontal: 20,
        textAlign: "center",
        marginBottom: 40
    },
    subText: {
        fontSize: 15,
        fontWeight: '300',
        paddingHorizontal: 20,
        color: "black",
        textAlign: 'center',
        marginTop: 40
    },
    buttonContainer: {
        flexDirection: "column",
        // justifyContent: "space-between",
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logInButton: {
        // flex: 0.45,
        backgroundColor: "#EB6A1A",
        padding: 13,
        borderRadius: 50,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: "#EB6A1A",
        width: 325,
        marginHorizontal: 30
    },
    logInButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    registerText: {
        marginTop: 13,
        fontSize: 14,
        fontWeight: '300',
    }
});
