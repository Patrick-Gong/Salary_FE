import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import styled from "styled-components/native";
import Home_TrendQuiz from "../components/homeScreen/Home_TrendQuiz";
import Home_TodaySalary from "../components/homeScreen/Home_TodaySalary";
import Home_WeekStrip from "../components/homeScreen/Home_WeekStrip";
import Home_AttendanceProgress from "../components/homeScreen/Home_AttendanceProgress";
import Home_Article from "../components/homeScreen/Home_Article";
import colors from "../styles/colors";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Shadow } from "react-native-shadow-2";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import process1 from "../assets/img/homeScreen/charac/process1.png";
import process2 from "../assets/img/homeScreen/charac/process2.png";
import process3 from "../assets/img/homeScreen/charac/process3.png";
import process4 from "../assets/img/homeScreen/charac/process4.png";
import fonts from "../styles/fonts";

// 임시 박스
const TemporaryBox2 = styled.View`
  border: 1px solid red;
  flex-shrink: 0;

  width: 100%;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentsContainer = styled.View`
  background: ${colors.bg};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  flex: 1;
  width: 100%;
`;

const Horizon = styled.View`
  height: 1px;
  margin-left: 16px;
  margin-right: 16px;
  background-color: ${colors.Grayscale_10};
`;

const StepContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 10px;

  position: absolute;
  left: 20px;
  top: 0px;
`;

const ProcessBarWrapper = styled.View`
  height: 200px;
  width: 100%;
  margin-bottom: 15px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  position: relative;
`;

const CharacWrapper = styled.Image`
  width: 140px;
  height: 140px;
  flex-shrink: 0;
  object-fit: cover;

  position: absolute;
  bottom: -20px;
`;

function HomeScreen() {
  // stack에 쌓여있던 HomeScreen이 focus되면 리렌더링되어 데이터를 알맞게 띄우도록 함
  const isFocused = useIsFocused();

  // 더미 데이터
  // 이건 전역으로 처리하는 게 좋을듯한? 나중에 API 완성되면 리팩토링 ㄱ
  var word = "나스닥";
  var trend = false;
  var article = false;

  const step = 13;

  useEffect(() => {
    //오늘 학습 과목 조회 API 받아오기
    // "word": true,
    // "trend": true,
    // "article": false

    console.log("알맞은 데이터로 리렌더링되고 있는지 확인");
  }, [isFocused]);

  // api
  return (
    <SafeAreaView style={styles.rootScreen}>
      <StatusBar style="dark" />
      <ScrollView>
        <TemporaryBox2>
          <Text>날짜 관리와 스트립 형태의 달력 컴포넌트</Text>
        </TemporaryBox2>
        <ProcessBarWrapper>
          <StepContainer>
            <fonts.H2M style={{ color: colors.Grayscale_100 }}>
              STEP {step}
            </fonts.H2M>
            <Text>학습 진행률</Text>
          </StepContainer>
          {/* progressbar */}
          <Home_AttendanceProgress />
          <CharacWrapper source={process1} />
        </ProcessBarWrapper>
        {/* 하단의 3가지 요소를 감싸는 Container */}
        <Shadow
          style={styles.shadowContainer}
          offset={[0, -3]} // Y 방향으로만 -2 만큼 그림자 위치 조정
          distance={5} // 그림자의 퍼짐 정도 설정
          startColor="rgba(0, 0, 0, 0.08)" // 그림자 색상
          endColor="rgba(0, 0, 0, 0.0)" // 그림자의 끝 색상 (투명)
        >
          <ContentsContainer>
            <Home_TodaySalary word={word} />
            <Home_TrendQuiz trend={trend} />
            {/* horizon */}
            <Horizon />
            {/* 아티클 */}
            <Home_Article article={article}></Home_Article>
          </ContentsContainer>
        </Shadow>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.Grayscale_white,
  },
  shadowContainer: {
    width: "100%",
    flex: 1,
  },
});

export default HomeScreen;
