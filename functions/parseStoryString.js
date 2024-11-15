function parseStoryString(input) {
  const parts = input.split("/"); // '/' 기준으로 분리
  if (parts.length !== 2) {
    throw new Error('Input string must contain exactly one "/"');
  }
  // 각 부분에서 양쪽 공백을 제거
  return parts.map((part) => part.trim());
}

export default parseStoryString;
