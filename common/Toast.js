import styled from "styled-components";
import fonts from "../styles/fonts";
import colors from "../styles/colors";

const ModalContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  background-color: rgba(18, 18, 18, 0.70);
  height: 34px;
  border-radius: 30px;
`;
const ModalText = styled(fonts.Body2R)`
  color: ${colors.Grayscale_white};
`;

function Toast({ text }) {
  return (
    <ModalContainer>
      <ModalContent>
        <ModalText>{text}</ModalText>
      </ModalContent>
    </ModalContainer>
  );
}

export default Toast;
