import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Dimensions,
  StatusBar,
} from "react-native";
import TextInputComponent from "../../components/TextComponent";
import GradientBackground from "../../components/GradientBackground";
import ButtonComponent from "../../components/ButtonComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { Checkbox } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../../auth/useAuth";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const { Login } = useAuth();

  // Existing validation and handler functions remain the same
  const validateInputs = () => {
    // ... (keep existing validation logic)
  };

  const handleLogin = async () => {
    // ... (keep existing login logic)
  };

  const onForgotPassword = async () => {
    // ... (keep existing forgot password logic)
  };

  return (
    <GradientBackground>
      <StatusBar barStyle="light-content" />
      <HeaderComponent title="Welcome Back" titleStyle={styles.headerTitle} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>
              Enter your details to continue your journey
            </Text>

            <View style={styles.formContainer}>
              <TextInputComponent
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                icon={require("../../assets/email.png")}
                containerStyle={styles.inputContainer}
              />
              {emailError && <Text style={styles.errorText}>{emailError}</Text>}

              <TextInputComponent
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                isPassword
                icon={require("../../assets/password.png")}
                containerStyle={styles.inputContainer}
              />
              {passwordError && (
                <Text style={styles.errorText}>{passwordError}</Text>
              )}

              <View style={styles.optionsRow}>
                <View style={styles.rememberMeContainer}>
                  <Checkbox.Android
                    status={isChecked ? "checked" : "unchecked"}
                    onPress={() => setIsChecked(!isChecked)}
                    color="#6C63FF"
                    uncheckedColor="#A0A0A0"
                  />
                  <Text style={styles.rememberMeText}>Remember me</Text>
                </View>
                <TouchableOpacity onPress={onForgotPassword}>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {!loading && (
                <ButtonComponent
                  title="Sign In"
                  onPress={handleLogin}
                  style={styles.signInButton}
                  textStyle={styles.buttonText}
                />
              )}
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.signUpContainer}
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                <Text style={styles.signUpText}>
                  Don't have an account?{" "}
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 32,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 24,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 4,
  },
  forgotPassword: {
    fontSize: 14,
    color: "#6C63FF",
    fontWeight: "600",
  },
  signInButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6C63FF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
  },
  signUpContainer: {
    padding: 16,
  },
  signUpText: {
    fontSize: 14,
    color: "#666666",
  },
  signUpLink: {
    color: "#6C63FF",
    fontWeight: "700",
  },
  errorText: {
    color: "#FF4B4B",
    fontSize: 12,
    marginTop: -16,
    marginBottom: 16,
    marginLeft: 4,
  },
});

export default LoginScreen;
