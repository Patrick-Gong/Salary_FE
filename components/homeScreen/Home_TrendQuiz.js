import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import ellipse_done from "../../common/homeScreen/ellipse_done.png";
import ellipse_yet from "../../common/homeScreen/ellipse_yet.png";
import { useNavigation } from "@react-navigation/native";

const TemporaryBlackText = styled.Text`
  text-align: center;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  height: 100%;
  margin: 28px;
  margin-top: 0px;
  gap: 32px;

  border-radius: 20px;
`;

const DesriptContainer = styled.View`
  flex: 1;
  flex-direction: column;
  gap: 8px;
`;

const TitleContainer = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const DoneMarker = styled.Image`
  width: 13px;
  height: 13px;
  object-fit: cover;
`;

const NavigateBtn = styled.Pressable`
  text-align: center;
  border-radius: 10px;
  background-color: ${colors.Primary_100};
  padding: 13px 87px;
`;

function Home_TrendQuiz() {
  const [doneTrendQuiz, setDoneTrendQuiz] = useState(true);

  const navigation = useNavigation();

  return (
    <Container doneTrendQuiz={doneTrendQuiz}>
      <DesriptContainer>
        <TitleContainer>
          <DoneMarker
            source={doneTrendQuiz ? ellipse_done : ellipse_yet}
          ></DoneMarker>
          <Text style={{ color: colors.Grayscale_100, fontSize: 20 }}>
            뜨거운 감자가 도착했어요!
          </Text>
        </TitleContainer>
        <Text>
          {doneTrendQuiz
            ? "오늘의 퀴즈를 이미 풀었어요. \n 내일 새로운 퀴즈가 업데이트 될 예정이에요!"
            : "요즘 경제 상황에 기반한 퀴즈를 준비했어요"}
        </Text>
      </DesriptContainer>
      <NavigateBtn
        onPress={() => {
          navigation.push("TodayTrendQuiz");
        }}
      >
        <TemporaryBlackText>
          {doneTrendQuiz ? "트렌드 퀴즈 풀기" : "트렌드 퀴즈 해설 보러가기"}
        </TemporaryBlackText>
      </NavigateBtn>
    </Container>
  );
}

export default Home_TrendQuiz;
