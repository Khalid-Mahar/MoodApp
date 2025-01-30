// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import ButtonComponent from "../../components/ButtonComponent";
// import CustomModal from "../../components/CustomModal";
// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";
// const questions = [
//   "How are you feeling right now?",
//   "Did anything specific happen today that influenced your mood?",
//   "Have you felt stressed or overwhelmed today?",
//   "Did someone’s actions positively or negatively affect your mood?",
//   "Have you experienced any moments of joy or satisfaction today?",
//   "Did you face any challenges or frustrations today?",
//   "Were there any unexpected events that affected your mood?",
//   "Did you get enough sleep last night?",
//   "How much physical activity did you engage in today?",
//   "Have you eaten balanced meals today?",
//   "Any Thing else you want to add About your mood?",
// ];

// const emojis = ["😀", "😊", "😐", "😔", "😢"];

// const QuestionAnswers = ({ navigation, route }) => {
//   const { edit, docId } = route?.params;
//   const [responses, setResponses] = useState(
//     questions.map((q) => ({ question: q, answer: "", emoji: null }))
//   );
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isModalVisible, setModalVisible] = useState(true);
//   const [successModal, setSuccessModal] = useState(false);
//   const handleInputChange = (text) => {
//     const newResponses = [...responses];
//     newResponses[currentIndex].answer = text;
//     setResponses(newResponses);
//   };
//   const [loading, setLoading] = useState(false);
//   const handleEmojiSelect = (emoji) => {
//     const newResponses = [...responses];
//     newResponses[currentIndex].emoji = emoji;
//     setResponses(newResponses);
//   };

