import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import Home_TrendQuiz from "../components/homeScreen/Home_TrendQuiz";
import Home_TodaySalary from "../components/homeScreen/Home_TodaySalary";
import Home_WeekStrip from "../components/homeScreen/Home_WeekStrip";
import Home_AttendanceRing from "../components/homeScreen/Home_AttendanceRing";
import Home_Article from "../components/homeScreen/Home_Article";
import colors from "../assets/colors/colors";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Shadow } from "react-native-shadow-2";

/// 임시 박스
const TemporaryBox = styled.Text`
  padding: 10px;
  margin: 10px;
  border: 1px solid red;
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

function HomeScreen() {
  // api
  return (
    <SafeAreaView style={styles.rootScreen}>
      <StatusBar style="dark" />
      <ScrollView>
        {/* 날짜 관리와 스트립 형태의 달력 컴포넌트 */}
        <TemporaryBox>날짜 관리 & 스트립 형태의 달력 컴포넌트</TemporaryBox>
        <TemporaryBox>스텝과 학습 진행률 컴포넌트</TemporaryBox>
        {/* 하단의 3가지 요소를 감싸는 Container */}
        <Shadow
          style={styles.shadowContainer}
          offset={[0, -3]} // Y 방향으로만 -2 만큼 그림자 위치 조정
          distance={5} // 그림자의 퍼짐 정도 설정
          startColor="rgba(0, 0, 0, 0.08)" // 그림자 색상
          endColor="rgba(0, 0, 0, 0.0)" // 그림자의 끝 색상 (투명)
        >
          <ContentsContainer>
            <Home_TodaySalary />
            <Home_TrendQuiz />
            {/* horizon */}
            <Horizon />
            {/* 아티클 */}
            <Home_Article></Home_Article>
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
    paddingTop: Constants.statusBarHeight, // // Constants의 statusBarHeight 값을 이용한다.
  },
  shadowContainer: {
    width: "100%",
    flex: 1,
  },
});

export default HomeScreen;
