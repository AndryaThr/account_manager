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

  static fetchSecurityQuestionById(account_id: number) {
    const db = Database.database;

    const sq_query = `
      SELECT * FROM security_question 
      WHERE account = ?;
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<
      {
        id: number;
        question: string;
        answer: string;
      }[]
    >((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          sq_query,
          [account_id],
          (_, res: SQLite.SQLResultSet) => {
            let results = res.rows._array.map((e) => ({
              id: e.sq_id,
              question: e.sq_query,
              answer: e.sq_answer,
            }));
            resolve(results);
          },
          (_, err: SQLite.SQLError) => {
            reject(err);
            return false;
          }
        );
      });
    });
  }

  static updateSecurityQuestion(obj: {
    question: string;
    answer: string;
    sq_id: number;
  }) {
    const db = Database.database;

    const sq_query = `
      UPDATE security_question 
      SET
        sq_query = ?, 
        sq_answer = ?
      WHERE sq_id = ?;
    `;

    const params = [obj.question, obj.answer, obj.sq_id];

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

  static deleteSecurityQuestion(sq_id: number) {
    const db = Database.database;

    const sq_query = `
      DELETE FROM security_question 
      WHERE sq_id = ?;
    `;

    if (!db) {
      throw new Error("Database must be opened before transaction");
    }

    return new Promise<boolean>((resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          sq_query,
          [sq_id],
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
      DELETE FROM security_question;
    `;

    const reset_sequence = `
      UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='security_question';;
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
