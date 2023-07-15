import { formatDateToISOString } from "../../utils/functions.string";
import Account from "../database/Account";
import SecurityQuestion from "../database/SecurityQuestion";
import { NumberBetweenZeroAndFifteen } from "../types";

type DataType = {
  account: {
    acc_user: number;
    acc_name: string;
    acc_uname: string;
    acc_mail: string;
    acc_token?: string;
    acc_password: string;
    acc_phone?: string;
  };
  platform: {
    id: number;
    category?: NumberBetweenZeroAndFifteen;
  };
  security_question: {
    id: number;
    question: string;
    answer: string;
  }[];
};

class AccountManagement {
  static async addNewAccount(data: DataType) {
    try {
      // data for "account" table
      const account = {
        acc_user: data.account.acc_user,
        acc_name: data.account.acc_name,
        acc_uname: data.account.acc_uname,
        acc_mail: data.account.acc_mail,
        acc_token: data.account.acc_token ?? "",
        acc_password: data.account.acc_password,
        acc_sm: data.platform.id,
        acc_phone: data.account.acc_phone ?? "",
        acc_addate: new Date().toISOString(),
      };

      const accountAddResult = await Account.addAccount(account);

      // data for "security_question" table
      if (data.security_question.length > 0) {
        let sq = data.security_question.map((e) => ({
          question: e.question,
          answer: e.answer,
          account: accountAddResult.insertId ?? 0,
        }));

        const sqAddResult = await SecurityQuestion.addSecurityQuestions(sq);

        if (!sqAddResult) {
          return false;
        }
      }

      return true;
    } catch (err) {
      throw err;
    }
  }
}

export default AccountManagement;
