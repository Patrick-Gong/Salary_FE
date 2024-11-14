import { atom } from "recoil";
import getKoreaFormattedDate from "../functions/getKoreaForamttedDate";

export const todayAttendanceState = atom({
  key: "todayAttendanceState",
  default: 0,
  // 전역 변수 상태 변경 시 AsyncStorage에 자동 반영
  effects: [
    ({ setSelf, onSet }) => {
      // 1. AsyncStorage에서 초기 값 불러오기
      const loadPersisted = async () => {
        const savedValue = await AsyncStorage.getItem(getKoreaFormattedDate());
        if (savedValue != null) {
          setSelf(JSON.parse(savedValue)); // AsyncStorage 값으로 Atom 초기화
        }
      };

      loadPersisted(); // async storage에 저장되어 있던 오늘의 attendance state를 불러옴

      onSet(async (newValue) => {
        await AsyncStorage.setItem(
          getKoreaFormattedDate(),
          JSON.stringify(newValue)
        );
        console.log(
          "attendance state가 변경되어 asyncstorage에 알맞게 반영됨",
          newValue
        );
      });
    },
  ],
});
