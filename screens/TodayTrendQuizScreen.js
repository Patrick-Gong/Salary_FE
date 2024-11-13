import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import GreenCheckMark from '../assets/img/todayTrendQuizScreen/GreenCheckMark.png';
import { Shadow } from 'react-native-shadow-2';
import { Modal } from 'react-native';
import PrimaryModal from '../common/PrimaryModal';
import axios from 'axios';

const ViewContainer = styled.SafeAreaView`
  background-color: white;
  align-items: center;
`;

const QuizViewContainer = styled.View`
  width: 360px;
`;

const MainTitle = styled.Text`
  color: #121212;
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0px 0px 12px;
`;

const SubTitle = styled.Text`
  color: #414141;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.24px;
  margin-left: 12px;
  margin-top: 8px;
`;

const QuizContainer = styled.View`
  width: 100%;
  border-radius: 5px;
  background-color: #f3f4f6;
  align-items: center;
  margin-top: 13px;
`;

const QuestionText = styled.Text`
  padding: 34px 17px 21px 17px;
  line-height: 22px;
`;

const QDot = styled.Text`
  color: #c1f032;
  font-size: 22px;
  font-weight: 700;
`;

const QuestionContent = styled.Text`
  color: #121212;
  font-size: 16px;
  font-weight: 500;
`;

const AnswerContainer = styled.View`
  width: 320px;
`;

const AnswerBox = styled.Pressable`
  width: 320px;
  height: 46px;
  border-radius: 6px;
  background-color: ${(props) => (!props.isSelected ? '#ffffff' : '#313131')};
  margin-bottom: 14px;
`;

const AnswerContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const AnswerBox_Btn = styled.View`
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  background-color: #e8e8e8;
  margin-left: 12px;
`;

const AnswerBox_BtnNumber = styled.Text`
  color: #a0a0a0;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`;

const GreenCheckMarkImg = styled.Image`
  resizemode: cover;
  margin-left: 12px;
  width: 28px;
  height: 28px;
`;

const AnswerBox_Text = styled.Text`
  color: ${(props) => (!props.isSelected ? '#121212' : '#ffffff')};
  font-size: 16px;
  font-weight: 500;
`;

// 초록 버튼 컴포넌트로 재활용하자(SignUpModal에도 존재)
const SubmitBtn = styled.Pressable`
  margin-top: 240px;
  margin-bottom: 17px;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 45px;
  border-radius: 10px;
  background-color: ${(props) =>
    !props.isAbleToSubmit ? '#eff4d2' : '#d7ff01'};
`;

const SubmitBtn_Text = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isAbleToSubmit ? '#313131' : '#a0a0a0')};
`;

function shuffle(array) {
  const shuffledArray = array.slice(); // Create a copy to avoid mutating the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
}

function TodayTrendQuizScreen() {
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

  const InitialAnswers = [
    { isCorrect: true, isSelected: false, content: `${responseData.correct}` },
    {
      isCorrect: false,
      isSelected: false,
      content: `${responseData.incorrect[0]}`,
    },
    {
      isCorrect: false,
      isSelected: false,
      content: `${responseData.incorrect[1]}`,
    },
    {
      isCorrect: false,
      isSelected: false,
      content: `${responseData.incorrect[2]}`,
    },
  ];

  const [answersState, setAnswersState] = useState(shuffle(InitialAnswers));
  const [isAbleToSubmit, setIsAbleToSubmit] = useState(false);

  const handleSelectAnswer = (targetedIndex) => {
    let updatedAnswersState;
    // 답을 아무것도 고르지 않았을 때
    if (!answersState.find((item) => item.isSelected)) {
      updatedAnswersState = answersState.map((item, index) =>
        index === targetedIndex
          ? { ...item, isSelected: !item.isSelected }
          : item
      );
      // 답을 하나 골랐을 때
    } else {
      updatedAnswersState = answersState.map((item, index) =>
        index === targetedIndex || item.isSelected
          ? { ...item, isSelected: !item.isSelected }
          : item
      );
    }
    setAnswersState(updatedAnswersState);
  };

  const onSubmitHandler = () => {
    // 무언가 데이터를 처리해서...
    // 모달 띄우기
    openModal();
  };

  // 모달 관리
  // 모달 관리
  const [isModalVisible, setIsModalVisible] = useState(false);

  function openModal() {
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  useLayoutEffect(() => {
    if (answersState.find((item) => item.isSelected)) setIsAbleToSubmit(true);
    else setIsAbleToSubmit(false);
  }, [answersState]);

  useEffect(() => {
    setIsModalVisible(false); // 상태 초기화
  }, []);

  return (
    <ViewContainer>
      <StatusBar style="dark" />
      {/* 모달 컴포넌트 */}
      <Modal
        visible={isModalVisible}
        transparent={true} // 배경 투명
        animationType="slide" // 모달 등장 애니메이션
        onRequestClose={closeModal} // 안드로이드에서 뒤로가기 버튼 처리
      >
        {/* Modal 태그 내부에 Modal View를 정의 */}

        <PrimaryModal
          type="trendQuiz"
          // result={answersState.isCorrect}
          result={answersState.find(
            (item) => item.isSelected && item.isCorrect
          )} // 테스트용
          // answer={answersState.content}
          answer={`${responseData.correct}`}
          closeModal={closeModal}
          replaceScreenName="TodayTrendSolution" // 여기에 새로운 트렌드 퀴즈 해설 스크린명을 전달해주세요
        ></PrimaryModal>
      </Modal>
      <QuizViewContainer>
        <MainTitle>오늘의 트렌드 퀴즈</MainTitle>
        <SubTitle>요즘 경제 상황에 맞는 퀴즈를 준비했어요</SubTitle>
        <Shadow
          style={{ width: '100%' }}
          distance={10}
          startColor="rgba(0, 0, 0, 0.02)"
          offset={[4, 4]}
        >
          <QuizContainer>
            <QuestionText>
              <QDot>Q. </QDot>
              <QuestionContent>{responseData.trend_quiz}</QuestionContent>
            </QuestionText>
            <AnswerContainer>
              {answersState.map((item, index) => (
                <AnswerBox
                  key={index}
                  onPress={() => handleSelectAnswer(index)}
                  isSelected={answersState[index].isSelected}
                >
                  <AnswerContentContainer>
                    {!answersState[index].isSelected ? (
                      <AnswerBox_Btn key={index}>
                        <AnswerBox_BtnNumber>{index + 1}</AnswerBox_BtnNumber>
                      </AnswerBox_Btn>
                    ) : (
                      <GreenCheckMarkImg source={GreenCheckMark} />
                    )}

                    <AnswerBox_Text isSelected={answersState[index].isSelected}>
                      {item.content}
                    </AnswerBox_Text>
                  </AnswerContentContainer>
                </AnswerBox>
              ))}
            </AnswerContainer>
            <SubmitBtn
              isAbleToSubmit={isAbleToSubmit}
              onPress={isAbleToSubmit ? onSubmitHandler : null}
            >
              <SubmitBtn_Text isAbleToSubmit={isAbleToSubmit}>
                제출하기
              </SubmitBtn_Text>
            </SubmitBtn>
          </QuizContainer>
        </Shadow>
      </QuizViewContainer>
    </ViewContainer>
  );
}

export default TodayTrendQuizScreen;
