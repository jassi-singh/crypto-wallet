import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ScreenTemplate from "../../components/ScreenTemplate";
import MyInputField from "../../components/MyInputField";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../constants/colors";
import BottomButtons from "../../components/BottomButtons";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/interfaces";
import IconButton from "../../components/IconButton";
import Helpers from "../../utils/helper";

const SendScreen = () => {
  const [recieverAddress, setRecieverAddress] = useState<string>("0x2e5F72f15D2De5034c1171E1df7f90e1eA573d31");
  const [amount, setAmount] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const pasteButton = () => {
    return (
      <IconButton
        iconName="content-paste"
        onPress={async () => {
          const copyText = await Helpers.getCopyText();
          console.log(copyText);
          setRecieverAddress(copyText);
        }}
        size={20}
        color={Colors.primary}
      />
    );
  };

  return (
    <ScreenTemplate>
      <ScrollView style={styles.container}>
        <MyInputField
          label={"Send To"}
          value={recieverAddress}
          onChangeText={setRecieverAddress}
          placeholder={"Reciever Address"}
          // trailing={pasteButton()}
        />
        <View>
          <Text style={styles.label}>Asset</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => console.log(value)}
            items={[
              { label: "Football", value: "football" },
              { label: "Baseball", value: "baseball" },
              { label: "Hockey", value: "hockey" },
            ]}
            Icon={() => {
              return (
                <Icon
                  style={{ marginTop: 10, marginRight: 10 }}
                  color={Colors.primary}
                  name="keyboard-arrow-down"
                  size={32}
                />
              );
            }}
          />
        </View>
        <MyInputField
          label={"Amount"}
          value={amount}
          onChangeText={setAmount}
          placeholder={"0.00"}
        />

        {/* <View>
          <Text style={styles.label}>Transaction Fees</Text>
          <View>

          </View>
        </View> */}
      </ScrollView>
      <BottomButtons>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title="Back"
          buttonStyles={styles.buttonSecondary}
          textStyle={styles.textSecondary}
        />
        <Button
          onPress={() => {
            navigation.replace("SendConfirmation", { recieverAddress, amount });
          }}
          title="Next"
          buttonStyles={styles.buttonPrimary}
          textStyle={styles.textPrimary}
        />
      </BottomButtons>
    </ScreenTemplate>
  );
};

export default SendScreen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 30, backgroundColor: Colors.white },
  label: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
    margin: 16,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    flexGrow: 1,
  },
  buttonSecondary: {
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  textPrimary: {
    color: Colors.white,
  },
  textSecondary: {
    color: Colors.primary,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 55,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowOpacity: 0.1,
    shadowOffset: { height: 3, width: 3 },
    shadowRadius: 5,
    color: Colors.primary,
    letterSpacing: 2,
  },
  inputAndroid: {
    height: 55,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowOpacity: 0.1,
    shadowOffset: { height: 3, width: 3 },
    shadowRadius: 5,
    color: Colors.primary,
    letterSpacing: 2,
  },
});
