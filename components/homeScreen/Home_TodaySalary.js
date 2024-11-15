import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import PrimaryBtn from "../../common/PrimaryBtn";
import { todayWordSelector } from "../../Recoil/todayAttendanceDetail";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todaySalaryContent } from "../../Recoil/todaySalaryContent";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding: 20px;
  margin: 23px;
  margin-bottom: 31px;
  gap: 24px;
  padding-right: 23px;
  padding-left: 23px;
  padding-top: 20px;

  border-radius: 20px;

  ${(props) =>
    props.doneTodaySalary
      ? css`
          background-color: ${colors.Grayscale_white};
          border: 1px solid ${colors.Grayscale_20};
        `
      : css`
          background-color: ${colors.Grayscale_80};
        `};
`;

const TitleContainer = styled.View`
  gap: 4px;
  align-items: flex-start;
`;

const Title = styled(fonts.H4SB)`
  ${(props) =>
    props.doneTodaySalary
      ? css`
          color: ${colors.Grayscale_100};
        `
      : css`
          color: ${colors.Grayscale_white};
        `}
`;

const TitleDescript = styled(fonts.Caption2)`
  text-align: center;

  color: ${colors.Grayscale_40};
`;

const InputBox = styled.View`
  padding: 12px 0px;
  text-align: center;
  vertical-align: center;
  flex: 1;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.doneTodaySalary
      ? css`
          background-color: ${colors.Grayscale_white};
          border: 1px solid ${colors.Grayscale_10};
        `
      : css`
          background-color: ${colors.Grayscale_60};
        `}
`;

const InputPlaceHolder = styled(fonts.Body2M)`
  color: ${colors.Grayscale_40};
`;

const InputPlaceHolderDone = styled.Text`
  color: ${colors.Grayscale_100};
  font-family: Pretendard-SemiBold;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
`;

const AnswerDescript = styled(fonts.Body2M)`
  text-align: center;

  ${(props) =>
    props.doneTodaySalary
      ? css`
          color: ${colors.Grayscale_100};
        `
      : css`
          color: ${colors.Grayscale_10};
        `}
`;

// state 1: 학습 진행 여부에 따라 검정색 혹은 흰색
// state 2: 그날의 학습할 단어를 받아와야됨.
function Home_TodaySalary() {
  const wordState = useRecoilValue(todayWordSelector);
  const setWordState = useSetRecoilState(todayWordSelector);

  // 오늘의 학습 컨텐츠
  const todaySalary = useRecoilValue(todaySalaryContent);

  const navigation = useNavigation();

  useEffect(() => {}, [wordState, todaySalaryContent]);

  return (
    <Container wordState={wordState}>
      <TitleContainer>
        <Title wordState={wordState}>오늘의 샐러리 한조각</Title>
        <TitleDescript>
          {wordState
            ? "오늘의 단어학습을 완료했어요."
            : "오늘의 단어학습을 완료하면 시드 5개를 받을 수 있어요!"}
        </TitleDescript>
      </TitleContainer>
      <InputBox wordState={wordState}>
        {wordState ? (
          <InputPlaceHolderDone>{todaySalary.word}</InputPlaceHolderDone>
        ) : (
          <InputPlaceHolder wordState={wordState}>
            {wordState ? todayVoca : "단어를 맞춰보세요!"}
          </InputPlaceHolder>
        )}
      </InputBox>
      <AnswerDescript wordState={wordState}>{todaySalary.mean}</AnswerDescript>
      <PrimaryBtn
        type="active"
        text={wordState ? "학습한 단어 보러가기" : "단어 학습하기"}
        onPress={
          wordState
            ? () =>
                navigation.navigate("TodaySalaryEdu", {
                  type: "todaySalary",
                })
            : () => navigation.navigate("TodaySalaryQuiz")
        }
      ></PrimaryBtn>
    </Container>
  );
}

export default Home_TodaySalary;
