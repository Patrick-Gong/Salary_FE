import styled from "styled-components/native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const CompletePressable = styled.Pressable`
  border-radius: 10px;
  background-color: ${(props) =>
    props.isInputFull ? colors.Primary_100 : colors.button_deactive};
  width: 100%;
  height: 45px;
  justify-content: center;
  align-items: center;
`;

const CompletePressableText = styled(fonts.Body1)`
  font-weight: 600;
  color: ${(props) =>
    props.isInputFull ? colors.Grayscale_90 : colors.Grayscale_40};
`;

function CompleteBtn({ onPress, isInputFull, text }) {
  return (
    <CompletePressable isInputFull={isInputFull} onPress={isInputFull ? onPress : null}>
      <CompletePressableText isInputFull={isInputFull}>{text}</CompletePressableText>
    </CompletePressable>
  );
}

export default CompleteBtn;
