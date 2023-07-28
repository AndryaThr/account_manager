import { NumberBetweenZeroAndFifteen } from "../controller/types";

const removeSpaceAtEnd = (input: string) => {
  if (input.endsWith(" ")) {
    return input.slice(0, -1);
  }
  return input;
};

const validateUsername = (username?: any) => {
  if (typeof username !== "string") {
    return false;
  }

  const minLength = 4;
  const maxLength = 20; //  || username.length > maxLength
  const allowedCharacters = /^[a-zA-Z0-9_.-]+$/;

  if (!username || username.length < minLength) {
    return false;
  }

  if (!allowedCharacters.test(username)) {
    return false;
  }

  // Additional checks, if needed
  // ...

  return true;
};

const validateEmail = (email?: any) => {
  if (!email) return false;
  if (typeof email !== "string") {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const getFolderId = (folder: string): NumberBetweenZeroAndFifteen => {
  let num = parseInt(folder);

  if (num >= 0 && num <= 15) {
    return num as NumberBetweenZeroAndFifteen;
  } else {
    console.log(num);

    throw new Error("Folder name is invalid");
  }
};

const getFolderFromId = (cat_id?: number): string | undefined => {
  if (cat_id === undefined) {
    return undefined;
  }

  return cat_id.toString().padStart(2, "0");
};

const formatPhoneNumber = (phoneNumber: string) => {
  // Remove all non-numeric characters from the phone number
  const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

  // Apply the desired pattern to the numeric phone number
  const formattedPhoneNumber = numericPhoneNumber.replace(
    /^(\d{3})(\d{2})(\d{3})(\d{2})$/,
    "$1 $2 $3 $4"
  );

  return formattedPhoneNumber;
};

function formatDateToISOString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDateToString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
}

function generateRandomAlphaNumericString(
  length: number = 16,
  dict: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
) {
  if (typeof length !== "number") {
    throw new Error(
      "Type of argument must be number: generateRandomAlphaNumericString"
    );
  }

  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * dict.length);
    result += dict[randomIndex];
  }

  return result;
}

export {
  removeSpaceAtEnd,
  validateUsername,
  validateEmail,
  getFolderId,
  getFolderFromId,
  formatPhoneNumber,
  formatDateToISOString,
  formatDateToString,
  generateRandomAlphaNumericString,
};
