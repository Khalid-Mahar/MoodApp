// import React, {useState} from 'react';
// import {
//   Text,
//   StyleSheet,
//   FlatList,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import SearchBarComponent from '../../components/SearchBarComponent';
// import InterestTagComponent from '../../components/InterestTagComponent';
// import GradientBackground from '../../components/GradientBackground';
// import ButtonComponent from '../../components/ButtonComponent';
// import HeaderComponent from '../../components/HeaderComponent';

// const interests = [
//  'Painting',
//   'Knitting',
//   'Chess',
//   'Cycling',
//   'Rock Climbing',
//   'Bird Watching',
//   'Origami',
//   'Scuba Diving',
//   'Pottery',
//   'Woodworking',
//   'Calligraphy',
//   'Magic Tricks',
//   'Archery',
//   'Kite Flying',
//   'Puzzles',
//   'Scrapbooking',
//   'Storytelling',
//   'Astrology',
//   'Journaling',
//   'Beekeeping',
//   'Metalworking',
//   'Sculpting',
//   'Candle Making',
//   'Home Desiginig',
//   'Astronomy',
//     'Wood working',
//     'DIY Projects'
// ];

// const SelectHobiesProfile = ({navigation, route}) => {
//   const {selectedHobies, setSelectedHobies} = route.params;
//   const [searchValue, setSearchValue] = useState('');
//   const [tempSelected, setTempSelected] = useState(selectedHobies ?? []);
//   const handleInterestPress = interest => {
//     setTempSelected(prev =>
//       prev.includes(interest)
//         ? prev.filter(item => item !== interest)
//         : [...prev, interest],
//     );
//   };
//   return (
//     <GradientBackground>
//       <HeaderComponent
//         title={'Edit your Profile.!'}
//         onPress={() => navigation.goBack()}
//       />
//       <KeyboardAvoidingView
//         style={styles.container}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={80} // Adjust based on header height
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           showsVerticalScrollIndicator={false}>
//           <Text style={styles.label}>What are your hobbies?</Text>
//           <SearchBarComponent
//             placeholder="search here interest..."
//             value={searchValue}
//             onChangeText={setSearchValue}
//           />

//           <Text style={styles.suggestLabel}>Suggest for you select here</Text>
//           <FlatList
//             data={interests.filter(item =>
//               item.toLowerCase().includes(searchValue.toLowerCase()),
//             )}
//             keyExtractor={item => item}
//             numColumns={3}
//             renderItem={({item}) => (
//               <InterestTagComponent
//                 label={item}
//                 isSelected={tempSelected.includes(item)}
//                 onPress={() => handleInterestPress(item)}
//                 hobbies={true}
//               />
//             )}
//             contentContainerStyle={styles.interestsContainer}
//           />

