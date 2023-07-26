import {
  AccountInformationReducedType,
  AccountInformationType,
} from "../types";
import Database from "./Database";
import * as SQLite from "expo-sqlite";

export default class Account {
  static fetchAccountDetailsById(account_id: number) {
    const db = Database.database;

    const query = `
      SELECT * FROM joint_account_social_media
      WHERE acc_id = ?;
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<AccountInformationType>((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          query,
          [account_id],
          (_, res: SQLite.SQLResultSet) => {
            return resolve(res.rows._array[0]);
          },
          (_, err: SQLite.SQLError) => {
            reject(err);
            return false;
          }
        );
      });
    });
  }

  static fetchAccountsOfUser(
    user_id: number,
    key: "name" | "date" | "user" = "name",
    type: "asc" | "desc" = "asc"
  ) {
    const db = Database.database;
    const filter =
      key === "name" ? "platform" : key === "date" ? "acc_addate" : "acc_uname";

    const query = `
      SELECT * FROM joint_account_social_media_reduced 
      WHERE acc_user = ? 
      ORDER BY ${filter} ${type.toLocaleUpperCase()};
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<AccountInformationReducedType[]>((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          query,
          [user_id],
          (_, res: SQLite.SQLResultSet) => {
            return resolve(res.rows._array);
          },
          (_, err: SQLite.SQLError) => {
            reject(err);
            return false;
          }
        );
      });
    });
  }

  static addAccount(obj: {
    acc_user: number;
    acc_name: string;
    acc_uname: string;
    acc_mail: string;
    acc_token: string;
    acc_password: string;
    acc_sm: number;
    acc_phone: string;
    acc_addate: string;
  }) {
    const db = Database.database;
    const query = `
      INSERT INTO account 
      (
        acc_user, acc_name, acc_uname, 
        acc_mail, acc_token, acc_password, 
        acc_sm, acc_phone, acc_addate
      )
      VALUES ( ?,?,?,?,?,?,?,?,? );
    `;

    const {
      acc_user,
      acc_name,
      acc_uname,
      acc_mail,
      acc_token,
      acc_password,
      acc_sm,
      acc_phone,
      acc_addate,
    } = obj;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<SQLite.SQLResultSet>((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          query,
          [
            acc_user,
            acc_name,
            acc_uname,
            acc_mail,
            acc_token,
            acc_password,
            acc_sm,
            acc_phone,
            acc_addate,
          ],
          (_, res: SQLite.SQLResultSet) => {
            return resolve(res);
          },
          (_, err: SQLite.SQLError) => {
            reject(err);
            return false;
          }
        );
      });
    });
  }

  static updateAccount(obj: {
    acc_id: number;
    acc_name: string;
    acc_uname: string;
    acc_mail: string;
    acc_token: string;
    acc_password: string;
    acc_sm: number;
    acc_phone: string;
    acc_addate: string;
  }) {
    const db = Database.database;
    const query = `
      UPDATE account 
      SET 
        acc_name = ?, 
        acc_uname = ?, 
        acc_mail = ?, 
        acc_token = ?, 
        acc_password = ?, 
        acc_sm = ?, 
        acc_phone = ?, 
        acc_addate = ?
      WHERE acc_id = ?;
    `;

    const {
      acc_name,
      acc_uname,
      acc_mail,
      acc_token,
      acc_password,
      acc_sm,
      acc_phone,
      acc_addate,
      acc_id,
    } = obj;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<SQLite.SQLResultSet>((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          query,
          [
            acc_name,
            acc_uname,
            acc_mail,
            acc_token,
            acc_password,
            acc_sm,
            acc_phone,
            acc_addate,
            acc_id,
          ],
          (_, res: SQLite.SQLResultSet) => {
            return resolve(res);
          },
          (_, err: SQLite.SQLError) => {
            reject(err);
            return false;
          }
        );
      });
    });
  }

  static deleteAccount(acc_id: number) {
    const db = Database.database;

    const sq_query = `
      DELETE FROM account 
      WHERE acc_id = ?;
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<boolean>((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          sq_query,
          [acc_id],
          (_, res: SQLite.SQLResultSet) => {
            resolve(true);
          },
          (_, err: SQLite.SQLError) => {
            reject(err);
            return false;
          }
        );
      });
    });
  }

  static truncateTable() {
    const db = Database.database;

    const sq_query = `
      DELETE FROM account;
    `;

    const reset_sequence = `
      UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='account';;
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<boolean>((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          sq_query,
          [],
          (tx: SQLite.SQLTransaction, _) => {
            tx.executeSql(
              reset_sequence,
              [],
              () => {
                resolve(true);
              },
              (_, err: SQLite.SQLError) => {
                reject(false);
                return false;
              }
            );
          },
          (_, err: SQLite.SQLError) => {
            reject(false);
            return false;
          }
        );
      });
    });
  }
}
