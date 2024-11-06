import { useEffect } from "react";
import { Text } from "react-native";

// 이 스크린을 호출하는 경우
// 1) modal에서 학습 버튼
// 2) 퀴즈 스크린에서 모르겠어요
// 3) 단어 검색에서 특정 단어 클릭시
// word_id를 받아 api 호출
function TodaySalaryEduScreen({ word_id }) {
  // 임시 변수 사용
  const word = "금리";
  const mean = "금리의 의미";
  const story1 = "스토리텔링1";
  const story2 = "스토리텔링2";
  const story3 = "스토리텔링3";
  const article = "www.naver.com";

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
  return <Text>하이</Text>;
}

export default TodaySalaryEduScreen;
