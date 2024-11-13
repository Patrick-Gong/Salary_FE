import React from "react";
import styled from "styled-components";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Calendar } from "react-native-calendars";
import Home_DayAttendanceCircle from "./Home_DayAttendanceCircle";
import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ModalBackdrop = styled.View`
  flex: 1;
  background-color: "rgba(0, 0, 0, 0.7)";
`;

const ModalView = styled.View`
  border-radius: 30px 30px 0px 0px;
  background-color: white;
  align-items: center;
  height: 400px;
  position: fixed;
  top: 55%;
  padding-top: 10px;
`;

function Home_CalendarModal({ closeModal }) {
  const handleDayPress = (day) => {
    console.log("Selected day:", day);
  };

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      {/* <ModalBackdrop> */}
      <TouchableWithoutFeedback>
        <ModalView>
          <Calendar
            // dayComponent에 커스텀 컴포넌트 전달
            calendarHeaderStyle={{ fontSize: 16, color: "black" }}
            calendarHeaderFormat="YYYY년 MM월"
            dayComponent={({ date, state }) => (
              <Home_DayAttendanceCircle
                calendarDate={date}
                state={state}
                onPress={closeModal}
                attendance_state={4}
                type="calendar"
              />
            )}
            style={styles.container}
            //   headerStyle={}
            //   customHeader={}
            // 초기 선택 날짜 설정
            // 선택된 날짜와 비활성화된 날짜 스타일
            markedDates={{
              "2024-11-05": { selected: true },
              "2024-11-10": { disabled: true },
            }}
          />
        </ModalView>
      </TouchableWithoutFeedback>
      {/* </ModalBackdrop> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    gap: 1,
    width: screenWidth,
  },
});

export default Home_CalendarModal;
