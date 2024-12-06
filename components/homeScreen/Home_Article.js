import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import ellipse_done from "../../common/homeScreen/ellipse_done.png";
import ellipse_yet from "../../common/homeScreen/ellipse_yet.png";
import Home_Article_List from "./Home_Article_List";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  todayArticleSelector,
  todayAttendanceDetail,
} from "../../Recoil/todayAttendanceDetail";
import { todayAttendanceState } from "../../Recoil/todayAttendanceState";
import axios from "axios";
import { BASE_URL } from "@env";
import { authToken } from "../../Recoil/authToken";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  height: 100%;
  margin: 28px;
  gap: 16px;

  margin-top: 20px;
  border-radius: 20px;
`;

const DesriptContainer = styled.View`
  flex: 1;
  flex-direction: column;
  gap: 8px;
`;

const TitleContainer = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const Title = styled(fonts.H5)`
  color: ${colors.Grayscale_100};
`;

const TitleDescript = styled(fonts.Caption2)`
  color: ${colors.Grayscale_80};
`;

const DoneMarker = styled.Image`
  width: 13px;
  height: 13px;
  object-fit: cover;
`;

function Home_Article() {
  // token 추가
  const token = useRecoilValue(authToken);

  // detailState 관리
  const articleState = useRecoilValue(todayArticleSelector);
  const setArticleState = useSetRecoilState(todayArticleSelector);

  // attendanceState 관리
  const [attendaceState, setAttendanceState] =
    useRecoilState(todayAttendanceState);

  async function postAritcleAttendance() {
    try {
      const res = await axios.post(
        `${BASE_URL}/shorts/update-status?article=true`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("뉴스 학습 완료 api post", res.data.status);
      const resSeed = await axios.patch(
        `${BASE_URL}/seed/update`,
        {
          seed_earned: 5,
          seed_used: 0,
        },
        { headers: { Authorization: token } }
      );
      console.log("시드 patch", resSeed.data.status);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  function handleDoneTodayArticle() {
    if (postAritcleAttendance() && !articleState) {
      setArticleState(true); // 전역 상태
      setAttendanceState((prev) => prev + 1);
    }
  }

  return (
    <Container articleState={articleState}>
      <DesriptContainer>
        <TitleContainer>
          <DoneMarker
            source={articleState ? ellipse_done : ellipse_yet}
          ></DoneMarker>
          <Title>뉴스</Title>
        </TitleContainer>
        <TitleDescript>
          {articleState
            ? "내일 새로운 아티클이 업데이트 될 예정이에요!"
            : "오늘 핫한 아티클 읽고 추가 시드 받아가기"}
        </TitleDescript>
      </DesriptContainer>
      <Home_Article_List handleDoneTodayArticle={handleDoneTodayArticle} />
    </Container>
  );
}

export default Home_Article;
