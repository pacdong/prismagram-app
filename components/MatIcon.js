import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";

const MatIcon = ({
  focused = true,
  name,
  color = styles.blackColor,
  size = 30
}) => (
  <MaterialCommunityIcons
    name={name}
    color={focused ? color : styles.darkGreyColor}
    size={size}
  />
);

MatIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool
};

export default MatIcon;
