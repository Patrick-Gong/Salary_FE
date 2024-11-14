import { Shadow } from "react-native-shadow-2";
import styled, { css } from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
import getFormattedDate from "../../functions/getFormattedDate";
import compareDate from "../../functions/compareDate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

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
          background-color: ${colors.Primary_100};
        `
      : css`
          background-color: white;
        `}

  ${(props) =>
    props.empty
      ? css`
          background-color: white;
        `
      : css``}
`;

const DayText = styled(fonts.Body2M)`
  ${(props) =>
    props.empty
      ? css`
          color: ${colors.Grayscale_20};
        `
      : css`
          color: ${colors.Grayscale_80};
        `}
`;

async function getStateFromStorage(
  date,
  calendarDate,
  setEmpty,
  setAttendanceState
) {
  // console.log(date, calendarDate, "함수 호출");

  var formattedDate;
  if (date) formattedDate = getFormattedDate(new Date(date));
  else formattedDate = calendarDate.dateString;

  const storedState = await AsyncStorage.getItem(formattedDate);
  // date를 key로 저장되어 있던 state를 불러온다.
  if (storedState !== null) {
    console.log("storedState return", storedState);
    await setEmpty(false);
    await setAttendanceState(storedState);
    return storedState;
  } else {
    // console.log("false return");
    await setEmpty(true);
    return false;
  }
}

function Home_DayAttendanceCircle({
  calendarDate, // 캘린더에서 보내는 date
  date, // week strip에서 보내는 date
  attendance_state, // api를 통해 받은 학습 상태
  onCalendarModalOpen,
  type, // calendar면 전달
  empty, // true라면 비활성화된 circle을 전달
}) {
  //   console.log("date", date); //date "2024-12-06T03:25:08.085Z"
  //   console.log("calendarDate.dateString", calendarDate); // 2024-11-15

  const [emptyState, setEmpty] = useState(empty);
  const [attendanceState, setAttendanceState] = useState(0);

  attendance_state = 0;
  attendance_state = getStateFromStorage(
    date,
    calendarDate,
    setEmpty,
    setAttendanceState
  );

  // empty = compareDate(new Date(), new Date(formattedDate)); // 중복 처리임

  return (
    <Shadow
      distance={3}
      startColor="rgba(0, 0, 0, 0.03)"
      offset={[0, 2]}
      style={{ borderRadius: 15 }}
    >
      <TouchableContainer
        onPress={() => onCalendarModalOpen()}
        attendance_state={attendanceState}
        empty={emptyState}
      >
        {/* 날짜 */}
        {attendance_state !== 5 ? (
          <DayText empty={emptyState}>
            {type === "calendar" ? calendarDate.day : date.format("D")}
          </DayText>
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
}

export default Home_DayAttendanceCircle;
