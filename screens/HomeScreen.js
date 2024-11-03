import { Text, View } from "react-native";
import styled from "styled-components/native";
import TodaySalaryScreen from "../screens/TodaySalaryScreen";
import TodayTrendQuiz from "../screens/TodayTrendQuizScreen";
import colors from "../assets/colors/colors";
import { setCustomText } from "react-native-global-props";

const ViewContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  color: ${colors.Warning_100};
  background-color: ${colors.Grayscale_Primary_100};
`;

const PrimaryText = styled.Text`
  color: ${colors.Warning_100};
  font-family: "Pretendard";
`;

function HomeScreen() {
  return (
    <ViewContainer>
      <PrimaryText>This screen is HomeScreen</PrimaryText>
      {/* 날짜 관리와 스트립 형태의 달력 컴포넌트 */}
      {/* 스텝과 학습 진행률 컴포넌트 */}
      <TodaySalaryScreen />
      <TodayTrendQuiz />
      {/* 아티클 */}
    </ViewContainer>
  );
}

export default HomeScreen;
