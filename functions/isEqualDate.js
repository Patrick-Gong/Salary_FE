function compareDates(date1, date2) {
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  if (year1 === year2 && month1 === month2 && day1 === day2) {
    return true; // 두 날짜가 동일
  } else {
    return false; // 두 날짜가 다름
  }
}

export default compareDates;
