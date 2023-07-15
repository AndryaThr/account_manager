import User from "../database/User";
import { decryptString } from "../../config/crypto/crypto";

type ResponseType = {
  success: boolean;
  message?: string;
  data?: any;
};

export class Auth {
  static async authUser(
    username: string,
    password: string
  ): Promise<ResponseType> {
    const user = await User.readOne(username);

    // verify if user exists
    if (!user) {
      return {
        success: false,
      };
    }

    // verify password
    const decryptedPassword = decryptString(
      user.user_password,
      user.user_private_key
    );
    if (decryptedPassword === password) {
      return {
        success: true,
        data: user,
      };
    }

    return {
      success: false,
    };
  }

  static async authDigitUser(
    crypted_digit: string,
    digit: string,
    crypt_key: string
  ) {
    if (digit.length !== 6) {
      return {
        success: false,
        message: "non-6 chars digit",
      };
    }

    const decrypted = decryptString(crypted_digit, crypt_key);

    if (digit === decrypted) {
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  }
}
