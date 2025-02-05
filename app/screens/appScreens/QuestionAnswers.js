import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import CustomModal from "../../components/CustomModal";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const allQuestions = [
  // Emotional State
  "How are you feeling right now?",
  "What's your current emotional state?",
  "Can you describe your mood in a few words?",
  "Are you experiencing any intense emotions today?",
  "How would you rate your emotional well-being today?",

  // Daily Experiences
  "Did anything specific happen today that influenced your mood?",
  "Have you felt stressed or overwhelmed today?",
  "Did someone's actions positively or negatively affect your mood?",
  "Have you experienced any moments of joy or satisfaction today?",
  "Did you face any challenges or frustrations today?",
  "Were there any unexpected events that affected your mood?",
  "What was the highlight of your day?",
  "Did you encounter any disappointments today?",

  // Physical Well-being
  "Did you get enough sleep last night?",
  "How was your energy level throughout the day?",
  "How much physical activity did you engage in today?",
  "Have you eaten balanced meals today?",
  "Did you experience any physical discomfort today?",
  "How's your overall physical health feeling?",

  // Social Interactions
  "Did you have any meaningful conversations today?",
  "How were your interactions with family or friends?",
  "Did you feel connected or isolated today?",
  "Were there any social situations that impacted your mood?",
  "Did you feel supported by your social circle?",

  // Mental Health
  "Did you practice any self-care activities today?",
  "Have you been able to manage your anxiety or stress?",
  "Did you take time for mindfulness or meditation?",
  "Are there any recurring thoughts affecting your mood?",
  "How's your mental clarity today?",

  // Work/Study
  "How was your work or study performance today?",
  "Did you feel productive today?",
  "Were you able to focus on your tasks?",
  "Did work or study-related stress impact your mood?",
  "What achievements did you make today?",

  // Personal Growth
  "What have you learned about yourself today?",
  "Did you step out of your comfort zone today?",
  "Are you feeling optimistic about your future?",
  "Did you make progress towards your personal goals?",

  // Additional Open-Ended
  "Any significant emotions or thoughts you want to explore?",
  "What would you like to improve about your day?",
  "Is there anything weighing on your mind right now?",
  "What are you grateful for today?",
  "Do you need any additional support right now?",
  "Any thing else you want to add about your mood?",
];

