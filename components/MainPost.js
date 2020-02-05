import React from "react";
import { Image, Platform } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import constants from "../constants";
import SearchInput from "./SearchInput";

const Container = styled.View``;

const Card = styled.View`
  background-color: white;
`;

const HeaderHelloContainer = styled.View`
  margin-top: 40px;
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 18px;
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

const Bold = styled.Text`
  font-weight: 500;
`;
const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  padding: 10px;
  flex-direction: row;
`;
const IconContainer = styled.View``;

const MainPost = ({ user, location, files = [] }) => {
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
        />
        <IconContainer>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={require("../assets/RigIcon.svg")}
          />
        </IconContainer>
      </Card>

      <Container>
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
              style={{ width: constants.width, height: constants.height / 2.5 }}
              key={file.id}
              source={{ uri: file.url }}
            />
          ))}
        </Swiper>
      </Container>
    </>
  );
};

MainPost.propTypes = {
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
};

export default MainPost;
