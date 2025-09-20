// PetDetails.tsx

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // for back icon
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

type PetDetailsNavigationProps = NativeStackNavigationProp<RootParamList, "PetDetails">;

const PetDetails = ({ navigationn }: any) => {

    const navigation = useNavigation<PetDetailsNavigationProps>();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <SafeAreaView>

                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Pet Details</Text>
                    <View style={{ width: 24 }} /> {/* To balance spacing */}
                </View>


                <View style={styles.imagePlaceholder} />


                <Text style={styles.petName}>Pet Name</Text>
                <Text style={styles.petAge}>Age</Text>


                <Text style={styles.sectionTitle}>Pet Details</Text>
                <View style={styles.row}>
                    <Text style={styles.detailLabel}>Type</Text>
                    <Text style={styles.detailValue}>Dog</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.detailLabel}>Gender</Text>
                    <Text style={styles.detailValue}>Male</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.detailLabel}>Weight</Text>
                    <Text style={styles.detailValue}>25kg</Text>
                </View>
                <View style={styles.notesContainer}>
                    <Text style={styles.detailLabel}>Notes</Text>
                    <Text style={styles.notesText}>Loves playing fetch...</Text>
                </View>


                <Text style={styles.sectionTitle}>Pet Care</Text>
                <View style={styles.row}>
                    <Text>Vaccination</Text>
                    <Text>10 Jan 2025</Text>
                </View>


                <Text style={styles.sectionTitle}>Appointments & Reminders</Text>

                <Text style={styles.subsectionTitle}>Appointments</Text>
                <View style={styles.row}>
                    <Text>Vet Visit</Text>
                    <Text>15 Feb 2025</Text>
                </View>

                <Text style={styles.subsectionTitle}>Reminders</Text>
                <View style={styles.row}>
                    <Text>Grooming</Text>
                    <Text>Every 2 weeks</Text>
                </View>


                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit Pet</Text>
                </TouchableOpacity>





            </SafeAreaView>
        </ScrollView>
    );
};

export default PetDetails;


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#EF6C0B',
    },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        marginBottom: 20,
    },
    petName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    petAge: {
        fontSize: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 8,
    },
    subsectionTitle: {
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    detailLabel: {
        fontWeight: 'bold',
    },
    detailValue: {
        fontWeight: 'normal',
    },
    notesContainer: {
        marginTop: 5,
        marginBottom: 15,
    },
    notesText: {
        color: '#444',
    },
    editButton: {
        marginTop: 30,
        borderWidth: 1,
        borderColor: 'green',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    editButtonText: {
        color: 'green',
        fontWeight: 'bold',
    },
});
