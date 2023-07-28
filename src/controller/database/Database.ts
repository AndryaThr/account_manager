import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

export default class Database {
  private static instance: Database | null = null;
  static database: SQLite.WebSQLDatabase | null = null;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public async init() {
    try {
      Database.database = await this.initDatabase();
    } catch (error) {
      throw new Error("Database cannot be opened");
    }
  }

  public async initDatabase(): Promise<SQLite.WebSQLDatabase> {
    // force db close
    if (
      (
        await FileSystem.getInfoAsync(
          FileSystem.documentDirectory + "SQLite/database.db"
        )
      ).exists
    ) {
      const tmp_db = SQLite.openDatabase("database.db");
      await tmp_db.closeAsync();
      // await tmp_db.deleteAsync();
    }

    // if db folder doesn't exist, create db folder path
    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
    }

    // migrate initial database from assets to device internal memory
    if (
      !(
        await FileSystem.getInfoAsync(
          FileSystem.documentDirectory + "SQLite/database.db"
        )
      ).exists
    ) {
      await FileSystem.downloadAsync(
        Asset.fromModule(require("./../../../assets/db/database.db")).uri,
        FileSystem.documentDirectory + "SQLite/database.db"
      );
    }

    // open database from device internal memory
    return SQLite.openDatabase("database.db");
  }
}
