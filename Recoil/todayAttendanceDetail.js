import { atom, selector } from "recoil";

export const todayAttendanceDetail = atom({
  key: "todayAttendanceDetail",
  default: {
    word: false,
    trend: false,
    article: false,
  },
});

// selector로 개별 속성에 접근하게 함
export const todayWordSelector = selector({
  key: "todayWordSelector",
  get: ({ get }) => get(todayAttendanceDetail).word,
  set: ({ set, get }, newValue) => {
    const prevState = get(todayAttendanceDetail);
    set(todayAttendanceDetail, {
      ...prevState,
      word: newValue,
    });
  },
});

export const todayTrendSelector = selector({
  key: "todayTrendSelector",
  get: ({ get }) => get(todayAttendanceDetail).trend,
  set: ({ set, get }, newValue) => {
    const prevState = get(todayAttendanceDetail);
    set(todayAttendanceDetail, {
      ...prevState,
      trend: newValue,
    });
  },
});

export const todayArticleSelector = selector({
  key: "todayArticleSelector",
  get: ({ get }) => get(todayAttendanceDetail).article,
  set: ({ set, get }, newValue) => {
    const prevState = get(todayAttendanceDetail);
    set(todayAttendanceDetail, {
      ...prevState,
      article: newValue,
    });
  },
});
