import styled, { css } from "styled-components";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Animated, View } from "react-native";

const Container = styled.TouchableOpacity`
  margin-bottom: 10px;
  border-radius: 14px;
  background-color: ${colors.Grayscale_90};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  ${(props) =>
    props.type === "todaySalaryEdu"
      ? css`
          background-color: ${colors.Primary_20};
        `
      : css``}
`;

const TitleContainer = styled.View`
  width: 90%;
  height: 58px;

  margin: 5px;
  padding-left: 30px;
  padding-right: 10px;

  border-radius: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    props.toggle
      ? css`
          border-bottom-width: 1px;
          border-bottom-style: "solid";
        `
      : css``}

  ${(props) =>
    props.type === "todaySalaryEdu"
      ? css`
          border-bottom-color: ${colors.Grayscale_20};
        `
      : css`
          border-bottom-color: ${colors.Grayscale_80};
        `}
`;

const Title = styled(fonts.H4SB)`
  ${(props) =>
    props.type === "todaySalaryEdu"
      ? css`
          color: ${colors.Grayscale_100};
        `
      : css`
          color: ${colors.Grayscale_white};
        `}
`;

const WordContainer = styled.View`
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MeanContainer = styled(Animated.View)`
  width: 100%;
  overflow: hidden; /* 내용이 넘치지 않도록 설정 */
`;

const Mean = styled(fonts.Body1)`
  ${(props) =>
    props.type === "todaySalaryEdu"
      ? css`
          color: ${colors.Grayscale_100};
        `
      : css`
          color: ${colors.Grayscale_white};
        `}

  line-height: 28px;
  padding-left: 45px;
  padding-right: 45px;
  padding-bottom: 15px;
  word-break: keep-all;
`;

const ToggleBtn = styled.View`
  width: 40px;
  height: 40px;
  margin-right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

function WordToggle({ type, index, word, mean }) {
  const [toggle, setToggle] = useState(false);
  const [contentHeight, setContentHeight] = useState(0); // 실제 콘텐츠 높이 저장
  const animation = useRef(new Animated.Value(0)).current; // 초기 애니메이션 값

  const toggleExpand = () => {
    if (toggle) {
      // 접기 애니메이션
      Animated.timing(animation, {
        toValue: 0, // 닫힌 높이
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setToggle(false); // 애니메이션 종료 후 상태 변경
      });
    } else {
      setToggle(true); // 먼저 보여지도록 설정
      Animated.timing(animation, {
        toValue: contentHeight, // 측정된 높이만큼 열기
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <Container
      type={type}
      toggle={toggle}
      onPress={toggleExpand}
      activeOpacity={1}
    >
      <TitleContainer type={type} toggle={toggle}>
        <WordContainer>
          <Title type={type}>
            <fonts.H4SB
              style={
                type === "todaySalaryEdu"
                  ? { color: colors.Grayscale_100 }
                  : { color: colors.Primary_100 }
              }
            >
              {index}.
            </fonts.H4SB>
            {"  "}
            {word}
          </Title>
        </WordContainer>

        <ToggleBtn>
          {toggle ? (
            <SimpleLineIcons
              name="arrow-up"
              size={18}
              color={type === "todaySalaryEdu" ? colors.text_green : "white"}
            />
          ) : (
            <SimpleLineIcons
              name="arrow-down"
              size={18}
              color={type === "todaySalaryEdu" ? colors.text_green : "white"}
            />
          )}
        </ToggleBtn>
      </TitleContainer>

      {/* 항상 렌더링하여 높이를 측정 */}
      <MeanContainer
        style={{
          height: toggle ? animation : 0, // 애니메이션 높이 설정
          overflow: "hidden", // 내용이 넘치지 않도록 설정
        }}
      >
        <View
          style={{ opacity: 0, position: "absolute" }} // 사용자에게 보이지 않도록 설정
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            if (contentHeight === 0) {
              setContentHeight(height);
            }
          }}
        >
          <Mean type={type}>{mean}</Mean>
        </View>

        {/* 실제 렌더링되는 콘텐츠 */}
        {toggle && <Mean type={type}>{mean}</Mean>}
      </MeanContainer>
    </Container>
  );
}

export default WordToggle;
