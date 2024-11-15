// 2024-11-14 형식으로 날짜를 반환하는 함수
// api 호출 등에 사용됨

function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0"); // 1자리 수일 경우 0 추가
  return `${year}-${month}-${day}`;
}

export default getFormattedDate;
