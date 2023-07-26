import { createContext } from "react";

const VerificationContext: React.Context<any> = createContext(() => {});
const VerificationValueContext: React.Context<boolean> = createContext(false);

export { VerificationContext, VerificationValueContext };
