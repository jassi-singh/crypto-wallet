import { FlatList, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import SeedPhraseComponent from "../../components/SeedPhraseComp";
import { RootStackParamList } from "../../utils/interfaces";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../components/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IconButton from "../../components/IconButton";
import { useDispatch } from "react-redux";

import { ethers } from "ethers";

const ConfirmSeedPhrase = () => {
  const [sortedSeedPhrase, setSortedSeedPhrase] = useState<Array<string>>([]);
  const route = useRoute<RouteProp<RootStackParamList, "ConfirmSeedPhrase">>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const seedPhrase = route.params.seedPhrase;
  const dispatch = useDispatch();

  const addToPhrase = (phrase: string) => {
    setSortedSeedPhrase([...sortedSeedPhrase, phrase]);
  };

  const confirmSeedPhrase = () => {
    const mnemonic = sortedSeedPhrase.toString().replaceAll(",", " ");
    if (mnemonic === seedPhrase) {
      const wallet = ethers.Wallet.fromMnemonic(mnemonic);
      console.log("Wallet Address 🔤: ", wallet.address);
      navigation.popToTop();
      navigation.replace("EncryptWallet");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        size={24}
        color={Colors.primary}
        iconName="arrow-back-ios"
        onPress={() => navigation.goBack()}
        style={{ marginBottom: 20 }}
      />
      <Text style={styles.heading}>Confirm Your{"\n"}Seed Phrase</Text>
      <Text style={styles.subHeading}>
        Please enter your the missing words to makesure you’ve stored your seed
        phrase correctly. You cannot recover your account without it.
      </Text>
      <FlatList
        data={Array.from(Array(12).keys())}
        scrollEnabled={false}
        numColumns={3}
        renderItem={({ item, index }) => (
          <SeedPhraseComponent
            text={sortedSeedPhrase[item]}
            index={index + 1}
            onPress={
              !sortedSeedPhrase[item]
                ? undefined
                : () =>
                    setSortedSeedPhrase(
                      sortedSeedPhrase.filter(
                        (i) => i !== sortedSeedPhrase[item]
                      )
                    )
            }
          />
        )}
      />
      <FlatList
        data={seedPhrase.split(" ").sort()}
        scrollEnabled={false}
        numColumns={3}
        renderItem={({ item }) => (
          <SeedPhraseComponent
            onPress={
              sortedSeedPhrase.includes(item)
                ? undefined
                : () => addToPhrase(item)
            }
            text={item}
            used={sortedSeedPhrase.includes(item)}
          />
        )}
      />
      <Button
        title="Confirm Seed Phrase"
        textStyle={styles.buttonText}
        buttonStyles={styles.button}
        disabled={sortedSeedPhrase.length !== 12}
        onPress={() => confirmSeedPhrase()}
      />
    </SafeAreaView>
  );
};

export default ConfirmSeedPhrase;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  subHeading: {
    color: Colors.primaryLight,
    fontWeight: "600",
    paddingBottom: 40,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "600",
  },
  button: {
    backgroundColor: Colors.primary,
  },
});
