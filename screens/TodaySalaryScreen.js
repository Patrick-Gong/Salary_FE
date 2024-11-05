import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
} from "react-native";
import styled, { css } from "styled-components";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import Constants from "expo-constants";

function TodaySalaryScreen() {
  return (
    <SafeAreaView style={styles.rootScreen}>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
export default TodaySalaryScreen;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.Grayscale_white,
    paddingTop: Constants.statusBarHeight, // // Constants의 statusBarHeight 값을 이용한다.
  },
  shadowContainer: {
    width: "100%",
    flex: 1,
  },
});
