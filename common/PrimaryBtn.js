import { Pressable } from "react-native";
import colors from "../styles/colors";
import styled, { css } from "styled-components";
import fonts from "../styles/fonts";

const PrimaryPressable = styled.Pressable`
  width: 100%;
  display: flex;
  padding: 13px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 10px;
  ${(props) =>
    props.type === "active"
      ? css`
          background-color: ${colors.Primary_100};
        `
      : props.type === "deactive"
      ? css`
          background-color: ${colors.button_deactive};
        `
      : props.type === "eduDone"
      ? css`
          background-color: ${colors.Grayscale_80};
        `
      : css`
          background-color: #bfc2b0;
        `}
`;

const BtnText = styled(fonts.Button1)`
  ${(props) =>
    props.type === "active"
      ? css`
          color: ${colors.Grayscale_100};
        `
      : props.type === "deactive"
      ? css`
          color: ${colors.Grayscale_40};
        `
      : props.type === "eduDone"
      ? css`
          color: ${colors.Grayscale_10};
        `
      : css`
          background-color: #bfc2b0;
        `}
`;

// type: active, deactive, hover, edudone
// text : 버튼의 txt
// onPress: 클릭 이벤트 핸들러
const PrimaryBtn = ({ type, text, onPress }) => {
  return (
    <PrimaryPressable onPress={onPress} type={type}>
      <BtnText type={type}>{text}</BtnText>
    </PrimaryPressable>
  );
};

export default PrimaryBtn;
