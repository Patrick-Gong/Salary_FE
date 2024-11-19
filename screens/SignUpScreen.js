import { useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";

import TermsOfUseBtn from "../components/TermsOfUseBtn";
import CheckBtn_Off from "../assets/img/signUpScreen/CheckBtn_Off.png";
import CheckBtn_On from "../assets/img/signUpScreen/CheckBtn_On.png";
import Salary_Character from "../assets/img/signUpScreen/Salary_Character.png";
import Fireworks from "../assets/img/signUpScreen/Fireworks.png";

const windowWidth = Dimensions.get("window").width;

const ViewContainer = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Modal = styled.Modal``;

const ModalBackdrop = styled.View`
  flex: 1;
  background-color: "rgba(0, 0, 0, 0.7)";
  justify-content: flex-end;
`;

const ModalView = styled.View`
  border-radius: 30px 30px 0px 0px;
  background-color: white;
  align-items: center;
  height: 380px;
  width: 100%;
  /* position: fixed;
  top: 55%; */
`;

const BtnContainer = styled.View`
  margin: 33px 0px 40px 0px;
  width: 320px;
`;

const AllTermsOfUseBtn = styled.Pressable`
  flex-direction: row;
  align-items: center;
  height: 45px;
  border-radius: 10px;
  border: 1px solid #e8e8e8;
  margin-bottom: 30px;
`;

const CheckBtnImg = styled.Image`
  resizemode: cover;
  width: 25px;
  height: 25px;
  margin: 0px 24px 0px 20px;
`;

const BtnText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #313131;
`;

const GoToNextBtn = styled.Pressable`
  justify-content: center;
  align-items: center;
  margin-top: 11px;
  width: 100%;
  height: 45px;
  border-radius: 10px;
  background-color: ${(props) => (!props.allApproved ? "#eff4d2" : "#d7ff01")};
`;

const GoToNextBtnText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.allApproved ? "#313131" : "#a0a0a0")};
`;

const SignUpView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  margin-top: 180px;
`;

const NickNameLabel = styled.Text`
  font-size: 15px;
  font-weight: 600;
  margin-top: 48px;
`;

const NickNameInput = styled.TextInput`
  padding-left: 22px;
  margin-top: 10px;
  border-radius: 5px;
  border: 2px solid ${(props) => (props.focused ? "#d7ff01" : "#e8e8e8")};
  width: 320px;
  height: 40px;
`;

const HeaderText = styled.Text`
  font-size: 30px;
  font-weight: 800;
`;

const SubmitInputBtn = styled.Pressable`
  margin-top: 50px;
  height: 45px;
  width: 320px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #d7ff01;
`;

const SubmitText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const WelcomeContainer = styled.View`
  margin-top: 270px;
  align-items: center;
`;

const ImgContainer = styled.View`
  position: relative;
  height: 106px;
  width: 202px;
`;

const CharacterImg = styled.Image`
  resizemode: cover;
  width: 106px;
  height: 106px;
  position: absolute;
  left: 48px;
`;

// const FireworksLeftImg = styled.Image`
// resizemode: cover;
// width: 78px;
// height: 78px;
// position: absolute;
// top: 25%;
// transform: scaleX(-1);
// `;

const FireworksRightImg = styled.Image`
  resizemode: cover;
  width: 78px;
  height: 78px;
  position: absolute;
  top: 25%;
  left: 124px;
`;

const CompleteText = styled.Text`
  color: #c7ec00;
  font-size: 20px;
  font-weight: 600;
  margin-top: 5px;
`;

const WelcomeText = styled.Text`
  margin-top: 12px;
  color: #121212;
  font-size: 26px;
  font-weight: 500;
  max-width: 300px;
`;

function SignUpScreen({ onEnter, navigation }) {
  const InitializedTermsOfUseList = [
    { id: "#1", approved: false, text: "(필수) 서비스 이용약관" },
    { id: "#2", approved: false, text: "(필수) 개인정보수집 및 이용 동의" },
    { id: "#3", approved: false, text: "(필수) 개인정보 제 3자 정보제공 동의" },
    { id: "#4", approved: false, text: "(선택) 수신 알림 서비스 동의" },
  ];

  const [termsOfUseList, setTermsOfUseList] = useState(
    InitializedTermsOfUseList
  );
  const [allApproved, setAllApproved] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    // if (event.target.value.trim()) {
    //   setNickname(event.target.value);
    // } else {
    //   alert('텍스트를 입력하지 않았습니다.');
    // }
    setIsSubmitted(true);
    console.log(nickname);
  };

  const handleSeparateCheck = (approvedId) => {
    const updatedList = termsOfUseList.map((item) =>
      item.id === approvedId ? { ...item, approved: !item.approved } : item
    );

    setTermsOfUseList(updatedList);
  };

  const handleAllCheck = () => {
    const updatedList = termsOfUseList.map((item) => ({
      ...item,
      approved: !allApproved,
    }));
    setTermsOfUseList(updatedList);
  };

  useEffect(() => {
    if (termsOfUseList.every((item) => item.approved) || termsOfUseList.findIndex((item) => !item.approved) === 3) {
      setAllApproved(true);
    } else {
      setAllApproved(false);
    }
  }, [termsOfUseList]);

  useEffect(() => {
    if (isSubmitted)
      setTimeout(() => {
        onEnter();
      }, 3000);
  }, [isSubmitted]);

  useEffect(() => {
      setTimeout(() => {
        setModalVisible(true)
      }, 200);
  }, []);

  return (
    <ViewContainer>
      <StatusBar style="dark" />
      {!isSubmitted ? (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            // onRequestClose={() => {
            //   Alert.alert('Modal has been closed.');
            //   setModalVisible(!modalVisible);
            // }}
          >
            <ModalBackdrop>
              <ModalView>
                <BtnContainer>
                  <AllTermsOfUseBtn onPress={handleAllCheck}>
                    <CheckBtnImg
                      source={!allApproved ? CheckBtn_Off : CheckBtn_On}
                    />
                    <BtnText>모든 약관에 동의할게요</BtnText>
                  </AllTermsOfUseBtn>
                  {termsOfUseList.map((item) => (
                    <TermsOfUseBtn
                      btnText={item.text}
                      key={item.id}
                      approved={item.approved}
                      onCheck={() => handleSeparateCheck(item.id)}
                    />
                  ))}
                  <GoToNextBtn
                    allApproved={allApproved}
                    onPress={
                      allApproved ? () => setModalVisible(!modalVisible) : null
                    }
                  >
                    <GoToNextBtnText allApproved={allApproved}>
                      다음 단계로 넘어갈게요
                    </GoToNextBtnText>
                  </GoToNextBtn>
                </BtnContainer>
              </ModalView>
            </ModalBackdrop>
          </Modal>
          <SignUpView>
            <InputContainer>
              <HeaderText>회원가입</HeaderText>
              <NickNameLabel>닉네임</NickNameLabel>
              <NickNameInput
                onFocus={() => setIsFocused(true)}
                onSubmitEditing={() => setIsFocused(false)}
                onChangeText={setNickname}
                value={nickname}
                focused={isFocused}
                placeholder="서비스에서 사용할 닉네임을 입력해주세요."
              />
              <SubmitInputBtn onPress={handleSubmit}>
                <SubmitText>샐러리 시작하기</SubmitText>
              </SubmitInputBtn>
            </InputContainer>
          </SignUpView>
        </>
      ) : (
        <WelcomeContainer>
          <ImgContainer>
            <CharacterImg source={Salary_Character} />
            <FireworksRightImg source={Fireworks} />
          </ImgContainer>
          <CompleteText>가입 완료!</CompleteText>
          <WelcomeText>{nickname}님, 환영해요</WelcomeText>
        </WelcomeContainer>
      )}
    </ViewContainer>
  );
}

export default SignUpScreen;
