import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import ellipse_done from "../../common/homeScreen/ellipse_done.png";
import ellipse_yet from "../../common/homeScreen/ellipse_yet.png";
import { useNavigation } from "@react-navigation/native";
import PrimaryBtn from "../../common/PrimaryBtn";
import fonts from "../../styles/fonts";

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

function Home_TrendQuiz({ trend }) {
  const [doneTrendQuiz, setDoneTrendQuiz] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setDoneTrendQuiz(trend);
  }, [trend]);

  return (
    <Container>
      <DesriptContainer>
        <TitleContainer>
          <DoneMarker
            source={doneTrendQuiz ? ellipse_done : ellipse_yet}
          ></DoneMarker>
          <Title doneTrendQuiz={doneTrendQuiz}>뜨거운 감자가 도착했어요!</Title>
        </TitleContainer>
        <TitleDescript>
          {doneTrendQuiz
            ? "오늘의 퀴즈를 이미 풀었어요. \n 내일 새로운 퀴즈가 업데이트 될 예정이에요!"
            : "요즘 경제 상황에 기반한 퀴즈를 준비했어요"}
        </TitleDescript>
      </DesriptContainer>

      <PrimaryBtn
        type="active"
        text={doneTrendQuiz ? "트렌드 퀴즈 해설 보러가기" : "트렌드 퀴즈 풀기"}
        onPress={() => {
          navigation.push("TodayTrendQuiz");
        }}
      ></PrimaryBtn>
    </Container>
  );
}

export default Home_TrendQuiz;
