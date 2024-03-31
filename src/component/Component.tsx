import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from '@/component/styles';
export const Title = ({ title }: { title: string }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={{ flex: 1 }}>
        <Text style={{ color: 'white', fontSize: 25 }}>---</Text>
      </TouchableOpacity>
      <Text
        style={{ flex: 6, textAlign: 'center', color: 'white', fontSize: 25 }}
      >
        {title}
      </Text>
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

export const Box = ({ link, title }: { link: string; title: string }) => {
  const [text, setText] = useState('');

  return (
    <View>
      <View style={styles.border}>
        <Text style={{ color: 'white', fontSize: 25 }}>C</Text>
        <TextInput
          placeholder={title}
          placeholderTextColor={'white'}
          style={{
            color: 'white',
            fontSize: 25,
            marginLeft: 20,
            opacity: text ? 1 : 0.5,
          }}
          onChangeText={setText}
          value={text}
        />
      </View>
      <View style={styles.divider} />
    </View>
  );
};

export const Button = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <Text
        style={{
          textAlign: 'center',
          alignSelf: 'center',
          fontSize: 20,
          color: '#000000',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const Footer = ({ title }: { title: string }) => {
  return (
    <View style={styles.footer}>
      <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
        {title}
      </Text>
    </View>
  );
};

export const CountdownTimer = ({
  durationInSeconds,
  onPress,
}: {
  durationInSeconds: number;
  onPress?: () => void;
}) => {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        setShowResend(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleResendOTP = () => {
    console.log('Gửi lại mã OTP mới');
    setTimeLeft(durationInSeconds);
    setShowResend(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={{ alignItems: 'flex-end', paddingRight: 10 }}>
      {!showResend ? (
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      ) : (
        <TouchableOpacity onPress={handleResendOTP} onPressOut={onPress}>
          <Text style={styles.timerText}>Gửi lại mã OTP mới?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
