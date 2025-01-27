import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import SearchBarComponent from '../../components/SearchBarComponent';
import InterestTagComponent from '../../components/InterestTagComponent';
import GradientBackground from '../../components/GradientBackground';
import ButtonComponent from '../../components/ButtonComponent';
import HeaderComponent from '../../components/HeaderComponent';

const interests = [
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
    'DIY Projects'
];


const SelectHobiesProfile = ({navigation, route}) => {
  const {selectedHobies, setSelectedHobies} = route.params;
  const [searchValue, setSearchValue] = useState('');
  const [tempSelected, setTempSelected] = useState(selectedHobies ?? []);
  const handleInterestPress = interest => {
    setTempSelected(prev =>
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest],
    );
  };
  return (
    <GradientBackground>
      <HeaderComponent
        title={'Edit your Profile.!'}
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
          <Text style={styles.label}>What are your hobbies?</Text>
          <SearchBarComponent
            placeholder="search here interest..."
            value={searchValue}
            onChangeText={setSearchValue}
          />

          <Text style={styles.suggestLabel}>Suggest for you select here</Text>
          <FlatList
            data={interests.filter(item =>
              item.toLowerCase().includes(searchValue.toLowerCase()),
            )}
            keyExtractor={item => item}
            numColumns={3}
            renderItem={({item}) => (
              <InterestTagComponent
                label={item}
                isSelected={tempSelected.includes(item)}
                onPress={() => handleInterestPress(item)}
                hobbies={true}
              />
            )}
            contentContainerStyle={styles.interestsContainer}
          />

          <ButtonComponent
            style={{marginBottom: '10%'}}
            title="Add"
            onPress={() => {
              setSelectedHobies(tempSelected);
              navigation.goBack();
            }}
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

export default SelectHobiesProfile;
