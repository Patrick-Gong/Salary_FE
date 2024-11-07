import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { Shadow } from "react-native-shadow-2";

const { width: screenWidth } = Dimensions.get("window");

function TodaySalaryEdu_StoryTelling() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      id: 1,
      title: "나스닥이란?",
      text: "한때 주식은 현장에서 직접 종이로 거래되었지만, 1971년 미국에서는 전자적으로 주식을 거래할 수 있는 새로운 시장이 열렸어요. 이 시장의 이름이 바로 나스닥(NASDAQ)입니다. 나스닥은 특히 기술 관련 주식들이 많이 상장되어 있는 시장으로, 기술주를 중심으로 한 세계에서 가장 큰 전자거래 시장이에요.",
      backColor: "#FBFFE4",
    },
    {
      id: 2,
      title: "나스닥이란?",
      text: "한때 주식은 현장에서 직접 종이로 거래되었지만, 1971년 미국에서는 전자적으로 주식을 거래할 수 있는 새로운 시장이 열렸어요. 이 시장의 이름이 바로 나스닥(NASDAQ)입니다. 나스닥은 특히 기술 관련 주식들이 많이 상장되어 있는 시장으로, 기술주를 중심으로 한 세계에서 가장 큰 전자거래 시장이에요.",
      backColor: "#D8E882",
    },
    {
      id: 3,
      title: "나스닥이란?",
      text: "한때 주식은 현장에서 직접 종이로 거래되었지만, 1971년 미국에서는 전자적으로 주식을 거래할 수 있는 새로운 시장이 열렸어요. 이 시장의 이름이 바로 나스닥(NASDAQ)입니다. 나스닥은 특히 기술 관련 주식들이 많이 상장되어 있는 시장으로, 기술주를 중심으로 한 세계에서 가장 큰 전자거래 시장이에요.",
      backColor: "#C6CBB1",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <Shadow
        style={styles.shadowContainer}
        distance={3}
        startColor="rgba(0, 0, 0, 0.1)"
        offset={[2, 12]}
      >
        <View
          style={{ ...styles.slide, backgroundColor: item.backColor }}
          key={item.id}
        >
          <Text style={styles.slideTitle}>{item.title}</Text>
          <View style={styles.horizon}></View>
          <Text style={styles.slideBody}>{item.text}</Text>
        </View>
      </Shadow>
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
        itemWidth={315}
        itemHeight={230}
        layout={"stack"}
        inactiveSlideScale={1} // 슬라이드 크기 동일 유지
        inactiveSlideOpacity={1} // 비활성 슬라이드 투명도
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
  shadowContainer: {
    width: "100%",
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  slide: {
    borderRadius: 8,
    marginTop: 10,
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.Secondary_20,
  },
  horizon: {
    width: "70%",
    height: 1,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#C7EC00",
  },
  slideTitle: {
    width: "70%",
    textAlign: "center",
    fontFamily: "Pretendard-Bold",
    color: colors.Grayscale_80,
  },
  slideBody: {
    paddingTop: 10,
    paddingHorizontal: 24,
    fontFamily: "Pretendard-Medium",
    color: colors.Grayscale_80,
    fontSize: 14,
    lineHeight: 22,
  },
});

export default TodaySalaryEdu_StoryTelling;
