import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../utils/colors";
import { SeedPhraseInput } from "../utils/interfaces";

const SeedPhraseComponent = (props: SeedPhraseInput) => {
  return (
    <View style={{ margin: 10, flex: 1, opacity: props.used ? 0.5 : 1 }}>
      <TouchableOpacity
        disabled={props.onPress === undefined}
        onPress={props.onPress}
        style={styles.container}
      >
        <Text style={styles.text}>
          {props.index}
          {props.index === undefined ? "" : "."} {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeedPhraseComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    shadowOpacity: 0.1,
    shadowOffset: { height: 3, width: 3 },
    backgroundColor: Colors.white,
  },
  text: {
    color: Colors.primaryDark,
  },
});
