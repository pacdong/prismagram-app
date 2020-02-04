import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
`;

const GoogleContainer = styled.View`
  margin-top: 12px;
`;

const KakaoContainer = styled.View`
  margin-top: 12px;
`;

const NaverContainer = styled.View`
  margin-top: 12px;
`;

export default ({ navigation }) => {
  const fNameInput = useInput("");
  const PhoneNumberInput = useInput("");
  const emailInput = useInput(navigation.getParam("email", ""));
  const usernameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: PhoneNumberInput.value
    }
  });
  const handleSingup = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = PhoneNumberInput;
    const { value: username } = usernameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PhoneRegex = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("E-mail 주소가 올바르지 않습니다.");
    }
    if (!PhoneRegex.test(lName)) {
      // lName => Phone Number
      return Alert.alert("전화번호가 올바르지 않습니다.");
    }
    if (fName === "") {
      return Alert.alert("사용자 이름이 필요합니다.");
    }
    if (username === "") {
      return Alert.alert("사용할 수 없는 닉네임입니다.");
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
  const fbLogin = async () => {
    try {
      setLoading(true);
      await Facebook.initializeAsync("500056660887060");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        const { email, first_name, last_name } = await response.json();
        updateFormData(email, first_name, last_name);
        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  const googleLogin = async () => {
    const GOOGLE_ID =
      "864976975593-6ob0n7f1h3tbc19ajtr8d7aohn2bqakt.apps.googleusercontent.com";
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId: GOOGLE_ID,
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.accessToken}` }
        });
        const { email, family_name, given_name } = await user.json();
        updateFormData(email, given_name, family_name);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (email, firstName) => {
    emailInput.setValue(email);
    fNameInput.setValue(firstName);
    const [username] = email.split("@");
    usernameInput.setValue(username);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="사용자 이름"
          autoCapitalize="words"
        />
        <AuthInput
          {...PhoneNumberInput}
          placeholder="전화번호"
          keyboardType="phone-pad"
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="E-mail"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...usernameInput}
          placeholder="별명"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleSingup} text="Sign up" />
        <FBContainer>
          <AuthButton
            bgColor={"#2D4DA7"}
            loading={false}
            onPress={fbLogin}
            text="Connect Facebook"
          />
        </FBContainer>
        <GoogleContainer>
          <AuthButton
            bgColor={"#EE1922"}
            loading={false}
            onPress={googleLogin}
            text="Connect Google"
          />
        </GoogleContainer>
        {/* 카카오톡 / 네이버 로그인 버튼 */}
        {/* <KakaoContainer>
          <AuthButton
            bgColor={"#FFCD00"}
            loading={false}
            text="Connect KakaoTalk"
          />
        </KakaoContainer>
        <NaverContainer>
          <AuthButton
            bgColor={"#00C63B"}
            loading={false}
            text="Connect Naver"
          />
        </NaverContainer> */}
      </View>
    </TouchableWithoutFeedback>
  );
};
