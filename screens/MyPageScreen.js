import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { StatusBar } from "expo-status-bar";
import styled, { css } from "styled-components";
import Character from "../assets/img/myPageScreen/myPageCharac.png";
import DollarIcn from "../assets/img/myPageScreen/dollar.png";
import Challenge from "../assets/img/myPageScreen/ChallengeIcon.png";
import Shopping from "../assets/img/myPageScreen/ShoppingIcon.png";
import TmpShopping from "../assets/img/myPageScreen/tmpShoppingIcn.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@env";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import arrow from "../assets/img/homeScreen/articleArrow.png";
import { Ionicons } from "@expo/vector-icons";

const GreenContainer = styled.View`
  background-color: ${colors.Secondary_100};
  width: 100%;
  height: 45%;

  display: flex;
  flex-direction: column;

  position: relative;
`;

const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;

  position: absolute;
  top: 35%;
  left: 30px;
`;

const NickNameContainer = styled.View`
  align-self: flex-start;
  border-bottom-color: black;
  border-bottom-width: 1px;
  border-bottom-style: solid;
`;

const NickName = styled(fonts.Body1)`
  color: ${colors.Grayscale_100};
`;

const CharacterImg = styled.Image`
  width: 353px;
  height: 264px;
  flex-shrink: 0;
  object-fit: cover;

  position: absolute;
  top: 35%;
  right: 0%;
`;

const BtnContainer = styled.Pressable`
  width: 100px;
  height: 30px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  line-height: 30px;
  text-align: center;
`;

const GrayContainer = styled.View`
  /* background-color: ${colors.bg}; */
  width: 100%;
  flex: 1;
  padding: 12px;

  display: flex;
  gap: 14px;
`;

const BoxesContainer = styled.View`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const Box = styled.Pressable`
  width: 48%;

  border-radius: 15px;
  background: ${colors.Grayscale_white};

  display: flex;
  padding: 10px 12px;
  flex-direction: column;
  align-items: flex-start;

  position: relative;

  ${(props) =>
    props.state === "disabled"
      ? css`
          background-color: rgba(13, 13, 13, 0.65);
        `
      : css``}
`;

const BoxText = styled.View`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BoxImg = styled.Image`
  width: 180px;
  height: 117px;

  ${(props) =>
    props.state === "disabled"
      ? css`
          background-color: rgba(13, 13, 13, 0.65);
        `
      : css``}
`;

const ListsContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ListItem = styled.Pressable`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 16px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  background-color: #ffffff;
`;

const ListTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

function MyPageScreen() {
  // const nickname = AsyncStorage.getItem("Nickname");
  const nickname = "들기름";
  const [totalSeed, setTotalSeed] = useState(0);
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const fetchSeed = async () => {
    console.log("seed fetch");
    // const { data } = await axios.get(`${BASE_URL}/seed`);
    // console.log("seed fetch 결과: ", data);
    // setTotalSeed(data.total_seed);
    setTotalSeed(10000);
  };

  useEffect(() => {
    if (isFocused) fetchSeed();
  }, [isFocused]);

  return (
    <>
      <GreenContainer>
        <StatusBar style="dark" />
        {/* 연두색 영역 */}
        <TextContainer>
          <Image source={DollarIcn} style={{ width: 35, height: 35 }} />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
            }}
          >
            <NickNameContainer>
              <NickName>{nickname}</NickName>
            </NickNameContainer>
            <Text style={{ ...fonts.Body2R, color: "#121212" }}>
              님이 보유한 시드
            </Text>
          </View>
          <fonts.H2M>{totalSeed.toLocaleString()}개</fonts.H2M>
          <BtnContainer>
            <fonts.Caption2>적립/사용내역 </fonts.Caption2>
            <Ionicons name="chevron-forward-outline" size={12}></Ionicons>
          </BtnContainer>
        </TextContainer>
        <CharacterImg source={Character} />
      </GreenContainer>
      {/* 메뉴 영역 */}
      <GrayContainer>
        <BoxesContainer>
          <Box>
            <BoxText>
              <fonts.Body1 style={{ color: "#121212" }}>
                시드 충전소
              </fonts.Body1>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={"#d0d0d0"}
              ></Ionicons>
            </BoxText>
            <BoxImg source={Shopping} />
          </Box>

          <Box state={"disabled"}>
            <BoxText>
              <fonts.Body1 style={{ color: "#121212" }}>
                챌린지 바로가기
              </fonts.Body1>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={"#111111"}
              ></Ionicons>
            </BoxText>
            <View>
              <BoxImg source={TmpShopping} />
            </View>
          </Box>
        </BoxesContainer>
        <ListsContainer>
          <ListItem>
            <ListTextContainer>
              <Ionicons
                name="person-outline"
                size={20}
                color={"#a0a0a0"}
              ></Ionicons>
              <fonts.Body2M>닉네임 수정</fonts.Body2M>
            </ListTextContainer>
            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color={"#a0a0a0"}
            ></Ionicons>
          </ListItem>
          <ListItem>
            <ListTextContainer>
              <Ionicons
                name="help-circle-outline"
                size={20}
                color={"#a0a0a0"}
              ></Ionicons>
              <fonts.Body2M>자주 묻는 질문</fonts.Body2M>
            </ListTextContainer>
            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color={"#a0a0a0"}
            ></Ionicons>
          </ListItem>
          <ListItem>
            <ListTextContainer>
              <Ionicons
                name="reader-outline"
                size={20}
                color={"#a0a0a0"}
              ></Ionicons>
              <fonts.Body2M>앱 정보</fonts.Body2M>
            </ListTextContainer>
            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color={"#a0a0a0"}
            ></Ionicons>
          </ListItem>
        </ListsContainer>
      </GrayContainer>
    </>
  );
}

export default MyPageScreen;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
});
