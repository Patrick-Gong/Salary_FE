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
  const fadeAnim = useAnimatedValue(0); // 공식문서 참고

  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        easing: Easing.linear,
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [fadeAnim]); // 애니메이션 시작

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateY, {
        toValue: -10, // 최종 위치
        duration: 1500, // 애니메이션 시간 (1.5초 통일함)
        useNativeDriver: true,
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
