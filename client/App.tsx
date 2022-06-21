import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Homescreen/HomeScreen";
import { store } from "./redux/store";
import Startup from "./screens/Startup/Startup";
import CreateAccount from "./screens/Startup/CreateAccount";
import { RootStackParamList } from "./utils/interfaces";
import ConfirmSeedPhrase from "./screens/Startup/ConfirmSeedPhrase";
import EncryptWallet from "./screens/Startup/EncryptWallet";
import LoginScreen from "./screens/Startup/LoginScreen";
import SplashScreen from "./screens/Splash/SplashScreen";
export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="SplashScreen"
          >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Startup" component={Startup} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen
              name="ConfirmSeedPhrase"
              component={ConfirmSeedPhrase}
            />
            <Stack.Screen name="EncryptWallet" component={EncryptWallet} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
