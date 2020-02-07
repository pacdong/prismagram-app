import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props =>
    props.bgColor ? props.bgColor : props.theme.orangeColor};
  padding: 12px;
  margin-top: 60px;
  width: ${constants.width / 1.5};
  align-self: center;
  border-radius: 20px;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const EnterButton = ({ text, onPress, loading = false, bgColor = null }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

EnterButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default EnterButton;
