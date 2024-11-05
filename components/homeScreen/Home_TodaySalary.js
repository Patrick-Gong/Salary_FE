import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { useNavigation } from "@react-navigation/native";

const Title = styled(fonts.H4)`
  color: ${colors.Grayscale_white};
`;

const TemporaryText = styled.Text`
  text-align: center;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  margin: 23px;
  gap: 24px;

  padding-right: 23px;
  padding-left: 23px;
  padding-top: 20px;
  border-radius: 20px;
  margin-bottom: 31px;

  ${(props) =>
    props.doneTodaySalary
      ? css`
          background-color: transparent;
          border: 1px solid ${colors.Grayscale_20};
        `
      : css`
          background-color: ${colors.Grayscale_80};
        `};
`;

const InputBox = styled.View`
  padding: 12px 0px;
  text-align: center;
  vertical-align: center;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.Grayscale_60};
  color: ${colors.Grayscale_40};
`;

const NavigateBtn = styled.Pressable`
  text-align: center;
  border-radius: 10px;
  background-color: ${colors.Primary_100};
  padding: 13px 87px;
`;

// state 1: 학습 진행 여부에 따라 검정색 혹은 흰색
// state 2: 그날의 학습할 단어를 받아와야됨.
function Home_TodaySalary() {
  const [doneTodaySalary, setDoneTodaySalary] = useState(false);
  const [todayVoca, setTodayVoca] = useState("나스닥");

  const navigation = useNavigation();

  return (
    <Container doneTodaySalary={doneTodaySalary}>
      <View>
        <Title>오늘의 샐러리 한조각</Title>
        <Text>
          {doneTodaySalary
            ? "오늘의 단어학습을 완료했어요."
            : "오늘의 단어학습을 완료하면 시드 5개를 받을 수 있어요!"}
        </Text>
      </View>
      <InputBox>
        <TemporaryText>
          {doneTodaySalary ? todayVoca : "단어를 맞춰보세요!"}
        </TemporaryText>
      </InputBox>
      <Text>
        벤처기업들이 상장되어 있는 미국의 장외시장을 말한다. 자본력이 부족한
        비상장벤처기업들이 저리로 자금을 조달하는 창구로 활용하고 있다.
      </Text>
      <NavigateBtn onPress={() => navigation.push("TodaySalary")}>
        <TemporaryText>
          {doneTodaySalary ? "단어 학습하기" : "학습한 단어 보러가기"}
        </TemporaryText>
      </NavigateBtn>
    </Container>
  );
}

export default Home_TodaySalary;
