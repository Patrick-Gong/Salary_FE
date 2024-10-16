import styled from "styled-components/native";
import LottieView from 'lottie-react-native';

const ViewContainer = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

function SplashScreen() {
  return (
    <ViewContainer>
      <LottieView style={{width: 400, height: 400}} source={require('../assets/animations/Salary_Splash.json')} autoPlay loop={false}/>
    </ViewContainer>
  );
}

export default SplashScreen;
