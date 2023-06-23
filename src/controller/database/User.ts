import { UserType } from "../types";
import Database from "./Database";
import * as SQLite from "expo-sqlite";

export default class User {
  static readAll() {
    const db = Database.database;
    const query = `
      SELECT * FROM user;
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<UserType[]>((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          query,
          [],
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

  static readOne(username: string) {
    const db = Database.database;
    const query = `
      SELECT * FROM user 
      WHERE user_uname = ?
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<UserType>((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          query,
          [username],
          (_, res: SQLite.SQLResultSet) => {
            resolve(res.rows._array[0]);
          },
          (_, err: SQLite.SQLError) => {
            reject(err);
            return false;
          }
        );
      });
    });
  }

  static create(
    name: string,
    firstname: string,
    username: string,
    digit: string,
    password: string,
    p_key: string
  ) {
    const db = Database.database;
    const query = `
      INSERT INTO user 
      (user_name, user_firstname, user_uname, user_digit, user_password, user_private_key)
      VALUES (?,?,?,?,?,?);
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<boolean>((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          query,
          [name, firstname, username, digit, password, p_key],
          (_, res: SQLite.SQLResultSet) => {
            resolve(true);
          },
          (_, err: SQLite.SQLError) => {
            reject(false);
            return false;
          }
        );
      });
    });
  }

  static deleteById(user_id: number) {
    const db = Database.database;
    const query = `
      DELETE FROM user
      WHERE user_id = ?;
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<boolean>((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          query,
          [user_id],
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

  static fetchAllUsername() {
    const db = Database.database;
    const query = `
      SELECT 
        user_id, user_name, user_firstname, user_uname 
      FROM user;
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<
      Omit<UserType, "user_digit" | "user_password" | "user_private_key">[]
    >((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          query,
          [],
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
}
