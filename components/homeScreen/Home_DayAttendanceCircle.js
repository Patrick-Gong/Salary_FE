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
`;

const DayText = styled(fonts.Body2M)`
  color: ${colors.Grayscale_80};
`;

function Home_DayAttendanceCircle({
  calendarDate,
  date,
  selected,
  onPress,
  state,
  marking,
  onDateSelected,
  attendance_state,
  onCalendarModalOpen,
  type, // calendar면 전달
}) {
  console.log(date);
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
      >
        {/* 날짜 */}
        {attendance_state < 4 ? (
          <DayText>
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
