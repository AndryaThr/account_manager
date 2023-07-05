import React from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
  useController,
} from "react-hook-form";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import StyledText from "../texts/StyledText";
import {
  NumberBetweenZeroAndFifteen,
  SMPlatformType,
  SMType,
} from "../../controller/types";
import Icons from "../../controller/backend/Icons";
import {
  hScale,
  heightPercentage,
  moderateScale,
  vScale,
  widthPercentage,
} from "../../utils/functions.dimensions";
import theme from "../../constants/colors";
import sizes from "../../constants/sizes";
import IconDisplay from "../image/IconDisplay";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import BackdropComponent from "../mask/BackdropComponent";
import SocialMedia from "../../controller/database/SocialMedia";
import { icon_path } from "../../constants/paths";
import { useTranslation } from "react-i18next";
import StateTextInput from "./StateTextInput";
import { getFolderFromId } from "../../utils/functions.string";

type ControlledPickerProps<T extends FieldValues> = {
  name: string;
  category_id?: NumberBetweenZeroAndFifteen;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
} & UseControllerProps<T>;

function ControlledIconPicker<T extends FieldValues>(
  props: ControlledPickerProps<T>
) {
  const [list, setList] = React.useState<SMPlatformType[]>([]);
  const [searchKeyWord, setSearchKeyWord] = React.useState<string>("");

  const { t } = useTranslation();
  const bottomSheetHandle = React.useRef<BottomSheetModal>(null);

  const { field } = useController<T>({
    defaultValue: props.defaultValue,
    control: props.control,
    name: props.name,
    rules: props.rules,
  });

  const icons = React.useMemo(() => {
    let tmp = list;

    if (props.category_id !== undefined) {
      tmp = tmp.filter((element) => element.sm_category === props.category_id);
    }

    tmp = tmp.filter(
      (element) =>
        element.sm_label === "???" ||
        element.sm_label
          .toLocaleLowerCase()
          .includes(searchKeyWord.toLocaleLowerCase())
    );

    return tmp;
  }, [list, props.category_id, searchKeyWord]);

  const snapPoints = React.useMemo(() => ["75%", "80%"], []);

  const handleShowModal = React.useCallback((event: GestureResponderEvent) => {
    if (!props.disabled) {
      bottomSheetHandle.current?.present();
    }
  }, []);

  const handleHideModal = React.useCallback(() => {
    bottomSheetHandle.current?.close();
  }, []);

  const handleSelectValue = React.useCallback(
    (iconItem: SMPlatformType) => {
      field.onChange({
        icon: iconItem.sm_icon,
        label: iconItem.sm_label,
        folder: iconItem.folder,
        id: iconItem.sm_id,
      });
      bottomSheetHandle.current?.close();
    },
    [searchKeyWord]
  );

  React.useEffect(() => {
    SocialMedia.fetchSocialMediaPlatform()
      .then((val) => {
        setList(
          val.map((e) => ({
            ...e,
            sm_icon: `${icon_path}/${e.folder}/${e.sm_icon}`,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    if (field.value.label && field.value.folder) {
      const folder = getFolderFromId(props.category_id);

      if (field.value.folder !== folder) {
        field.onChange({
          icon: Icons.resolveImageUri("00", "Default.png"),
          id: 0,
        });
      }
    }
  }, [props.category_id]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftIconContainer}>
          <IconDisplay icon_path={field.value.icon} />
        </View>
        <TouchableOpacity
          style={styles.labelContainer}
          onPress={handleShowModal}
          disabled={props.disabled}
        >
          <View style={styles.selectorContainer}>
            {props?.label && (
              <Text style={styles.labelStyle}>{props.label}</Text>
            )}
            <View style={styles.labelContainerLeft}>
              <Text
                style={[
                  styles.inputStyle,
                  !field?.value?.label && styles.placeholderStyle,
                ]}
              >
                {field?.value?.label ?? props.placeholder ?? "..."}
              </Text>
            </View>
            <View style={styles.labelContainerRight}>
              <MaterialIcons
                name="arrow-drop-down"
                size={sizes.inputIcon}
                color={theme.soft_gray}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        ref={bottomSheetHandle}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={() => (
          <BackdropComponent onBackdropPress={handleHideModal} />
        )}
        enableContentPanningGesture={false}
      >
        <BottomSheetView style={styles.modalTitleContainer}>
          <StateTextInput
            label={t("screens.new.platform_selection").toString()}
            placeholder={t("screens.new.placeholder_platform").toString()}
            leftIcon={() => (
              <MaterialCommunityIcons
                name="magnify"
                size={sizes.inputIcon}
                color={theme.soft_gray}
              />
            )}
            placeholderTextColor={theme.soft_gray}
            value={searchKeyWord}
            onChange={setSearchKeyWord}
          />
        </BottomSheetView>
        <BottomSheetView style={styles.listContainer}>
          <BottomSheetFlatList
            data={icons}
            numColumns={5}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectValue(item)}>
                <BottomSheetView style={styles.iconContainer}>
                  <IconDisplay icon_path={item.sm_icon} width={"80%"} />
                  <StyledText textStyle={styles.iconLabel} numberOfLines={1}>
                    {item.sm_label}
                  </StyledText>
                </BottomSheetView>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.flatlist}
            keyExtractor={(item) => item.sm_id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

export default ControlledIconPicker;

const styles = ExtendedStyleSheet.create({
  container: {
    marginVertical: heightPercentage(1),
    height: vScale(60),
    flexDirection: "row",
  },
  leftIconContainer: {
    ...ExtendedStyleSheet.defaultStyles.center,
    width: "20%",
    marginRight: "3%",
    paddingVertical: "2%",
  },
  labelContainer: {
    flex: 1,
    ...ExtendedStyleSheet.defaultStyles.justifyCenter,
    borderWidth: 0.5,
    borderRadius: sizes.borderRadius,
    borderColor: theme.soft_gray,
  },
  labelStyle: {
    fontSize: moderateScale(14),
    top: -vScale(10),
    backgroundColor: "white",
    paddingHorizontal: widthPercentage(2),
    marginLeft: "10%",
    position: "absolute",
    color: theme.soft_gray,
  },
  inputStyle: {
    fontSize: moderateScale(16),
    paddingLeft: widthPercentage(3),
  },
  placeholderStyle: {
    color: theme.soft_gray,
  },
  labelContainerLeft: {
    flex: 1,
    paddingLeft: "2%",
    ...ExtendedStyleSheet.defaultStyles.justifyCenter,
  },
  labelContainerRight: {
    ...ExtendedStyleSheet.defaultStyles.center,
    paddingRight: "3%",
  },
  selectorContainer: {
    flex: 1,
    flexDirection: "row",
  },
  flatlist: {
    paddingBottom: heightPercentage(10),
    flexGrow: 1,
  },

  /* icon */
  iconContainer: {
    ...ExtendedStyleSheet.defaultStyles.alignCenter,
    width: sizes.smIconListSize,
    height: sizes.smIconListSize,
    marginHorizontal: widthPercentage(2),
    marginVertical: heightPercentage(1.4),
    padding: 2,
    backgroundColor: theme.card,
    borderRadius: sizes.borderRadius,
    overflow: "visible",
  },
  iconLabel: {
    fontSize: moderateScale(12),
    position: "absolute",
    bottom: -heightPercentage(1.5),
  },

  /* modal */
  modalTitle: {
    fontSize: moderateScale(18),
  },
  modalTitleContainer: {
    marginTop: heightPercentage(1.5),
    marginBottom: heightPercentage(1.5),
    marginHorizontal: widthPercentage(2),
  },
  listContainer: {
    ...ExtendedStyleSheet.defaultStyles.alignCenter,
    flex: 1,
  },
});
