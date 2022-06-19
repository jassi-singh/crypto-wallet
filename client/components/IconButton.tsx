import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { IconButtonProps } from "../utils/interfaces";


const IconButton = (props: IconButtonProps) => {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <Icon name={props.iconName} size={props.size} color={props.color} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
