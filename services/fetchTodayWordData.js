import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getKoreaFormattedDate from "../functions/getKoreaForamttedDate";
import { BASE_URL } from "@env";

export async function fetchTodayWordData({ word_id }) {
  try {
    const res = await axios.get(`${BASE_URL}/words?word_id=${word_id}`);
    if (res.status === 200) {
      await AsyncStorage.setItem(
        "todaySalaryData",
        JSON.stringify({
          ...res.data,
          lastFetchedDate: getKoreaFormattedDate(),
        })
      );
      return res.data;
    }
  } catch (error) {
    console.log(
      "HomeScreen- 4번 오늘의 word id 에 대한 word data get 에러",
      error
    );
  }
}
