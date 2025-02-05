// import React from "react";
// import { TouchableOpacity, Text, StyleSheet } from "react-native";

// const InterestTagComponent = ({
//   label,
//   isSelected,
//   onPress,
//   hobbies = false,
// }) => {
//   return (
//     <>
//       {hobbies ? (
//         <TouchableOpacity
//           style={[
//             styles.tag,
//             styles.tagBase,
//             isSelected
//               ? styles.selectedTagHobbies
//               : styles.unselectedTagHobbies,
//           ]}
//           onPress={onPress}
//         >
//           <Text
//             style={[
//               styles.text,
//               isSelected
//                 ? styles.selectedTexHobbies
//                 : styles.unselectedTextHobbies,
//             ]}
//           >
//             {label}
//           </Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity
//           style={[
//             styles.tag,
//             styles.tagBase,
//             isSelected ? styles.selectedTag : styles.unselectedTag,
//           ]}
//           onPress={onPress}
//         >
//           <Text
//             style={[
//               styles.text,
//               isSelected ? styles.selectedText : styles.unselectedText,
//             ]}
//           >
//             {label}
//           </Text>
//         </TouchableOpacity>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   tagBase: {
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 20,
//     margin: 5,
//     borderWidth: 1,
//     alignSelf: "flex-start",
//   },
//   tag: {
//     maxWidth: "100%",
//   },
//   selectedTag: {
//     backgroundColor: "#7DDD94",
//     borderColor: "#7DDD94",
//   },
//   unselectedTag: {
//     backgroundColor: "#fff",
//     borderColor: "#7DDD94",
//   },
//   text: {
//     fontSize: 14,
//   },
//   selectedText: {
//     color: "#333",
//   },
//   unselectedText: {
//     color: "#7DDD94",
//   },
//   selectedTagHobbies: {
//     backgroundColor: "#FF16B9",
//     borderColor: "#FF16B9",
//   },
//   unselectedTagHobbies: {
//     backgroundColor: "#fff",
//     borderColor: "#FF16B9",
//   },
//   selectedTexHobbies: {
//     color: "white",
//   },
//   unselectedTextHobbies: {
//     color: "#FF16B9",
//   },
// });

// export default InterestTagComponent;

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const InterestTagComponent = ({
  label,
  isSelected,
  onPress,
  hobbies = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.tag,
        hobbies
          ? isSelected
            ? styles.selectedTagHobbies
            : styles.unselectedTagHobbies
          : isSelected
          ? styles.selectedTag
          : styles.unselectedTag,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          hobbies
            ? isSelected
              ? styles.selectedTextHobbies
              : styles.unselectedTextHobbies
            : isSelected
            ? styles.selectedText
            : styles.unselectedText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    margin: 5,
    borderWidth: 1.5,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedTag: {
    backgroundColor: "#7DDD94",
    borderColor: "#7DDD94",
  },
  unselectedTag: {
    backgroundColor: "#fff",
    borderColor: "#7DDD94",
  },
  selectedTagHobbies: {
    backgroundColor: "#FF16B9",
    borderColor: "#FF16B9",
  },
  unselectedTagHobbies: {
    backgroundColor: "#fff",
    borderColor: "#FF16B9",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  selectedText: {
    color: "#333",
  },
  unselectedText: {
    color: "#7DDD94",
  },
  selectedTextHobbies: {
    color: "white",
  },
  unselectedTextHobbies: {
    color: "#FF16B9",
  },
});

export default InterestTagComponent;
