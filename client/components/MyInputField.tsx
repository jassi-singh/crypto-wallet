import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "../utils/colors";
import { MyInputFieldProps } from "../utils/interfaces";
import IconButton from "./IconButton";

const MyInputField = (props: MyInputFieldProps) => {
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <View style={{ justifyContent: "center" }}>
        {props.iconName && (
          <IconButton
            onPress={props.onIconPress!}
            iconName={props.iconName}
            size={20}
            color={Colors.primary}
            style={{ position: "absolute", zIndex: 1, right: 10 }}
          />
        )}
        <TextInput
          style={styles.input}
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
          selectionColor={Colors.primary}
          autoCapitalize="none"
          secureTextEntry={props.secureTextEntry}
          autoComplete="off"
        />
      </View>
    </View>
  );
};

export default MyInputField;

const styles = StyleSheet.create({
  input: {
    height: 55,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowOpacity: 0.05,
    shadowOffset: { height: 3, width: 3 },
    color: Colors.primary,
    letterSpacing: 2,
  },
  label: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
    margin: 16,
  },
});
