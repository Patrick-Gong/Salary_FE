import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import colors from "../../styles/colors";

const { width: screenWidth } = Dimensions.get("window");

function TodaySalaryEdu_StoryTelling() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    { id: 1, text: "First Item" },
    { id: 2, text: "Second Item" },
    { id: 3, text: "Third Item" },
    { id: 4, text: "Fourth Item" },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.slideText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Carousel */}
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth} // 슬라이더 너비
        itemWidth={280} // 슬라이드 크기를 슬라이더 너비보다 5% 더 크게 설정
        itemHeight={200}
        layout={"tinder"}
        inactiveSlideScale={1} // 슬라이드 크기 동일 유지
        inactiveSlideOpacity={0.8} // 비활성 슬라이드 투명도
        activeSlideAlignment="center" // 활성 슬라이드 가운데 정렬
        enableMomentum={true} // 부드러운 스크롤
        loop={true} // 무한 스크롤
        onSnapToItem={(index) => setActiveIndex(index)} // 활성 슬라이드 업데이트
      />
      {/* Pagination */}
      {/* <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.Secondary_20,
  },
  slideText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TodaySalaryEdu_StoryTelling;
