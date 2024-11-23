import styled, { css } from "styled-components";
import {
  Pressable,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
import WordToggle from "../../common/WordToggle";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Svg, {
  Defs,
  Rect,
  Filter,
  FeOffset,
  FeGaussianBlur,
  FeFlood,
  FeComposite,
  FeMerge,
  FeMergeNode,
} from "react-native-svg";
import { Shadow } from "react-native-shadow-2";
import InsetFrame from "../../assets/img/vocaListScreen/insetFrame.png";

const Container = styled.View`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ReminderContainer = styled.View`
  padding: 40px;
  width: 90%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const RemindContentContainer = styled.ScrollView`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 0 25px;
`;

const WordBtnElement = styled.Pressable`
  border-radius: 15px;
  align-self: flex-start;
  padding: 5px 12px;
  margin: 6px;

  ${(props) =>
    props.clickState
      ? css`
          border: 2px solid rgba(232, 232, 232, 0.4);
        `
      : css`
          background-color: ${colors.Secondary_100};
          border: 2px solid ${colors.Primary_80};
        `}
`;

const WordBtnText = styled(fonts.Body2R)`
  color: "#000000";

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 125% */

  z-index: 2;

  ${(props) =>
    props.clickState
      ? css`
          color: #717171;
        `
      : css``}
`;

// data={remindWords}
// reminding={reminding}
// onClick={handleWordClick}
function VocaReminder_remindContent({
  data,
  reminding,
  onClick,
  clickedWordCount,
}) {
  const navigation = useNavigation();
  let content;

  // inset shadow를 동적으로 적용
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 동적으로 Container의 크기를 구함
  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  // 0개 고른 경우 렌더링 방지
  if (reminding && clickedWordCount === 0) {
    navigation.goBack(-1);
  } else if (!reminding) {
    content = (
      <Container>
        <ReminderContainer>
          {data.map((item, index) => (
            <WordBtnElement
              onPress={() => onClick({ word: item.word })}
              clickState={item.clickState}
              key={item.word}
              onLayout={handleLayout}
            >
              <WordBtnText clickState={item.clickState} key={item.word}>
                {item.word}
              </WordBtnText>
            </WordBtnElement>
          ))}
        </ReminderContainer>
      </Container>
    );
  } else {
    let wordIndex = 1; // indexing을 위한 변수 선언
    content = (
      <Container>
        <RemindContentContainer>
          {data.map((item) =>
            !item.clickState ? (
              <WordToggle
                type="vocaReminder"
                index={wordIndex++}
                word={item.word}
                mean={item.mean}
                key={item.word}
              />
            ) : (
              <View key={item.word}></View>
            )
          )}
        </RemindContentContainer>
      </Container>
    );
  }

  return content;
}

export default VocaReminder_remindContent;
