import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
import styled, { css } from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Home_DayAttendanceCircle from "./Home_DayAttendanceCircle";

const Container = styled.View`
  flex: 1;
`;
const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  padding-left: 20px;
  padding-bottom: 5px;
  margin-top: 10px;
  gap: 6px;
`;

const HeaderText = styled(fonts.Body2M)`
  color: ${colors.Grayscale_80};
`;

const HeaderCalendarBtn = styled.TouchableOpacity``;

const Home_WeekStrip = ({ onCalendarModalOpen }) => {
  const [headerText, setHeaderText] = useState("");

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
    <Container>
      <HeaderContainer>
        <HeaderText>{headerText}</HeaderText>
        <HeaderCalendarBtn onPress={onCalendarModalOpen}>
          <Ionicons name="calendar-clear-outline" size={20}></Ionicons>
        </HeaderCalendarBtn>
      </HeaderContainer>
      <CalendarStrip
        calendarHeaderStyle={{ height: 0, opacity: 0 }} // 헤더 숨기기
        style={styles.calendar}
        dayComponent={(props) => (
          <Home_DayAttendanceCircle
            {...props}
            onCalendarModalOpen={onCalendarModalOpen} // 날짜 선택 핸들러 전달
          />
        )}
        scrollable
        onWeekChanged={handleWeekChange}
        startingDate={moment()} // 시작 날짜 설정
      />
    </Container>
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
