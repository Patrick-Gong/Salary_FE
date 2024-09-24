import { Pressable, Text, View, StyleSheet } from 'react-native';

function SignInScreen({onEnter}) {
  return (
    <View style={styles.container}>
      <Text>This screen is SignInScreen</Text>
      <Pressable style={styles.LogInBtn} onPress={onEnter}><Text style={styles.LogInBtnText}>로그인</Text></Pressable>
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LogInBtn: {
    backgroundColor: '#ccc',
    marginTop: 20,
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  LogInBtnText: {
    fontSize: 30,
    color: '#000'
  }
});
