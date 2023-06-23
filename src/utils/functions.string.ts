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
  const maxLength = 20;
  const allowedCharacters = /^[a-zA-Z0-9_.-]+$/;

  if (!username || username.length < minLength || username.length > maxLength) {
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

export {
  removeSpaceAtEnd,
  validateUsername,
  validateEmail,
  getFolderId,
  getFolderFromId,
  formatPhoneNumber,
};
