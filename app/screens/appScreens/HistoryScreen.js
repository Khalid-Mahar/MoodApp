import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import MoodCard from '../../components/MoodCard';
import HeaderComponent from '../../components/HeaderComponent';
import GradientBackground from '../../components/GradientBackground';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import MyIndicator from '../../components/MyIndicator';

const HistoryScreen = ({navigation}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const isFocused = useIsFocused();
  const handleDelete = async docId => {
    try {
      Alert.alert('Delete Mood', 'Are you sure you want to delete this mood?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await firestore().collection('moods').doc(docId).delete();
            setDeleted(true);
            Alert.alert('Success', 'Mood deleted successfully.');
          },
        },
      ]);
    } catch (error) {
      console.error('Error deleting mood:', error);
      Alert.alert('Error', 'Failed to delete mood. Please try again.');
    }
  };
  useEffect(() => {
    getMoodHistory(date);
  }, [isFocused, date, deleted]);

  const getMoodHistory = async date => {
    try {
      setLoading(true);
      const now = new Date(date);
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();
      const userId = auth().currentUser.uid;
      const moodsSnapshot = await firestore()
        .collection('moods')
        .where('userId', '==', userId)
        .get();
      const filteredMoods = moodsSnapshot.docs
        .map(doc => ({id: doc.id, ...doc.data()}))
        .filter(mood => {
          const createdAt = mood.createdAt?.toDate();
          return (
            createdAt &&
            createdAt.getMonth() + 1 === currentMonth &&
            createdAt.getFullYear() === currentYear
          );
        });
      setMoods(filteredMoods);
      setLoading(false);
      return filteredMoods;
    } catch (error) {
      console.error('Error fetching mood history:', error);
      throw error;
      setLoading(false);
    }
  };
  const handleEdit = id => {
    // console.log('Edit mood with id:', id);
    navigation.navigate('QuestionAnswers', {
      edit: true,
      docId: id,
    });
  };

  const handleConfirm = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <GradientBackground>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.title}>{'History'}</Text>
        <TouchableOpacity
          style={styles.dateContainer}
          onPress={() => setShowPicker(true)}>
          <Text style={styles.date}>{moment(date).format('MMMM YYYY')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={moods}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
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
        {showPicker && (
          <RNDateTimePicker mode="date" value={date} onChange={handleConfirm} />
        )}
      </View>
      <MyIndicator visible={loading} />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 8,
  },
  dateContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#482D79',
    height: 30,
    alignSelf: 'center',
    borderRadius: 50,
  },
  date: {
    marginTop: 5,
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default HistoryScreen;
