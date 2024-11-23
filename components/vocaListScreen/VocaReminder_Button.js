import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";
import fonts from "../../styles/fonts";
import styled, { css } from "styled-components";
import RemindIcn from "../../assets/img/vocaListScreen/remindIcn.png";
import RemindDeactiveIcn from "../../assets/img/vocaListScreen/remind_deactive.png";
import {
  Touchable,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import colors from "../../styles/colors";

const Container = styled.View`
  display: flex;
  width: 100%;
  height: 50px;
  border-radius: 10px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ${(props) =>
    props.state === "deactive"
      ? css`
          background-color: ${colors.bg};
          border: 1px solid ${colors.Grayscale_10};
        `
      : css``}
`;

const BtnTextContainer = styled.View`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`;

const BtnPreviewText = styled(fonts.Body2M)`
  z-index: 2;

  ${(props) =>
    props.state === "deactive"
      ? css`
          color: ${colors.Grayscale_40};
        `
      : css`
          color: #ffffff;
        `}
`;

const BtnEducateText = styled.Text`
  z-index: 2;
  color: #ffffff;
  text-align: center;
  font-family: Pretendard-Bold;
  font-size: 17px;
`;

const Icn = styled.Image`
  width: 27px;
  height: 26px;
  object-fit: cover;
`;

// type: preview, educate
// state: active, deactive
// onClick
// text: "버튼 텍스트"
function VocaReminder_Button({ type, state, onClick, text }) {
  return (
    <Pressable onPress={onClick}>
      <Container state={state}>
        {type === "educate" ? (
          <BtnEducateText>{text}</BtnEducateText>
        ) : (
          <BtnTextContainer>
            <BtnPreviewText state={state}>{text}</BtnPreviewText>
            <Icn source={state === "active" ? RemindIcn : RemindDeactiveIcn} />
          </BtnTextContainer>
        )}
        {state === "active" && (
          <Svg
            height="100%"
            width="100%"
            style={{
              position: "absolute",
              zIndex: 1,
              top: 0,
              left: 0,
            }}
          >
            <Defs>
              <LinearGradient id="grad" x1="0.2" y1="0" x2="0.9" y2="1">
                <Stop
                  offset="0"
                  stopColor={type === "educate" ? "#59B056" : "#4EA454"}
                  stopOpacity="1"
                />
                <Stop offset="1" stopColor="#97F764" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="10"
              fill="url(#grad)"
            />
            <Rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="10"
              fill="rgba(0, 0, 0, 0.2)"
            />
          </Svg>
        )}
      </Container>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
  },
  text: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginTop: "50%",
  },
});
export default VocaReminder_Button;
{
  /* <Svg height="100%" width="100%">
<Defs>
  <LinearGradient id="grad" x1="-0.5" y1="1.5" x2="0.7" y2="0.5">
    <Stop offset="0" stopColor="#2f804d" stopOpacity="1" />
    <Stop offset="1" stopColor="#97F764" stopOpacity="1" />
  </LinearGradient>
</Defs>
<Rect
  x="0"
  y="0"
  rx="10"
  width="100%"
  height="100%"
  fill="url(#grad)"
/>
<Rect
  x="0"
  y="0"
  rx="10"
  width="100%"
  height="100%"
  fill="rgba(0, 0, 0, 0.3)"
/>
</Svg> */
}
