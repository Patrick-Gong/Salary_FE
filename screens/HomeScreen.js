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
import getFormattedDate from "../functions/getFormattedDate";
import { BASE_URL } from "@env";
import axios from "axios";
import { useRecoilState } from "recoil";
import { todayAttendanceState } from "../Recoil/todayAttendanceState";
import { todayAttendanceDetail } from "../Recoil/todayAttendanceDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getKoreaFormattedDate from "../functions/getKoreaForamttedDate";
import { parse } from "react-native-svg";

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

  // 오늘의 attendance state : 학습시마다 전역 상태에 반영됨.
  const [attendanceState, setAttendanceState] =
    useRecoilState(todayAttendanceState);

  // 오늘의 attendance id : step을 렌더링하기 위함
  const [attendanceId, setAttendanceId] = useState(0);

  // 오늘의 attendance detail : word, trend, article의 boolean 값으로 구성
  const [attendanceDetail, setAttendanceDetail] = useRecoilState(
    todayAttendanceDetail
  );

  // 1. 최초 렌더링 시 attendance_state를 받아와 전역 상태로 관리
  // 이후 학습 완료시 전역으로 관리는 함
  useEffect(() => {
    async function fetchTodayAttendanceState() {
      try {
        const res = await axios.get(
          `${BASE_URL}/attendance/status?attendance_date=${getKoreaFormattedDate()}`
        );
        console.log("1. attendance state: ", res.data);
        if (res.status === 200) {
          setAttendanceState(res.data.attendance_state); // 전역으로 저장
          setAttendanceId(res.data.attendance_id);
        }
      } catch (error) {
        console.log(
          `${BASE_URL}/attendance/status?attendance_date=${getKoreaFormattedDate()}`
        );
        console.log("1. attendance state: ", error);
      }
    }

    fetchTodayAttendanceState();
  }, []);

  // 2. 오늘 학습 과목 조회 API 받아오기
  //굳이 매번 받아와야 할까 싶긴 한데
  useEffect(() => {
    async function fetchTodayAttendanceDetail() {
      try {
        const res = await axios.get(`${BASE_URL}/attendance/today`);
        if (res.status === 200) {
          setAttendanceDetail(res.data);
          console.log("2. attendance today", res.data);
        }
      } catch (error) {
        console.log("1번 에러", error);
      }
    }

    fetchTodayAttendanceDetail();
  }, []);

  // 3. 오늘의 단어 id를 받아오기 (하루에 1번만 받아옴)
  async function fetchTodayWordId() {
    try {
      const res = await axios.get(`${BASE_URL}/today-word`);
      if (res.status === 200) {
        console.log("새로운 word id를 받음");
        fetchTodayWordData({ word_id: res.data.word_id }); //data를 fetch하러
      }
    } catch (error) {
      console.log("2번 에러", error);
    }
  }

  async function fetchTodayWordData({ word_id }) {
    try {
      const res = await axios.get(`${BASE_URL}/words?word_id=${word_id}`);
      if (res.status === 200) {
        const data = [
          [
            "todaySalaryData",
            JSON.stringify({
              ...res.data,
              lastFetchedDate: getKoreaFormattedDate(),
            }),
          ],
        ];
        await AsyncStorage.multiSet(data);
      }
    } catch (error) {
      console.log("에러", error);
    }
  }

  // 오늘의 학습 단어를 최초 1회만 받아옴
  useEffect(() => {
    const checkAndFetchData = async () => {
      try {
        const parsedLastFetchedData = JSON.parse(
          await AsyncStorage.getItem("todaySalaryData")
        );
        if (
          !parsedLastFetchedData ||
          parsedLastFetchedData.lastFetchedDate !== getKoreaFormattedDate()
        ) {
          console.log(
            "이전에 패치된 데이터가 없거나 지난 날짜라서 새로 단어 id를 받아옴"
          );
          fetchTodayWordId();
        } else {
          console.log("이미 word Id를 받아옴");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAndFetchData();
  }, []);

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
              STEP {attendanceId}
            </fonts.H2M>
            <Text>학습 진행률</Text>
          </StepContainer>
          {/* progressbar */}
          <Home_AttendanceProgress />
          <CharacWrapper
            source={
              attendanceState === 5
                ? process4
                : attendanceState > 3 // todaySalary와 article, trend 중 한 가지 수행
                ? process3
                : attendanceState > 0 // 최소 하나의 학습 수행
                ? process2
                : process1
            }
          ></CharacWrapper>
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
            <Home_TodaySalary />
            <Home_TrendQuiz />
            {/* horizon */}
            <Horizon />
            {/* 아티클 */}
            <Home_Article></Home_Article>
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
