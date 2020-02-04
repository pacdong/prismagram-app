// Custumize

import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CONFIRM_SECRET_CODE } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  const confirmInput = useInput("");
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const [confirmSecretCodeMutation] = useMutation(CONFIRM_SECRET_CODE, {
    variables: {
      secretCode: confirmInput.value,
      phoneNumber: navigation.getParam("phoneNumber")
    }
  });
  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || value.includes(" ")) {
      return Alert.alert("Invalid secret");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecretCode }
      } = await confirmSecretCodeMutation();
      if (confirmSecretCode !== "" || confirmSecretCode !== false) {
        logIn(confirmSecretCode);
      } else {
        Alert.alert("잘못된 코드입니다.");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("로그인할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleConfirm} text="Confirm" />
      </View>
    </TouchableWithoutFeedback>
  );
};
