import React, { useEffect, useState, useCallback } from "react";
import { Modal, View, Text, ScrollView, ActivityIndicator } from "react-native";
import styled, { css } from "styled-components";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import TodaySalaryEdu_Modal from "../components/todaySalaryEduScreen/TodaySalaryEdu_Modal";
import TodaySalaryEdu_MeanAndExample from "../components/todaySalaryEduScreen/TodaySalaryEdu_MeanAndExample";
import TodaySalaryEdu_StoryTelling from "../components/todaySalaryEduScreen/TodaySalaryEdu_StoryTelling";
import TodaySalaryEdu_ScrollDownAnim from "../components/todaySalaryEduScreen/TodaySalaryEdu_ScrollDownAnim";
import { Ionicons } from "@expo/vector-icons";
import HighlightText from "react-native-highlight-underline-text";

const RootContainer = styled.View`
  flex: 1;
  width: "100%";
  background-color: ${colors.Grayscale_white};
`;

const BoldTitle = styled(fonts.H4SB)`
  color: ${colors.Grayscale_100};
`;

const Title = styled(fonts.H4M)`
  font-family: "Pretendard-Medium";
  color: ${colors.Grayscale_100};
`;

// 섹션 1) 뜻과 예문
const MeanAndExampleContainer = styled.View`
  padding: 20px 24px 44px;
`;

const MeanContainer = styled.View`
  margin-top: 25px;
  background-color: ${colors.bg};
  position: relative;
  border-radius: 10px;
  padding: 41px 0px;

  justify-content: center;
  align-items: center;

  margin-bottom: 28px;
`;

const BookMarkContainer = styled.TouchableOpacity`
  position: absolute;
  top: 12px;
  right: 15px;

  gap: 3px;
`;

// 섹션 2) 스토리텔링
const StoryTellingContainer = styled.View`
  padding: 8px 24px 28px;
  width: auto;
  height: 400px;
  gap: 20px;

  align-items: center;
`;

const StoryTellingTitle = styled(fonts.H4M)`
  width: 100%;
  color: ${colors.Grayscale_100};
  text-align: left;
`;

// 뉴스 above Horizon
const Horizon = styled.View`
  height: 1px;
  background-color: #d0d0d0;
  margin-left: 16px;
  margin-right: 16px;
`;

// 섹션 3) 관련 뉴스
const NewsContainer = styled.View`
  padding: 31px 24px 50px;
  gap: 27px;
`;

const NewsTitleContainer = styled.View`
  justify-content: flex-start;
  gap: 5px;
  text-align: left;

  ${(props) =>
    props.tooLong
      ? css`
          align-items: flex-start;
        `
      : css`
          flex-direction: row;
          align-items: center;
        `}
`;

const NewsContentContainer = styled.View`
  gap: 12px;
  width: 100%;
`;

// 임시
const NewsContentBox = styled.View`
  background-color: #c2c2c2;
  border-radius: 3px;
  align-items: center;
`;

const NewsText = styled(fonts.Caption2)`
  color: #323232;

  letter-spacing: 0.24px;
  padding: 19px 44px 52px 21px;
`;

// 섹션 4) 학습 완료와 모달
const EduDoneContainer = styled.View`
  padding: 50px 0px 80px;

  justify-content: center;
  align-items: center;
`;

const EduDoneText = styled(fonts.Body2M)`
  color: #000000;
  text-align: center;
`;

