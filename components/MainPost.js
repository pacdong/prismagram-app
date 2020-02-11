import React, { useState } from "react";
import { Image, Platform } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import constants from "../constants";
import SearchInput from "./SearchInput";
import AnswerButton from "./AnswerButton";
import { withNavigation } from "react-navigation";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";
import styles from "../styles";

const Container = styled.View``;

const Card = styled.View`
  background-color: white;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 3px 3px 3px ${styles.darkGreyColor};
`;

const HeaderHelloContainer = styled.View`
  margin-top: 100px;
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 24px;
`;

const HederLogoContainer = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.Image`
  width: 24px;
  height: 44px;
`;

const Hello = styled.Text`
  font-weight: 800;
  font-size: 24px;
`;

const HelloUser = styled.Text`
  font-weight: 600;
  font-size: 24px;
`;

const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const RecentText = styled.Text`
  font-weight: 800;
  font-size: 24px;
  margin-left: 18px;
  margin-top: 20px;
`;

const PostContainer = styled.View`
  margin-top: 16px;
  margin-left: 18px;
`;

const PostCard = styled.View`
  background-color: white;
  box-shadow: 3px 3px 3px ${styles.darkGreyColor};
  width: ${constants.width / 1.5};
  height: ${constants.height / 3};
  margin-bottom: 28px;
  justify-content: center;
`;

const Bold = styled.Text`
  font-weight: 500;
`;
const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  margin-top: 26px;
  width: ${constants.width / 1.2};
  height: ${constants.height / 10};
  flex-direction: row;
  align-self: center;
  justify-content: space-between;
`;
const IconContainer = styled.View`
  width: ${constants.width / 6};
  height: ${constants.height / 16};
  justify-content: center;
  align-items: center;
`;

const IconText = styled.Text`
  font-weight: 800;
  font-size: 16px;
  opacity: 0.7;
`;

const MainPost = ({
  id,
  user,
  location,
  files = [],
  comments = [],
  navigation
}) => {
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    try {
      if (requestSecret) {
        Alert.alert("성공");
        navigation.navigate("Profile", { email: value });
        return;
      } else {
        Alert.alert("네트워크 상태를 확인하세요.");
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Card>
        <HeaderHelloContainer>
          <HederLogoContainer>
            <Container>
              <Hello>안녕하세요.</Hello>
              <HelloUser>{user.username}님</HelloUser>
            </Container>
            <LogoContainer
              resizeMode={"contain"}
              source={require("../assets/logo.png")}
            />
          </HederLogoContainer>
        </HeaderHelloContainer>
        <SearchInput
          text={"Search"}
          onPress={() => null}
          placeholder={"Search"}
          onChangeText={"onChange"}
        />
        <IconsContainer>
          <Touchable>
            <IconContainer>
              <Image
                style={{
                  widhth: constants.width / 7,
                  height: constants.width / 7
                }}
                source={require("../assets/RigIcon.png")}
              />
              <IconText>{"리깅"}</IconText>
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Image
                style={{
                  widhth: constants.width / 7,
                  height: constants.width / 7
                }}
                source={require("../assets/ScheduleIcon.png")}
              />
              <IconText>{"일정"}</IconText>
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Image
                style={{
                  widhth: constants.width / 7,
                  height: constants.width / 7
                }}
                source={require("../assets/LenchIcon.png")}
              />
              <IconText>{"정비"}</IconText>
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Image
                style={{
                  widhth: constants.width / 7,
                  height: constants.width / 7
                }}
                source={require("../assets/JobChangeIcon.png")}
              />
              <IconText>{"이직"}</IconText>
            </IconContainer>
          </Touchable>
        </IconsContainer>
      </Card>

      <RecentText>{"최근 올라온 글"}</RecentText>

      <Swiper
        showsPagination={false}
        style={{ height: constants.height / 2.5 }}
      >
        <PostContainer>
          <PostCard>
            <Header>
              <Touchable>
                <Image
                  style={{ height: 40, width: 40, borderRadius: 20 }}
                  source={{ uri: user.avatar }}
                />
              </Touchable>
              <Touchable>
                <HeaderUserContainer>
                  <Bold>{user.username}</Bold>
                  <Location>{location}</Location>
                </HeaderUserContainer>
              </Touchable>
            </Header>
            <Swiper
              showsPagination={false}
              style={{ height: constants.height / 2.5 }}
            >
              {files.map(file => (
                <Image
                  style={{
                    width: constants.width / 1.7,
                    height: constants.height / 5
                  }}
                  key={file.id}
                  source={{ uri: file.url }}
                />
              ))}
            </Swiper>
            <Touchable>
              <AnswerButton
                text="답변하기"
                loading={loading}
                onPress={handleLogin}
              />
            </Touchable>
          </PostCard>
        </PostContainer>
      </Swiper>
    </>
  );
};

MainPost.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string.isRequired,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired,
      files: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        })
      ).isRequired,
      likeCount: PropTypes.number.isRequired,
      isLiked: PropTypes.bool.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired
          }).isRequired
        })
      ).isRequired,
      caption: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired
    })
  )
};

export default withNavigation(MainPost);
