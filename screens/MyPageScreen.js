import { Text, View, StyleSheet } from 'react-native';

function MyPageScreen() {
  return (
    <View style={styles.Container}>
      <Text>This screen is MyPageScreen</Text>
    </View>
  );
}

export default MyPageScreen;

const styles = StyleSheet.create({
  Container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});