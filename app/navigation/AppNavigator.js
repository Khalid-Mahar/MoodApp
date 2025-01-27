import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreens from '../screens/OnboardingScreens';
import LoginScreen from '../screens/authScreens/LoginScreen';
import RegisterScreen from '../screens/authScreens/RegisterScreen';
import SelectInterests from '../screens/authScreens/SelectInterests';
import SelectHobbies from '../screens/authScreens/SelectHobbies';
import TabNavigator from './TabNavigator';
import HomeScreen from '../screens/appScreens/HomeScreen';
import QuestionAnswers from '../screens/appScreens/QuestionAnswers';
import SelectHobiesProfile from '../screens/appScreens/SelectHobiesProfile';
import SelectInterestsProfile from '../screens/appScreens/SelectInterestsProfile';
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="OnboardingScreen">
      <>

        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="QuestionAnswers" component={QuestionAnswers} />
        <Stack.Screen name="SelectHobiesProfile" component={SelectHobiesProfile} />
        <Stack.Screen name="SelectInterestsProfile" component={SelectInterestsProfile} />
       
      </>
    </Stack.Navigator>
  );
};

export default AppNavigator;
