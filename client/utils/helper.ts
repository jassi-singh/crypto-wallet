import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { Platform, Alert, ToastAndroid } from "react-native";

export default class Helpers {
  static createRandomWallet = async () => {

  }
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

  static storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      throw e;
    }
  };

  static getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      // error reading value
      throw e;
    }
  };
}
