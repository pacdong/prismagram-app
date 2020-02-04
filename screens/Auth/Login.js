import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN_CODE } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  const phoneNumberInput = useInput(navigation.getParam("phoneNumber", ""));
  const [loading, setLoading] = useState(false);
  const [requestSecretCodeMutation] = useMutation(LOG_IN_CODE, {
    variables: {
      phoneNumber: phoneNumberInput.value
    }
  });
  const handleLogin = async () => {
    let { value } = phoneNumberInput;
    const phoneRegex = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;
    if (value === "") {
      return Alert.alert("휴대폰 번호를 입력하세요.");
    } else if (!phoneRegex.test(value)) {
      return Alert.alert("핸드폰 번호가 올바르지 않습니다.");
    }
    try {
      setLoading(true);
      value = value.replace(/-/g, "");
      const {
        data: { requestSecretCode }
      } = await requestSecretCodeMutation();
      if (requestSecretCode) {
        Alert.alert("문자함을 확인하세요.");
        navigation.navigate("Confirm", { phoneNumber: value });
        return;
      } else {
        Alert.alert("로그인 할 수 없습니다.");
        navigation.navigate("Signup", { phoneNumber: value });
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        {/* <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        /> */}
        <AuthInput
          {...phoneNumberInput}
          placeholder="휴대폰 번호"
          keyboardType="phone-pad"
          returnKeyType="done"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleLogin} text="Log In" />
      </View>
    </TouchableWithoutFeedback>
  );
};