//           <ButtonComponent
//             style={{marginBottom: '10%'}}
//             title="Add"
//             onPress={() => {
//               setSelectedHobies(tempSelected);
//               navigation.goBack();
//             }}
//           />
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </GradientBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     paddingBottom: 20,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     color: 'black',
//   },
//   suggestLabel: {
//     fontSize: 16,
//     color: '#666',
//     marginVertical: 10,
//     fontWeight: '700',
//   },
//   interestsContainer: {
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   modalText: {
//     fontSize: 12,
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   image: {
//     width: 120,
//     height: 120,
//     resizeMode: 'contain',
//   },
// });

// export default SelectHobiesProfile;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
// } from "react-native";
// import SearchBarComponent from "../../components/SearchBarComponent";
// import InterestTagComponent from "../../components/InterestTagComponent";
// import GradientBackground from "../../components/GradientBackground";
// import ButtonComponent from "../../components/ButtonComponent";
// import HeaderComponent from "../../components/HeaderComponent";

// const interests = [
//   "Painting",
//   "Knitting",
//   "Chess",
//   "Cycling",
//   "Rock Climbing",
//   "Bird Watching",
//   "Origami",
//   "Scuba Diving",
//   "Pottery",
//   "Woodworking",
//   "Calligraphy",
//   "Magic Tricks",
//   "Archery",
//   "Kite Flying",
//   "Puzzles",
//   "Scrapbooking",
//   "Storytelling",
//   "Astrology",
//   "Journaling",
//   "Beekeeping",
//   "Metalworking",
//   "Sculpting",
//   "Candle Making",
//   "Home Desiginig",
//   "Astronomy",
//   "Wood working",
//   "DIY Projects",
// ];

// const SelectHobiesProfile = ({ navigation, route }) => {
//   const { selectedHobies, setSelectedHobies } = route.params;
//   const [searchValue, setSearchValue] = useState("");
//   const [tempSelected, setTempSelected] = useState(selectedHobies ?? []);

//   const handleInterestPress = (interest) => {
//     setTempSelected((prev) =>
//       prev.includes(interest)
//         ? prev.filter((item) => item !== interest)
//         : [...prev, interest]
//     );
//   };

//   return (
//     <GradientBackground>
//       <HeaderComponent
//         title={"Edit your Profile.!"}
//         onPress={() => navigation.goBack()}
//       />
//       <KeyboardAvoidingView
//         style={styles.container}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         keyboardVerticalOffset={80}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           showsVerticalScrollIndicator={false}
//         >
//           <Text style={styles.label}>What are your hobbies?</Text>
//           <SearchBarComponent
//             placeholder="search here interest..."
//             value={searchValue}
//             onChangeText={setSearchValue}
//           />

//           <Text style={styles.suggestLabel}>Suggest for you select here</Text>
//           <View style={styles.interestsContainer}>
//             {interests
//               .filter((item) =>
//                 item.toLowerCase().includes(searchValue.toLowerCase())
//               )
//               .map((item) => (
//                 <InterestTagComponent
//                   key={item}
//                   label={item}
//                   isSelected={tempSelected.includes(item)}
//                   onPress={() => handleInterestPress(item)}
//                   hobbies={true}
//                 />
//               ))}
//           </View>

//           <ButtonComponent
//             style={{ marginBottom: "10%" }}
//             title="Add"
//             onPress={() => {
//               setSelectedHobies(tempSelected);
//               navigation.goBack();
//             }}
//           />
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </GradientBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: "center",
//     paddingBottom: 20,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginVertical: 10,
//     color: "black",
//   },
//   suggestLabel: {
//     fontSize: 16,
//     color: "#666",
//     marginVertical: 10,
//     fontWeight: "700",
//   },
//   interestsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "flex-start",
//     marginBottom: 20,
//   },
//   modalText: {
//     fontSize: 12,
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   image: {
//     width: 120,
//     height: 120,
//     resizeMode: "contain",
//   },
// });

// export default SelectHobiesProfile;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import SearchBarComponent from "../../components/SearchBarComponent";
import InterestTagComponent from "../../components/InterestTagComponent";
import GradientBackground from "../../components/GradientBackground";
import ButtonComponent from "../../components/ButtonComponent";
import HeaderComponent from "../../components/HeaderComponent";

const { width } = Dimensions.get("window");

const interests = [
  "Painting",
  "Knitting",
  "Chess",
  "Cycling",
  "Rock Climbing",
  "Bird Watching",
  "Origami",
  "Scuba Diving",
  "Pottery",
  "Woodworking",
  "Calligraphy",
  "Magic Tricks",
  "Archery",
  "Kite Flying",
  "Puzzles",
  "Scrapbooking",
  "Storytelling",
  "Astrology",
  "Journaling",
  "Beekeeping",
  "Metalworking",
  "Sculpting",
  "Candle Making",
  "Home Designing",
  "Astronomy",
  "Wood Working",
  "DIY Projects",
];

const SelectHobiesProfile = ({ navigation, route }) => {
  const { selectedHobies, setSelectedHobies } = route.params;
  const [searchValue, setSearchValue] = useState("");
  const [tempSelected, setTempSelected] = useState(selectedHobies ?? []);

  const handleInterestPress = (interest) => {
    setTempSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const filteredInterests = interests.filter((item) =>
    item.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>What are your hobbies?</Text>
            <Text style={styles.subtitle}>
              Select the activities that spark your passion
            </Text>

            <SearchBarComponent
              placeholder="Search hobbies..."
              value={searchValue}
              onChangeText={setSearchValue}
            />

            {filteredInterests.length > 0 ? (
              <>
                <Text style={styles.sectionTitle}>Suggested Hobbies</Text>
                <View style={styles.interestsContainer}>
                  {filteredInterests.map((item) => (
                    <InterestTagComponent
                      key={item}
                      label={item}
                      isSelected={tempSelected.includes(item)}
                      onPress={() => handleInterestPress(item)}
                      hobbies={true}
                    />
                  ))}
                </View>
              </>
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  No hobbies found matching "{searchValue}"
                </Text>
              </View>
            )}

            <ButtonComponent
              style={styles.addButton}
              title={`Add ${
                tempSelected.length > 0 ? `(${tempSelected.length})` : ""
              }`}
              onPress={() => {
                setSelectedHobies(tempSelected);
                navigation.goBack();
              }}
            />
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
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginTop: 20,
    marginBottom: 10,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  noResultsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  noResultsText: {
    fontSize: 16,
    color: "#888",
  },
  addButton: {
    marginTop: "auto",
    marginBottom: 20,
  },
});

export default SelectHobiesProfile;
