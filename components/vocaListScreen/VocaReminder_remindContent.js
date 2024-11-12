import styled, { css } from "styled-components";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";

const Container = styled.View`
  width: 100%;
  padding: 50px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ReminderContainer = styled.View`
  width: 80%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const WordBtnElement = styled.Pressable`
  border-radius: 15px;
  border: 2px solid ${colors.Primary_80};
  align-self: flex-start;
  padding: 5px 12px;
  margin: 6px;

  ${(props) =>
    props.clickState
      ? css`
          background-color: ${colors.Primary_80};
        `
      : css``}
`;

const WordBtnText = styled(fonts.Body1)`
  color: "#000000";
`;

// data={remindWords}
// reminding={reminding}
// onClick={handleWordClick}
function VocaReminder_remindContent({ data, reminding, onClick }) {
  let content;

  if (!reminding) {
    return (
      <Container>
        <ReminderContainer>
          {data.map((item) => (
            <WordBtnElement
              onPress={() => onClick({ word: item.word })}
              clickState={item.clickState}
            >
              <WordBtnText>{item.word}</WordBtnText>
            </WordBtnElement>
          ))}
        </ReminderContainer>
      </Container>
    );
  } else {
    <Text>아직..</Text>;
  }
}

export default VocaReminder_remindContent;
