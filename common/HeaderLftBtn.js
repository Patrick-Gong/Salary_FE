import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

// theme: dark, light
// onPress : 특정 함수를 전달하고 싶다면 , 만약 undefined이면 goBack(-1)
function HeaderLeftBtn({ theme, onPress }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress ? onPress : () => navigation.goBack(-1)}
    >
      <Ionicons
        name="chevron-back"
        size={20}
        color={theme === "dark" ? "#121212" : "#A0A0A0"}
      />
    </TouchableOpacity>
  );
}

export default HeaderLeftBtn;
