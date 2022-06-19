import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/interfaces";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Startup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Metamask Mobile</Text>
      <View style={{ marginTop: 50 }} />
      <Button
        title="Create Account"
        buttonStyles={styles.button}
        textStyle={styles.buttonText}
        onPress={() => navigation.navigate("CreateAccount")}
      />
      <Button
        title="Sign  In"
        buttonStyles={styles.otherButton}
        textStyle={styles.otherButtonText}
        onPress={() => navigation.navigate("CreateAccount")}
      />
    </View>
  );
};

export default Startup;

const styles = StyleSheet.create({
  center: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  text: {
    fontSize: 30,
    color: Colors.primary,
    fontWeight: "bold",
  },
  otherButtonText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  otherButton: {
    borderWidth: 0.2,
    borderColor: Colors.primary,
    shadowColor: Colors.white,
    width: 250,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "600",
  },
  button: {
    backgroundColor: Colors.primary,
    width: 250,
  },
});
