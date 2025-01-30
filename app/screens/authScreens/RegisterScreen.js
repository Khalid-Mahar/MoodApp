import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import TextInputComponent from "../../components/TextComponent";
import GradientBackground from "../../components/GradientBackground";
import ButtonComponent from "../../components/ButtonComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { Checkbox } from "react-native-paper";

const { width } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [gender, setGender] = useState(0);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email cannot be empty.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Not a valid email.";
    }

    if (!password) {
      newErrors.password = "Password cannot be empty.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!fullName) {
      newErrors.fullName = "Full name cannot be empty.";
    }
    if (!isChecked) {
      newErrors.isChecked = "Accept terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSignUp = () => {
    if (validate()) {
      const userData = {
        email,
        password,
        fullName,
        gender: gender,
        isChecked,
      };
      navigation.navigate("SelectIntrests", {
        userData: userData,
      });
    }
  };

  return (
    <GradientBackground>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <HeaderComponent
            title="Create Account"
            titleStyle={styles.headerTitle}
            onPress={() => navigation.goBack()}
          />

          <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>
              Join us to start tracking your mood journey
            </Text>

            <View style={styles.formContainer}>
              <TextInputComponent
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                icon={require("../../assets/email.png")}
                containerStyle={styles.inputContainer}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInputComponent
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                isPassword
                icon={require("../../assets/password.png")}
                containerStyle={styles.inputContainer}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TextInputComponent
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                containerStyle={styles.inputContainer}
              />
              {errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}

              <View style={styles.genderContainer}>
                <Text style={styles.genderLabel}>Gender</Text>
                <View style={styles.genderOptions}>
                  <TouchableOpacity
                    style={[
                      styles.genderOption,
                      gender === 0 && styles.genderOptionSelected,
                    ]}
                    onPress={() => setGender(0)}
                  >
                    <Text
                      style={[
                        styles.genderText,
                        gender === 0 && styles.genderTextSelected,
                      ]}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderOption,
                      gender === 1 && styles.genderOptionSelected,
                    ]}
                    onPress={() => setGender(1)}
                  >
                    <Text
                      style={[
                        styles.genderText,
                        gender === 1 && styles.genderTextSelected,
                      ]}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.termsContainer}>
                <Checkbox.Android
                  status={isChecked ? "checked" : "unchecked"}
                  onPress={() => setIsChecked(!isChecked)}
                  color="#6C63FF"
                  uncheckedColor="#A0A0A0"
                />
                <Text style={styles.termsText}>
                  I accept the terms and conditions
                </Text>
              </View>
              {errors.isChecked && (
                <Text style={styles.errorText}>{errors.isChecked}</Text>
              )}

              <ButtonComponent
                title="Continue"
                onPress={onSignUp}
                style={styles.signUpButton}
                textStyle={styles.buttonText}
              />
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.signInContainer}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.signInText}>
                  Already have an account?{" "}
                  <Text style={styles.signInLink}>Sign In</Text>
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
  genderContainer: {
    marginBottom: 24,
  },
  genderLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 12,
    fontWeight: "500",
  },
  genderOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  genderOption: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
  },
  genderOptionSelected: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },
  genderText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  genderTextSelected: {
    color: "#FFFFFF",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  termsText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 8,
  },
  signUpButton: {
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
  signInContainer: {
    padding: 16,
  },
  signInText: {
    fontSize: 14,
    color: "#666666",
  },
  signInLink: {
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

export default RegisterScreen;
