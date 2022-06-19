import * as Clipboard from "expo-clipboard";
import { Platform, Alert, ToastAndroid } from "react-native";

export default class Helpers {
  static copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text)
      .then(() => {
        if (Platform.OS === "android") {
          ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
        } else {
          Alert.alert("Copied to clipboard");
        }
      })
      .catch(() => {
        if (Platform.OS === "android") {
          ToastAndroid.show("Error in copying", ToastAndroid.SHORT);
        } else {
          Alert.alert("Error in copying");
        }
      });
  };
}
