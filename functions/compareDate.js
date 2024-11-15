function compareDate(dateA, dateB) {
  dateA = new Date(dateA);
  dateB = new Date(dateB);

  if (dateA < dateB) return true; //empty가 true
  else return false;
}

export default compareDate;
