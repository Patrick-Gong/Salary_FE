import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
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
import { useEffect, useState } from "react";
import process1 from "../assets/img/homeScreen/charac/process1.png";
import process2 from "../assets/img/homeScreen/charac/process2.png";
import process3 from "../assets/img/homeScreen/charac/process3.png";
import process4 from "../assets/img/homeScreen/charac/process4.png";
import fonts from "../styles/fonts";
import Home_CalendarModal from "../components/homeScreen/Home_CalendarModal";
import axios from "axios";
import { BASE_URL } from "@env";
import getFormattedDate from "../function/getFormattedDate";

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

  // 모달 관리
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 더미 데이터
  // 이건 전역으로 처리하는 게 좋을듯한? 나중에 API 완성되면 리팩토링 ㄱ
  var word = "나스닥";
  var trend = false;
  var article = false;

  const step = 13;

  // 첫 렌더링시 날짜별 출석률 조회를 통해 "오늘의" attendance_state를 받아온다. 이를 전역 상태에 반영해준다.
  useEffect(() => {
    async function getAttendanceStateData() {
      try {
        const res = await axios.get(
          `${BASE_URL}/attendance/status?attendance_date=${getFormattedDate(
            new Date()
          )})`
        );
        console.log(res);
      } catch (error) {
        console.log(res);
      }
    }

    getAttendanceStateData();
  }, []);

  // focus 됐을 때에는 알아서 전역 상태 데이터를 가져옴.
  useEffect(() => {
    //오늘 학습 과목 조회 API 받아오기
    // "word": true,
    // "trend": true,
    // "article": false

    console.log("알맞은 전역 데이터로 리렌더링되고 있는지 확인");
  }, [isFocused]);

  function onCalendarModalOpen() {
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  // api
  return (
    <SafeAreaView style={styles.rootScreen}>
      <ScrollView automaticallyAdjustContentInsets={false}>
        <Home_WeekStrip onCalendarModalOpen={onCalendarModalOpen} />
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
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <Home_CalendarModal closeModal={closeModal} />
      </Modal>
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
