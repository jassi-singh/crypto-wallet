import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "./redux/store";
import Startup from "./screens/Startup/Startup";
import CreateAccount from "./screens/Startup/CreateAccount";
import { RootStackParamList } from "./utils/interfaces";
import ConfirmSeedPhrase from "./screens/Startup/ConfirmSeedPhrase";
import EncryptWallet from "./screens/Startup/EncryptWallet";
import LoginScreen from "./screens/Startup/LoginScreen";
import SplashScreen from "./screens/Splash/SplashScreen";
import SendScreen from "./screens/Send/SendScreen";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";


export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator
            screenOptions={{ header: Header }}
            initialRouteName="SplashScreen"
          >
            <Stack.Screen
              options={{ header: () => null }}
              name="SplashScreen"
              component={SplashScreen}
            />
            <Stack.Screen
              options={{ header: () => null }}
              name="Startup"
              component={Startup}
            />
            <Stack.Screen
              options={{ header: () => null }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ header: () => null }}
              name="CreateAccount"
              component={CreateAccount}
            />
            <Stack.Screen
              options={{ header: () => null }}
              name="ConfirmSeedPhrase"
              component={ConfirmSeedPhrase}
            />
            <Stack.Screen
              options={{ header: () => null }}
              name="EncryptWallet"
              component={EncryptWallet}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SendScreen" component={SendScreen} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
