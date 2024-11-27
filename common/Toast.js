import styled from "styled-components";
import fonts from "../styles/fonts";
import colors from "../styles/colors";

const ModalContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  width: 200px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  border-radius: 10px;

  border: 2px solid ${colors.Grayscale_20};
`;
const ModalText = styled(fonts.Body2R)`
  color: black;
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
