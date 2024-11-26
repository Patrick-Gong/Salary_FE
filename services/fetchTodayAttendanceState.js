import axios from "axios";
import getKoreaFormattedDate from "../functions/getKoreaForamttedDate";
import { BASE_URL } from "@env";

export async function fetchTodayAttendanceState() {
  try {
    const res = await axios.get(
      `${BASE_URL}/attendance/status?attendance_date=${getKoreaFormattedDate()}`
    );
    console.log("1. attendance state: ", res.data);
    if (res.status === 200) {
      return res.data.attendance_state; // 전역으로 저장
    }
  } catch (error) {
    console.log(
      "HomeScreen- 1번 attendance state(날짜별 출석률 조회 에러) ",
      error
    );
  }
}
