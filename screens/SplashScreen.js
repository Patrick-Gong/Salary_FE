import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import SplashCharacter from '../assets/SplashCharacter.png';
import SplashShadow from '../assets/SplashShadow.png';

const ViewContainer = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

const SplashCharacterImage = styled.Image`
  resizemode: cover;
  width: 100px;
  height: 94px;
`;

const SplashShadowImage = styled.Image`
  resizemode: cover;
  width: 95px;
  height: 18px;
`;

function SplashScreen() {
  return (
    <ViewContainer>
      <SplashCharacterImage source={SplashCharacter} />
      <SplashShadowImage source={SplashShadow} />
    </ViewContainer>
  );
}

export default SplashScreen;
