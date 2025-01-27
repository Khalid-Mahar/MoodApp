import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import ImagePickerComponent from '../../components/ImagePickerComponent';
import SearchBarComponent from '../../components/SearchBarComponent';
import InterestTagComponent from '../../components/InterestTagComponent';
import GradientBackground from '../../components/GradientBackground';
import ButtonComponent from '../../components/ButtonComponent';
import HeaderComponent from '../../components/HeaderComponent';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomModal from '../../components/CustomModal';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../../auth/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const hobbies = [
  'Painting',
  'Knitting',
  'Chess',
  'Cycling',
  'Rock Climbing',
  'Bird Watching',
  'Origami',
  'Scuba Diving',
  'Pottery',
  'Woodworking',
  'Calligraphy',
  'Magic Tricks',
  'Archery',
  'Kite Flying',
  'Puzzles',
  'Scrapbooking',
  'Storytelling',
  'Astrology',
  'Journaling',
  'Beekeeping',
  'Metalworking',
  'Sculpting',
  'Candle Making',
  'Home Desiginig',
  'Astronomy',
  'Wood working',
  'DIY Projects',
];

const SelectHobbies = ({navigation, route}) => {
  const {userData} = route.params;
  const [searchValue, setSearchValue] = useState('');
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const {Login} = useAuth();
  const handleHobbyPress = hobby => {
    setSelectedHobbies(prev =>
      prev.includes(hobby)
        ? prev.filter(item => item !== hobby)
        : [...prev, hobby],
    );
  };

  const handleImagePick = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets[0].uri) {
        console.log(response.assets[0].uri);
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleCreate = async () => {
    if (selectedHobbies.length === 0) {
      Alert.alert('Error', 'Please select at least one hobby.');
      return;
    }

    const email = userData.email;
    const password = userData.password;
    try {
      setLoading(true);
      setIsModalVisible(true);

      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const userId = userCredential.user.uid;

      const updatedUserData = {
        ...userData,
        hobbies: selectedHobbies,
        userId,
      };

      await firestore().collection('users').doc(userId).set(updatedUserData);

      console.log(
        'User created and data stored successfully:',
        updatedUserData,
      );
      setLoading(false);
      setIsModalVisible(false);
      await AsyncStorage.setItem('token', 'true');
      await Login(true);
    } catch (error) {
      setIsModalVisible(false);
      setLoading(false);
      console.error(
        'Error during user creation or Firestore operation:',
        error,
      );
      Alert.alert(
        'Error',
        error.message || 'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <GradientBackground>
      <HeaderComponent
        title={'Create your Profile.!'}
        onPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80} // Adjust based on header height
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {/* <ImagePickerComponent
            imageUri={profileImage}
            onPickImage={handleImagePick}
          /> */}

          <Text style={styles.label}>What are your hobbies?</Text>
          <SearchBarComponent
            placeholder="Search hobbies..."
            value={searchValue}
            onChangeText={setSearchValue}
          />

          <Text style={styles.suggestLabel}>Suggested for you:</Text>
          <View style={styles.flatListContainer}>
            <FlatList
              data={hobbies.filter(item =>
                item.toLowerCase().includes(searchValue.toLowerCase()),
              )}
              keyExtractor={item => item}
              numColumns={3}
              renderItem={({item}) => (
                <InterestTagComponent
                  label={item}
                  isSelected={selectedHobbies.includes(item)}
                  onPress={() => handleHobbyPress(item)}
                  hobbies={true}
                />
              )}
              contentContainerStyle={styles.interestsContainer}
            />
          </View>

          <ButtonComponent
            style={{marginBottom: '10%'}}
            title="Create"
            onPress={handleCreate}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomModal visible={isModalVisible}>
        <Image
          source={require('../../assets/signupcompletemodal.png')}
          style={styles.image}
        />
        <Text style={[styles.modalText, {fontSize: 18, fontWeight: '700'}]}>
          Congratulations
        </Text>
        <Text style={styles.modalText}>
          Your Account is Ready to Use. You will be redirected to the Home Page
          in a Few Seconds.
        </Text>
        {loading && <ActivityIndicator size={'large'} />}
      </CustomModal>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
  },
  suggestLabel: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
    fontWeight: '700',
  },
  flatListContainer: {
    height: 200,
    marginBottom: 20,
  },
  interestsContainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});

export default SelectHobbies;