const emojis = ["😀", "😊", "😐", "😔", "😢"];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const QuestionAnswers = ({ navigation, route }) => {
  const { edit, docId } = route?.params;
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Randomly select 10 unique questions when component mounts
    const selectedQuestions = shuffleArray([...allQuestions]).slice(0, 10);
    setQuestions(selectedQuestions);

    const initialResponses = selectedQuestions.map((q) => ({
      question: q,
      answer: "",
      emoji: null,
    }));
    setResponses(initialResponses);
  }, []);

  const handleInputChange = (text) => {
    const newResponses = [...responses];
    newResponses[currentIndex].answer = text;
    setResponses(newResponses);
  };

  const handleEmojiSelect = (emoji) => {
    const newResponses = [...responses];
    newResponses[currentIndex].emoji = emoji;
    setResponses(newResponses);
  };

  const closeModal = () => {
    if (!responses[currentIndex].answer.trim()) {
      Alert.alert("Error", "Please provide an answer before proceeding.");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setModalVisible(false);
      setSuccessModal(true);
      getMoodAnalysis(responses);
    }
  };

  const getMoodAnalysis = async (responses) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `
                Based on the following questions, answers, and emojis, provide:
                1. A one-word mood summary.
                2. A tagline of 5 words.
                3. A short description of 15 words.
                4. A suggestion of 10 words.
                5. An emoji representing the mood.
                Return the output as plain text with no formatting, no asterisks, no labels and no extra characters. Seprate each item with a new line.
              `,
              },
              {
                role: "user",
                content: `${JSON.stringify(responses)}`,
              },
            ],
            max_tokens: 150,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      const content = data.choices[0].message.content.trim().split("\n");

      if (edit) {
        await firestore()
          .collection("moods")
          .doc(docId)
          .update({
            mood: content[0].replace("**Mood Summary**:", "").trim(),
            tagline: content[1].replace("**Tagline**:", "").trim(),
            description: content[2]
              .replace("**Short Description**:" || "**Description**", "")
              .trim(),
            suggestion: content[3].replace("**Suggestion**:", "").trim(),
            emoji: content[4].replace("**Emoji**", "").trim(),
            userId: auth().currentUser.uid,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
        setLoading(false);
      } else {
        await firestore()
          .collection("moods")
          .doc()
          .set(
            {
              mood: content[0].replace("**Mood Summary**:", "").trim(),
              tagline: content[1].replace("**Tagline**:", "").trim(),
              description: content[2]
                .replace("**Short Description**:" || "**Description**", "")
                .trim(),
              suggestion: content[3].replace("**Suggestion**:", "").trim(),
              emoji: content[4].replace("**Emoji**", "").trim(),
              userId: auth().currentUser.uid,
              createdAt: firestore.FieldValue.serverTimestamp(),
            },
            {
              merge: true,
            }
          );
        setLoading(false);
      }

      return {
        mood: content[0].replace("**Mood Summary**:", "").trim(),
        tagline: content[1].replace("**Tagline**:", "").trim(),
        description: content[2].replace("**Short Description**:", "").trim(),
        suggestion: content[3].replace("**Suggestion**:", "").trim(),
        emoji: content[4],
      };
    } catch (error) {
      console.error("Error fetching mood analysis:", error);
      setLoading(false);
      return {
        mood: "Error",
        tagline: "Unable to process",
        description: "An error occurred while processing your responses.",
        suggestion: "Please try again later.",
      };
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.headerInfo}>
                <Image
                  source={require("../../assets/clock.png")}
                  style={styles.icon}
                />
                <Text style={styles.timeText}>
                  {moment(new Date()).format("HH:MM A")}
                </Text>
                <Image
                  source={require("../../assets/calendar.png")}
                  style={styles.icon}
                />
                <Text style={styles.dateText}>
                  {moment(new Date()).format("MM-DD")}
                </Text>
              </View>
              <Text style={styles.indexText}>
                {currentIndex + 1}/{questions.length}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.goBack();
                }}
              >
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalQuestion}>
              {responses[currentIndex]?.question}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter here answer..."
              placeholderTextColor={"black"}
              value={responses[currentIndex]?.answer}
              onChangeText={handleInputChange}
            />
            <Text style={styles.emojiPrompt}>
              Select here emoji according to your mood
            </Text>
            <View style={styles.emojiContainer}>
              {emojis.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  onPress={() => handleEmojiSelect(emoji)}
                  style={
                    responses[currentIndex]?.emoji === emoji
                      ? styles.selectedEmoji
                      : styles.emoji
                  }
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ marginBottom: 100 }}>
              <ButtonComponent title={"Next"} onPress={closeModal} />
            </View>
          </View>
        </View>
      </Modal>
      <CustomModal visible={successModal}>
        <Image
          source={require("../../assets/moodCreated.png")}
          style={styles.image}
        />
        <Text style={[styles.modalText, { fontSize: 18, fontWeight: "700" }]}>
          Your mood is going amazing you're on a good way!
        </Text>
        <Text style={[styles.modalText, { marginBottom: 50 }]}>
          Keep tracking your mood to know how to improve your mental health
        </Text>
        {loading ? null : (
          <ButtonComponent
            title={"Check Suggestion"}
            onPress={() => {
              setSuccessModal(false);
              navigation.goBack();
            }}
          />
        )}
        {loading && <ActivityIndicator size={"large"} />}
      </CustomModal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#7b1fa2",
    padding: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#ECFFF0",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: "80%",
  },
  modalQuestion: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF16B9",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    textAlignVertical: "top",
    height: 150,
  },
  emojiPrompt: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  emojiContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  emoji: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F1F1F1",
  },
  selectedEmoji: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#C8E6C9",
  },
  emojiText: {
    fontSize: 24,
  },
  nextButton: {
    backgroundColor: "#7b1fa2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
  },
  timeText: {
    fontSize: 14,
    marginRight: 8,
    color: "#333",
  },
  dateText: {
    fontSize: 14,
    color: "#7b1fa2",
  },
  indexText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: "20%",
  },
  closeButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 20,
  },
  modalText: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    alignSelf: "center",
    marginRight: 2,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default QuestionAnswers;
