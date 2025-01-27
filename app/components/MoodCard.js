import moment from 'moment';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const MoodCard = ({
  mood,
  time,
  note,
  icon,
  tagline,
  suggestion,
  onDelete,
  onEdit,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon?.split('5. ')[1]}</Text>
        <View style={{marginLeft: 10}}>
          <Text style={styles.moodText}>{mood?.split('1. ')[1]}</Text>
          <Text style={styles.timeText}>{moment(time).format('HH:mm')}</Text>
        </View>
      </View>

      <Text style={styles.description}>{tagline?.split('2. ')[1]}</Text>

      <Text style={styles.note}>
        <Text style={styles.noteLabel}>Note:</Text> {note?.split('3. ')[1]}{' '}
      </Text>

      <Text style={styles.suggestion}>
        <Text style={styles.suggestionLabel}>Suggestion:</Text>{' '}
        {suggestion?.split('4. ')[1]}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={[styles.buttonText, {color: '#482D79'}]}>
            Delete Mood
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.buttonText}>Edit Mood</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  timeText: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#6B52AE',
  },
  note: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  noteLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  readMore: {
    color: '#6B52AE',
    fontWeight: 'bold',
  },
  suggestion: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  suggestionLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '49%',
    elevation: 5,
  },
  editButton: {
    backgroundColor: '#482D79',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '49%',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    fontSize: 24,
  },
});

export default MoodCard;
