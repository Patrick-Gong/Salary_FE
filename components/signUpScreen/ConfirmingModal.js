import styled from "styled-components/native";
import PrimaryBtn from "../../common/PrimaryBtn";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import HighlightText from "react-native-highlight-underline-text";

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(18, 18, 18, 0.4);
`;

const ModalContent = styled.View`
  width: 300px;
  height: auto;
  border-radius: 30px;
  padding: 65px 20px 41px;
  background-color: #fff;
  align-items: center;
  gap: 16px;
`;

// 텍스트
const TextContainer = styled.View`
  gap: 12px;
  align-items: center;
  margin-bottom: 43px;
`;

const GuideText = styled(fonts.Caption2)`
  color: ${colors.Grayscale_80};
  text-align: center;
`;

const CloseButton = styled.Pressable`
  padding: 4px;
`;

const ButtonText = styled(fonts.Caption2)`
  color: ${colors.Grayscale_80};
  text-decoration-line: underline;
`;

function ConfirmingModal({ onHide, onWelcome, nickname }) {
  return (
    <ModalOverlay>
      <ModalContent>
        {/* 세가지 요소를 담는 컨테이너 */}
        <TextContainer>
          <HighlightText
            isFixed
            underlineSize={10}
            underlineColor={colors.Primary_100}
            textStyle={{
              color: "#121212",
              fontFamily: "Pretendard-Bold",
              fontSize: 23,
              lineHeight: 27,
            }}
            text={nickname}
          />
          <GuideText>이 이름으로 샐러리를 시작할게요.</GuideText>
        </TextContainer>
        <PrimaryBtn
          type="active"
          text="네, 좋아요"
          onPress={onWelcome}
        ></PrimaryBtn>
        <CloseButton onPress={onHide}>
          <ButtonText>아니요, 변경할게요</ButtonText>
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ConfirmingModal;
