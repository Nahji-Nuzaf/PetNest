import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootParamList } from "../../App";
import React, { useState } from 'react';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SignInNavigationProps = NativeStackNavigationProp<RootParamList, "SignIn">;

export default function SignInScreen() {

    const navigation = useNavigation<SignInNavigationProps>();

    const [getEmail, setEmail] = React.useState('');
    const [getPassword, setPassword] = React.useState('');

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <AlertNotificationRoot>
                    <Image
                        source={require('../../assets/img/logofinal.png')} // update path to your actual logo
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.welcomeText}>Welcome !</Text>
                    <Text style={styles.signInText}>Sign In</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input} placeholder="Enter Email" onChangeText={setEmail} keyboardType="email-address" />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter password"
                            secureTextEntry
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={async () => {

                        const userSignIn = {
                            email: getEmail,
                            password: getPassword
                        };

                        const userSignInJSON = JSON.stringify(userSignIn);

                        const response = await fetch("https://a260e6972862.ngrok-free.app/PetNest_WebApp/SignIn", {

                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: userSignInJSON

                        });

                        if (response.ok) {

                            const json = await response.json();

                            if (json.status) {

                                try {
                                    console.log("Login response JSON:", json);
                                    
                                    const user = {
                                        // token: json.token,
                                        email: json.email,
                                        userId: json.userId
                                    };
                                    await AsyncStorage.setItem('user', JSON.stringify(user));
                                } catch (e) {
                                    console.log('Error saving user info:', e);
                                }

                                navigation.replace("Home");
                            } else {
                                Dialog.show({
                                    type: ALERT_TYPE.DANGER,
                                    title: 'Error',
                                    textBody: json.message,
                                    button: 'close',
                                })
                            }

                        } else {
                            Dialog.show({
                                type: ALERT_TYPE.DANGER,
                                title: 'Error',
                                textBody: 'Please Check your Details',
                                button: 'close',
                            })
                        }



                    }}>
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.registerButton} onPress={() => { navigation.navigate("SignUp") }}>
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                </AlertNotificationRoot>
            </ScrollView>
        </KeyboardAvoidingView>



    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 20,
        flexGrow: 1,
        justifyContent: 'center',
    },
    logo: {
        width: 220,
        height: 220,
        alignSelf: 'center',
        // marginBottom: 10,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#f97316', // orange color
        textAlign: 'center',
        marginBottom: 5,
    },
    signInText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 25,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        // fontWeight: '300',
        color: '#000',
        fontSize: 14,
    },
    input: {
        backgroundColor: '#e5e7eb', // light gray
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#964104ff'
    },
    loginButton: {
        backgroundColor: '#f97316', // orange
        paddingVertical: 12,
        borderRadius: 30,
        marginBottom: 15,
        marginTop: 25
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
        textAlign: 'center',
    },
    registerButton: {
        borderColor: '#f97316',
        borderWidth: 1.5,
        paddingVertical: 12,
        borderRadius: 25,
    },
    registerButtonText: {
        color: '#9ca3af', // gray
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
    },
});