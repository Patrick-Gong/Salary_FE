import { atom, selector } from "recoil";

export const todaySalaryContent = atom({
  key: "todaySalaryContent",
  default: {
    example: "",
    mean: "",
    story1: "",
    story2: "",
    story3: "",
    urls: [],
    word: "",
    word_id: 0,
    isSaved: false,
  },
});

// isSaved만 추출하는 selector
export const isSavedSelector = selector({
  key: "isSavedSelector", // 고유한 key
  get: ({ get }) => {
    const content = get(todaySalaryContent); // atom 값 가져오기
    return content.isSaved; // isSaved만 반환
  },
  set: ({ set }, newValue) => {
    set(todaySalaryContent, (prevState) => ({
      ...prevState,
      isSaved: newValue, // isSaved만 업데이트
    }));
  },
});

// {"example": "\"요소비용 상승이 기업의 전체 생산비에 큰 부담을 주고 있습니다.\"",
// "mean": "시장가격에서 순생산 및 수입세를 공제한 것으로서 결국 그 상품을 만드는 데 들어간 생산요소에 대한 대가인 피용자보수와 영업잉여의 합계를 말한다.",
//  "story1": "생산의 기본 비용      /요소비용은 생산 과정에서 노동과 자본 같은 자원을 사용하는 데 드는 비용이에요. 기업의 이윤과 가격 책정에 큰 영향을 미친답니다.
// ", "story2": "효율성 관리의 중요성 /효율적으로 요소비용을 관리하면 생산성이 높아지고 비용 절감 효과를 얻을 수 있어요. 이는 기업 경쟁력을 강화하는 데 중요한 요소랍니다.
//  ", "story3": "경쟁력 강화의 열쇠  /요소비용을 줄이기 위한 기술 혁신은 기업뿐만 아니라 산업 전반의 성장 동력을 만들어 낸답니다. 이는 글로벌 경쟁에서 중요한 역할을 하죠.
//   ", "urls": [],
// "word": "요소비용",
//  "word_id": 4}
// isSaved: true
