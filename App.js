import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./app/auth/AuthContext";
import SplashScreen from "./app/screens/SplashScreen";
import constants from "./app/config/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthNavigator from "./app/navigation/AuthNavigator";
import LoginScreen from "./app/screens/authScreens/LoginScreen";
import { PaperProvider } from "react-native-paper";
import AppNavigator from "./app/navigation/AppNavigator";
import { firebase } from "@react-native-firebase/auth";
export default function App() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // firebase.initializeApp()
    checkUser();
  }, []);
  const checkUser = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("Auth_token--------", token);
    console.log("user--------", constants.authToken);
    if (token) {
      constants.authToken = token;
      setUser(true);
    } else {
      setUser(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
<PaperProvider>
          {loading ? (
            <SplashScreen />
          ) : (

            <AuthContext.Provider value={{ user, setUser }}>
              <NavigationContainer>
              {user ? <AppNavigator/>: <AuthNavigator/>} 
                {/* <AppNavigator/> */}
                {/* <LoginScreen/> */}
                {/* {user ? (
                  <StripeProvider publishableKey="pk_test_51NuL4XDDAelQYGBTL3pJsLZ9mFUu30q2yflfItFnvu2AtvERKXlCV4VBB5sThWiXgUekZMaJSA57SP3Y414Suf9T00BZfyyqow">
                    <AppNavigator />
                  </StripeProvider>
                ) : (
                  <AuthNavigator />
                )} */}
              </NavigationContainer>
            </AuthContext.Provider>
          )}
          </PaperProvider>
       
  );
}
