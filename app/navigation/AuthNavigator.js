import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreens from '../screens/OnboardingScreens';
import LoginScreen from '../screens/authScreens/LoginScreen';
import RegisterScreen from '../screens/authScreens/RegisterScreen';
import SelectInterests from '../screens/authScreens/SelectInterests';
import SelectHobbies from '../screens/authScreens/SelectHobbies';
const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="OnboardingScreen">
      <>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreens} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="SelectIntrests" component={SelectInterests} />
        <Stack.Screen name="SelectHobbies" component={SelectHobbies} />
      </>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
