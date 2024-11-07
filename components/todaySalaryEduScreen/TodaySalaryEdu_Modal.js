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
import { useEffect } from "react";

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
  gap: 14px;
  align-items: center;
`;

const ResultText = styled(fonts.H5)`
  color: ${colors.Grayscale_100};
`;

const GuideText = styled(fonts.Caption2)`
  color: ${colors.Grayscale_80};
  text-align: center;
`;

const CloseButton = styled.TouchableOpacity``;

const ButtonText = styled(fonts.Caption2)`
  color: ${colors.Grayscale_80};
`;

function TodaySalaryEdu_Modal({ closeModal }) {
  const handleNavigateBookmark = () => {
    closeModal();
    setTimeout(() => {
      navigation.goBack(); // 모달 닫은 후 화면 교체하도록
    }, 300); // 모달 닫는 애니메이션 시간과 동일하게 설정
  };

  // 단어학습, 트렌드 퀴즈 모두 공통으로 적용
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
              <ResultText>오늘의 용어 학습을 완료했어요!</ResultText>
              <GuideText>
                샐러리 한조각에 참여해 시드 5개를 획득했어요. {"\n"}
                축하해요!
              </GuideText>
            </TextContainer>
            <PrimaryBtn
              type="active"
              text="학습 완료하고 홈으로 돌아가기"
              onPress={handleNavigateHome}
            ></PrimaryBtn>
            <CloseButton onPress={handleNavigateBookmark}>
              <ButtonText>홈 화면으로 이동</ButtonText>
            </CloseButton>
          </ModalContent>
        </TouchableWithoutFeedback>
      </ModalOverlay>
    </TouchableWithoutFeedback>
  );
}

export default TodaySalaryEdu_Modal;
