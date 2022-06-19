import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ReactElement } from "react";
import { Colors } from "../constants/colors";
import { ListItemProps } from "../utils/interfaces";


const ListItem = (props: ListItemProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.list}>
      <View>{props.leading}</View>
      <View style={styles.body}>{props.body}</View>
      <View>{props.trailing}</View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  list: {
    display: "flex",
    flexDirection: "row",
    padding: 30,
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: Colors.primaryLight,
  },
  body: {
    flexGrow: 1,
  },
});
