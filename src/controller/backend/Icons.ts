import * as FileSystem from "expo-file-system";
import { moveFolderContent } from "../../utils/functions.filesystem";
import { icon_path } from "../../constants/paths";
import iconsFolder from "../../../assets/img";
import SocialMedia from "../database/SocialMedia";

class Icons {
  static async init() {
    try {
      // await FileSystem.deleteAsync(icon_path);

      if (!(await FileSystem.getInfoAsync(icon_path))) {
        await FileSystem.makeDirectoryAsync(icon_path, { intermediates: true });
      }

      for (let folder of iconsFolder) {
        if (
          !(await FileSystem.getInfoAsync(icon_path + "/" + folder._path))
            .exists
        ) {
          await FileSystem.makeDirectoryAsync(icon_path + "/" + folder._path, {
            intermediates: true,
          });
        }

        await moveFolderContent(folder, folder._path);
      }
    } catch (error) {
      throw error;
    }
  }

  static resolveImageUri(folder: string, pngFile: string) {
    const imageUri = `${icon_path}/${folder}/${pngFile}`;
    return imageUri;
  }

  static async compareIcons() {
    const icon_db = (await SocialMedia.fetchSocialMediaPlatform()).map(
      (e) => e.sm_icon
    );

    let icon_saved: string[] = [];

    for (let folder of iconsFolder) {
      let tmp = await FileSystem.readDirectoryAsync(
        icon_path + "/" + folder._path
      );
      icon_saved = [...icon_saved, ...tmp];
    }

    let diffDb = arrayDifference(icon_saved, icon_db);
    console.log("diffDb : ", JSON.stringify(diffDb, null, 4));
  }
}

function arrayDifference(arr1: string[], arr2: string[]) {
  return arr1.filter((element) => !arr2.includes(element));
}

export default Icons;
