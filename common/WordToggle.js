// 스토리텔링과 단어장에 쓰이는 토글 공통 컴포넌트
// indexing이 필요함.. 흠??

import styled, { css } from "styled-components";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";

const Container = styled.TouchableOpacity`
  width: 100%;

  margin-bottom: 10px;

  border-radius: 14px;
  background-color: ${colors.Grayscale_90};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  align-self: flex-start;

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
const MeanContainer = styled.View`
  width: 100%;

  padding: 20px 40px 30px;
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
`;

const ToggleBtn = styled.View`
  width: 40px;
  height: 40px;
  margin-right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// type: 1) todaySalaryEdu
// type: 2) vocaReminder
function WordToggle({ type, index, word, mean }) {
  const [toggle, setToggle] = useState(false);

  return (
    <Container
      type={type}
      toggle={toggle}
      onPress={() => setToggle(!toggle)}
      activeOpacity={0.95}
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
          {/* horizon */}
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

      {toggle ? (
        <MeanContainer>
          <Mean type={type}> {mean}</Mean>
        </MeanContainer>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default WordToggle;
