import { Shadow } from "react-native-shadow-2";
import styled, { css } from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";

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

function Home_DayAttendanceCircle({
  calendarDate, // 캘린더에서 보내는 date
  date, // week strip에서 보내는 date
  attendance_state, // api를 통해 받은 학습 상태
  onCalendarModalOpen,
  type, // calendar면 전달
  empty, // true라면 비활성화된 circle을 전달
}) {
  //   console.log("date", date); //date "2024-12-06T03:25:08.085Z"
  //   console.log("calendarDate", calendarDate);
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
        onPress={() => onCalendarModalOpen()}
        attendance_state={attendance_state}
        empty={empty}
      >
        {/* 날짜 */}
        {empty || attendance_state < 4 ? (
          <DayText empty={empty}>
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
