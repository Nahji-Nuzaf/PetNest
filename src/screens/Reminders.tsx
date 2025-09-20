import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
    FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RemindersNavigationProps = NativeStackNavigationProp<RootParamList, "Reminders">;

interface Reminder {
  id: string;
  petName: string;
  datetime: string;
  reminderName: string;
  reminderNotes?: string;
}

const AddReminderScreen = () => {

    const navigation = useNavigation<RemindersNavigationProps>();

    const [petName, setPetName] = useState("");
    const [datetime, setDateTime] = useState("");
    const [reminderName, setReminderName] = useState("");
    const [reminderNotes, setReminderNotes] = useState("");
    const [reminders, setReminders] = useState<any[]>([]);


    const STORAGE_KEY = '@reminders';

    useEffect(() => {
        loadReminders();
    }, []);

    const loadReminders = async () => {
        try {
            const storedData = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedData) {
                setReminders(JSON.parse(storedData));
            }
        } catch (error) {
            console.error('Error loading reminders:', error);
        }
    };

    const addReminder = async () => {
        if (!petName || !datetime || !reminderName) {
            Alert.alert('Missing Fields', 'Please fill in all required fields.');
            return;
        }

        const newReminder = {
            id: Date.now().toString(),
            petName,
            datetime,
            reminderName,
            reminderNotes,
        };

        try {
            const storedReminders = await AsyncStorage.getItem(STORAGE_KEY);
            const parsedReminders = storedReminders ? JSON.parse(storedReminders) : [];

            const updatedReminders = [...parsedReminders, newReminder];

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReminders));

            console.log('Reminder saved:', newReminder);
            Alert.alert('Success', 'Reminder saved successfully!');
            clearForm();
            setReminders(updatedReminders); // Update state immediately
        } catch (error) {
            console.error('Failed to save reminder:', error);
            Alert.alert('Error', 'Could not save reminder. Try again.');
        }
    };

    const clearForm = () => {
        setDateTime('');
        setReminderName('');
        setReminderNotes('');
        setPetName('');
    };

    const ReminderCard = ({ reminder }: { reminder: Reminder }) => (
        <View style={styles.reminderCard}>
            <Text style={styles.reminderTitle}>{reminder.reminderName}</Text>
            <Text style={styles.reminderSubtitle}>{reminder.petName}</Text>
            <Text style={styles.reminderTime}>{reminder.datetime}</Text>
            {reminder.reminderNotes ? (
                <Text>{reminder.reminderNotes}</Text>
            ) : null}
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Reminders</Text>
                    <View style={{ width: 24 }} />
                </View>

                <Text style={styles.label}>Pet Name</Text>
                <TextInput style={styles.input} placeholder="Enter Pet Name" value={petName} onChangeText={setPetName} />

                <Text style={styles.label}>Date & Time</Text>
                <TextInput style={styles.input} placeholder="Ex: 25th August 10.00 PM" value={datetime} onChangeText={setDateTime} />

                <Text style={styles.label}>Reminder Name</Text>
                <TextInput style={styles.input} placeholder="Enter Reminder Name" value={reminderName} onChangeText={setReminderName} />

                <Text style={styles.label}>Reminder Notes</Text>
                <TextInput style={styles.input} placeholder="Reminder Notes" multiline value={reminderNotes} onChangeText={setReminderNotes} />

                <View style={styles.row}>
                    <TouchableOpacity style={styles.filledOrangeBtn} onPress={addReminder}>
                        <Text style={styles.filledBtnText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Reminders</Text>

                <FlatList
                    data={reminders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ReminderCard reminder={item} />}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddReminderScreen;


const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: '#fff',
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
    calendarContainer: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 15,
        marginBottom: 20,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    calendarTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    dayLabel: {
        width: 32,
        textAlign: 'center',
        color: '#555',
    },
    datesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dateCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedDate: {
        backgroundColor: '#E6E6E6',
    },
    // input: {
    //     backgroundColor: '#E6E6E6',
    //     borderRadius: 10,
    //     padding: 12,
    //     marginBottom: 10,
    // },
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
    sectionTitle: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#EF6C0B',
        marginBottom: 10,
        textAlign: 'center',
    },
    reminderCard: {
        backgroundColor: '#FFD2A5',
        borderRadius: 15,
        padding: 15,
        marginTop: 10,
    },
    reminderTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    reminderSubtitle: {
        color: '#333',
    },
    reminderTime: {
        color: '#555',
        marginTop: 5,
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

    remindersList: {
        paddingBottom: 50,
    },

    reminderSub: {
        fontSize: 14,
        color: '#333',
    },
});
