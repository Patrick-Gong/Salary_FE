import styled from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { Pressable, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';

import SignInCharacter from '../assets/img/signInScreen/SignInCharacter.png';
import SignInText_SALARY from '../assets/img/signInScreen/SignInText_SALARY.png';
import GoogleLoginBtn from '../assets/img/signInScreen/GoogleLoginBtn.png';
import ShowPassword from '../assets/img/signInScreen/ShowPassword.png';
import HidePassword from '../assets/img/signInScreen/HidePassword.png';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useSetRecoilState } from 'recoil';
import { authToken } from '../Recoil/authToken';
import CompleteBtn from '../components/signUpScreen/CompleteBtn';

const ViewContainer = styled.View`
  flex: 1;
  background-color: #000;
  padding: 0 35px;
`;

const TopTitleContainer = styled.View`
  margin-top: 140px;
`;

const SignInCharacterImage = styled.Image`
  resizemode: contain;
  width: 36px;
  height: 36px;
`;

const SubTitle = styled.Text`
  color: #d0d0d0;
  margin-top: 6px;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
`;

const BottomTitleContainer = styled.View`
  margin-top: 11px;
  width: 200px;
  height: 72px;
  position: relative;
`;

const MainTitle = styled.Text`
  color: #d7ff01;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  position: absolute;
  z-index: 20;
`;

const MainTitleShadowImage = styled.Image`
  resize-mode: contain;
  width: 150px;
  position: absolute;
  z-index: 0;
  left: 8%;
  top: -32%;
  opacity: 0.2;
`;

const LoginBtnContainer = styled.View`
  margin-top: 250px;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

const IdLoginBtn = styled.TouchableOpacity`
  width: 346px;
  height: 50px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.Primary_100};
`;

const IdLoginBtnText = styled(fonts.Body1)`
  font-weight: 600;
`;

const GoogleBtn = styled.Image`
  width: 346px;
  height: 52px;
`;

const SignUpBtnContainer = styled.View`
  width: 100%;
  margin-top: 40px;
  align-items: center;
`;

const SignUpSubText = styled(fonts.Caption2)`
  color: ${colors.Grayscale_60};
`;

const SignUpBtn = styled.Pressable`
  padding: 10px;
`;

const SignUpBtnText = styled.Text`
  color: ${colors.Grayscale_white};
  font-size: 14px;
  font-weight: 600;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
`;

const IdLoginTitleContainer = styled.View`
  position: relative;
  width: 100%;
  margin-top: 168px;
  height: 72px;
`;

const IdLoginTitle = styled(fonts.H3)`
  color: ${colors.Primary_100};
  font-weight: 600;
  z-index: 20;
  position: absolute;
`;

const IdLoginTitle_ShadowImage = styled.Image`
  resize-mode: contain;
  width: 150px;
  position: absolute;
  z-index: 0;
  left: 6%;
  top: -42%;
  opacity: 0.2;
`;

const LoginInputContainer = styled.View`
  width: 100%;
  gap: 11px;
  margin: 95px 0px 50px;
`;

const PasswordView = styled.View`
  position: relative;
  height: 46px;
  width: 100%;
  background-color: blue;
`;

const Input = styled.TextInput`
  height: 46px;
  padding-left: 15px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${colors.Grayscale_10};
  background-color: ${colors.Grayscale_white};
  color: ${colors.Grayscale_100};
`;

const PasswordInput = styled(Input)`
  position: absolute;
  width: 100%;
  z-index: 0;
`;

const PasswordPressable = styled.Pressable`
  position: absolute;
  left: 88%;
  top: 8%;
  z-index: 2;
  padding: 9px;
`;

const ShowPasswordImg = styled.Image`
  resize-mode: contain;
  width: 20px;
  height: 20px;
`;

const LoginCompleteBtn = styled.Pressable`
  border-radius: 10px;
  margin-top: 50px;
  background-color: ${(props) =>
    props.isInputFull ? colors.Primary_100 : colors.button_deactive};
  width: 100%;
  height: 45px;
  justify-content: center;
  align-items: center;
