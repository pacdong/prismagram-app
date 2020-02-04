import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, LOG_IN_CODE } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  const PhoneNumberInput = useInput(navigation.getParam("phoneNumber", ""));
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN_CODE, {
    variables: {
      phoneNumber: PhoneNumberInput.value
    }
  });
  const handleLogin = async () => {
    const { value } = PhoneNumberInput;
    const PhoneRegex = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;
    if (value === "") {
      return Alert.alert("휴대폰 번호를 입력하세요.");
    } else if (!PhoneRegex.test(value)) {
      return Alert.alert("핸드폰 번호가 올바르지 않습니다.");
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret }
      } = await requestSecretMutation();
      if (requestSecret) {
        await requestSecretMutation();
        Alert.alert("문자함을 확인하세요.");
        navigation.navigate("Confirm", { email: value });
        return;
      } else {
        Alert.alert("Can't log in now");
        navigation.navigate("Signup", { email: value });
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
          {...PhoneNumberInput}
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