// 이 스크린을 호출하는 경우
// 1) modal에서 학습 버튼
// 2) 퀴즈 스크린에서 모르겠어요
// 3) 단어 검색에서 특정 단어 클릭시
// word_id를 받아 api 호출
function TodaySalaryEduScreen({ word_id }) {
  const [loading, setLoading] = useState(false);

  // 임시 변수 사용
  const word = "나스닥";
  const example =
    "테슬라의 주가는 나스닥에서 급등하여 기술주의 상승세를 이끌었습니다.";
  const mean =
    "벤처기업들이 상장되어 있는 미국의 장외시장을 말한다. 자본력이 부족한 비상장벤처기업들이 저리로 자금을 조달하는 창구로 활용하고 있다.";
  const story1 = "스토리텔링1";
  const story2 = "스토리텔링2";
  const story3 = "스토리텔링3";
  const article = "www.naver.com";
  const news1 = "기술주 중심 나스닥 또 급락…신규 고용 시장 기대 못미쳐";
  const news2 = "美 고용지표 악화에 증시 급락…AI 빅테크 주가 일제히 하락";

  // 단어 저장 상태를 관리
  const [bookMark, setBookMark] = useState(false);

  function onBookmarkToggle() {
    setBookMark(!bookMark);
    // 북마크 아이콘 클릭시마다 API 호출
  }

  // 밑으로 새로고침시 API 호출하여 단어 학습 완료를 POST
  // 최초 1회만 실행되며. 이후에는 새로고침해도 핸들러 호출 X
  function handleDoneTodaySalary() {
    if (loading) return; // 중복 요청 방지
    setLoading(true);

    // API 요청 후 loading을 false로  (주석 제거)
    setIsModalVisible(true);
  }

  // 스크롤 이벤트 핸들러
  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

    // ScrollView의 맨 아래에 도달했는지 확인
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isBottom && !loading) {
      handleDoneTodaySalary();
    }
  };

  // 모달 관리
  // 모달 관리
  const [isModalVisible, setIsModalVisible] = useState(false);

  function openModal() {
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  useEffect(() => {
    // API 호출하여
    //    "word_id": 1,
    // "word": "금리",
    // "mean": "금리의 의미",
    // "story1":"스토리텔링1",
    // "story2":"스토리텔링2",
    // "story3":"스토리텔링3",
    // "article":"url입니다."
  }, [word_id]);

  return (
    <ScrollView
      onScroll={handleScroll} // 스크롤 이벤트 연결
      scrollEventThrottle={16} // 스크롤 이벤트 빈도 조절
    >
      {/* 로딩 표시 */}
      {/* {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text>Loading...</Text>
        </View>
      )} */}
      <Modal
        visible={isModalVisible}
        transparent={true} // 배경 투명
        animationType="slide" // 모달 등장 애니메이션
        onRequestClose={closeModal} // 안드로이드에서 뒤로가기 버튼 처리
      >
        {/* Modal 태그 내부에 Modal View를 정의 */}
        <TodaySalaryEdu_Modal closeModal={closeModal}></TodaySalaryEdu_Modal>
      </Modal>
      <RootContainer>
        {/* 1. 오늘의 샐러리 한조각 */}
        <MeanAndExampleContainer>
          <BoldTitle>오늘의 샐러리 한조각</BoldTitle>
          <MeanContainer>
            <HighlightText
              isFixed
              underlineSize={10}
              underlineColor={colors.Primary_100}
              textStyle={{
                color: "#121212",
                fontFamily: "Pretendard-Bold",
                fontSize: 26,
                lineHeight: 26,
              }}
              text={word}
            ></HighlightText>
            <BookMarkContainer onPress={onBookmarkToggle}>
              {bookMark ? (
                <Ionicons
                  name="bookmark"
                  color={colors.Primary_100}
                  size={25}
                />
              ) : (
                <Ionicons
                  name="bookmark-outline"
                  color={colors.Grayscale_100}
                  size={25}
                />
              )}
              <Text>저장</Text>
            </BookMarkContainer>
          </MeanContainer>
          <TodaySalaryEdu_MeanAndExample
            word={word}
            mean={mean}
            example={example}
          />
        </MeanAndExampleContainer>
        {/* 2. 스토리텔링 */}
        <StoryTellingContainer>
          <StoryTellingTitle>더 쉽게 이해해볼까요?</StoryTellingTitle>
          <TodaySalaryEdu_StoryTelling />
        </StoryTellingContainer>
        <Horizon />
        {/* 3. 관련 뉴스 확인 */}
        <NewsContainer>
          <NewsTitleContainer tooLong={word.length > 10}>
            <HighlightText
              isFixed
              underlineSize={10}
              underlineColor={colors.Primary_100}
              textStyle={{
                color: "#121212",
                fontFamily: "Pretendard-Medium",
                fontSize: 20,
                lineHeight: 20,
              }}
              text={word}
            ></HighlightText>
            <Title style={{ lineHeight: 20 }}>관련 뉴스 확인하기</Title>
          </NewsTitleContainer>
          <NewsContentContainer>
            <NewsContentBox>
              <NewsText>{news1}</NewsText>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 50,
                  color: "#858585",
                  marginBottom: 5,
                }}
              >
                기사 관련 이미지(배경)
              </Text>
            </NewsContentBox>
            <NewsContentBox>
              <NewsText>{news2}</NewsText>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#858585",
                  marginBottom: 5,
                }}
              >
                기사 관련 이미지(배경)
              </Text>
            </NewsContentBox>
          </NewsContentContainer>
        </NewsContainer>
        {/* 4. 끝까지 내려 => 모달 올리기 & 학습 완료 api 호출 */}
        <EduDoneContainer>
          <TodaySalaryEdu_ScrollDownAnim />
          <EduDoneText>
            끝까지 내리면 오늘의 샐러리 한조각 학습이 완료돼요!
          </EduDoneText>
        </EduDoneContainer>
      </RootContainer>
    </ScrollView>
  );
}

export default TodaySalaryEduScreen;
