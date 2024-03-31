import { TouchableOpacity, Text } from "react-native";
import { styles } from "@/component/styles";

const Button = ({
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

export default Button;