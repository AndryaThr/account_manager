import User from "../database/User";
import { decryptString } from "../../config/crypto/crypto";
import { UserType } from "../types";

type ResponseType = {
  success: boolean;
  message?: string;
  data?: any;
};

export class Auth {
  static async authUser(password: string): Promise<ResponseType> {
    const user = (await User.readAll())[0] ?? undefined;

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

  static async createUser(user: {
    name: string;
    first_name: string;
    digit: string;
    password: string;
    private_key: string;
  }) {
    if (!user) {
      throw new Error("createUser arg error");
    }

    const insertion = await User.create(user);

    if (insertion) {
      return {
        success: true,
        message: "User created",
      };
    }
    return {
      success: false,
    };
  }
}
