import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

import "./src/config/i18next/i18n";
import theme from "./src/constants/colors";
import AppWrapper from "./src/main/AppWrapper";
import { Provider, useSelector } from "react-redux";
import ExtendedStyleSheet from "./src/components/styles/ExtendedStyleSheet";
import {
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
} from "@expo-google-fonts/montserrat";
import React from "react";
import Database from "./src/controller/database/Database";
import store from "./src/config/redux";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Loader from "./src/components/loader/Loader";
import { Alert } from "react-native";

export default function App() {
  const [appReady, setAppReady] = React.useState(false);
  const [fontsLoaded] = useFonts({
    MontserratThin: Montserrat_100Thin,
    MontserratItalicThin: Montserrat_100Thin_Italic,
    MontserratLight: Montserrat_300Light,
    MontserratItalicLight: Montserrat_300Light_Italic,
    MontserratRegular: Montserrat_400Regular,
    MontserratItalicRegular: Montserrat_400Regular_Italic,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratItalicSemiBold: Montserrat_600SemiBold_Italic,
    MontserraBold: Montserrat_700Bold,
    MontserraItalicBold: Montserrat_700Bold_Italic,
  });

  const initDatabase = React.useCallback(async () => {
    let db = Database.getInstance();

    try {
      await db.init();
    } catch (err: any) {
      throw err;
    }
  }, []);

  React.useEffect(() => {
    initDatabase()
      .then(() => {
        console.log("> Database OK ...");
        setAppReady(true);
      })
      .catch((err: any) => {
        Alert.alert(err.message, err + "\n" + JSON.stringify(err, null, 4));
      });
  }, []);

  if (!fontsLoaded || !appReady) {
    return <Loader color="#FF5733" />;
  }

  return (
    <GestureHandlerRootView
      style={{
        ...ExtendedStyleSheet.defaultStyles.flex_1,
      }}
    >
      <SafeAreaView style={styles.container}>
        <BottomSheetModalProvider>
          <Provider store={store}>
            <AppWrapper />
          </Provider>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = ExtendedStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
});
