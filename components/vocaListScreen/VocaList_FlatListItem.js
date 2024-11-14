import styled, { css } from "styled-components";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

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

  function onBookmarkToggle() {
    setBookMark(!bookMark);

    // bookMark가 true일 때

    // bookMark가 false일 때
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
