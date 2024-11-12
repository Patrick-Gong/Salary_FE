// 스토리텔링과 단어장에 쓰이는 토글 공통 컴포넌트
// indexing이 필요함.. 흠??

import styled, { css } from "styled-components";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";

const Container = styled.View`
  width: 100%;

  margin: 5px;

  border-radius: 14px;
  background-color: ${colors.Grayscale_90};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  align-self: flex-start;

  ${(props) => (props.toggle ? css`` : css``)}
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
          border-bottom-color: ${colors.Grayscale_80};
          border-bottom-width: 1px;
          border-bottom-style: "solid";
        `
      : css``}
`;

const WordContainer = styled.View`
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MeanContainer = styled.View`
  width: 100%;

  padding: 15px 40px 20px;
`;

const ToggleBtn = styled.Pressable`
  width: 40px;
  height: 40px;
  margin-right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

function WordToggle({ index, word, mean }) {
  const [toggle, setToggle] = useState(false);

  return (
    <Container toggle={toggle}>
      <TitleContainer toggle={toggle}>
        <WordContainer>
          <fonts.H4SB style={{ color: colors.Grayscale_white }}>
            <fonts.H4SB style={{ color: colors.Primary_100 }}>
              {index}.
            </fonts.H4SB>
            {"  "}
            {word}
          </fonts.H4SB>
          {/* horizon */}
        </WordContainer>

        <ToggleBtn onPress={() => setToggle(!toggle)}>
          {toggle ? (
            <SimpleLineIcons name="arrow-up" size={14} color="white" />
          ) : (
            <SimpleLineIcons name="arrow-down" size={14} color="white" />
          )}
        </ToggleBtn>
      </TitleContainer>

      {toggle ? (
        <MeanContainer>
          <fonts.Body1
            style={{ color: colors.Grayscale_white, lineHeight: 28 }}
          >
            {mean}
          </fonts.Body1>
        </MeanContainer>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default WordToggle;
