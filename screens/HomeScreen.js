import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const ViewContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

function HomeScreen() {
  return (
    <ViewContainer>
      <Text>This screen is HomeScreen</Text>
    </ViewContainer>
  );
}

export default HomeScreen;
