function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0"); // 1자리 수일 경우 0 추가
  return `${year}-${month}-${day}`;
}

export default getFormattedDate;
