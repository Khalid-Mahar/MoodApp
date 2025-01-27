import React, { useState } from 'react';
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
} from 'react-native';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi User!', sender: 'bot' },
    { id: '2', text: 'How can I assist you?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful mood tracking assistant.',
              },
              { role: 'user', content: input },
            ],
            max_tokens: 50,
          }),
        }
      );

      if (!response.ok) {
        console.error('Error:', response.status, response.statusText);
        return;
      }

      const data = await response.json();
      const botMessage = {
        id: Date.now().toString() + '_bot',
        text: data.choices[0].message.content.trim(),
        sender: 'bot',
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }

    setInput('');
  };

  const renderMessage = ({ item }) => {
    const isBot = item.sender === 'bot';
    return (
      <View
        style={[
          styles.messageContainer,
          isBot ? styles.botMessage : styles.userMessage,
        ]}
      >
        {isBot && (
          <>
            <Image
              source={require('../../assets/chatAvatar.png')}
              style={styles.avatar}
            />
            <Text
              style={[
                styles.messageText,
                isBot
                  ? null
                  : { color: '#FFFFFF', backgroundColor: '#482D79' },
              ]}
            >
              {item.text}
            </Text>
          </>
        )}
        {!isBot && (
          <>
            <Image
              source={require('../../assets/userAvatar.png')}
              style={styles.avatar}
            />
            <Text
              style={[
                styles.messageText,
                !isBot
                  ? { color: '#FFFFFF', backgroundColor: '#482D79' }
                  : null,
              ]}
            >
              {item.text}
            </Text>
          </>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={30}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Image source={require('../../assets/chatbot.png')} style={styles.logo} />
          <Text style={styles.headerText}>AI Chat Bot</Text>
        </View>

        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.chatArea}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask Something..."
          placeholderTextColor={'black'}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
    maxWidth: '70%',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  messageText: {
    backgroundColor: '#F7FBFF',
    borderRadius: 10,
    padding: 10,
    maxWidth: '75%',
    fontSize: 16,
    width: '75%',
  },
  avatar: {
    width: 54,
    height: 48,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#F9F9F9',
  },
  sendButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ChatBot;
