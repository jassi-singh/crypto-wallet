import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import SeedPhraseComponent from "../../components/SeedPhraseComp";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/interfaces";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Helpers from "../../utils/helper";
import IconButton from "../../components/IconButton";

const CreateAccount = () => {
  const seedPhrase =
    "orb afghan lastly rife playmate needy sparkle calender passer quaggy sienna potency";
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        size={24}
        color={Colors.primary}
        iconName="arrow-back-ios"
        onPress={() => navigation.goBack()}
        style={{ marginBottom: 20 }}
      />
      <Text style={styles.heading}>Save your seed phrase</Text>
      <Text style={styles.subHeading}>
        This seed phrase allows you to recover your account. Write down the
        twelve word phrase below and keep it in a safe place.
      </Text>
      <Text style={[styles.heading, styles.heading2]}>Seed Phrase</Text>
      <FlatList
        data={seedPhrase.split(" ")}
        scrollEnabled={false}
        numColumns={3}
        renderItem={({ item, index }) => (
          <SeedPhraseComponent text={item} index={index + 1} />
        )}
        ListFooterComponent={() => (
          <Button
            title="Copy Seed Phrase"
            textStyle={styles.otherButtonText}
            buttonStyles={styles.otherButton}
            onPress={async () => await Helpers.copyToClipboard(seedPhrase)}
          />
        )}
      />

      <Button
        title="Next"
        textStyle={styles.buttonText}
        buttonStyles={styles.button}
        onPress={() =>
          navigation.replace("ConfirmSeedPhrase", {
            seedPhrase: seedPhrase,
          })
        }
      />
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: Colors.white,
  },
  heading: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "700",
    paddingBottom: 20,
  },
  heading2: {
    fontSize: 16,
  },
  subHeading: {
    color: Colors.primaryLight,
    fontWeight: "600",
    paddingBottom: 40,
  },
  otherButtonText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  otherButton: {
    borderWidth: 0.2,
    borderColor: Colors.primary,
    shadowColor: Colors.white,
    flex: 1,
    marginTop: 60,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "600",
  },
  button: {
    backgroundColor: Colors.primary,
  },
});
