import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Easing,
  Animated,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import DollarIcn from "../assets/img/myPageScreen/dollar.png";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import PrimaryBtn from "../common/PrimaryBtn";
import DatePicker from "../components/myPageScreen/DatePicker";
import axios from "axios";
import { BASE_URL } from "@env";
import { useRecoilValue } from "recoil";
import { authToken } from "../Recoil/authToken";

const BlackContainer = styled.View`
  background-color: ${colors.Grayscale_90};
  width: 100%;
  height: 30%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;
`;

const ItemContainer = styled.TouchableOpacity`
  width: 100%;
  border-top-color: ${colors.Grayscale_20};
  border-top-width: 1px;
  border-top-style: solid;
`;

const TodaySeedContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: #ffffff;
  padding: 16px 24px;
`;

const SeedDetailContainer = styled(Animated.View)`
  width: 100%;
  overflow: hidden; /* 내용이 넘치지 않도록 설정 */
`;

const TodayHistorys = styled.View`
  height: 100%;
  padding: 15px 30px;
  gap: 6px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${colors.bg};

  border-top-color: ${colors.Grayscale_20};
  border-top-width: 1px;
  border-top-style: dotted;
`;

const TodayHistory = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GrayContainer = styled.ScrollView`
  background-color: ${colors.bg};
  width: 100%;
  flex: 1;

  display: flex;

  margin-bottom: 30px;
`;

const DateSelector = styled.Pressable`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  padding-top: 20px;
  padding-bottom: 5px;

  width: 100%;
  padding-right: 40px;
  margin-bottom: 10px;
`;

const Overlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const TitleContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
`;

const Title = styled(fonts.H4SB)`
  color: #000000;
`;

const CloseBtnContainer = styled.Pressable`
  padding: 20px;

  display: flex;
  justify-content: flex-start;
`;

