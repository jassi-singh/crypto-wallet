import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

interface IconButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  iconName: string;
  size: number;
  color: string;
  style?: any;
}

const IconButton = (props: IconButtonProps) => {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <Icon name={props.iconName} size={props.size} color={props.color} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
