import { createContext } from "react";
import theme from "../constants/colors";
import { TypeAppBarContext } from "./types";

const AppBarContext: React.Context<TypeAppBarContext> = createContext({
  color: theme.purple,
  setColor: () => {},
});

export { AppBarContext };
