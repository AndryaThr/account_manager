import { AccountInformationType } from "../types";
import Database from "./Database";
import * as SQLite from "expo-sqlite";

export default class SecurityQuestion {
  static addSecurityQuestions(
    obj: { question: string; answer: string; account: number }[]
  ) {
    if (obj.length < 0) {
      return false;
    }

    const db = Database.database;

    const sq_query = `
      INSERT INTO security_question (sq_query, sq_answer, account)
      VALUES ${obj.map((e) => "( ?,?,? )").join(",")};
    `;

    const params = obj.map((e) => [e.question, e.answer, e.account]).flat();

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<boolean>((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          sq_query,
          params,
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
}
