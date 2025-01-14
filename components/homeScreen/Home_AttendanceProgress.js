import { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useRecoilValue } from "recoil";
import { todayAttendanceState } from "../../Recoil/todayAttendanceState";
import colors from "../../styles/colors";

function Home_AttendanceProgress({}) {
  // 전역으로 관리되는 오늘의 attendace state를 받아옴
  const progress = useRecoilValue(todayAttendanceState);

  const outerCircleProgress = progress >= 3 ? 100 : 0;
  const innerCircleProgress =
    progress % 3 === 1 ? 50 : progress % 3 === 2 ? 100 : 0;

  // 다 채운 상태라면 바의 색상이 변경됨
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        {/* Outer Half Circle Progress */}
        <View style={[styles.halfCircle, styles.outerCircle]}>
          <AnimatedCircularProgress
            size={285} // 크기
            width={16} // 외부 Progress Bar 너비
            fill={outerCircleProgress} // 외부 Progress Bar 퍼센트
            tintColor={progress === 5 ? colors.Primary_100 : "#DEED90"} // 외부 Progress Bar 색상
            backgroundColor="#F3F4F6" // 외부 Progress Bar 배경색
            arcSweepAngle={190} // 반원 형태
            rotation={265} // 시작 위치를 위쪽으로 조정
            lineCap="round" // 둥근 끝
            duration={2000}
          />
        </View>

        {/* Inner Half Circle Progress */}
        <View style={[styles.halfCircle, styles.innerCircle]}>
          <AnimatedCircularProgress
            size={218} // 크기
            width={12} // 내부 Progress Bar 너비
            fill={innerCircleProgress} // 내부 Progress Bar 퍼센트
            tintColor={progress === 5 ? colors.Primary_100 : "#DEED90"} // 내부 Progress Bar 색상
            backgroundColor="#F3F4F6" // 내부 Progress Bar 배경색
            arcSweepAngle={200} // 반원 형태
            rotation={260} // 시작 위치를 위쪽으로 조정
            lineCap="round" // 둥근 끝
            duration={1000}
            // onAnimationComplete={} // animaton이 끝났을 때 function을 전달
            // onFillChange={} //Function that returns current progress on every change
          />
        </View>
      </View>
    </View>
    // <View style={{ width: "100%", height: "50px" }}>
    //   <View style={styles.bar}>
    //     <Animated.View
    //       style={{
    //         backgroundColor: "#AAC9CE",
    //         width,
    //         height: 3,
    //         borderTopRightRadius: 2,
    //         borderBottomRightRadius: 2,
    //         borderRadius: "50px",
    //       }}
    //     />
    //     <Text style={styles.step}>
    //       {nowStep}/{totalStep}
    //     </Text>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "end",
    alignItems: "center",
    flex: 1,
    width: "100%",
    height: "5px",
  },
  outerCircle: {
    top: 40,
  },
  halfCircle: {
    position: "absolute", // 겹치기 위해 절대 위치 지정
  },
  innerCircle: {
    top: 70, // 내부 Progress Bar 위치 조정
  },
});

export default Home_AttendanceProgress;
