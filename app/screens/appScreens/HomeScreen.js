import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import GradientBackground from "../../components/GradientBackground";
import moment from "moment";
import MoodCard from "../../components/MoodCard";
import { useIsFocused } from "@react-navigation/native";
import MyIndicator from "../../components/MyIndicator";
import ButtonComponent from "../../components/ButtonComponent";

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moods, setMoods] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const calendarListRef = useRef(null);

  // Generate calendar based on moods
  const generateCalendar = () => {
    const dates = [];
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");

    for (
      let date = startOfMonth.clone();
      date.isBefore(endOfMonth) || date.isSame(endOfMonth);
      date.add(1, "day")
    ) {
      dates.push({
        date: date.clone(),
        emoji: null,
      });
    }

    const updatedCalendarData = dates.map((day) => {
      const matchingMoods = moods.filter(
        (mood) =>
          moment(mood.createdAt?.toDate()).format("DD-MM-YYYY") ===
          moment(day.date).format("DD-MM-YYYY")
      );
      return {
        ...day,
        emoji: matchingMoods.length > 0 ? matchingMoods[0]?.emoji : null,
      };
    });

    setCalendarData(updatedCalendarData);
  };

  // Scroll to the selected date
  const scrollToSelectedDate = () => {
    const index = calendarData.findIndex((day) =>
      moment(day.date).isSame(selectedDate, "day")
    );
    if (index !== -1 && calendarListRef.current) {
      calendarListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  // Fetch user and mood data
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

  // Fetch data and generate calendar on focus
  useEffect(() => {
    setLoading(true);
    Promise.all([getUserData(), getMoodData()]).then(() => {
      setLoading(false);
    });
  }, [isFocused, deleted]);

  // Generate calendar whenever moods change
  useEffect(() => {
    if (moods.length > 0) {
      generateCalendar();
    }
  }, [moods]);

  // Scroll to selected date whenever calendarData changes
  useEffect(() => {
    if (calendarData.length > 0) {
      scrollToSelectedDate();
    }
  }, [calendarData]);

  const handleEdit = (id) => {
    navigation.navigate("QuestionAnswers", {
      edit: true,
      docId: id,
    });
  };

  const handleDelete = async (docId) => {
    try {
      Alert.alert("Delete Mood", "Are you sure you want to delete this mood?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await firestore().collection("moods").doc(docId).delete();
            setDeleted(true);
            Alert.alert("Success", "Mood deleted successfully.");
          },
        },
      ]);
    } catch (error) {
      console.error("Error deleting mood:", error);
      Alert.alert("Error", "Failed to delete mood. Please try again.");
    }
  };

  const renderItem = ({ item }) => {
    const isSelected =
      selectedDate && moment(item.date).isSame(selectedDate, "day");
    return (
      <TouchableOpacity
        style={[
          styles.dateContainer,
          isSelected && styles.selectedDateContainer,
        ]}
        onPress={() => setSelectedDate(item.date)}
      >
        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
          {item.date.format("D")}
        </Text>
        {item.emoji && <Text style={styles.emoji}>{item.emoji}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <GradientBackground style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.name}>{"Hey, " + userName + "!"}</Text>
        <FlatList
          ref={calendarListRef}
          data={calendarData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={styles.calendarContainer}
          onScrollToIndexFailed={(info) => {
            setTimeout(() => {
              if (calendarListRef.current) {
                calendarListRef.current.scrollToIndex({
                  index: info.index,
                  animated: true,
                  viewPosition: 0.5,
                });
              }
            }, 500);
          }}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={moods.filter((mood) =>
            moment(mood.createdAt?.toDate()).isSame(selectedDate, "day")
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            console.log(">>>>>>>", item);
            return (
              <MoodCard
                mood={item.mood}
                time={item.time}
                note={item.description}
                icon={item.emoji}
                suggestion={item.suggestion}
                tagline={item.tagline}
                onDelete={() => handleDelete(item.id)}
                onEdit={() => handleEdit(item.id)}
              />
            );
          }}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
      <View style={{ flex: 1 }} />
      <View style={{ marginBottom: 10 }}>
        <ButtonComponent
          title={"Add Mood"}
          onPress={() => {
            navigation.navigate("QuestionAnswers", {
              edit: false,
              docId: "",
            });
          }}
        />
      </View>
      <MyIndicator visible={loading} />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: "700",
    marginTop: 20,
  },
  listContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  calendarContainer: {
    marginVertical: 10,
  },
  dateContainer: {
    width: 50,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 50,
    backgroundColor: "#f9f9f9",
  },
  selectedDateContainer: {
    backgroundColor: "#6c4ed8",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  selectedDateText: {
    color: "#fff",
  },
  emoji: {
    fontSize: 24,
    marginTop: 5,
  },
});
