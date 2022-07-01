import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { Platform, Alert, ToastAndroid } from "react-native";

export default class Helpers {
  static copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text)
      .then(() => {
        this.showAlertToast("Copied to clipboard");
      })
      .catch(() => {
        this.showAlertToast("Error in copying");
      });
  };

  static getCopyText = async () => {
    return Clipboard.getStringAsync()
      .then((text) => {
        console.log(text);
        return text;
      })
      .catch((e) => {
        console.log(e);
        return "";
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

  static showAlertToast = (msg: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  static stringToColor = (str: string) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = "#";
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  };
}
