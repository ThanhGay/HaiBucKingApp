import { TouchableOpacity, Text } from "react-native";
import { styles } from "@/component/styles";

const Button = ({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress: () => void;
  disabled ?: boolean
}) => {
  return (
    <TouchableOpacity style={{...styles.box, opacity: disabled ? 0.5 : 1}} onPress={onPress} disabled={disabled}>
      <Text
        style={{
          textAlign: 'center',
          alignSelf: 'center',
          fontSize: 20,
          fontWeight: '600',
          color: '#000000',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;