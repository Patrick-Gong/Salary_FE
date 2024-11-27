import { Text, View, Image } from "react-native";
import styled from "styled-components";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import DollarIcn from "../assets/img/myPageScreen/dollar.png";
import { useRef, useState } from "react";
import { Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

  width: 100%;
  padding-right: 40px;
  margin-bottom: 10px;
`;

function DaySalaryHistoryItem({ todaySalaryHistory }) {
  const [toggle, setToggle] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

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

  return (
    <ItemContainer onPress={toggleExpand} activeOpacity={1}>
      <TodaySeedContainer>
        <fonts.Body1>{todaySalaryHistory.attendance_date}</fonts.Body1>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <fonts.Body1 style={{ color: colors.text_green }}>
            + {todaySalaryHistory.today_seed} {" 개"}
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
                {todaySalaryHistory.today_seed_earned} {"개"}
              </fonts.Body2M>
            </TodayHistory>
            <TodayHistory>
              <fonts.Body2M>사용</fonts.Body2M>
              <fonts.Body2M>
                {todaySalaryHistory.today_seed_used} {"개"}
              </fonts.Body2M>
            </TodayHistory>
          </TodayHistorys>
        )}
      </SeedDetailContainer>
    </ItemContainer>
  );
}

// route.params.totalSeed 사용
// route.params.logs 배열 사용
// route.params.fetchMonthSeed 사용해서 특정 달의 데이터를 불러옴
function MyPageSeedHistoryScreen({ route }) {
  const [dateSelected, setDateSelected] = useState({});
  // 선택된 년/월을 관리함

  console.log(route.params.attendanceLogs);

  const tmpAttendanceLogs = [
    {
      attendance_date: "2024-09-01",
      today_seed: 5,
      today_seed_earned: 10,
      today_seed_used: -5,
    },
    {
      attendance_date: "2024-09-02",
      today_seed: 5,
      today_seed_earned: 10,
      today_seed_used: -5,
    },
    {
      attendance_date: "2024-09-03",
      today_seed: 0,
      today_seed_earned: 0,
      today_seed_used: 0,
    },
    {
      attendance_date: "2024-09-01",
      today_seed: 5,
      today_seed_earned: 10,
      today_seed_used: -5,
    },
    {
      attendance_date: "2024-09-02",
      today_seed: 5,
      today_seed_earned: 10,
      today_seed_used: -5,
    },
    {
      attendance_date: "2024-09-03",
      today_seed: 0,
      today_seed_earned: 0,
      today_seed_used: 0,
    },
    {
      attendance_date: "2024-09-01",
      today_seed: 5,
      today_seed_earned: 10,
      today_seed_used: -5,
    },
    {
      attendance_date: "2024-09-02",
      today_seed: 5,
      today_seed_earned: 10,
      today_seed_used: -5,
    },
    {
      attendance_date: "2024-09-03",
      today_seed: 0,
      today_seed_earned: 0,
      today_seed_used: 0,
    },
    {
      attendance_date: "2024-09-01",
      today_seed: 5,
      today_seed_earned: 10,
      today_seed_used: -5,
    },
    {
      attendance_date: "2024-09-02",
      today_seed: 5,
      today_seed_earned: 10,
      today_seed_used: -5,
    },
    {
      attendance_date: "2024-09-03",
      today_seed: 0,
      today_seed_earned: 0,
      today_seed_used: 0,
    },
    {
      attendance_date: "2024-09-01",
      today_seed: 5,
      today_seed_earned: 10,
      today_seed_used: -5,
    },
    {
      attendance_date: "2024-09-02",
      today_seed: 5,
      today_seed_earned: 10,
      today_seed_used: -5,
    },
    {
      attendance_date: "2024-09-03",
      today_seed: 0,
      today_seed_earned: 0,
      today_seed_used: 0,
    },
    {
      attendance_date: "2024-09-01",
      today_seed: 5,
      today_seed_earned: 10,
      today_seed_used: -5,
    },
    {
      attendance_date: "2024-09-02",
      today_seed: 5,
      today_seed_earned: 10,
      today_seed_used: -5,
    },
    {
      attendance_date: "2024-09-03",
      today_seed: 0,
      today_seed_earned: 0,
      today_seed_used: 0,
    },
  ];

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
        <DateSelector>
          {/* {dateSelected.year}년 {dateSelected.month}월 */}
          <fonts.Body2M style={{ color: "#ffffff" }}>9월</fonts.Body2M>{" "}
          <Ionicons name="chevron-down-outline" size={15} color={"#ffffff"} />
        </DateSelector>
      </BlackContainer>
      <GrayContainer>
        {tmpAttendanceLogs.map((item, index) => (
          <DaySalaryHistoryItem key={index} todaySalaryHistory={item} />
        ))}
      </GrayContainer>
    </>
  );
}

export default MyPageSeedHistoryScreen;
