// MyPets.tsx

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // for back icon
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";


type MyPetsNavigationProps = NativeStackNavigationProp<RootParamList, "MyPets">;

export default function MyPets () {
    const navigation = useNavigation<MyPetsNavigationProps>();

    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>My Pets</Text>
                <View style={{ width: 24 }} /> 
            </View>

            <TouchableOpacity
                style={styles.petCard}
                onPress={() => navigation.navigate('PetDetails')}
            >
                <View style={styles.imagePlaceholder} />
                <View style={styles.petInfo}>
                    <Text style={styles.petName}>Bella</Text>
                    <Text style={styles.petType}>Dog</Text>
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#EF6C0B",
    },
    petCard: {
        backgroundColor: "#FECBAF",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginBottom: 15,
    },
    imagePlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#000",
        marginRight: 15,
        backgroundColor: "#fff",
    },
    petInfo: {
        flex: 1,
    },
    petName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    petType: {
        fontSize: 14,
        color: "#444",
        marginTop: 2,
    },
});
