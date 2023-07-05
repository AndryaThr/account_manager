import { AccountInformationType } from "../types";
import Database from "./Database";
import * as SQLite from "expo-sqlite";

export default class Account {
  static fetchAccountOfUser(user_id: number) {
    const db = Database.database;
    const query = `
      SELECT * FROM joint_account_social_media 
      WHERE acc_user = ? 
      ORDER BY platform
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<AccountInformationType[]>((resolve, reject) => {
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
  }) {
    const db = Database.database;
    const query = `
      INSERT INTO account 
      (
        acc_user, acc_name, acc_uname, 
        acc_mail, acc_token, acc_password, 
        acc_sm, acc_phone
      )
      VALUES ( ?,?,?,?,?,?,?,? );
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
}
