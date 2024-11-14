import { View, Text, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import InformationImg from "../../assets/img/vocaListScreen/remindInfo.png";
import styled from "styled-components";
import { useState } from "react";

const AbsoluteImg = styled.Image`
  object-fit: cover;
  position: absolute;
  height: 48.76px;
  width: 160.08px;

  top: 30px;
  right: 0px;
`;
function VocaReminder_HeaderRight() {
  const [clicked, setClicked] = useState(false);

  const setClickedTimeOut = () => {
    if (!clicked) {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 3000);
    }
    setClicked(true);
  };

  return (
    <TouchableOpacity
      style={{ position: "relative" }}
      activeOpacity={0.7}
      onPress={() => setClickedTimeOut()}
    >
      <Ionicons name="information-circle-outline" color="DBDCDF" size={23} />
      {clicked ? <AbsoluteImg source={InformationImg} /> : <></>}
    </TouchableOpacity>
  );
}

export default VocaReminder_HeaderRight;
