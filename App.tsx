import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import SplashScreen from './src/Splash';
import SignInScreen from './src/screens/SignIn';
import SignUpScreen from './src/screens/SignUp';
import UserProfile from './src/screens/UserProfile';
import PetProfile from './src/screens/AddPet';
import MyPets from './src/screens/MyPets';
import PetDetails from './src/screens/PetDetails';
import AddReminderScreen from './src/screens/Reminders';
import HomeScreen from './src/screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export type RootParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  UserProfile: undefined;
  AddPet: undefined;
  MyPets: undefined;
  PetDetails: undefined;
  Reminders: undefined;
  Home: undefined;
  MainTabs: undefined;
}


const Stack = createNativeStackNavigator<RootParamList>();
const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='SignIn' component={SignInScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
        <Stack.Screen name='AddPet' component={PetProfile} />
        <Stack.Screen name='MyPets' component={MyPets} />
        <Stack.Screen name='PetDetails' component={PetDetails} />
        <Stack.Screen name='Reminders' component={AddReminderScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />

        {/* Once logged in, go to MainTabs */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>

    </NavigationContainer>



  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Pets" component={MyPets} />
      <Tab.Screen name="Reminders" component={AddReminderScreen} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
