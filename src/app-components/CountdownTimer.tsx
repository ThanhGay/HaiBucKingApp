import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '@/component/styles';

const CountdownTimer = ({
  durationInSeconds,
  onPress,
  colorText,
}: {
  durationInSeconds: number;
  onPress?: () => void;
  colorText?: string;
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
        <Text
          style={{
            ...styles.timerText,
            color: !!colorText?.length ? colorText : '#F2F2F2',
          }}
        >
          {formatTime(timeLeft)}
        </Text>
      ) : (
        <TouchableOpacity onPress={handleResendOTP} onPressOut={onPress}>
          <Text style={styles.timerText}>Gửi lại mã OTP mới?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CountdownTimer;
