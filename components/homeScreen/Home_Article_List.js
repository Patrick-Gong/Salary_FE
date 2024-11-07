import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";
import styled from "styled-components";
import articleArrow from "../../assets/img/homeScreen/articleArrow.png";

const DATA = [
  {
    id: "1",
    title: "고용부, 삼성전자 '방사선 피폭' 중대재해로 판단‥과태료 3천만원 부과",
    source: require("../../assets/img/homeScreen/exArticle1.jpg"),
  },
  {
    id: "2",
    title: "금리 인하에 기대감?‥대출규제·긴축재정에 효과는 시차가‥",
    source: require("../../assets/img/homeScreen/exArticle2.jpg"),
  },
  {
    id: "3",
    title: "'내년 하반기 4차 발사' 누리호 다음 달 조립 시작",
    source: require("../../assets/img/homeScreen/exArticle3.jpg"),
  },
  {
    id: "4",
    title: "간다ㅏ라마ㅏ바사",
    source: require("../../assets/img/homeScreen/exArticle1.jpg"),
  },
  {
    id: "5",
    title: "아자ㅏ카차카ㅏㅌ",
    source: require("../../assets/img/homeScreen/exArticle2.jpg"),
  },
];

function Home_Article_List() {
  const renderItem = ({ item }) => (
    <ImageBackground
      source={item.source} // DATA에서 받아온 source 사용
      style={styles.item}
      imageStyle={styles.image}
    >
      <View style={styles.overlay} />
      <Image source={articleArrow} style={styles.iconImage}></Image>
      <Text style={styles.title}>{item.title}</Text>
    </ImageBackground>
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={true} // 가로 스크롤을 위해 horizontal 속성을 true로 설정
      showsHorizontalScrollIndicator={false} // 스크롤바 숨기기 (선택 사항)
      contentContainerStyle={styles.listContainer} // 리스트 전체 스타일 (선택 사항)
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  listContainer: {},
  item: {
    backgroundColor: "#f9c2ff",
    paddingLeft: 0,
    marginHorizontal: 8,
    borderRadius: 8,
    width: 132,
    height: 170,
    justifyContent: "space-between", // 하단 정렬을 위해 추가
    alignItems: "flex-end",
  },
  image: {
    borderRadius: 8, // 이미지 자체에 둥근 모서리를 적용
  },
  iconImage: {
    width: 8,
    height: 16,
    objectFit: "cover",
    marginRight: 15,
    marginTop: 12,
  },
  title: {
    width: "100%",
    padding: 8,
    paddingBottom: 0,
    fontSize: 12,
    color: "white",
    marginBottom: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // 오버레이가 전체를 덮도록 설정
    backgroundColor: "rgba(0, 0, 0, 0.6)", // 검정색 0.6 opacity
    borderRadius: 8,
  },
  opacity: {
    paddingLeft: 0,
    marginHorizontal: 8,
    borderRadius: 8,
    width: 132,
    height: 170,
    position: "relative",
    backgroundColor: "rgba(18, 18, 18, 0.6)",
  },
});

export default Home_Article_List;
