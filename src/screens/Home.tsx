import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

type HomeNavigationProps = NativeStackNavigationProp<RootParamList, "Home">;

export default function HomeScreen() {

    const navigation = useNavigation<HomeNavigationProps>();

    return (
        
            <SafeAreaView style={styles.container}>


                <View style={styles.header}>
                    <Text style={styles.greeting}>
                        <Text style={styles.hello}>Hello, </Text>
                        Nahji Nuzaf
                    </Text>
                </View>


                <View style={styles.banner} />


                <Text style={styles.sectionTitle}>Explore</Text>
                <View style={styles.row}>
                    <View style={styles.card} />
                    <View style={styles.card} />
                </View>


                {/* <Text style={styles.sectionTitle} onPress={()=>{navigation.navigate("MyPets")}}>My Pets</Text> */}

                <View style={styles.sectionHeader}>
                    <Text
                        style={styles.sectionTitle}
                        onPress={() => navigation.navigate("MyPets")}
                    >
                        My Pets
                    </Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddPet")}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <View style={styles.card} />
                    <View style={styles.card} />
                </View>

                <Text style={styles.sectionTitle} onPress={() => navigation.navigate("Reminders")}>Reminders</Text>
                {/* <View style={styles.row}>
                    <View style={styles.card} />
                    <View style={styles.card} />
                </View> */}




            </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
    },
    greeting: {
        fontSize: 20,
        fontWeight: "600",
        color: "#000",
    },
    hello: {
        color: "#F97316", // orange
    },
    banner: {
        height: 230,
        backgroundColor: "#ecd13cff",
        borderRadius: 28,
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#F97316",
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    card: {
        flex: 1,
        height: 130,
        backgroundColor: "#E5E5E5",
        borderRadius: 15,
        marginHorizontal: 5,
    },



    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 2,
    },

    addButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#F97316", // orange
        justifyContent: "center",
        alignItems: "center",
        marginTop: -15,

        // subtle shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.5,
        elevation: 4,
    },

    addButtonText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: -2, // helps center "+"
    },


});
