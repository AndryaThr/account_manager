import { SMPlatformType, SMType } from "../types";
import Database from "./Database";
import * as SQLite from "expo-sqlite";

export default class SocialMedia {
  static fetchSocialMediaCategory() {
    const db = Database.database;
    const query = `
      SELECT * FROM sm_category;
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<SMType[]>((resolve, reject) => {
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

  static fetchSocialMediaPlatform() {
    const db = Database.database;
    const query = `
      SELECT * FROM joint_sm_category;
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<SMPlatformType[]>((resolve, reject) => {
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

  static fetchSocialMediaById(sm_id: number) {
    const db = Database.database;
    const query = `
      SELECT * FROM joint_sm_category 
      WHERE sm_id = ?
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<SMPlatformType>((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          query,
          [sm_id],
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
}
