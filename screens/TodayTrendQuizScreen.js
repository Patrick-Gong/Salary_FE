import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { useLayoutEffect, useState } from "react";
import GreenCheckMark from "../assets/img/todayTrendQuizScreen/GreenCheckMark.png";

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
  margin: 10px 0px 0px 12px;
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
  background-color: #f3f4f6;
  shadow: 4px 4px 20px 0px #000;
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
  background-color: ${(props) => (!props.isSelected ? "#ffffff" : "#313131")};
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
  color: ${(props) => (!props.isSelected ? "#121212" : "#ffffff")};
  font-size: 16px;
  font-weight: 500;
`;

// 초록 버튼 컴포넌트로 재활용하자(SignUpModal에도 존재)
const SubmitBtn = styled.Pressable`
  margin-top: 200px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  border-radius: 10px;
  background-color: ${(props) =>
    !props.isAbleToSubmit ? "#eff4d2" : "#d7ff01"};
`;

const SubmitBtn_Text = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isAbleToSubmit ? "#313131" : "#a0a0a0")};
`;

function TodayTrendQuizScreen() {
  const InitialAnswers = [
    { isCorrect: false, isSelected: false, content: "금리 인상" },
    { isCorrect: true, isSelected: false, content: "금리 인하" },
    { isCorrect: false, isSelected: false, content: "금리 동결" },
    { isCorrect: false, isSelected: false, content: "세금 인상" },
  ];

  const [answersState, setAnswersState] = useState(InitialAnswers);
  const [isAbleToSubmit, setIsAbleToSubmit] = useState(false);

  const handleSelectAnswer = (targetedIndex) => {
    let updatedAnswersState;
    if (!answersState.find((item) => item.isSelected)) {
      updatedAnswersState = answersState.map((item, index) =>
        index === targetedIndex
          ? { ...item, isSelected: !item.isSelected }
          : item
      );
    } else {
      updatedAnswersState = answersState.map((item, index) =>
        index === targetedIndex || item.isSelected
          ? { ...item, isSelected: !item.isSelected }
          : item
      );
    }
    setAnswersState(updatedAnswersState);
  };
  useLayoutEffect(() => {
    if (answersState.find((item) => item.isSelected)) setIsAbleToSubmit(true);
    else setIsAbleToSubmit(false);
  }, [answersState]);

  return (
    <ViewContainer>
      <StatusBar style="dark" />
      <QuizViewContainer>
        <MainTitle>오늘의 트렌드 퀴즈</MainTitle>
        <SubTitle>요즘 경제 상황에 맞는 퀴즈를 준비했어요</SubTitle>
        <QuizContainer>
          <QuestionText>
            <QDot>Q. </QDot>
            <QuestionContent>
              2024년 8월 한국의 물가 상승률이 2.0%로 둔화된 가운데, 한국은행이
              향후 취할 가능성이 높은 조치는 무엇일까요?
            </QuestionContent>
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
          <SubmitBtn isAbleToSubmit={isAbleToSubmit}>
            <SubmitBtn_Text isAbleToSubmit={isAbleToSubmit}>
              제출하기
            </SubmitBtn_Text>
          </SubmitBtn>
        </QuizContainer>
      </QuizViewContainer>
    </ViewContainer>
  );
}

export default TodayTrendQuizScreen;
