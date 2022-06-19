import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ButtonProps } from "../utils/interfaces";

const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[
        props.buttonStyles,
        styles.button,
        { opacity: props.disabled ? 0.5 : 1 },
      ]}
      onPress={props.onPress}
    >
      <Text style={[props.textStyle, styles.text]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 16,
    margin: 24,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});
