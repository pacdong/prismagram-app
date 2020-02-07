import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 24px;
  align-items: center;
`;

const TextInput = styled.TextInput`
  width: ${constants.width - 40};
  padding: 10px 0px;
  border-bottom-color: ${props => props.theme.darkGreyColor};
  border-bottom-width: 0.5px;
  font-size: 16px;
`;

const DataInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  returnKeyType = "done",
  onChange,
  onSubmitEditing = () => null,
  autoCorrect = true
}) => (
  <Container>
    <TextInput
      onChangeText={onChange}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
      value={value}
    />
  </Container>
);

DataInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool
};

export default DataInput;
