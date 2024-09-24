import { Text, View, StyleSheet } from 'react-native';

function VocaListScreen() {
  return (
    <View style={styles.Container}>
      <Text>This screen is VocaListScreen</Text>
    </View>
  );
}

export default VocaListScreen;

const styles = StyleSheet.create({
  Container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});