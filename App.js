import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import SplashScreen from "./screens/SplashScreen";
import SignInScreen from "./screens/SignInScreen";
import HomeScreen from "./screens/HomeScreen";
import VocaSearchScreen from "./screens/VocaSearchScreen";
import VocaListScreen from "./screens/VocaListScreen";
import MyPageScreen from "./screens/MyPageScreen";
import TodaySalaryScreen from "./screens/TodaySalaryScreen";
import TodayTrendQuizScreen from "./screens/TodayTrendQuizScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const tabScreensProps = [
  {
    screenName: "Home",
    title: "홈",
    iconTitle: "home",
    screen: HomeScreen,
  },
  {
    screenName: "VocabularySearch",
    title: "단어 검색",
    iconTitle: "search",
    screen: VocaSearchScreen,
  },
  {
    screenName: "VocabularyList",
    title: "단어장",
    iconTitle: "bookmark",
    screen: VocaListScreen,
  },
  {
    screenName: "MyPage",
    title: "마이페이지",
    iconTitle: "person",
    screen: MyPageScreen,
  },
];

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      {tabScreensProps.map((item) => (
        <BottomTab.Screen
          key={item.screenName}
          name={item.screenName}
          component={item.screen}
          options={{
            title: item.title,
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "400",
            },
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <Ionicons name={item.iconTitle} color={color} size={size} />
              ) : (
                <Ionicons
                  name={`${item.iconTitle}-outline`}
                  color={color}
                  size={size}
                ></Ionicons>
              ),
            tabBarActiveTintColor: "#313131",
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function handleLogIn() {
    setIsLoggedIn(true);
    console.log("버튼은 눌리고 있어요");
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  // if (isLoading) {
  //   return <SplashScreen />;
  // }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
        // screenOptions={{
        //   headerShown: false,
        // }}
        >
          {!isLoggedIn ? (
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {() => <SignInScreen onEnter={handleLogIn} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen
                name="BottomTab"
                component={BottomTabNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="TodaySalary"
                component={TodaySalaryScreen}
                options={{
                  title: "오늘의 샐러리 한조각 QUIZ",
                  headerShown: true,
                }}
              />
              <Stack.Screen
                name="TodayTrendQuiz"
                component={TodayTrendQuizScreen}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
