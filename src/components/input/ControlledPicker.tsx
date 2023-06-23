import React, { useCallback, useMemo, useRef, useEffect } from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import {
  hScale,
  heightPercentage,
  moderateScale,
  vScale,
  widthPercentage,
} from "../../utils/functions.dimensions";
import sizes from "../../constants/sizes";
import theme from "../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import PickerElement from "../elements/PickerElement";
import BackdropComponent from "../mask/BackdropComponent";
import { GestureResponderEvent } from "react-native-modal";

type ControlledPickerProps<T extends FieldValues> = {
  name: string;
  optionList: any[];
  placeholder?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  label?: string;
  leftIcon?: JSX.Element;
  disabled?: boolean;
} & UseControllerProps<T>;

function ControlledPicker<T extends FieldValues>(
  props: ControlledPickerProps<T>
) {
  const { field, fieldState } = useController<T>({
    defaultValue: props?.defaultValue,
    control: props.control,
    name: props.name,
    rules: props.rules,
  });
  const bottomSheetHandle = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleShowModal = useCallback((event: GestureResponderEvent) => {
    if (!props.disabled) {
      bottomSheetHandle.current?.present();
    }
  }, []);

  const handleHideModal = useCallback(() => {
    bottomSheetHandle.current?.close();
  }, []);

  const handleSelectValue = useCallback((id: number, label: string) => {
    if (id !== undefined) {
      field.onChange({
        id,
        label,
      });
    } else {
      field.onChange();
    }
    handleHideModal();
  }, []);

  return (
    <>
      <TouchableOpacity onPress={handleShowModal} disabled={props.disabled}>
        <View
          style={[
            props.containerStyle ? props.containerStyle : styles.container,
          ]}
        >
          <View style={styles.input}>
            {props.leftIcon && (
              <View style={ExtendedStyleSheet.defaultStyles.center}>
                {props.leftIcon}
              </View>
            )}
            <View style={styles.labelContainer}>
              {props?.label && (
                <Text style={styles.labelStyle}>{props.label}</Text>
              )}
              <Text
                style={[
                  styles.inputStyle,
                  !field?.value && styles.placeholderStyle,
                ]}
              >
                {field?.value?.label ?? props.placeholder ?? ""}
              </Text>
            </View>
            <View style={ExtendedStyleSheet.defaultStyles.center}>
              <MaterialIcons
                name="arrow-drop-down"
                size={sizes.inputIcon}
                color={inputColor}
              />
            </View>
          </View>
          <View>
            {fieldState?.error && (
              <Text style={styles.textErrorStyle}>
                {fieldState.error?.message}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetHandle}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={() => (
          <BackdropComponent onBackdropPress={handleHideModal} />
        )}
      >
        <BottomSheetFlatList
          data={props.optionList}
          renderItem={({ item }) => (
            <PickerElement
              id={item.id}
              label={item.value ?? "???"}
              onLabelPress={handleSelectValue}
            />
          )}
          contentContainerStyle={styles.flatlist}
          keyExtractor={(_, i) => i.toString()}
        />
      </BottomSheetModal>
    </>
  );
}

export default ControlledPicker;

const inputColor = theme.soft_gray;

const styles = ExtendedStyleSheet.create({
  /* input */
  container: {
    marginTop: heightPercentage(1),
    marginBottom: heightPercentage(1),
  },
  input: {
    height: vScale(62),
    paddingHorizontal: hScale(12),
    borderRadius: sizes.borderRadius,
    borderWidth: 0.5,
    borderColor: inputColor,
    flexDirection: "row",
  },
  labelStyle: {
    fontSize: moderateScale(14),
    position: "absolute",
    top: -vScale(10),
    backgroundColor: "white",
    paddingHorizontal: widthPercentage(1),
    color: inputColor,
  },
  inputStyle: {
    fontSize: moderateScale(16),
    paddingLeft: widthPercentage(3),
  },
  placeholderStyle: {
    color: inputColor,
  },
  textErrorStyle: {
    fontSize: moderateScale(14),
    color: theme.error,
    fontStyle: "italic",
    paddingTop: "4%",
  },
  labelContainer: {
    flex: 1,
    ...ExtendedStyleSheet.defaultStyles.justifyCenter,
  },

  /* flatlist */
  flatlist: {
    paddingBottom: heightPercentage(10),
  },
});
