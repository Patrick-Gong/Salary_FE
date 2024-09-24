import { Text, View, StyleSheet } from 'react-native';

function VocaSearchScreen() {
  return (
    <View style={styles.Container}>
      <Text>This screen is VocaSearchScreen</Text>
    </View>
  );
}

export default VocaSearchScreen;

const styles = StyleSheet.create({
  Container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});