import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import TextInputComponent from "../../components/TextComponent";
import GradientBackground from "../../components/GradientBackground";
import ButtonComponent from "../../components/ButtonComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { Checkbox } from "react-native-paper";
import ImagePickerComponent from "../../components/ImagePickerComponent";
import InterestTagComponent from "../../components/InterestTagComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import useAuth from "../../auth/useAuth";
import { useIsFocused } from "@react-navigation/native";
import MyIndicator from "../../components/MyIndicator";
import { launchImageLibrary } from "react-native-image-picker";
import { SimpleAlert, SimpleLoader } from "../../components/LoadAlert";
const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { Logout, setUser } = useAuth();
  const [selectedHobies, setSelectedHobies] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [gender, setGender] = useState();
  const [profileImage, setProfileImage] = useState("");
  const [userData, setUserData] = useState(null);
  const isFocused = useIsFocused();
  const [loadinng, setLoadinng] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const fetchUserData = async () => {
    setLoadinng(true);
    const userId = auth().currentUser?.uid;
    if (userId) {
      const userRef = firestore().collection("users").doc(userId);
      const docSnap = await userRef.get();
      if (docSnap.exists) {
        const data = docSnap.data();
        setUserData(data);
        setEmail(data.email || "");
        setFullName(data.fullName || "");
        setGender(data.gender || 0);
        setSelectedHobies(data.hobbies || []);
        setSelectedInterests(data.interests || []);
        setProfileImage(data.profileImage || "");
        setLoadinng(false);
      } else {
        console.log("No such document!");
        setLoadinng(false);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const updateUserProfile = async () => {
    setLoadinng(true);
    const userId = auth().currentUser?.uid;
    console.log("userid", userId, selectedHobies);
    if (userId) {
      const userRef = firestore().collection("users").doc(userId);
      await userRef.update({
        email,
        fullName,
        gender,
        hobbies: selectedHobies,
        interests: selectedInterests,
        profileImage,
      });
      setShowAlert(true);
      setLoadinng(false);
    }
    setLoadinng(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem("token", null);
    await setUser(null);
  };
  const handleImagePick = () => {
    const options = {
      title: "Select Photo",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.assets[0].uri) {
        console.log(response.assets[0].uri);
        setProfileImage(response.assets[0].uri);
      }
    });
  };
  return (
    <GradientBackground>
      <Text style={styles.title}>{"Profile Setting"}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ImagePickerComponent
            imageUri={profileImage}
            onPickImage={handleImagePick}
          />

          <TextInputComponent
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            icon={require("../../assets/email.png")}
          />
          {/* <TextInputComponent
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            isPassword
            icon={require('../../assets/password.png')}
          /> */}
          <TextInputComponent
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInputComponent placeholder="Gender" editable={false} />

          <View style={styles.row}>
            <View style={{ flexDirection: "row" }}>
              <Checkbox.Android
                status={gender === 0 ? "checked" : "unchecked"}
                onPress={() => setGender(0)}
                color={"red"}
                uncheckedColor={"green"}
              />
              <Text style={styles.gender}>Male</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Checkbox.Android
                status={gender === 1 ? "checked" : "unchecked"}
                onPress={() => setGender(1)}
                color={"red"}
                uncheckedColor={"green"}
              />
              <Text style={styles.gender}>Female</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={styles.label}>Interests</Text>
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() =>
                navigation.navigate("SelectInterestsProfile", {
                  selectedInterests: selectedInterests,
                  setSelectedInterests: setSelectedInterests,
                })
              }
            >
              <Image
                source={require("../../assets/edit.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            scrollEnabled={false}
            data={selectedInterests}
            keyExtractor={(item) => item}
            numColumns={3}
            renderItem={({ item }) => (
              <InterestTagComponent
                label={item}
                isSelected={selectedInterests.includes(item)}
              />
            )}
            contentContainerStyle={styles.interestsContainer}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={styles.label}>Hobbies</Text>
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() =>
                navigation.navigate("SelectHobiesProfile", {
                  selectedHobies: selectedHobies,
                  setSelectedHobies: setSelectedHobies,
                })
              }
            >
              <Image
                source={require("../../assets/edit.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            scrollEnabled={false}
            data={selectedHobies}
            keyExtractor={(item) => item}
            numColumns={3}
            renderItem={({ item }) => (
              <InterestTagComponent
                label={item}
                isSelected={selectedHobies.includes(item)}
                hobbies={true}
              />
            )}
            contentContainerStyle={styles.interestsContainer}
          />
          <View style={{ flex: 1 }} />
          <ButtonComponent
            title="Update Profile"
            onPress={updateUserProfile}
            style={styles.signInButton}
          />
        </View>
      </ScrollView>

      <SimpleLoader visible={loadinng} />
      <SimpleAlert
        visible={showAlert}
        message="Profile updated successfully!"
        onClose={() => setShowAlert(false)}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
    marginTop: 30,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  forgotPassword: {
    color: "#ff00ff",
    fontSize: 14,
  },
  signInButton: {
    marginTop: 20,
    width: "100%",
    marginBottom: 20,
  },
  signUpText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  signUpLink: {
    color: "purple",
    fontWeight: "bold",
  },
  gender: {
    color: "black",
    fontSize: 14,
    marginTop: 8,
    marginLeft: -5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 8,
  },
  label: {
    fontSize: 24,
    marginVertical: 10,
    color: "black",
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default ProfileScreen;
