import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import TextInputComponent from '../../components/TextComponent';
import GradientBackground from '../../components/GradientBackground';
import ButtonComponent from '../../components/ButtonComponent';
import HeaderComponent from '../../components/HeaderComponent';
import {Checkbox} from 'react-native-paper';
import auth from '@react-native-firebase/auth'; // Firebase Auth import
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../../auth/useAuth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const {Login} = useAuth();
  const validateInputs = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!email || !password) {
      if (!email) setEmailError('Email is required');
      if (!password) setPasswordError('Password is required');
      valid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }

    if (password && password.length < 6) {
      setPasswordError('Password should be at least 6 characters');
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
      await AsyncStorage.setItem('token', 'true');
      await Login(true);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
      if (error.code === 'auth/user-not-found') {
        setEmailError('No user found with this email');
      } else if (error.code === 'auth/invalid-credential') {
        setEmailError('No user found with this email');
      } else if (error.code === 'auth/wrong-password') {
        setPasswordError('Incorrect password');
      } else {
        setEmailError('An error occurred. Please try again');
      }
    }
  };

  const onForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    try {
      setLoading(true);
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        'Success',
        'A password reset link has been sent to your email.',
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
      let errorMessage = 'Something went wrong.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }
      Alert.alert('Error', errorMessage);
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <HeaderComponent title={'Let’s Sign In.!'} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80} // Adjust based on header height
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.subtitle}>
            Login to Your Account to Continue your Mood
          </Text>
          <TextInputComponent
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            icon={require('../../assets/email.png')}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <TextInputComponent
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            isPassword
            icon={require('../../assets/password.png')}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <View style={styles.row}>
            <Checkbox.Android
              status={isChecked ? 'checked' : 'unchecked'}
              onPress={() => setIsChecked(!isChecked)}
              color={'red'}
              uncheckedColor={'green'}
            />
            <TouchableOpacity onPress={onForgotPassword}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}} />
          {loading ? null : (
            <ButtonComponent
              title="Sign In Your Account"
              onPress={handleLogin}
              style={styles.signInButton}
            />
          )}

          <TouchableOpacity
            style={{marginBottom: 80}}
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.signUpText}>
              Don’t have an Account?{' '}
              <Text style={styles.signUpLink}>SIGN UP</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    marginTop: 30,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  forgotPassword: {
    color: '#ff00ff',
    fontSize: 14,
  },
  signInButton: {
    marginTop: 20,
    width: '100%',
  },
  signUpText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  signUpLink: {
    color: 'purple',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default LoginScreen;
