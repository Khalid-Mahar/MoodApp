import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import TextInputComponent from '../../components/TextComponent';
import GradientBackground from '../../components/GradientBackground';
import ButtonComponent from '../../components/ButtonComponent';
import HeaderComponent from '../../components/HeaderComponent';
import {Checkbox} from 'react-native-paper';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [gender, setGender] = useState(0);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email cannot be empty.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Not a valid email.';
    }

    if (!password) {
      newErrors.password = 'Password cannot be empty.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (!fullName) {
      newErrors.fullName = 'Full name cannot be empty.';
    }
    if (!isChecked) {
      newErrors.isChecked = 'Accept terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSignUp = () => {
    if (validate()) {
      const userData = {
        email,
        password,
        fullName,
        gender: gender,
        isChecked,
      };
      navigation.navigate('SelectIntrests', {
        userData: userData,
      });
    }
  };


  return (
    <GradientBackground>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80} // Adjust this based on your header height
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <HeaderComponent
            title={'Let’s Sign Up.!'}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.subtitle}>
            Create Your Account to Continue Track your Mood
          </Text>
          <TextInputComponent
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            icon={require('../../assets/email.png')}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <TextInputComponent
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            isPassword
            icon={require('../../assets/password.png')}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <TextInputComponent
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}
          <TextInputComponent placeholder="Gender" editable={false} />

          <View style={styles.row}>
            <View style={{flexDirection: 'row'}}>
              <Checkbox.Android
                status={gender === 0 ? 'checked' : 'unchecked'}
                onPress={() => setGender(0)}
                color={'red'}
                uncheckedColor={'green'}
              />
              <Text style={styles.gender}>Male</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Checkbox.Android
                status={gender === 1 ? 'checked' : 'unchecked'}
                onPress={() => setGender(1)}
                color={'red'}
                uncheckedColor={'green'}
              />
              <Text style={styles.gender}>Female</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.row}>
              <Checkbox.Android
                status={isChecked ? 'checked' : 'unchecked'}
                onPress={() => setIsChecked(!isChecked)}
                color={'red'}
                uncheckedColor={'green'}
              />
              <Text style={[styles.forgotPassword, {color: 'black'}]}>
                Accept terms and conditions
              </Text>
            </View>
            {/* <TouchableOpacity onPress={onForgotPassword}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity> */}
          </View>
          {errors.isChecked && (
            <Text style={styles.errorText}>{errors.isChecked}</Text>
          )}
          <View style={{flex: 1}} />
          <ButtonComponent
            title="Next"
            onPress={onSignUp}
            style={styles.signInButton}
          />
          <TouchableOpacity
            style={{marginBottom: 80}}
            onPress={() => navigation.goBack()}>
            <Text style={styles.signUpText}>
              Have an Account? <Text style={styles.signUpLink}>SIGN IN</Text>
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
  gender: {
    color: 'black',
    fontSize: 14,
    marginTop: 5,
    marginLeft: -5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
});

export default RegisterScreen;
