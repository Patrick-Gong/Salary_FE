import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import styled, { css } from "styled-components";
import colors from "../../assets/colors/colors";
import ellipse_done from "../../common/homeScreen/ellipse_done.png";
import ellipse_yet from "../../common/homeScreen/ellipse_yet.png";
import Home_Article_List from "./Home_Article_List";

const TemporaryBlackText = styled.Text`
  text-align: center;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  height: 100%;
  margin: 28px;
  gap: 16px;

  margin-top: 20px;
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

function Home_TrendQuiz() {
  const [doneArticle, setDoneArticle] = useState(false);

  return (
    <Container doneArticle={doneArticle}>
      <DesriptContainer>
        <TitleContainer>
          <DoneMarker
            source={doneArticle ? ellipse_done : ellipse_yet}
          ></DoneMarker>
          <Text style={{ color: colors.Grayscale_100, fontSize: 20 }}>
            아티클
          </Text>
        </TitleContainer>
        <Text>
          {doneArticle
            ? "오늘의 퀴즈를 이미 풀었어요. \n 내일 새로운 퀴즈가 업데이트 될 예정이에요!"
            : "요즘 경제 상황에 기반한 퀴즈를 준비했어요"}
        </Text>
      </DesriptContainer>
      <Home_Article_List />
    </Container>
  );
}

export default Home_TrendQuiz;
