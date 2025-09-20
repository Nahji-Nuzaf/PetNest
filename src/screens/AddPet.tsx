import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dimensions, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { ScrollView, Text, View } from "react-native-reanimated/lib/typescript/Animated";
import { RootParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PetProfileNavigationProps = NativeStackNavigationProp<RootParamList, "AddPet">;

export default function PetProfile() {

    const [image, setImage] = useState<string | null>(null);

    const [selectedType, setSelectedType] = useState('');
    const types = ['Dog', 'Cat', 'Bird', 'Rabbit'];

    const [selectedGender, setSelectedGender] = useState('');
    const genderTypes = ['Male', 'Female'];

    const [getPetName, setPetName] = useState('');
    const [getAge, setAge] = useState('');
    const [getWeight, setWeight] = useState('');
    const [getNotes, setNotes] = useState('');

    const navigation = useNavigation<PetProfileNavigationProps>();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }

        console.log(image);

    };

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 0}
        >
            <AlertNotificationRoot>
                <SafeAreaView>

                    <ScrollView
                        contentContainerStyle={styles.container}
                    // keyboardShouldPersistTaps="handled"
                    >



                        <View style={styles.imageContainer}>
                            <Pressable onPress={pickImage} style={styles.imageUploader}>

                                {image ? (
                                    <Image source={{ uri: image }} style={styles.profileImage} />
                                ) : (
                                    <View style={styles.imagePlaceholder}>
                                        <Text style={styles.imageText}>+</Text>
                                        <Text style={styles.imageLabel}>Add Image</Text>
                                    </View>
                                )}

                            </Pressable>
                        </View>


                        <Text style={styles.heading}>Add Pet</Text>


                        <Text style={styles.label}>Pet Name</Text>
                        <TextInput style={styles.input} onChangeText={setPetName} value={getPetName} />

                        <Text style={styles.label}>Type</Text>
                        <Picker selectedValue={selectedType} style={styles.picker} onValueChange={(itemValue) => setSelectedType(itemValue)}>
                            <Picker.Item label="Select pet type" value={''} />
                            {types.map((type, index) => (<Picker.Item key={index} label={type} value={type} />))}
                        </Picker>

                        <Text style={styles.label}>Gender</Text>
                        <Picker selectedValue={selectedGender} style={styles.picker} onValueChange={(itemValue) => setSelectedGender(itemValue)}>
                            <Picker.Item label="Select Gender" value={''} />
                            {genderTypes.map((type, index) => (<Picker.Item key={index} label={type} value={type} />))}
                        </Picker>

                        <Text style={styles.label}>Age</Text>
                        <TextInput style={styles.input} onChangeText={setAge} value={getAge} />

                        <Text style={styles.label}>Weight</Text>
                        <TextInput style={styles.input} onChangeText={setWeight} value={getWeight} />

                        <Text style={styles.label}>Notes</Text>
                        <TextInput style={styles.input} multiline numberOfLines={2} onChangeText={setNotes} value={getNotes} />


                        <View style={styles.row}>
                            <TouchableOpacity style={styles.filledOrangeBtn} onPress={async () => {


                                if (!getPetName || !selectedType || !selectedGender || !getAge || !getWeight || !getNotes || image == null) {
                                    Dialog.show({
                                        type: ALERT_TYPE.DANGER,
                                        title: 'Warning',
                                        textBody: 'Please Fill Required data',
                                        button: 'close',
                                    });
                                    return;
                                }


                                try {

                                    const storedUser = await AsyncStorage.getItem("user");
                                    let userId = "";
                                    if (!storedUser) {
                                        Dialog.show({
                                            type: ALERT_TYPE.WARNING,
                                            title: 'Session expired',
                                            textBody: 'Please log in again.',
                                            button: 'OK',
                                        });
                                        navigation.replace("SignIn");
                                        return;
                                    }
                                    if (storedUser) {
                                        const user = JSON.parse(storedUser);
                                        userId = user.userId;  
                                    }

                                    // const user = JSON.parse(storedUser);

                                    let formData = new FormData();
                                    formData.append("petName", getPetName);
                                    formData.append("type", selectedType);
                                    formData.append("gender", selectedGender);
                                    formData.append("petAge", getAge);
                                    formData.append("petWeight", getWeight);
                                    formData.append("petNotes", getNotes);
                                    formData.append("userId", userId);

                                    if (image) {
                                        formData.append("petImage", {
                                            uri: image,
                                            name: "petimg.jpg",
                                            type: 'image/jpg'
                                        } as any);
                                    }

                                    const response = await fetch("https://a260e6972862.ngrok-free.app/PetNest_WebApp/AddPet", {
                                        method: "POST",
                                        body: formData
                                    });

                                    if (response.ok) {
                                        Toast.show({
                                            type: ALERT_TYPE.SUCCESS,
                                            title: 'Success',
                                            textBody: 'Congrats! Your pet has been added.',
                                        });
                                    } else {
                                        Toast.show({
                                            type: ALERT_TYPE.DANGER,
                                            title: 'Warning',
                                            textBody: 'Incorrect Values',
                                        });
                                    }

                                } catch (e) {
                                    // Handle error case
                                    console.error("Error occurred during submission:", e);
                                    Toast.show({
                                        type: ALERT_TYPE.DANGER,
                                        title: 'Error',
                                        textBody: 'An error occurred, please try again.',
                                    });
                                }


                            }}>
                                <Text style={styles.filledBtnText}>Save</Text>
                            </TouchableOpacity>
                        </View>





                    </ScrollView>

                </SafeAreaView>
            </AlertNotificationRoot>
        </KeyboardAvoidingView>

    );

}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // backgroundColor: "#fff",
        alignItems: "center",
        padding: 20,
        marginTop: 20
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



    imageContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    imageUploader: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#ffff",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#dddd",
        borderStyle: "dashed",
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },

    imagePlaceholder: {
        alignItems: "center",
    },

    imageText: {
        fontSize: 36,
        color: "#9999",
        marginBottom: 5,
    },

    imageLabel: {
        fontSize: 14,
        color: "#6666",
    },



    picker: {
        width: "100%",
        backgroundColor: "#E6E6E6",
        // padding: 12,
        borderRadius: 12,
        // marginBottom: 8,
    },

});