function DaySalaryHistoryItem({ todaySalaryHistory }) {
  const [toggle, setToggle] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  // 토글 관리
  const toggleExpand = () => {
    if (toggle) {
      // 접기 애니메이션
      Animated.timing(animation, {
        toValue: 0, // 닫힌 높이
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setToggle(false); // 애니메이션 종료 후 상태 변경
      });
    } else {
      setToggle(true); // 먼저 보여지도록 설정
      Animated.timing(animation, {
        toValue: 60, // 측정된 높이만큼 열기
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {}, []);

  return (
    <ItemContainer onPress={toggleExpand} activeOpacity={1}>
      <TodaySeedContainer>
        <fonts.Body1>{todaySalaryHistory.attendance_date}</fonts.Body1>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <fonts.Body1 style={{ color: colors.text_green }}>
            +{" "}
            {todaySalaryHistory.today_seed ? todaySalaryHistory.today_seed : 0}{" "}
            {" 개"}
          </fonts.Body1>
          {toggle ? (
            <Ionicons name="chevron-up-outline" size={15} />
          ) : (
            <Ionicons name="chevron-down-outline" size={15} />
          )}
        </View>
      </TodaySeedContainer>
      <SeedDetailContainer
        style={{
          height: toggle ? animation : 0, // 애니메이션 높이 설정
          overflow: "hidden", // 내용이 넘치지 않도록 설정
        }}
      >
        {toggle && (
          <TodayHistorys>
            <TodayHistory>
              <fonts.Body2M>적립</fonts.Body2M>
              <fonts.Body2M>
                {todaySalaryHistory.today_seed_earned
                  ? todaySalaryHistory.today_seed_earned
                  : 0}{" "}
                {"개"}
              </fonts.Body2M>
            </TodayHistory>
            <TodayHistory>
              <fonts.Body2M>사용</fonts.Body2M>
              <fonts.Body2M>
                {todaySalaryHistory.today_seed_used
                  ? todaySalaryHistory.today_seed_used
                  : 0}{" "}
                {"개"}
              </fonts.Body2M>
            </TodayHistory>
          </TodayHistorys>
        )}
      </SeedDetailContainer>
    </ItemContainer>
  );
}

// route.params.totalSeed 사용
// route.params.attendanceLogs 배열 사용
function MyPageSeedHistoryScreen({ route }) {
  const token = useRecoilValue(authToken);

  // 이 화면에서 관리하는 attendanceLogs
  const [attendanceLogs, setAttendanceLogs] = useState(
    route.params.attendanceLogs
  );

  // date picker에서 선택된 년/월을 관리함
  const [dateSelected, setDateSelected] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  }); // YYYY-MM 형식으로 관리함

  // 완료하기 버튼이 눌렸을 때의 preview를 관리함
  const [previewDate, setPreviewDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  }); // YYYY-MM 형식으로 관리함

  const fetchMonthSeed = async ({ year, month }) => {
    try {
      const res = await axios.get(`${BASE_URL}/seed?date=${year}-${month}`, {
        headers: { Authorization: token },
      });
      setAttendanceLogs(res.data.attendance_logs); // 선택된 달의 로그 데이터로
      setPreviewDate(dateSelected);
    } catch (error) {
      console.log(error);
    }
  };

  // datepicker 모달 관리
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const translateY = useRef(new Animated.Value(300)).current; // 초기 위치

  function handleDatePickerOpen() {
    openModal();
  }

  const openModal = () => {
    setDatePickerOpen(true);
    Animated.timing(translateY, {
      toValue: 0, // 모달이 화면에 올라올 위치
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: 300, // 모달이 화면에서 내려갈 위치
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setDatePickerOpen(false));
  };

  // dateSelected 값이 바뀌고 완료 버튼이 눌릴 때마다 해당 월의 데이터를 호출
  function handleDatePicked() {
    fetchMonthSeed({
      year: dateSelected.year,
      month: dateSelected.month,
    });
    Animated.timing(translateY, {
      toValue: 300, // 모달이 화면에서 내려갈 위치
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setDatePickerOpen(false));
  }

  return (
    <>
      <BlackContainer>
        <View
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 4,
            width: "100%",
            padding: 40,
          }}
        >
          <Image source={DollarIcn} style={{ width: 35, height: 35 }} />
          <fonts.Body2M style={{ color: colors.Grayscale_40 }}>
            총 시드
          </fonts.Body2M>
          <fonts.H2M style={{ color: colors.Grayscale_white }}>
            {Number(route.params.totalSeed).toLocaleString()} 개
          </fonts.H2M>
        </View>
        <DateSelector onPress={handleDatePickerOpen}>
          <fonts.Body2M style={{ color: "#ffffff" }}>
            {previewDate.year}년 {previewDate.month}월
          </fonts.Body2M>
          {datePickerOpen ? (
            <Ionicons name="chevron-up-outline" size={15} color={"#ffffff"} />
          ) : (
            <Ionicons name="chevron-down-outline" size={15} color={"#ffffff"} />
          )}
        </DateSelector>
      </BlackContainer>
      <GrayContainer>
        {attendanceLogs.length !== 0 ? (
          attendanceLogs.map((item, index) => (
            <DaySalaryHistoryItem key={index} todaySalaryHistory={item} />
          ))
        ) : (
          <View
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text>데이터가 없습니다.</Text>
          </View>
        )}
      </GrayContainer>
      <Modal
        transparent
        visible={datePickerOpen}
        animationType="none"
        onRequestClose={closeModal}
      >
        <Overlay
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeModal}
        ></Overlay>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateY }] }]}
        >
          <TitleContainer>
            <Title>날짜 선택</Title>
            <CloseBtnContainer onPress={closeModal}>
              <Ionicons name="close-outline" color="#717171" size={30} />
            </CloseBtnContainer>
          </TitleContainer>
          <DatePicker
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
          />
          <PrimaryBtn
            type="active"
            text="완료하기"
            onPress={handleDatePicked}
          />
        </Animated.View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 35,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default MyPageSeedHistoryScreen;
