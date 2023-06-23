import CryptoJS from "react-native-crypto-js";

const generateEncryptionKey = (length: number = 32) => {
  const key = CryptoJS.lib.WordArray.random(length).toString();
  return key;
};

const encryptString = (str: string, key: string) => {
  const encrypted = CryptoJS.AES.encrypt(str, key).toString();
  return encrypted;
};

const decryptString = (str: string, key: string) => {
  const encrypted = CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
  return encrypted;
};

export { generateEncryptionKey, encryptString, decryptString };
