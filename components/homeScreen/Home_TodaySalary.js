import { useEffect, useState, useRef } from "react";
import { Pressable, Text, View, StyleSheet, Animated } from "react-native";
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import PrimaryBtn from "../../common/PrimaryBtn";
import { todayWordSelector } from "../../Recoil/todayAttendanceDetail";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todaySalaryContent } from "../../Recoil/todaySalaryContent";
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";
import HighlightText from "react-native-highlight-underline-text";

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

  background-color: ${colors.Grayscale_white};
`;

const TitleContainer = styled.View`
  gap: 4px;
  align-items: flex-start;
`;

const Title = styled(fonts.H4SB)`
  color: ${colors.Grayscale_100};
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
    props.wordState
      ? css`
          background-color: ${colors.Grayscale_white};
        `
      : css`
          border: 1px solid ${colors.Grayscale_10};
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

  color: ${colors.Grayscale_100};
`;

const BtnContainer = styled.View`
  flex: 1;
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

  // border을 동적으로 적용하기 위함
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 동적으로 Container의 크기를 구함
  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  return (
    <Container wordState={wordState} onLayout={handleLayout}>
      {!wordState && dimensions.width > 0 && dimensions.height > 0 && (
        <Svg
          width={dimensions.width + 15} // 테두리가 약간 커지도록 여유값 추가
          height={dimensions.height + 10}
          style={styles.border}
          pointerEvents="none"
        >
          <Defs>
            {/* Linear Gradient 정의 */}
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#D3FF4E" stopOpacity="1" />
              <Stop offset="1" stopColor="#97F764" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect
            x="2" // 테두리 위치 조정
            y="2"
            width={dimensions.width} // 컴포넌트의 너비
            height={dimensions.height} // 컴포넌트의 높이
            stroke="url(#grad)" // 그라데이션 적용
            strokeWidth="5"
            fill="none" // 내부 비우기
            rx="20" // 둥근 모서리
          />
        </Svg>
      )}
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
          <HighlightText
            isFixed
            underlineSize={10}
            underlineColor={colors.Primary_100}
            textStyle={{
              color: "#121212",
              fontFamily: "Pretendard-SemiBold",
              fontSize: 20,
              lineHeight: 23,
            }}
            text={todaySalary.word}
          ></HighlightText>
        ) : (
          <InputPlaceHolder wordState={wordState}>
            {wordState ? todayVoca : "단어를 맞춰보세요!"}
          </InputPlaceHolder>
        )}
      </InputBox>
      <AnswerDescript wordState={wordState}>{todaySalary.mean}</AnswerDescript>
      <BtnContainer>
        <PrimaryBtn
          type={wordState ? "eduDone" : "active"}
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
      </BtnContainer>
      {/* 테두리 */}
    </Container>
  );
}

export default Home_TodaySalary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    position: "absolute", // 테두리를 컴포넌트 위에 겹치도록 설정
  },
});
