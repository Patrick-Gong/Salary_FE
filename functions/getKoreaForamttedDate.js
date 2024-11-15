// 오늘 날짜를 한국 시간 기준으로 format하여 반환하는 함수
// 2024-11-14

// asyncStorage에서 하루에 한번씩 업데이트되는 데이터를 관리하기 위해 사용
function getKoreaFormattedDate() {
  const koreaDate = new Date().toLocaleDateString("en-US", {
    timeZone: "Asia/Seoul",
  });

  const [month, day, year] = koreaDate.split("/"); // Split the string by '/' to get individual components

  const formattedToday = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;
  return formattedToday;
}

export default getKoreaFormattedDate;
