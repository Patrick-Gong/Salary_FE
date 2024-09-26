import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import VocaSearchScreen from './screens/VocaSearchScreen';
import VocaListScreen from './screens/VocaListScreen';
import MyPageScreen from './screens/MyPageScreen';
import TodaySalaryScreen from './screens/TodaySalaryScreen';
import TodayTrendQuizScreen from './screens/TodayTrendQuizScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="VocabularySearch"
        component={VocaSearchScreen}
        options={{
          title: '단어 검색',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="VocabularyList"
        component={VocaListScreen}
        options={{
          title: '단어장',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          title: '마이페이지',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogIn() {
    setIsLoggedIn(true);
    console.log('버튼은 눌리고 있어요');
  }

  return (
    <>
      <StatusBar style='auto'/>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLoggedIn ? (
            <Stack.Screen name="SignIn">
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
                  headerShown: false,
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