//   const openModal = () => {
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     if (!responses[currentIndex].answer.trim()) {
//       Alert.alert("Error", "Please provide an answer before proceeding.");
//       return;
//     }

//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(currentIndex + 1); // Move to the next question
//     } else {
//       setModalVisible(false); // Close modal only after the last question
//       // Alert.alert("Success", "You have completed all the questions!", [
//       //   { text: "OK", onPress: () => console.log("Final Responses:", responses) },
//       // ]);
//       setSuccessModal(true);
//       getMoodAnalysis(responses);
//     }
//   };

//   const getMoodAnalysis = async (responses) => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer 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`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [
//               {
//                 role: "system",
//                 content: `
//                 Based on the following questions, answers, and emojis, provide:
//                 1. A one-word mood summary.
//                 2. A tagline of 5 words.
//                 3. A short description of 15 words.
//                 4. A suggestion of 10 words.
//                 5. An emoji representing the mood.
//               `,
//               },
//               {
//                 role: "user",
//                 content: `${JSON.stringify(responses)}`,
//               },
//             ],
//             max_tokens: 150,
//             temperature: 0.7,
//           }),
//         }
//       );

//       // });

//       const data = await response.json();
//       console.log("response", data.choices[0]);

//       // Assuming content has a structure like the one in your initial message
//       const content = data.choices[0].message.content.trim().split("\n");

//       console.log(
//         "output",
//         "mood:",
//         content[0].replace("**Mood Summary**:", "").trim(),
//         "tagline:",
//         content[1].replace("**Tagline**:", "").trim(),
//         "description:",
//         content[2].replace("**Short Description**:", "").trim(),
//         "suggestion:",
//         content[3].replace("**Suggestion**:", "").trim(),
//         "emoji:",
//         content[4]
//       );
//       if (edit) {
//         await firestore()
//           .collection("moods")
//           .doc(docId)
//           .update({
//             mood: content[0].replace("**Mood Summary**:", "").trim(),
//             tagline: content[1].replace("**Tagline**:", "").trim(),
//             description: content[2]
//               .replace("**Short Description**:" || "**Description**", "")
//               .trim(),
//             suggestion: content[3].replace("**Suggestion**:", "").trim(),
//             emoji: content[4].replace("**Emoji**", "").trim(),
//             userId: auth().currentUser.uid,
//             createdAt: firestore.FieldValue.serverTimestamp(),
//           });
//         setLoading(false);
//       } else {
//         await firestore()
//           .collection("moods")
//           .doc()
//           .set(
//             {
//               mood: content[0].replace("**Mood Summary**:", "").trim(),
//               tagline: content[1].replace("**Tagline**:", "").trim(),
//               description: content[2]
//                 .replace("**Short Description**:" || "**Description**", "")
//                 .trim(),
//               suggestion: content[3].replace("**Suggestion**:", "").trim(),
//               emoji: content[4].replace("**Emoji**", "").trim(),
//               userId: auth().currentUser.uid,
//               createdAt: firestore.FieldValue.serverTimestamp(),
//             },
//             {
//               merge: true,
//             }
//           );
//         setLoading(false);
//       }

//       return {
//         mood: content[0].replace("**Mood Summary**:", "").trim(),
//         tagline: content[1].replace("**Tagline**:", "").trim(),
//         description: content[2].replace("**Short Description**:", "").trim(),
//         suggestion: content[3].replace("**Suggestion**:", "").trim(),
//         emoji: content[4],
//       };
//     } catch (error) {
//       console.error("Error fetching mood analysis:", error);
//       setLoading(false);
//       return {
//         mood: "Error",
//         tagline: "Unable to process",
//         description: "An error occurred while processing your responses.",
//         suggestion: "Please try again later.",
//       };
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <Modal visible={isModalVisible} animationType="slide" transparent={true}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <View style={styles.headerInfo}>
//                 <Image
//                   source={require("../../assets/clock.png")}
//                   style={styles.icon}
//                 />
//                 <Text style={styles.timeText}>
//                   {moment(new Date()).format("HH:MM A")}
//                 </Text>
//                 <Image
//                   source={require("../../assets/calendar.png")}
//                   style={styles.icon}
//                 />
//                 <Text style={styles.dateText}>
//                   {moment(new Date()).format("MM-DD")}
//                 </Text>
//               </View>
//               <Text style={styles.indexText}>
//                 {currentIndex + 1}/{questions.length}
//               </Text>
//               <TouchableOpacity
//                 onPress={() => {
//                   setModalVisible(false);
//                   navigation.goBack();
//                 }}
//               >
//                 <Text style={styles.closeButton}>✕</Text>
//               </TouchableOpacity>
//             </View>
//             <Text style={styles.modalQuestion}>
//               {responses[currentIndex]?.question}
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter here answer..."
//               placeholderTextColor={"black"}
//               value={responses[currentIndex]?.answer}
//               onChangeText={handleInputChange}
//             />
//             <Text style={styles.emojiPrompt}>
//               Select here emoji according to your mood
//             </Text>
//             <View style={styles.emojiContainer}>
//               {emojis.map((emoji) => (
//                 <TouchableOpacity
//                   key={emoji}
//                   onPress={() => handleEmojiSelect(emoji)}
//                   style={
//                     responses[currentIndex]?.emoji === emoji
//                       ? styles.selectedEmoji
//                       : styles.emoji
//                   }
//                 >
//                   <Text style={styles.emojiText}>{emoji}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//             <View style={{ flex: 1 }} />
//             <View style={{ marginBottom: 100 }}>
//               <ButtonComponent title={"Next"} onPress={closeModal} />
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <CustomModal visible={successModal}>
//         <Image
//           source={require("../../assets/moodCreated.png")}
//           style={styles.image}
//         />
//         <Text style={[styles.modalText, { fontSize: 18, fontWeight: "700" }]}>
//           Your mood is going amazing you’re on a good way!
//         </Text>
//         <Text style={[styles.modalText, { marginBottom: 50 }]}>
//           Keep tracking your mood to know how to improve your mental health
//         </Text>
//         {loading ? null : (
//           <ButtonComponent
//             title={"Check Suggestion"}
//             onPress={() => {
//               setSuccessModal(false);
//               navigation.goBack();
//             }}
//           />
//         )}
//         {loading && <ActivityIndicator size={"large"} />}
//       </CustomModal>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#E8F5E9",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   addButton: {
//     backgroundColor: "#7b1fa2",
//     padding: 16,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: "100%",
//     backgroundColor: "#ECFFF0",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 16,
//     height: "80%",
//   },
//   modalQuestion: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#FF16B9",
//     borderRadius: 8,
//     padding: 16,
//     fontSize: 16,
//     marginBottom: 16,
//     textAlignVertical: "top",
//     height: 150,
//   },
//   emojiPrompt: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   emojiContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 16,
//   },
//   emoji: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: "#F1F1F1",
//   },
//   selectedEmoji: {
//     padding: 8,
//     borderRadius: 20,
//     backgroundColor: "#C8E6C9",
//   },
//   emojiText: {
//     fontSize: 24,
//   },
//   nextButton: {
//     backgroundColor: "#7b1fa2",
//     padding: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 16,
//   },
//   nextText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   headerInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     padding: 5,
//     borderRadius: 20,
//   },
//   timeText: {
//     fontSize: 14,
//     marginRight: 8,
//     color: "#333",
//   },
//   dateText: {
//     fontSize: 14,
//     color: "#7b1fa2",
//   },
//   indexText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginRight: "20%",
//   },
//   closeButton: {
//     fontSize: 15,
//     fontWeight: "bold",
//     color: "black",
//     backgroundColor: "white",
//     paddingVertical: 5,
//     paddingHorizontal: 7,
//     borderRadius: 20,
//   },
//   modalText: {
//     fontSize: 12,
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   icon: {
//     width: 15,
//     height: 15,
//     resizeMode: "contain",
//     alignSelf: "center",
//     marginRight: 2,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     resizeMode: "contain",
//   },
// });

// export default QuestionAnswers;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import QuestionPicker from "../../model/QuestionPicker";

const emojis = ["😀", "😊", "😐", "😔", "😢"];

const QuestionAnswers = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    const selectedQuestions = QuestionPicker(); // Get 10 random questions
    setQuestions(selectedQuestions);
    setResponses(
      selectedQuestions.map((q) => ({ question: q, answer: "", emoji: null }))
    );
  }, []);

  const handleInputChange = (text) => {
    const updatedResponses = [...responses];
    updatedResponses[currentIndex].answer = text;
    setResponses(updatedResponses);
  };

  const handleNext = () => {
    if (!responses[currentIndex].answer.trim()) {
      Alert.alert("Error", "Please provide an answer before proceeding.");
      return;
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setModalVisible(false);
      console.log("Final Responses:", responses);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.question}>{questions[currentIndex]}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your answer..."
            value={responses[currentIndex]?.answer}
            onChangeText={handleInputChange}
          />
          <View style={styles.emojiContainer}>
            {emojis.map((emoji) => (
              <TouchableOpacity
                key={emoji}
                onPress={() => handleInputChange(emoji)}
              >
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalContent: { padding: 20, alignItems: "center" },
  question: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, width: "80%", marginBottom: 20 },
  emojiContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  emoji: { fontSize: 24, margin: 5 },
  nextButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  nextButtonText: { color: "white", fontSize: 16 },
});

export default QuestionAnswers;
