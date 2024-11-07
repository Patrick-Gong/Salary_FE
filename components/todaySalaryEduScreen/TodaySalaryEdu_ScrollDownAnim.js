import scrollDown from "../../assets/img/todaySalaryEduScreen/scrollDown.png";
import React, { useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Image,
  useAnimatedValue,
  Easing,
} from "react-native";

function TodaySalaryEdu_ScrollDownAnim() {
  const translateY = useRef(new Animated.Value(-40)).current; // 시작 위치
  const fadeAnim = useAnimatedValue(0); // Initial value for opacity: 0

  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        // toValue: 20, // y축으로 150 이동
        // duration: 1000, // 5초 동안 실행
        // easing: Easing.bounce,
        easing: Easing.linear,
        toValue: 1,
        duration: 1500,
        useNativeDriver: true, // 네이티브 드라이버 사용
      })
    ).start();
  }, [fadeAnim]); // 애니메이션 시작

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateY, {
        toValue: -10, // 최종 위치
        duration: 1500, // 애니메이션 시간 (1초)
        useNativeDriver: true, // 성능 최적화
      })
    ).start();
  }, [translateY]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={scrollDown}
        style={[
          styles.image,
          { transform: [{ translateY }], opacity: fadeAnim },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default TodaySalaryEdu_ScrollDownAnim;
