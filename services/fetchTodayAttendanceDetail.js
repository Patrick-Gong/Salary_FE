import axios from "axios";
import { BASE_URL } from "@env";

export async function fetchTodayAttendanceDetail(token) {
  try {
    const res = await axios.get(`${BASE_URL}/attendance/today`, {
      headers: { Authorization: token },
    });
    
    if (res.status === 200) {
      console.log("2. attendance today", res.data);
      return res.data;
    }
  } catch (error) {
    console.log("HomeScreen- 2번 학습 과목 조회 에러", error);
  }
}
