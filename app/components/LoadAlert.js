import React from "react";
import { View, Text, Modal, StyleSheet, ActivityIndicator } from "react-native";

export const SimpleLoader = ({ visible }) => (
  <Modal transparent visible={visible}>
    <View style={styles.modalBackground}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  </Modal>
);

export const SimpleAlert = ({ visible, message, onClose }) => {
  if (visible) {
    setTimeout(onClose, 2000);
    return (
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>{message}</Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  alertContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    zIndex: 999,
  },
  alertText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
