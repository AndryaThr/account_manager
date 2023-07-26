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

  static async updateExistingAccount(
    data: DataType,
    account_id: number,
    sq_old: number[]
  ) {
    try {
      // data for "account" table
      const account = {
        acc_name: data.account.acc_name,
        acc_uname: data.account.acc_uname,
        acc_mail: data.account.acc_mail,
        acc_token: data.account.acc_token ?? "",
        acc_password: data.account.acc_password,
        acc_sm: data.platform.id,
        acc_phone: data.account.acc_phone ?? "",
        acc_addate: new Date().toISOString(),
        acc_id: account_id,
      };

      await Account.updateAccount(account);

      let tmp_sq_old = sq_old;
      for (let sq of data.security_question) {
        let tmp_id = sq.id;

        if (tmp_sq_old.includes(tmp_id)) {
          // update sq
          await SecurityQuestion.updateSecurityQuestion({
            question: sq.question,
            answer: sq.answer,
            sq_id: tmp_id,
          });

          tmp_sq_old = tmp_sq_old.filter((e) => e != tmp_id);
        } else {
          // create new sq
          await SecurityQuestion.addSecurityQuestions([
            {
              question: sq.question,
              answer: sq.answer,
              account: account_id,
            },
          ]);
        }
      }

      for (let id of tmp_sq_old) {
        // delete sq
        await SecurityQuestion.deleteSecurityQuestion(id);
      }

      return true;
    } catch (err) {
      throw err;
    }
  }

  static async deleteAccount(account_id: number, sq_old: number[]) {
    try {
      for (let id of sq_old) {
        const status = await SecurityQuestion.deleteSecurityQuestion(id);
        if (!status) throw new Error("Security question deletion error");
      }

      const acc = await Account.deleteAccount(account_id);

      if (acc) return true;
      else return false;
    } catch (err) {
      throw err;
    }
  }

  static async resetAccounts() {
    try {
      await SecurityQuestion.truncateTable();
      await Account.truncateTable();

      return true;
    } catch (err) {
      throw err;
    }
  }
}

export default AccountManagement;
