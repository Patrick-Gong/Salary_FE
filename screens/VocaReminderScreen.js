import { View, Text, SafeAreaView, Pressable } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import PrimaryBtn from "../common/PrimaryBtn";
import { useNavigation } from "@react-navigation/native";
import VocaReminder_HeaderRigRht from "../components/vocaListScreen/VocaReminder_HeaderRight";
import VocaReminder_remindContent from "../components/vocaListScreen/VocaReminder_remindContent";
import { BASE_URL } from "@env";

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: ${colors.Grayscale_white};
`;

const TitleContainer = styled.View`
  padding: 30px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 13px;
`;

const ContentContainer = styled.View`
  width: 100%;
  flex: 1;
`;

const BtnContainer = styled.View`
  display: flex;
  flex-direction: center;
  justify-content: center;
  gap: 8px;

  padding: 20px 30px;
`;

// 단어 리마인드 screen 자체에서 리마인드 전/후에 따라 동적으로 screen을 렌더링한다.
function VocaReminderScreen() {
  const navigation = useNavigation();

  const [reminding, setReminding] = useState(false);
  const [remindWords, setRemindWords] = useState([
    {
      word: "헤지",
      mean: "한때 주식은 현장에서 직접 종이로 거래되었지만, 1971년 미국에서는 전자적으로 주식을 거래할 수 있는 새로운 시장이 열렸어요. 이 시장의 이름이 바로 나스닥(NASDAQ)입니다. 나스닥은 특히 기술 관련 주식들이 많이 상장되어 있는 시장으로, 기술주를 중심으로 한 세계에서 가장 큰 전자거래 시장이에요.",
    },
    {
      word: "소득공제",
      mean: "어쩌고 저쩌고",
    },
    {
      word: "청약",
      mean: "어쩌고 저쩌고",
    },
    {
      word: "금융규제샌드박스",
      mean: "어쩌고 저쩌고",
    },
    {
      word: "수출입물가지수",
      mean: "어쩌고 저쩌고",
    },
    {
      word: "순이익",
      mean: "어쩌고 저쩌고",
    },
    {
      word: "모기지대출",
      mean: "어쩌고 저쩌고",
    },
    {
      word: "NFT",
      mean: "어쩌고 저쩌고",
    },
    {
      word: "시장",
      mean: "어쩌고 저쩌고",
    },
    {
      word: "나스닥",
      mean: "어쩌고 저쩌고",
    },
  ]);

  // 클릭된 모르는 단어의 개수를 리턴
  function returnCountClicked() {
    return remindWords.filter((item) => item.clickState).length;
  }

  // 리마인드할 단어를 가져옴
  async function fetchRemindWords() {
    try {
      const res = await axios.get(`${BASE_URL}/wordbook/reminder`);
      console.log("리마인더 결과", res.data);
      setRemindWords(res.data);
    } catch (error) {
      console.log("리마인더 오류", error);
    }
  }

  //   click 상태를 전부 false(초기화)로 => allTrue === false
  // 혹은 전부 true로(모두 기억 안 나는 경우) => allTrue === true
  function addClickedState({ allTrue }) {
    const updateData = remindWords.map((item) => ({
      ...item,
      clickState: allTrue,
    }));
    // console.log(updateData);
    setRemindWords(updateData);
  }

  function handleWordClick({ word }) {
    const updateData = remindWords.map((item) =>
      item.word === word ? { ...item, clickState: !item.clickState } : item
    );

    // word 자체를 매개변수로 받아 해당 word의 state를 변경하여
    // state 값을 바꾼다.
    // console.log(updateData);
    setRemindWords(updateData);
  }

  useEffect(() => {
    // 매번 다른 리마인더 word를 받아오는지 확인 요망
    fetchRemindWords();

    // api 요청 후 데이터 가공하여 클릭 여부를 객체의 속성으로 추가
    addClickedState({ allTrue: false });
  }, []);

  // remind state 변경 후 헤더 변경 (오른쪽 요소 제거)
  useEffect(() => {
    if (reminding)
      navigation.setOptions({
        headerRight: () => <View></View>,
      });
  }, [reminding]);

  return (
    <Container>
      <TitleContainer>
        {!reminding ? (
          <fonts.H4SB style={{ color: "#000000" }}>
            기억나는 단어가 있나요?
          </fonts.H4SB>
        ) : (
          <fonts.H4SB>
            오늘 몰랐던 단어는 총{" "}
            <fonts.H4SB style={{ color: colors.text_green }}>
              {returnCountClicked()}개
            </fonts.H4SB>
          </fonts.H4SB>
        )}
        {!reminding ? (
          <fonts.Caption2 style={{ color: "#000000" }}>
            기억나는 단어를 모두 선택해주세요.
          </fonts.Caption2>
        ) : (
          <fonts.Caption2>
            저번보다 <Text style={{ color: colors.text_green }}>2개</Text>의
            단어를 더 기억하고 있어요! {"\n"}
            체크하지 못한 단어들은 다시 한번 복습해볼까요?
          </fonts.Caption2>
        )}
      </TitleContainer>
      <ContentContainer>
        {/* 2가지 reminding 상태에 따라 알맞은 content를 렌더링 */}
        <VocaReminder_remindContent
          data={remindWords}
          reminding={reminding}
          onClick={handleWordClick}
          clickedWordCount={returnCountClicked()}
        />
      </ContentContainer>
      <BtnContainer>
        <Pressable
          onPress={() => {
            addClickedState({ allTrue: true }); // clickstate를 전부 true로
            setReminding(!reminding);
          }}
        >
          {!reminding ? (
            <fonts.Body2M
              style={{
                color: colors.Grayscale_80,
                textAlign: "center",
                textDecorationLine: "underline",
              }}
            >
              모두 기억이 나지 않아요.
            </fonts.Body2M>
          ) : (
            <></>
          )}
        </Pressable>
        <PrimaryBtn
          type="active"
          text={!reminding ? "모두 선택했어요" : "단어 리마인드를 완료했어요"}
          onPress={() => {
            if (reminding) navigation.navigate("VocabularyList");
            else setReminding(!reminding);
          }}
        />
      </BtnContainer>
    </Container>
  );
}

export default VocaReminderScreen;
