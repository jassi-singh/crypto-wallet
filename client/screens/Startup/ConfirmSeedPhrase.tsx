import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import SeedPhraseComponent from "../../components/SeedPhraseComp";
import {
  ConfirmSeedPhraseParams,
  RootStackParamList,
} from "../../utils/interfaces";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../components/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconButton from "../../components/IconButton";

const ConfirmSeedPhrase = () => {
  const [sortedSeedPhrase, setSortedSeedPhrase] = useState<Array<string>>([]);
  const params = useRoute<RouteProp<RootStackParamList>>().params;
  const seedPhrase = params!.seedPhrase.split(" ").sort();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const addToPhrase = (phrase: string) => {
    setSortedSeedPhrase([...sortedSeedPhrase, phrase]);
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
        data={seedPhrase}
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
        onPress={() => {
          navigation.popToTop();
          navigation.replace("Home");
        }}
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
