import { Title } from "@/component/Component";
import { styles } from "@/component/styles";
import colors from "@/utils/colors";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";

function SelectSeat() {
    const navigation = useNavigation()
    return ( 
        <View style={styles.container}>
            <Title title="Select Seat" onPress={navigation.goBack} />
        </View>
     );
}

export default SelectSeat;