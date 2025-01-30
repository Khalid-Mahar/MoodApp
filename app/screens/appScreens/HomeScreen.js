import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");
const CARD_PADDING = 15;
const CARD_MARGIN = 10;

const MoodCard = ({
  mood,
  time,
  description,
  emoji,
  suggestion,
  tagline,
  onDelete,
  onEdit,
}) => (
  <View style={styles.moodCard}>
    <View style={styles.moodCardHeader}>
      <View style={styles.moodInfo}>
        <Text style={styles.emojiLarge}>{emoji?.split("5. ")[1]}</Text>
        <View style={styles.moodTextContainer}>
          <Text style={styles.moodTitle}>{mood}</Text>
          <Text style={styles.moodTime}>{moment(time).format("h:mm A")}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={onEdit}
          style={[styles.actionButton, styles.editButton]}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.actionButton, styles.deleteButton]}
        >
          <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <Text style={styles.description}>{description}</Text>
    <View style={styles.suggestionContainer}>
      <Text style={styles.tagline}>{tagline}</Text>
      <Text style={styles.suggestion}>{suggestion}</Text>
    </View>
  </View>
);

const DateSelector = ({ date, selected, onSelect }) => {
  const isSelected = moment(date).isSame(selected, "day");

  return (
    <TouchableOpacity
      style={[styles.dateButton, isSelected && styles.selectedDateButton]}
      onPress={() => onSelect(date)}
    >
      <Text style={[styles.dateWeekday, isSelected && styles.selectedDateText]}>
        {moment(date).format("ddd")}
      </Text>
      <Text style={[styles.dateNumber, isSelected && styles.selectedDateText]}>
        {moment(date).format("D")}
      </Text>
      {date.emoji && (
        <Text style={styles.dateEmoji}>{date.emoji?.split("5. ")[1]}</Text>
      )}
    </TouchableOpacity>
  );
};

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moods, setMoods] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const dateListRef = useRef(null);

  // Firebase data fetching functions remain the same
  const getUserData = async () => {
    try {
      const res = await firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .get();
      if (res.data()) setUserName(res?.data()?.fullName);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getMoodData = async () => {
    try {
      const moods = await firestore()
        .collection("moods")
        .where("userId", "==", auth().currentUser.uid)
        .get();

      const moodData = moods.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMoods(moodData);
    } catch (error) {
      console.error("Error fetching mood data:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([getUserData(), getMoodData()]).then(() => {
      setLoading(false);
    });
  }, [isFocused]);

  const generateDateRange = () => {
    const dates = [];
    const startDate = moment().subtract(15, "days");
    const endDate = moment().add(15, "days");

    for (
      let date = startDate.clone();
      date.isSameOrBefore(endDate);
      date.add(1, "day")
    ) {
      dates.push({
        date: date.toDate(),
        emoji: null,
      });
    }
    return dates;
  };

  const handleAddMood = () => {
    navigation.navigate("QuestionAnswers", {
      edit: false,
      docId: "",
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={["#F3E8FF", "#FFFFFF"]} style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hey, {userName}!</Text>
            <Text style={styles.subGreeting}>How are you feeling today?</Text>
          </View>
        </View>

        {/* Date Selector */}
        <FlatList
          ref={dateListRef}
          data={generateDateRange()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateList}
          keyExtractor={(item) => moment(item.date).format("YYYY-MM-DD")}
          renderItem={({ item }) => (
            <DateSelector
              date={item.date}
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          )}
        />

        {/* Mood List */}
        <FlatList
          data={moods.filter((mood) =>
            moment(mood.createdAt?.toDate()).isSame(selectedDate, "day")
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.moodList}
          renderItem={({ item }) => (
            <MoodCard
              {...item}
              onDelete={() => handleDelete(item.id)}
              onEdit={() => handleEdit(item.id)}
            />
          )}
        />

        {/* Add Mood Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddMood}>
          <Text style={styles.addButtonText}>Add Mood</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3E8FF",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subGreeting: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  dateList: {
    paddingVertical: 10,
  },
  dateButton: {
    width: 60,
    height: 80,
    marginHorizontal: 6,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  selectedDateButton: {
    backgroundColor: "#7C3AED",
  },
  dateWeekday: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginTop: 4,
  },
  selectedDateText: {
    color: "#fff",
  },
  dateEmoji: {
    fontSize: 16,
    marginTop: 4,
  },
  moodList: {
    paddingVertical: 10,
  },
  moodCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: CARD_PADDING,
    marginBottom: CARD_MARGIN,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  moodCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  moodInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  emojiLarge: {
    fontSize: 32,
    marginRight: 12,
  },
  moodTextContainer: {
    justifyContent: "center",
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  moodTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: "#EEF2FF",
  },
  deleteButton: {
    backgroundColor: "#FEE2E2",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4F46E5",
  },
  deleteButtonText: {
    color: "#DC2626",
  },
  description: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 12,
  },
  suggestionContainer: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
  },
  tagline: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  suggestion: {
    fontSize: 14,
    color: "#4B5563",
  },
  addButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 20,
    shadowColor: "#7C3AED",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
