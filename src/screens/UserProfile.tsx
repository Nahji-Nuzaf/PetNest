// UserProfile.tsx

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { RootParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

type UserProfileNavigationProps = NativeStackNavigationProp<RootParamList, "UserProfile">;


const UserProfile = () => {
    const navigation = useNavigation<UserProfileNavigationProps>();
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                {/* Profile Image Placeholder */}
                <View style={styles.profileImagePlaceholder} />

                {/* Heading */}
                <Text style={styles.heading}>User Profile</Text>

                {/* Input Fields */}
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input} />

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} keyboardType="email-address" />

                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} secureTextEntry />

                <Text style={styles.label}>Mobile</Text>
                <TextInput style={styles.input} keyboardType="phone-pad" />

                <Text style={styles.label}>Address</Text>
                <TextInput style={styles.input} multiline numberOfLines={2} />

                {/* Add Pet & My Pets Buttons */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.outlinedGreenBtn} onPress={()=>{navigation.navigate("AddPet")}}>
                        <Text style={styles.outlinedGreenText}>Add Pet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.outlinedGreenBtn} onPress={()=>{navigation.navigate("MyPets")}}>
                        <Text style={styles.outlinedGreenText}>My Pets</Text>
                    </TouchableOpacity>
                </View>

                {/* Save & Edit Buttons */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.filledOrangeBtn} onPress={()=>{navigation.navigate("Home")}}>
                        <Text style={styles.filledBtnText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.outlinedOrangeBtn}>
                        <Text style={styles.outlinedOrangeText} onPress={()=>{navigation.navigate("Reminders")}}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default UserProfile;


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // backgroundColor: "#fff",
        alignItems: "center",
        padding: 20,
    },
    profileImagePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#999",
        marginVertical: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#EF6C0B",
        marginBottom: 20,
    },
    label: {
        alignSelf: "flex-start",
        marginBottom: 4,
        marginTop: 10,
        fontSize: 14,
        color: "#333",
    },
    input: {
        width: "100%",
        backgroundColor: "#E6E6E6",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
    },
    outlinedGreenBtn: {
        flex: 1,
        borderColor: "#16A34A",
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: 5,
        paddingVertical: 12,
        alignItems: "center",
    },
    outlinedGreenText: {
        color: "#16A34A",
        fontWeight: "600",
    },
    filledOrangeBtn: {
        flex: 1,
        backgroundColor: "#EF6C0B",
        borderRadius: 8,
        marginHorizontal: 5,
        paddingVertical: 12,
        alignItems: "center",
    },
    filledBtnText: {
        color: "#fff",
        fontWeight: "600",
    },
    outlinedOrangeBtn: {
        flex: 1,
        borderColor: "#EF6C0B",
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: 5,
        paddingVertical: 12,
        alignItems: "center",
    },
    outlinedOrangeText: {
        color: "#EF6C0B",
        fontWeight: "600",
    },
});

