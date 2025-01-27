import React, {useState} from 'react';
import {View} from 'react-native';
import OnboardingScreen from '../components/Onboarding';

const OnboardingScreens = ({navigation}) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const onboardingData = [
    {
      title: 'Discover Your Mood',
      description:
        'Understand how you feel with an engaging and simple question flow',
      image: require('../assets/Onboarding1.png'),
    },
    {
      title: 'AI-Powered Insights',
      description:
        'Let intelligent analysis decode your mood from your responses',
      image: require('../assets/Onboarding2.png'),
    },
    {
      title: 'Tailored Suggestions for You',
      description:
        'Receive personalized tips and activities based on your current mood',
      image: require('../assets/Onboarding3.png'),
    },
  ];

  const handleNext = () => {
    if (currentScreen < onboardingData.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  const handleSkip = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={{flex: 1}}>
      <OnboardingScreen
        title={onboardingData[currentScreen].title}
        description={onboardingData[currentScreen].description}
        image={onboardingData[currentScreen].image}
        onNext={handleNext}
        onSkip={handleSkip}
      />
    </View>
  );
};

export default OnboardingScreens;
