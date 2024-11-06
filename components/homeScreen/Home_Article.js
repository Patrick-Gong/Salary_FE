import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import ellipse_done from "../../common/homeScreen/ellipse_done.png";
import ellipse_yet from "../../common/homeScreen/ellipse_yet.png";
import Home_Article_List from "./Home_Article_List";

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

const Title = styled(fonts.H5)`
  color: ${colors.Grayscale_100};
`;

const TitleDescript = styled(fonts.Caption2)`
  color: ${colors.Grayscale_80};
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
          <Title>아티클</Title>
        </TitleContainer>
        <TitleDescript>
          {doneArticle
            ? "내일 새로운 아티클이 업데이트 될 예정이에요!"
            : "오늘 핫한 아티클 읽고 추가 시드 받아가기"}
        </TitleDescript>
      </DesriptContainer>
      <Home_Article_List />
    </Container>
  );
}

export default Home_TrendQuiz;
