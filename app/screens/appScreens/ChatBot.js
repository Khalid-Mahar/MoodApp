import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient"; // You'll need to install react-native-linear-gradient
import Icon from "react-native-vector-icons/Ionicons"; // You'll need to install react-native-vector-icons

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi User!", sender: "bot" },
    { id: "2", text: "How can I assist you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "You are a helpful mood tracking assistant.",
              },
              { role: "user", content: input },
            ],
            max_tokens: 50,
          }),
        }
      );

      if (!response.ok) {
        console.error("Error:", response.status, response.statusText);
        return;
      }

      const data = await response.json();
      const botMessage = {
        id: Date.now().toString() + "_bot",
        text: data.choices[0].message.content.trim(),
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  const renderMessage = ({ item }) => {
    const isBot = item.sender === "bot";
    return (
      <View
        style={[
          styles.messageContainer,
          isBot ? styles.botMessageContainer : styles.userMessageContainer,
        ]}
      >
        {isBot ? (
          <View style={styles.botMessageWrapper}>
            <Image
              source={require("../../assets/robot.png")}
              style={styles.avatar}
            />
            <View style={styles.botMessageBubble}>
              <Text style={styles.botMessageText}>{item.text}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.userMessageWrapper}>
            <View style={styles.userMessageBubble}>
              <Text style={styles.userMessageText}>{item.text}</Text>
            </View>
            <Image
              source={require("../../assets/profile.png")}
              style={styles.avatar}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <LinearGradient colors={["#F0F4F8", "#E6EAF0"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={30}
        >
          <View style={styles.header}>
            <Image
              source={require("../../assets/robot.png")}
              style={styles.logo}
            />
            <Text style={styles.headerText}>AI Companion</Text>
          </View>

          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.chatArea}
            contentContainerStyle={styles.chatContentContainer}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              placeholderTextColor="#8E8E93"
              value={input}
              onChangeText={setInput}
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Icon name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C3E50",
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chatContentContainer: {
    paddingVertical: 15,
  },
  messageContainer: {
    marginVertical: 5,
  },
  botMessageContainer: {
    alignSelf: "flex-start",
  },
  userMessageContainer: {
    alignSelf: "flex-end",
  },
  botMessageWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    maxWidth: "85%",
  },
  userMessageWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    maxWidth: "85%",
    alignSelf: "flex-end",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  botMessageBubble: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userMessageBubble: {
    backgroundColor: "#5E72E4",
    borderRadius: 15,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  botMessageText: {
    color: "#2C3E50",
    fontSize: 16,
  },
  userMessageText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    minHeight: 45,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#F9F9F9",
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#5E72E4",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default ChatBot;
