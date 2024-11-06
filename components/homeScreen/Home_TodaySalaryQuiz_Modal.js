import styled from "styled-components";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import PrimaryBtn from "../../common/PrimaryBtn";
import { useNavigation } from "@react-navigation/native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import HighlightText from "react-native-highlight-underline-text";

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(18, 18, 18, 0.4);
`;

const ModalContent = styled.View`
  width: 300px;
  height: auto;
  border-radius: 30px;
  padding: 42px 20px 22px;
  background-color: #fff;
  align-items: center;
  gap: 16px;
`;

// 텍스트
const TextContainer = styled.View`
  gap: 46px;
  align-items: center;
`;

const ResultText = styled.Text`
  color: ${colors.Grayscale_100};
  font-size: 18px;
  font-family: Pretendard-SemiBold;
`;

const AnswerText = styled(fonts.H2)`
  color: ${colors.Grayscale_100};
`;

const AnswerTextHighLight = styled.View`
  background-color: ${colors.Primary_100};
  height: 10px;
  position: relative;
`;

const GuideText = styled(fonts.Caption2)`
  color: ${colors.Grayscale_80};
  text-align: center;
`;

const CloseButton = styled.TouchableOpacity``;

const ButtonText = styled(fonts.Caption2)`
  color: ${colors.Grayscale_80};
`;

//   result: 정답 여부
//   정답 : answer
//   정답의 word_id
function Home_TodaySalaryQuiz_Modal({ result, answer, word_id, closeModal }) {
  const handleNavigateEdu = () => {
    closeModal();
    setTimeout(() => {
      navigation.replace("TodaySalaryEdu", {
        // params 전달
        word_id: word_id,
      }); // 모달 닫은 후 화면 교체하도록
    }, 300); // 모달 닫는 애니메이션 시간과 동일하게 설정
  };

  const handleNavigateHome = () => {
    closeModal();
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <ModalOverlay>
        <TouchableWithoutFeedback>
          <ModalContent>
            {/* 세가지 요소를 담는 컨테이너 */}
            <TextContainer>
              <ResultText>
                {result ? "정답이에요! 🎉" : "정답은 ...🧐"}
              </ResultText>
              <HighlightText
                isFixed
                underlineSize={10}
                underlineColor={colors.Primary_100}
                textStyle={{
                  color: "#121212",
                  fontFamily: "Pretendard-Bold",
                  fontSize: 23,
                  lineHeight: 23,
                }}
                text={answer}
              ></HighlightText>
              <GuideText>
                이어서 단어학습을 진행해보세요!{"\n"}단어학습을 모두 완료하면
                시드 5개를 받을 수 있어요.
              </GuideText>
            </TextContainer>
            <PrimaryBtn
              type="active"
              text={result ? "단어 학습하러 가기" : "단어 이해하러 가기"}
              onPress={handleNavigateEdu}
            ></PrimaryBtn>
            <CloseButton onPress={handleNavigateHome}>
              <ButtonText>홈 화면으로 이동</ButtonText>
            </CloseButton>
          </ModalContent>
        </TouchableWithoutFeedback>
      </ModalOverlay>
    </TouchableWithoutFeedback>
  );
}

export default Home_TodaySalaryQuiz_Modal;
