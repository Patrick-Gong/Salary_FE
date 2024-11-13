import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import Salary_Character from '../assets/img/signUpScreen/Salary_Character.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Shadow } from 'react-native-shadow-2';
import { useNavigation } from '@react-navigation/native';

const ViewContainer = styled.SafeAreaView`
  background-color: white;
  align-items: center;
`;

const SolutionView = styled.View`
  width: 360px;
`;

const MainTitle = styled(fonts.H4)`
  color: ${colors.Grayscale_100};
  text-align: left;
  margin: 20px 0px 0px 12px;
`;
const SubTitle = styled.Text`
  color: ${colors.Grayscale_80};
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  margin: 8px 0px 16px 12px;
`;
const Salary_CharacterImg = styled.Image`
  resizemode: contain;
  width: 104px;
  height: 104px;
  position: absolute;
  top: 100px;
  left: 200px;
`;
const SolutionContainer = styled.View`
  width: 360px;
  height: 640px;
  border-radius: 10px;
  background-color: ${colors.Grayscale_90};
  align-items: center;
  padding: 24px 19px 16px 19px;
`;

const QuestionText = styled.Text`
  line-height: 22px;
  width: 100%;
`;

const QDot = styled.Text`
  color: ${colors.Secondary_100};
  font-size: 22px;
  font-weight: 700;
`;

const QuestionContent = styled.Text`
  color: ${colors.Grayscale_white};
  font-weight: 500;
  font-size: 14px;
`;

const AnswerText = styled.Text`
  line-height: 20px;
  width: 100%;
  margin-top: 40px;
`;

const ADot = styled.Text`
  color: ${colors.Secondary_100};
  font-size: 22px;
  font-weight: 700;
`;

const AnswerContent = styled.Text`
  color: ${colors.Grayscale_white};
  font-size: 16px;
  font-weight: 500;
`;

const ExplanationWrapper = styled.View`
width: 100%;
height: 415px;
margin-top: 16px;
border-top-width: 1px;
border-top-color: ${colors.Grayscale_80};
`;

const Explanation = styled(fonts.Body2)`
  color: ${colors.Grayscale_20};
  margin-top: 18px;
`;

// 텍스트의 길이에 따라 박스 크기 어떻게 변하는지 고려해야함
const CompleteBtn = styled.Pressable`
  border-radius: 10px;
  height: 45px;
  width: 100%;
  background-color: ${colors.Primary_100};
  justify-content: center;
  align-items: center;
  
`;

const CompleteBtnText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Inter-SemiBold';
  color: ${colors.Grayscale_90};
`;

function TodayTrendSolutionScreen({ navigation }) {
  const responseData = {
    trend_quiz:
      '최근 중앙은행들이 통화 긴축을 완화하고 있는 이유로 가장 적절한 것은 무엇인가요?',
    correct: '경제 성장 둔화로 인한 경기 활성화 필요',
    incorrect: [
      '인플레이션 상승 방지',
      '원자재 가격 상승 억제',
      '금융 시장 불안정성 증가',
    ],
    explanation:
      '최근 글로벌 경기 둔화와 경제 불확실성이 높아지면서 중앙은행들은 통화 긴축 정책을 완화하고 있습니다. 이는 경기를 활성화하여 경제 성장 둔화를 완화하려는 목적이 있습니다.',
  };

  return (
    <ViewContainer>
      <StatusBar style="dark" />
      <SolutionView>
      <MainTitle>오늘의 트렌드 퀴즈 해설</MainTitle>
      <SubTitle>
        퀴즈 해설을 확인해보세요.{'\n'}
        내일 새로운 퀴즈가 업데이트 될 예정이에요!
      </SubTitle>
      <Salary_CharacterImg source={Salary_Character} />
      <Shadow
        style={{ width: '100%' }}
        distance={20}
        startColor="rgba(0, 0, 0, 0.02)"
        offset={[4, 4]}
      >
        <SolutionContainer>
          <QuestionText>
            <QDot>Q. </QDot>
            <QuestionContent>{responseData.trend_quiz}</QuestionContent>
          </QuestionText>
          <AnswerText>
            <ADot>A. </ADot>
            <AnswerContent>{responseData.correct}</AnswerContent>
          </AnswerText>
          <ExplanationWrapper>
            <Explanation>{responseData.explanation}</Explanation>
          </ExplanationWrapper>
          <CompleteBtn onPress={() => navigation.navigate('BottomTab')}>
              <CompleteBtnText>트렌드 퀴즈 완료하기</CompleteBtnText>
            </CompleteBtn>
        </SolutionContainer>
      </Shadow>
      </SolutionView>
    </ViewContainer>
  );
}

export default TodayTrendSolutionScreen;
