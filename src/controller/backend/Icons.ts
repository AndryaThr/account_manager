import * as FileSystem from "expo-file-system";
import { moveFolderContent } from "../../utils/functions.filesystem";
import { icon_path } from "../../constants/paths";
import SocialMedia from "../database/SocialMedia";
import images from "../../../assets/img";
import { Asset } from "expo-asset";

class Icons {
  static async init(
    images: {
      assets: Asset[];
      folder: string;
    }[]
  ) {
    try {
      // await FileSystem.deleteAsync(icon_path, {
      //   idempotent: true,
      // });

      if (!(await FileSystem.getInfoAsync(icon_path)).exists) {
        await FileSystem.makeDirectoryAsync(icon_path, { intermediates: true });
      }

      for (let image of images) {
        const folder_path = icon_path + "/" + image.folder;

        if (!(await FileSystem.getInfoAsync(folder_path)).exists) {
          await FileSystem.makeDirectoryAsync(folder_path, {
            intermediates: true,
          });
        } else {
          continue;
        }
        if (image.folder === "00") {
          console.log("image.assets : ", JSON.stringify(image.assets, null, 4));
        }

        await Promise.all(
          image.assets.map((e) => {
            return FileSystem.downloadAsync(
              e.uri,
              folder_path + "/" + e.name + "." + e.type
            );
          })
        );
      }
    } catch (error) {
      throw error;
    }
  }

  static resolveImageUri(folder: string, pngFile: string) {
    const imageUri = `${icon_path}/${folder}/${pngFile}`;
    return imageUri;
  }

  static async compareIcons(
    images: {
      assets: Asset[];
      folder: string;
    }[]
  ) {
    try {
      const icon_db = (await SocialMedia.fetchSocialMediaPlatform()).map(
        (e) => e.sm_icon
      );

      let icon_saved: string[] = [];
      console.log(icon_db);

      for (let image of images) {
        const folder_path = icon_path + "/" + image.folder;

        let tmp = await FileSystem.readDirectoryAsync(folder_path);
        icon_saved = [...icon_saved, ...tmp];
      }

      let diffDb = arrayDifference(icon_saved, icon_db);
      console.log("diffDb : ", JSON.stringify(diffDb, null, 4));
    } catch (error) {
      throw error;
    }
  }
}

function arrayDifference(arr1: string[], arr2: string[]) {
  return arr1.filter((element) => !arr2.includes(element));
}

export default Icons;
