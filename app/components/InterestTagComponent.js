import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const TAG_MARGIN = 4;
const CONTAINER_PADDING = 16;
const TAGS_PER_ROW = 3;
const AVAILABLE_WIDTH = width - CONTAINER_PADDING * 2;
const TAG_WIDTH =
  (AVAILABLE_WIDTH - TAG_MARGIN * 2 * TAGS_PER_ROW) / TAGS_PER_ROW;

const InterestTagComponent = ({
  label,
  isSelected,
  onPress,
  hobbies = false,
}) => {
  // Truncate long labels
  const truncatedLabel =
    label.length > 12 ? `${label.substring(0, 10)}...` : label;

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
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          hobbies
            ? isSelected
              ? styles.selectedTexHobbies
              : styles.unselectedTextHobbies
            : isSelected
            ? styles.selectedText
            : styles.unselectedText,
        ]}
        numberOfLines={1}
      >
        {truncatedLabel}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    width: TAG_WIDTH,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    margin: TAG_MARGIN,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
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
  text: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  selectedText: {
    color: "#fff",
  },
  unselectedText: {
    color: "#7DDD94",
  },
  selectedTagHobbies: {
    backgroundColor: "#FF16B9",
    borderColor: "#FF16B9",
  },
  unselectedTagHobbies: {
    backgroundColor: "#fff",
    borderColor: "#FF16B9",
  },
  selectedTexHobbies: {
    color: "#fff",
  },
  unselectedTextHobbies: {
    color: "#FF16B9",
  },
});

export default InterestTagComponent;
