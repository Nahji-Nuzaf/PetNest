import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Button, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from 'react-native';
// import React from "react";
import React, { useState } from 'react';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


type SignUpNavigationProps = NativeStackNavigationProp<RootParamList, "SignUp">;

export default function SignUpScreen() {

    const navigation = useNavigation<SignUpNavigationProps>();

    const [getUserName, setUserName] = React.useState('');
    const [getEmail, setEmail] = React.useState('');
    const [getPassword, setPassword] = React.useState('');
    const [getConfirmPassword, setConfirmPassword] = React.useState('');

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
                    <Text style={styles.signInText}>Sign Up & Register</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput style={styles.input} placeholder="Enter username" onChangeText={setUserName} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input} placeholder="Enter email" onChangeText={setEmail} keyboardType="email-address"/>
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

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="confirm password"
                            secureTextEntry
                            onChangeText={setConfirmPassword}
                        />
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={async () => {

                        const user = {
                            username: getUserName,
                            email: getEmail,
                            password: getPassword,
                            confirmPassword: getConfirmPassword
                        };

                        const userJSON = JSON.stringify(user);

                        const response = await fetch("https://a260e6972862.ngrok-free.app/PetNest_WebApp/SignUp", {

                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: userJSON

                        });

                        if (response.ok) {

                            const json = await response.json();

                            if (json.status) {
                                // Dialog.show({
                                //     type: ALERT_TYPE.SUCCESS,
                                //     title: 'Success',
                                //     textBody: "Congrats! Welcome to PetNest",
                                //     button: 'close',
                                // })

                                navigation.navigate("Home");

                            } else {
                                Dialog.show({
                                    type: ALERT_TYPE.DANGER,
                                    title: 'Error',
                                    textBody: json.message,
                                    button: 'close',
                                })
                            }

                        } else {
                            // Alert.alert("Error");

                            Dialog.show({
                                type: ALERT_TYPE.DANGER,
                                title: 'Error',
                                textBody: 'Please Check your Details',
                                button: 'close',
                            })

                        }

                    }}>
                        <Text style={styles.loginButtonText} >Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.registerButton} onPress={() => { navigation.navigate("SignIn") }}>
                        <Text style={styles.registerButtonText}>Log In</Text>
                    </TouchableOpacity>
                </AlertNotificationRoot>

            </ScrollView>
        </KeyboardAvoidingView>

    );
}

function m() {

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
        fontWeight: '600',
        color: '#000',
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
