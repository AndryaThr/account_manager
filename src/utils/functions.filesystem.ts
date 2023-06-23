import * as FileSystem from "expo-file-system";
import { icon_path } from "../constants/paths";
import { Asset } from "expo-asset";

async function directoryExists(dir: string) {
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    return true;
  } else {
    return false;
  }
}

async function copyIfNotExists(source: any, destination: string) {
  const exists = (await FileSystem.getInfoAsync(destination)).exists;

  if (!exists) {
    await FileSystem.downloadAsync(Asset.fromModule(source).uri, destination);
  }
}

async function moveFolderContent(object: any, folder: string) {
  try {
    const folder_path = icon_path + "/" + folder;
    const images = Object.entries(object).filter(([key, _]) => key !== "_path");

    await Promise.all(
      images.map(([key, value]: [string, any]) => {
        let final_path = folder_path + "/" + key + ".png";
        return copyIfNotExists(value, final_path);
      })
    );
  } catch (error) {
    throw error;
  }
}

export { directoryExists, moveFolderContent, copyIfNotExists };
