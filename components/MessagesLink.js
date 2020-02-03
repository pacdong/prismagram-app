import React from "react";
import { Platform } from "react-native";
import styled from "styled-components";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import styles from "../styles";
import NavIcon from "./NavIcon";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("MessageNavigation")}>
    <FontAwesome
      name={Platform.OS === "ios" ? "paper-plane" : "paper-plane-o"}
      size={20}
    />
  </Container>
));
