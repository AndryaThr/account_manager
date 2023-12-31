import React, { createContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import Navigation from "./Navigation";
import theme from "../constants/colors";
import { isColorDark } from "../utils/functions.colors";
import LoadingModal from "../components/modals/LoadingModal";
import { AppBarContext } from "./context";

const AppWrapper = () => {
  const [color, setColor] = useState<string>(theme.purple);
  const [barType, setBarType] = useState<
    "auto" | "dark" | "inverted" | "light"
  >("auto");

  useEffect(() => {
    if (isColorDark(color)) {
      setBarType("light");
    } else {
      setBarType("dark");
    }
  }, [color]);

  return (
    <AppBarContext.Provider value={{ color, setColor }}>
      <Navigation />
      <StatusBar style={barType} backgroundColor={color} />

      {/* {loadingState && <LoadingModal visible={loadingState} />} */}
    </AppBarContext.Provider>
  );
};

export default AppWrapper;
