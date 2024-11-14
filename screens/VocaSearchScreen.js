import styled from "styled-components/native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import ArrowBtn from "../assets/img/vocaSearchScreen/ArrowBtn.png";
import Question from "../assets/img/vocaSearchScreen/Question.png";
import SearchIcon from "../assets/img/vocaSearchScreen/SearchIcon.png";
import ResetIcon from "../assets/img/vocaSearchScreen/ResetIcon.png";
import Salary_Character from "../assets/Salary_Character.png";
import { useCallback, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import { BASE_URL } from "@env";

const ViewContainer = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  align-items: center;
`;

const SearchViewContainer = styled.View`
  width: 346px;
`;
// 타이틀
const TitleContainer = styled.View`
  margin-top: 19px;
  flex-direction: row;
  gap: 5px;
`;

const ImgContainer = styled.View`
  position: relative;
  margin-left: 5px;
`;

const QuestionImg_Left = styled.Image`
  resizemode: contain;
  width: 7px;
  height: 14px;
  position: absolute;
  top: 30%;
  left: 5%;
`;

const QuestionImg_Right = styled.Image`
  resizemode: contain;
  width: 7px;
  height: 14px;
  position: absolute;
  top: 23%;
  left: 80%;
`;

const CharacterImg = styled.Image`
  resizemode: contain;
  width: 66px;
  height: 66px;
`;

const TitleText = styled(fonts.H5)`
  margin-top: 30px;
`;
// focus안됐을 때 입력창
const CenteredView = styled.View`
  align-items: center;
  margin-top: 28px;
`;

const SearchContainer = styled.View`
  width: 100%;
  margin-top: 28px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ArrowBtnWrapper = styled.Pressable`
  justify-content: center;
  padding-left: 6px;
  height: 41px;
  width: 32px;
`;

const ArrowBtnImg = styled.Image`
  transform: scaleX(-1);
  resizemode: contain;
  width: 8px;
  height: 14px;
`;
const SearchBar = styled.Pressable`
  flex-direction: row;
  height: 41px;
  width: 314px;
  padding: 10px 16px 10px 27px;
  border-radius: 18px;
  border: 3px solid ${colors.Primary_80};
  background-color: ${colors.Grayscale_white};
`;

const Dummy_SearchInput = styled.Text`
  color: #6d6d6d;
  font-size: 16px;
  font-weight: 500;
  height: 19px;
  width: 240px;
`;

const SearchInput = styled.TextInput`
  color: #6d6d6d;
  font-size: 16px;
  height: 19px;
  font-weight: 500;
  width: 210px;
`;

const ResetSearchIcon = styled.Pressable`
  position: absolute;
  top: 50%;
  left: 90%;
`;

const ResetImg = styled.Image`
  resizemode: cover;
  width: 20px;
  height: 20px;
`;

const SearchInputIcon = styled.Pressable`
  position: absolute;
  top: 50%;
  left: 103%;
`;

const SearchImg = styled.Image`
  resizemode: cover;
  width: 19px;
  height: 20px;
`;

const RecommendationContainer = styled.View`
  width: 100%;
  margin-top: 51px;
`;

const RecommendationTitle = styled(fonts.H5)`
  color: #090909;
  margin-left: 23px;
  line-height: 24px;
`;

const RecommendedBoxContainer = styled.View`
  width: 100%;
  padding: 0px 23px;
  margin-top: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const RecommendedBox = styled.Pressable`
  padding: 5px 12px;
  justify-content: center;
  align-items: center;
  margin: 0px 11px 10px 0px;
  border-radius: 5px;
  background-color: ${colors.Primary_80};
`;

const KeywordList = styled.FlatList`
  margin-top: 8px;
  width: 100%;
  height: 500px;
`;

const KeywordBox = styled.Pressable`
  padding: 15px 22px;
  margin-left: 16px;
  border-bottom-width: 1px;
  border-color: #e4e4e4;
  width: 325px;
`;

const KeywordIncludedText = styled.Text`
  color: #000;
`;

const ExcludedText = styled.Text`
  color: ${colors.Grayscale_40};
`;

const KeywordText = styled(fonts.Body2M)``;

const RecommendedBox_Text = styled(fonts.Body2M)``;

const EmptyView = styled.View`
  align-items: center;
  margin-top: 66px;
  width: 100%;
`;

const EmptyText = styled(fonts.Body2M)`
  text-align: center;
`;

function VocaSearchScreen({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  const [recommendedList, setRecommendedList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [keywordList, setKeywordList] = useState([]);

  useEffect(() => {
    const fetchRecommendedData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/words/recommand`);
        setRecommendedList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecommendedData();
  }, []);

  const debouncedSearchText = useDebounce(inputText, 200);

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/words/search?word=${debouncedSearchText}`
        );
        setKeywordList(response.data);
      } catch (error) {
        console.log(error);
        setKeywordList([]);
      }
    };
    fetchSearchData();
  }, [debouncedSearchText]);

  const handleDeleteInput = () => {
    setInputText("");
  };

  const handleChangeKeyword = useCallback((text) => {
    setInputText(text.trim());
  }, []);

  const renderItem = ({ item }) => {
    const discernedText = [...item.word].map((char, index) => {
      return inputText.includes(char) ? (
        <KeywordIncludedText key={index}>{char}</KeywordIncludedText>
      ) : (
        <ExcludedText key={index}>{char}</ExcludedText>
      );
    });

    return (
      <KeywordBox
        onPress={() =>
          navigation.navigate("TodaySalaryEdu", {
            // params 전달
            word_id: item.word_id,
          })
        }
      >
        <KeywordText>{discernedText}</KeywordText>
      </KeywordBox>
    );
  };

  console.log("isFocused: ", isFocused);

  return (
    <ViewContainer>
      <SearchViewContainer>
        <TitleContainer>
          <ImgContainer>
            <QuestionImg_Left source={Question} />
            <CharacterImg source={Salary_Character} />
            <QuestionImg_Right source={Question} />
          </ImgContainer>
          <TitleText>궁금한 단어를 검색해보세요!</TitleText>
        </TitleContainer>
        {!isFocused ? (
          <>
            <CenteredView>
              <SearchBar onPress={() => setIsFocused(true)}>
                <Dummy_SearchInput>단어를 입력해주세요.</Dummy_SearchInput>
                <SearchInputIcon>
                  <SearchImg source={SearchIcon} />
                </SearchInputIcon>
              </SearchBar>
            </CenteredView>
            <RecommendationContainer>
              <RecommendationTitle>
                나야 들기름님,{"\n"}이 단어들은 알고 있나요?
              </RecommendationTitle>
              <RecommendedBoxContainer>
                {recommendedList.map((item) => (
                  <RecommendedBox
                    key={item.word_id}
                    onPress={() =>
                      navigation.navigate("TodaySalaryEdu", {
                        word_id: item.word_id,
                      })
                    }
                  >
                    <RecommendedBox_Text>{item.word}</RecommendedBox_Text>
                  </RecommendedBox>
                ))}
              </RecommendedBoxContainer>
            </RecommendationContainer>
          </>
        ) : (
          <>
            <SearchContainer>
              <ArrowBtnWrapper onPress={() => setIsFocused(false)}>
                <ArrowBtnImg source={ArrowBtn} />
              </ArrowBtnWrapper>
              <SearchBar>
                <SearchInput
                  value={inputText}
                  onChangeText={handleChangeKeyword}
                  onSubmitEditing={
                    keywordList.length > 0
                      ? () =>
                          navigation.navigate("VocaSearchResult", {
                            input: inputText,
                            renderedItems: keywordList,
                          })
                      : null
                  }
                  // onEndEditing={() => setIsKeyboardDown(true)}
                  autoFocus={true}
                  onFocus={() => setIsFocused(true)}
                  placeholder="단어를 입력해주세요."
                />
                {inputText.length > 0 && (
                  <ResetSearchIcon onPress={handleDeleteInput}>
                    <ResetImg source={ResetIcon} />
                  </ResetSearchIcon>
                )}
                <SearchInputIcon
                  onPress={
                    keywordList.length > 0
                      ? () =>
                          navigation.navigate("VocaSearchResult", {
                            input: inputText,
                            renderedItems: keywordList,
                          })
                      : null
                  }
                >
                  <SearchImg source={SearchIcon} />
                </SearchInputIcon>
              </SearchBar>
            </SearchContainer>

            <KeywordList
              data={keywordList}
              renderItem={renderItem}
              keyExtractor={(item) => item.word_id}
              ListEmptyComponent={
                <EmptyView>
                  <EmptyText>
                    검색결과가 존재하지 않아요.{"\n"}다시 검색해주세요.
                  </EmptyText>
                </EmptyView>
              }
              keyboardDismissMode="on-drag"
            />
          </>
        )}
      </SearchViewContainer>
    </ViewContainer>
  );
}

export default VocaSearchScreen;
