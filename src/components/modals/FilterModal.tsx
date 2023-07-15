import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import BackdropComponent from "../mask/BackdropComponent";
import StyledText from "../texts/StyledText";
import { FilterModalHandle, SearchFilter } from "../types";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  heightPercentage,
  moderateScale,
  widthPercentage,
} from "../../utils/functions.dimensions";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme, { colorOfCategory } from "../../constants/colors";
import { NumberBetweenZeroAndFifteen } from "../../controller/types";

type FilterModalProps = {
  categories: { id: number; label: string }[];
};

const iconSize = moderateScale(30);

const FilterModal = React.forwardRef(
  (
    { categories }: FilterModalProps,
    ref: React.ForwardedRef<FilterModalHandle>
  ) => {
    const { t } = useTranslation();
    const bottomSheetRef = React.useRef<BottomSheetModal>(null);
    const { setValue, watch } = useFormContext<SearchFilter>();

    const { sortKey, sortType, category } = watch();

    const snapPoints = React.useMemo(() => ["40%", "60%", "80%"], []);

    const sortKeys: RadioButtonProps[] =
      React.useMemo((): RadioButtonProps[] => {
        return [
          {
            id: "name",
            label: t("common.form.name").toString(),
            value: "name",
          },
          {
            id: "date",
            label: t("common.date").toString(),
            value: "date",
          },
          {
            id: "user",
            label: t("screens.auth.username").toString(),
            value: "user",
          },
        ];
      }, []);

    const sortTypes: RadioButtonProps[] =
      React.useMemo((): RadioButtonProps[] => {
        return [
          {
            id: "asc",
            label: t("common.asc").toString(),
            value: "asc",
          },
          {
            id: "desc",
            label: t("common.desc").toString(),
            value: "desc",
          },
        ];
      }, []);

    const categoriesList = React.useMemo((): RadioButtonProps[] => {
      return categories.map((e, i) => ({
        id: e.id.toString(),
        label: e.label,
        value: e.id.toString(),
        containerStyle: {
          flexDirection: "row",
          borderLeftColor: colorOfCategory(i as NumberBetweenZeroAndFifteen),
          borderLeftWidth: widthPercentage(5),
          paddingLeft: widthPercentage(5),
        },
        labelStyle: {
          flex: 1,
          // borderRightColor: colorOfCategory(i as NumberBetweenZeroAndFifteen),
          // borderRightWidth: widthPercentage(5),
        },
      }));
    }, []);

    const handleShowModal = React.useCallback(() => {
      bottomSheetRef.current?.present();
    }, []);

    const handleHideModal = React.useCallback(() => {
      bottomSheetRef.current?.close();
    }, []);

    const handleTypeSelect = React.useCallback((str: string) => {
      let key = str as "asc" | "desc";
      setValue("sortType", key);
    }, []);

    const handleKeySelect = React.useCallback((str: string) => {
      let key = str as "name" | "date" | "user";
      setValue("sortKey", key);
    }, []);

    const handleCategorySelect = React.useCallback((str: string) => {
      let key = parseInt(str);
      setValue("category", key);
    }, []);

    const handleResetButtonPress = React.useCallback(() => {
      if (category !== undefined) setValue("category", undefined);
    }, [category]);

    React.useImperativeHandle(
      ref,
      () => ({
        hideModal() {
          handleHideModal();
        },
        showModal() {
          handleShowModal();
        },
      }),
      []
    );

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        backdropComponent={() => (
          <BackdropComponent onBackdropPress={handleHideModal} />
        )}
        snapPoints={snapPoints}
        index={1}
      >
        <BottomSheetScrollView contentContainerStyle={styles.scrollview}>
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.sectionTitleLeftContainer}>
                <StyledText weight="4" textStyle={styles.sectionTitleLabel}>
                  {t("screens.home.sort_by")}
                </StyledText>
              </View>
              <View style={styles.sectionTitleRightContainer}>
                <MaterialCommunityIcons
                  name="sort-alphabetical-descending-variant"
                  size={iconSize}
                  style={{ marginRight: widthPercentage(1) }}
                />
              </View>
            </View>
            <View style={styles.sectionBodyContainer}>
              <RadioGroup
                radioButtons={sortKeys}
                onPress={handleKeySelect}
                containerStyle={{
                  alignItems: "flex-start",
                }}
                selectedId={sortKey}
              />
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.sectionTitleLeftContainer}>
                <StyledText weight="4" textStyle={styles.sectionTitleLabel}>
                  {t("common.category_order")}
                </StyledText>
              </View>
              <View style={styles.sectionTitleRightContainer}>
                <MaterialCommunityIcons
                  name="sort"
                  size={iconSize}
                  style={{ marginRight: widthPercentage(1) }}
                />
              </View>
            </View>
            <View style={styles.sectionBodyContainer}>
              <RadioGroup
                radioButtons={sortTypes}
                onPress={handleTypeSelect}
                containerStyle={{
                  alignItems: "flex-start",
                }}
                selectedId={sortType}
                layout="row"
              />
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.sectionTitleLeftContainer}>
                <StyledText weight="4" textStyle={styles.sectionTitleLabel}>
                  {t("common.category_order")}
                </StyledText>
              </View>
              <TouchableOpacity onPress={handleResetButtonPress}>
                <View style={styles.sectionTitleRightContainer}>
                  <MaterialCommunityIcons
                    name="eraser-variant"
                    color={theme.purple}
                    size={moderateScale(10)}
                    style={{ marginRight: widthPercentage(1) }}
                  />
                  <StyledText textStyle={styles.buttonLabel}>
                    {t("common.button.clear_filter")}
                  </StyledText>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionBodyContainer}>
              <RadioGroup
                radioButtons={categoriesList}
                onPress={handleCategorySelect}
                containerStyle={{
                  alignItems: "flex-start",
                }}
                selectedId={category?.toString()}
              />
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default FilterModal;

const styles = ExtendedStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    flex: 1,
    marginHorizontal: "5%",
    marginBottom: heightPercentage(1),
  },
  sectionTitleContainer: {
    marginTop: heightPercentage(1),
    marginBottom: heightPercentage(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitleLabel: {
    fontSize: moderateScale(18),
  },
  sectionBodyContainer: {
    alignItems: "flex-start",
  },
  scrollview: {
    paddingBottom: heightPercentage(10),
  },
  sectionTitleLeftContainer: {},
  sectionTitleRightContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: theme.purple,
    fontSize: moderateScale(12),
    marginLeft: "3%",
  },
});
