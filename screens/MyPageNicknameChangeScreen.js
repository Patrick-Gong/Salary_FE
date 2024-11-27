import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import fonts from "../styles/fonts";
import colors from "../styles/colors";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import PrimaryBtn from "../common/PrimaryBtn";

const Container = styled.View`
  width: 100%;

  display: flex;
  padding: 30px 30px;

  background-color: ${colors.Grayscale_white};
  flex-grow: 1;

  gap: 50px;
`;

const InputContainer = styled.View`
  width: 100%;
  justify-content: flex-end;
  gap: 14px;
  align-items: flex-start;

  padding-left: 8px;
`;

const Title = styled(fonts.H3)`
  color: ${colors.Grayscale_100};
`;

const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 11px 22px;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  line-height: 14px;

  border-radius: 5px;
  border: 2px solid #e8e8e8;

  font-family: "Pretendard-Regular";
  font-size: 14px;
  line-height: 22px;

  color: #121212;
  ${(props) =>
    props.text !== ""
      ? css`
          border: 2px solid ${colors.Primary_100};
        `
      : css``}
`;

function MyPageNicknameChangeScreen() {
  const [text, setText] = useState("");

  useEffect(() => {
    console.log(text);
  }, [text]);

  const handleNicknameChange = async () => {
    try {
      console.log(text, "로 변경");
      // axios 닉네임 변경 호출
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, height: "100%" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // 플랫폼에 따른 동작 설정
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Title>닉네임 수정</Title>
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <InputContainer>
              <fonts.Body1>닉네임</fonts.Body1>
              <Input
                text={text}
                value={text}
                autoFocus={true}
                onChangeText={(t) => setText(t)}
                placeholder="서비스에서 사용할 닉네임을 입력해주세요."
                onSubmitEditing={text.length !== 0 && handleNicknameChange}
              ></Input>
            </InputContainer>
            <PrimaryBtn
              text="저장하기"
              type={text.length !== 0 ? "active" : "deactive"}
              onPress={text.length !== 0 ? handleNicknameChange : ""}
            />
          </View>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default MyPageNicknameChangeScreen;
