import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/appScreens/HomeScreen';
import HistoryScreen from '../screens/appScreens/HistoryScreen';
import ChatBot from '../screens/appScreens/ChatBot';
import ProfileScreen from '../screens/appScreens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [activeTab, setActiveTab] = useState('Home'); // Track the active tab
const navigation = useNavigation()
  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    navigation.navigate(tabName); // Navigate to the selected tab
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => handleTabPress('Home')}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: activeTab === 'Home' ? '#F0E5FF' : 'transparent',
                borderWidth: activeTab === 'Home' ? 1 : 0,
                borderColor: '#482D79',
                borderRadius: 10,
                marginHorizontal: 5,
              }}
            >
              <Image
                source={require('../assets/home.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: activeTab === 'Home' ? '#482D79' : '#B0B0B0',
                  fontWeight: activeTab === 'Home' ? 'bold' : 'normal',
                }}
              >
                Home
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name={'Mood History'}
        component={HistoryScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => handleTabPress('Mood History')}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: activeTab === 'Mood History' ? '#F0E5FF' : 'transparent',
                borderWidth: activeTab === 'Mood History' ? 1 : 0,
                borderColor: '#482D79',
                borderRadius: 10,
                marginHorizontal: 5,
              }}
            >
              <Image
                source={require('../assets/moodIcon.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: activeTab === 'Mood History' ? '#482D79' : '#B0B0B0',
                  fontWeight: activeTab === 'Mood History' ? 'bold' : 'normal',
                }}
              >
                Mood History
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name={'ChatBot'}
        component={ChatBot}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => handleTabPress('ChatBot')}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: activeTab === 'ChatBot' ? '#F0E5FF' : 'transparent',
                borderWidth: activeTab === 'ChatBot' ? 1 : 0,
                borderColor: '#482D79',
                borderRadius: 10,
                marginHorizontal: 5,
              }}
            >
              <Image
                source={require('../assets/chatIcon.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: activeTab === 'ChatBot' ? '#482D79' : '#B0B0B0',
                  fontWeight: activeTab === 'ChatBot' ? 'bold' : 'normal',
                }}
              >
                ChatBot
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => handleTabPress('Profile')}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: activeTab === 'Profile' ? '#F0E5FF' : 'transparent',
                borderWidth: activeTab === 'Profile' ? 1 : 0,
                borderColor: '#482D79',
                borderRadius: 10,
                marginHorizontal: 5,
              }}
            >
              <Image
                source={require('../assets/profileIcon.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: activeTab === 'Profile' ? '#482D79' : '#B0B0B0',
                  fontWeight: activeTab === 'Profile' ? 'bold' : 'normal',
                }}
              >
                Profile
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default TabNavigator;
