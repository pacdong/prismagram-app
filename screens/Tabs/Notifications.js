import React, { useState } from "react";
import { Image, Platform } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import styles from "../../styles";
import DataInput from "../../components/DataInput";
import EnterButton from "../../components/EnterButton";
import useInput from "../../hooks/useInput";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View``;

const HeaderHelloContainer = styled.View`
  margin-top: 60px;
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 48px;
`;

const HederLogoContainer = styled.View`
  padding: 15px;
  flex-direction: row;
`;

const LogoContainer = styled.Image`
  width: 24px;
  height: 44px;
  align-self: center;
`;

const TextContatiner = styled.View`
  margin-left: 16px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 24px;
`;

const ExplainContainer = styled.View`
  margin-top: 40px;
`;

const ExplainTextContainer = styled.View`
  flex-direction: row;
`;

const ExplainTextHeader = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ExplainText = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.theme.darkGreyColor};
`;
const ExplainStringText = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.theme.orangeColor};
`;

const Notification = ({ navigation }) => {
  const workDistance = useInput("");
  const workHeight = useInput("");
  const workWeight = useInput("");
  const [loading, setLoading] = useState(false);
  // Rig Query 날리기
  // const [createCaculationMutation] = useMutation(Caculation, {
  //   variables: {
  //     username: usernameInput.value,
  //     email: emailInput.value,
  //     firstName: fNameInput.value,
  //     lastName: lNameInput.value
  //   }
  // });
  const handleRigIn = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: username } = usernameInput;
    const numberRegex = "^[0-9]*$";
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (fName === "") {
      return Alert.alert("I need your name");
    }
    if (username === "") {
      return Alert.alert("Invalid username");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Username taken.", "Log in instead");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderHelloContainer>
        <HederLogoContainer>
          <LogoContainer
            resizeMode={"contain"}
            source={require("../../assets/logo.png")}
          />
          <TextContatiner>
            <Container>
              <Text>손쉬운</Text>
              <Text>크레인 리깅 프로그램</Text>
            </Container>
          </TextContatiner>
        </HederLogoContainer>
        <ExplainContainer>
          <ExplainTextHeader>계산하기</ExplainTextHeader>
          <ExplainTextContainer>
            <ExplainText>작업에 필요한 </ExplainText>
            <ExplainStringText>정보를 입력</ExplainStringText>
            <ExplainText>하고</ExplainText>
          </ExplainTextContainer>
          <ExplainText>입력 버튼을 누르세요.</ExplainText>
        </ExplainContainer>
      </HeaderHelloContainer>
      <DataInput placeholder="작업 거리 입력" returnKeyType="next" />
      <DataInput placeholder="작업 높이 입력" returnKeyType="next" />
      <DataInput placeholder="작업 중량 입력" returnKeyType="done" />
      <EnterButton text="입력" onPress={() => navigation.navigate("RigHome")} />
    </>
  );
};

Notification.propTypes = {};

export default withNavigation(Notification);
