import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
import styled, { css } from "styled-components";
import { Shadow } from "react-native-shadow-2";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { Header } from "react-native/Libraries/NewAppScreen";

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 10px;
  padding-left: 20px;
  padding-bottom: 5px;
  margin-top: 10px;
`;

const HeaderText = styled(fonts.Body2M)`
  color: ${colors.Grayscale_80};
`;
const TouchableContainer = styled.TouchableOpacity`
  margin-top: 4px;
  margin-left: 2px;
  margin-right: 2px;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  background-color: white;

  border-radius: 18px;

  ${(props) =>
    Number(props.attendance_state) > 3
      ? css`
          background-color: ${colors.Grayscale_100};
        `
      : Number(props.attendance_state) > 0
      ? css`
          background-color: ${colors.Primary_100};
        `
      : css`
          background-color: white;
        `}
`;

const DayText = styled(fonts.Body2M)`
  color: ${colors.Grayscale_80};
`;

const CustomDayComponent = ({
  date,
  selected,
  marking,
  onDateSelected,
  attendance_state,
}) => {
  const isWeekend = date.isoWeekday() === 6 || date.isoWeekday() === 7; // 주말 확인
  const isSelected = selected;

  //   0부터 5까지 랜덤 (더미 데이터)
  const randNum = Math.floor(Math.random() * 5);
  attendance_state = randNum;
  return (
    <Shadow
      distance={3}
      startColor="rgba(0, 0, 0, 0.03)"
      offset={[0, 2]}
      style={{ borderRadius: 15 }}
    >
      <TouchableContainer
        onPress={() => onDateSelected(date)}
        attendance_state={attendance_state}
      >
        {/* 날짜 */}
        {attendance_state < 4 ? (
          <DayText>{date.format("D")}</DayText>
        ) : (
          <Ionicons
            name="checkmark-sharp"
            color={colors.Secondary_100}
            size={20}
          ></Ionicons>
        )}

        {/* 요일 */}
        {/* <Text style={styles.dayName}>{date.format("ddd")}</Text> */}
      </TouchableContainer>
    </Shadow>
  );
};

const Home_WeekStrip = () => {
  const [headerText, setHeaderText] = useState("");

  const handleDateSelected = (date) => {
    console.log(`Selected Date: ${date.format("YYYY-MM-DD")}`);
  };

  const calculateWeekOfMonth = (date) => {
    // 해당 월의 첫 번째 날 가져오기
    const startOfMonth = moment(date).startOf("month");
    // 현재 주차 계산
    const currentWeek = moment(date).week();
    const startWeek = startOfMonth.week();

    // 주차 계산
    const weekOfMonth = currentWeek - startWeek + 1;
    return weekOfMonth < 1 ? 1 : weekOfMonth; // 1주차부터 시작
  };

  const handleWeekChange = (date) => {
    const formattedDate = moment(date);
    const year = formattedDate.format("YYYY");
    const month = formattedDate.format("MM");
    const week = calculateWeekOfMonth(date);

    // 헤더 텍스트 업데이트
    setHeaderText(`${year}년 ${month}월 ${week}주차`);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderText>{headerText}</HeaderText>
      </HeaderContainer>
      <CalendarStrip
        calendarHeaderStyle={{ height: 0, opacity: 0 }} // 헤더 숨기기
        style={styles.calendar}
        dayComponent={(props) => (
          <CustomDayComponent
            {...props}
            onDateSelected={handleDateSelected} // 날짜 선택 핸들러 전달
          />
        )}
        scrollable
        onWeekChanged={handleWeekChange}
        startingDate={moment()} // 시작 날짜 설정
      />
    </>
  );
};

const styles = StyleSheet.create({
  calendar: {
    height: 48,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Home_WeekStrip;