`;

const LoginCompleteBtnText = styled(fonts.Body1)`
  font-weight: 600;
  color: ${(props) =>
    props.isInputFull ? colors.Grayscale_90 : colors.Grayscale_40};
`;

function SignInScreen({ onEnter, navigation }) {
  const [isIdLogin, setIsIdLogin] = useState(false);
  const [userLogin, setUserLogin] = useState({ id: '', pw: '' });
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const pwRef = useRef();
  const setAuthToken = useSetRecoilState(authToken);

  const handleLogIn = async () => {
    try {
      console.log(userLogin);
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          loginId: userLogin.id,
          password: userLogin.pw,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log(res.headers);
      if (res.headers.authorization) {
        console.log(res.headers.authorization);
        setAuthToken(res.headers.authorization);
        onEnter();
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        console.log('등록되지 않은 회원정보입니다.');
      } else {
        console.log(
          '알 수 없는 오류가 발생했습니다. 샐러리 고객센터(1234-0000)로 문의해주세요.'
        );
      }
    }
  };

  return (
    <ViewContainer>
      <StatusBar style="light" />
      {!isIdLogin ? (
        <>
          <TopTitleContainer>
            <SignInCharacterImage source={SignInCharacter} />
            <SubTitle>하루 3분</SubTitle>
            <SubTitle>경제 한입,</SubTitle>
          </TopTitleContainer>
          <BottomTitleContainer>
            <MainTitle>샐러리</MainTitle>
            <MainTitleShadowImage source={SignInText_SALARY} />
          </BottomTitleContainer>
          <LoginBtnContainer>
            <IdLoginBtn onPress={() => setIsIdLogin(true)}>
              <IdLoginBtnText>ID로 로그인하기</IdLoginBtnText>
            </IdLoginBtn>
            <TouchableOpacity>
              <GoogleBtn source={GoogleLoginBtn} />
            </TouchableOpacity>
          </LoginBtnContainer>
          <SignUpBtnContainer>
            <SignUpSubText>아직 계정이 없으신가요?</SignUpSubText>
            <SignUpBtn onPress={() => navigation.navigate('SignUp')}>
              <SignUpBtnText>회원가입</SignUpBtnText>
            </SignUpBtn>
          </SignUpBtnContainer>
        </>
      ) : (
        <>
          <IdLoginTitleContainer>
            <IdLoginTitle>로그인</IdLoginTitle>
            <IdLoginTitle_ShadowImage source={SignInText_SALARY} />
          </IdLoginTitleContainer>
          <LoginInputContainer>
            <Input
              placeholder="아이디"
              placeholderTextColor={colors.Grayscale_40}
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => pwRef.current.focus()}
              value={userLogin.id}
              onChangeText={(id) => setUserLogin((prev) => ({ ...prev, id }))}
            />
            <PasswordView>
              <PasswordInput
                ref={pwRef}
                placeholder="비밀번호"
                placeholderTextColor={colors.Grayscale_40}
                returnKeyType="done"
                value={userLogin.pw}
                onChangeText={(pw) => setUserLogin((prev) => ({ ...prev, pw }))}
                secureTextEntry={isPasswordSecure}
              />
              {userLogin.pw.length > 0 && (
                <PasswordPressable
                  onPress={() => setIsPasswordSecure(!isPasswordSecure)}
                >
                  <ShowPasswordImg
                    source={isPasswordSecure ? ShowPassword : HidePassword}
                  />
                </PasswordPressable>
              )}
            </PasswordView>
          </LoginInputContainer>
          <CompleteBtn
            onPress={
              userLogin.id.length > 0 && userLogin.pw.length > 0
                ? handleLogIn
                : null
            }
            isInputFull={userLogin.id.length > 0 && userLogin.pw.length > 0}
            text="로그인 완료하기"
          />
        </>
      )}
    </ViewContainer>
  );
}

export default SignInScreen;
