import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement } from "react";
import { Colors } from "../constants/colors";

interface ListItemTokenProps {
  title: string;
  subtitle: string;
  icon?: string;
}

const ListItemToken = (props: ListItemTokenProps) => {
  return (
    <View style={styles.list}>
      <View style={styles.icon}>
        <Text>{props.icon}</Text>
      </View>
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}> {props.subtitle}</Text>
      </View>
    </View>
  );
};

export default ListItemToken;

const styles = StyleSheet.create({
  list: {
    display: "flex",
    flexDirection: "row",
    padding: 30,
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: Colors.primaryLight,
  },
  icon: {
    marginRight: 30,
    height: 35,
    width: 35,
    borderRadius: 100,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.primaryDark,
    fontWeight: "600",
    fontSize: 16,
  },
  subtitle: {
    color: Colors.primaryLight,
  },
});
