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
  Dimensions,
  Platform,
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

const { width } = Dimensions.get("window");
const SPACING = 16;

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState(0);
  const [selectedHobies, setSelectedHobies] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const isFocused = useIsFocused();

  const SectionHeader = ({ title, onEdit }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onEdit && (
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Image
            source={require("../../assets/edit.png")}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userId = auth().currentUser?.uid;
      if (userId) {
        const docSnap = await firestore().collection("users").doc(userId).get();
        if (docSnap.exists) {
          const data = docSnap.data();
          setEmail(data.email || "");
          setFullName(data.fullName || "");
          setGender(data.gender || 0);
          setSelectedHobies(data.hobbies || []);
          setSelectedInterests(data.interests || []);
          setProfileImage(data.profileImage || "");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isFocused]);

  const updateUserProfile = async () => {
    try {
      setLoading(true);
      const userId = auth().currentUser?.uid;
      if (userId) {
        await firestore().collection("users").doc(userId).update({
          email,
          fullName,
          gender,
          hobbies: selectedHobies,
          interests: selectedInterests,
          profileImage,
        });
        Alert.alert("Success", "Profile updated successfully!");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.7,
      },
      (response) => {
        if (response.assets?.[0]?.uri) {
          setProfileImage(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Profile Settings</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.profileImageContainer}>
            <ImagePickerComponent
              imageUri={profileImage}
              onPickImage={handleImagePick}
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={handleImagePick}
            >
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <TextInputComponent
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              icon={require("../../assets/email.png")}
              style={styles.input}
            />

            <TextInputComponent
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />

            <Text style={styles.fieldLabel}>Gender</Text>
            <View style={styles.genderContainer}>
              {["Male", "Female"].map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.genderOption,
                    gender === index && styles.genderOptionSelected,
                  ]}
                  onPress={() => setGender(index)}
                >
                  <Text
                    style={[
                      styles.genderText,
                      gender === index && styles.genderTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <SectionHeader
              title="Interests"
              onEdit={() =>
                navigation.navigate("SelectInterestsProfile", {
                  selectedInterests,
                  setSelectedInterests,
                })
              }
            />
            <FlatList
              data={selectedInterests}
              keyExtractor={(item) => item}
              numColumns={3}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <InterestTagComponent label={item} isSelected={true} />
              )}
              contentContainerStyle={styles.tagsContainer}
            />

            <SectionHeader
              title="Hobbies"
              onEdit={() =>
                navigation.navigate("SelectHobiesProfile", {
                  selectedHobies,
                  setSelectedHobies,
                })
              }
            />
            <FlatList
              data={selectedHobies}
              keyExtractor={(item) => item}
              numColumns={3}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <InterestTagComponent
                  label={item}
                  isSelected={true}
                  hobbies={true}
                />
              )}
              contentContainerStyle={styles.tagsContainer}
            />
          </View>
        </ScrollView>

        <ButtonComponent
          title="Update Profile"
          onPress={updateUserProfile}
          style={styles.updateButton}
        />
      </View>
      <MyIndicator visible={loading} />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING,
  },
  scrollContent: {
    paddingBottom: SPACING * 4,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: SPACING,
    color: "#1a1a1a",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: SPACING * 2,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SPACING,
  },
  changePhotoButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  changePhotoText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: SPACING,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    marginBottom: SPACING,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: SPACING / 2,
  },
  genderContainer: {
    flexDirection: "row",
    marginBottom: SPACING * 2,
  },
  genderOption: {
    flex: 1,
    padding: SPACING,
    borderRadius: 12,
    marginHorizontal: 4,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  genderOptionSelected: {
    backgroundColor: "#7C3AED",
  },
  genderText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  genderTextSelected: {
    color: "white",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: SPACING,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: "#666",
  },
  tagsContainer: {
    paddingHorizontal: SPACING / 2,
  },
  updateButton: {
    marginTop: SPACING,
    marginBottom: Platform.OS === "ios" ? SPACING * 2 : SPACING,
  },
});

export default ProfileScreen;
