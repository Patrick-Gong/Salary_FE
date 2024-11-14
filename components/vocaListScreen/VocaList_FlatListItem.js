import styled, { css } from "styled-components";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import axios from "axios";
import { BASE_URL } from "@env";

const ItemWrapper = styled.View`
  height: 60px;
  margin: 0px 50px;
  padding-right: 10px;
  padding-left: 10px;

  border-bottom-color: #e4e4e4;
  border-bottom-style: solid;
  border-bottom-width: 1px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /* 마지막 요소인지 받아서 border 안 띄워야함 */
  ${(props) =>
    props.last
      ? css`
          border-bottom-width: 0px;
        `
      : css``}
`;

const BookMarkContainer = styled.TouchableOpacity``;

function VocaList_FlatListItem({ word_id, word }) {
  const [bookMark, setBookMark] = useState(false);

  async function fetchBookMarkState(tmpState) {
    if (tmpState) {
      console.log("삭제");
      const res = await axios.delete(`${BASE_URL}/wordbook?word_id=${word_id}`);
      console.log("삭제 결과", res.data);
    } else {
      console.log("다시 저장");
      const res = await axios.post(`${BASE_URL}/wordbook?word_id=${word_id}`);
      console.log("다시 저장 결과", res.data);
    }
  }

  function onBookmarkToggle() {
    const tmpState = bookMark; // 이전 북마크 상태를 받아와둠
    setBookMark(!bookMark);

    fetchBookMarkState(tmpState);
  }
  return (
    <ItemWrapper key={word_id}>
      <fonts.Body1>{word}</fonts.Body1>
      <BookMarkContainer onPress={onBookmarkToggle}>
        {bookMark ? (
          <Ionicons name="bookmark" color={colors.Primary_100} size={25} />
        ) : (
          <Ionicons
            name="bookmark-outline"
            color={colors.Grayscale_100}
            size={25}
          />
        )}
      </BookMarkContainer>
    </ItemWrapper>
  );
}

export default VocaList_FlatListItem;
