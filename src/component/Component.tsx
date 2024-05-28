import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Switch,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from '@/component/styles';

export const Title = ({
  leftIcon,
  title,
  rightIcon,
  onPressLeft,
  onPressRight,
}: {
  leftIcon?: boolean;
  title: string;
  rightIcon?: React.ReactNode;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={{ flex: 1 }} onPress={onPressLeft}>
        {leftIcon && (
          <Image
            source={require('@assets/icons/left-arrow.png')}
            style={{ height: 40, width: 40 }}
          />
        )}
      </TouchableOpacity>
      <Text
        style={{
          flex: 8,
          textAlign: 'center',
          color: 'white',
          fontSize: 28,
          fontWeight: '700',
        }}
      >
        {title}
      </Text>
      <TouchableOpacity style={{ flex: 1 }} onPress={onPressRight}>
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
};

export const Box = ({
  icon,
  title,
  onChangeText,
  onFocus,
  secureTextEntry,
  valid,
  errText,
}: {
  icon: any;
  title: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  secureTextEntry?: boolean;
  valid?: boolean;
  errText?: string;
}) => {
  const [text, setText] = useState('');
  const handleTextChange = (text: any) => {
    setText(text);
    onChangeText(text);
  };
  const [hide, setHide] = useState(true);
  const handleHide = () => {
    setHide(!hide);
  };
  return (
    <View>
      <View style={{ ...styles.border, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Image style={{ height: 32, width: 32 }} source={icon} />
          <TextInput
            placeholder={title}
            placeholderTextColor={'white'}
            onFocus={onFocus}
            style={{
              color: 'white',
              fontSize: 25,
              marginLeft: 20,
              opacity: text ? 1 : 0.5,
              flex: 1,
            }}
            onChangeText={handleTextChange}
            value={text}
            secureTextEntry={secureTextEntry && hide}
          />
        </View>
        {secureTextEntry && (
          <TouchableOpacity onPress={handleHide}>
            {
              <Image
                style={{ height: 32, width: 32, tintColor: 'white' }}
                source={
                  hide
                    ? require('@assets/icons/show.png')
                    : require('@assets/icons/hide.png')
                }
              />
            }
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.divider} />
      {!valid && <Text style={{ color: 'red' }}>{errText}</Text>}
    </View>
  );
};

export const Button = ({
  title,
  onPress,
  disable
}: {
  title: string;
  onPress?: () => void;
  disable?: boolean
}) => {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress} disabled ={disable}>
      <Text
        style={{
          textAlign: 'center',
          alignSelf: 'center',
          fontSize: 20,
          color: '#000000',
          fontWeight: '600',
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
