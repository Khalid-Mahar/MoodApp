import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import ImagePickerComponent from "../../components/ImagePickerComponent";
import SearchBarComponent from "../../components/SearchBarComponent";
import InterestTagComponent from "../../components/InterestTagComponent";
import GradientBackground from "../../components/GradientBackground";
import ButtonComponent from "../../components/ButtonComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { launchImageLibrary } from "react-native-image-picker";

const interests = [
  "Reading",
  "Traveling",
  "Drawing",
  "Photography",
  "Cooking",
  "Playing Sports",
  "Fitness Activities",
  "Music",
  "Gardening",
  "Writing",
  "Gaming",
  "Hiking",
  "Yoga",
  "Dancing",
  "Watching Movies",
  "Crafting",
  "Volunteering",
  "Technology",
  "Socializing",
  "Meditation",
  "Fishing",
  "Biking",
  "Bird watching",
  "Camping",
  "Surfing",
  "Martial arts",
  "Calligraphy",
  "Podcasting",
  "Public speaking",
  "Baking",
  "Interior design",
  "Astronomy",
  "Puzzle solving",
  "Travel blogging",
  "Vlogging",
  "Fashion styling",
  "Pet care",
  "DIY home projects",
];

const SelectInterests = ({ navigation, route }) => {
  const { userData } = route.params;
  const [searchValue, setSearchValue] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  const handleInterestPress = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
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

  const handleNext = () => {
    if (selectedInterests.length === 0) {
      Alert.alert("Error", "Please select at least one interest.");
      return;
    }
    const updatedUserData = {
      ...userData,
      interests: selectedInterests,
      profileImage: profileImage,
    };
    console.log("Updated User Data:", updatedUserData);
    navigation.navigate("SelectHobbies", { userData: updatedUserData });
  };

  return (
    <GradientBackground>
      <HeaderComponent
        title={"Create your Profile.!"}
        onPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <ImagePickerComponent
            imageUri={profileImage}
            onPickImage={handleImagePick}
          />

          <Text style={styles.label}>What are you interested in?</Text>
          <SearchBarComponent
            placeholder="Search here interest..."
            value={searchValue}
            onChangeText={setSearchValue}
          />

          <Text style={styles.suggestLabel}>Suggested for you:</Text>
          <View style={styles.flatListContainer}>
            <FlatList
              data={interests.filter((item) =>
                item.toLowerCase().includes(searchValue.toLowerCase())
              )}
              keyExtractor={(item) => item}
              numColumns={3}
              renderItem={({ item }) => (
                <InterestTagComponent
                  label={item}
                  isSelected={selectedInterests.includes(item)}
                  onPress={() => handleInterestPress(item)}
                />
              )}
              contentContainerStyle={styles.interestsContainer}
            />
          </View>

          <ButtonComponent
            style={{ marginBottom: "10%" }}
            title="Next"
            onPress={handleNext}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "black",
  },
  suggestLabel: {
    fontSize: 16,
    color: "#666",
    marginVertical: 10,
    fontWeight: "700",
  },
  flatListContainer: {
    height: 200,
    marginBottom: 20,
  },
  interestsContainer: {
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default SelectInterests;
