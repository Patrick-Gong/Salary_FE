import { Text, View, StyleSheet } from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.Container}>
      <Text>This screen is HomeScreen</Text>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  Container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
