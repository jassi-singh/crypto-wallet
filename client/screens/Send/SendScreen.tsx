import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ScreenTemplate from "../../components/ScreenTemplate";

const SendScreen = () => {
  return (
    <ScreenTemplate>
      <ScrollView>
        <Text>Send</Text>
      </ScrollView>
    </ScreenTemplate>
  );
};

export default SendScreen;

const styles = StyleSheet.create({});
