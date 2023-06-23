import React, { useCallback } from "react";
import { View, Pressable } from "react-native";
import Modal from "react-native-modal";

import { useAppDispatch } from "../../config/redux";
import { useTranslation } from "react-i18next";
import Loader from "../loader/Loader";
import ExtendedStyleSheet from "../styles/ExtendedStyleSheet";
import {
  heightPercentage,
  moderateScale,
} from "../../utils/functions.dimensions";
import theme from "../../constants/colors";
import { toggleLoadingAction } from "../../config/redux/actions";

type LoadingModalProps = {
  visible: boolean;
  cancelable?: boolean;
};

const LoadingModal = ({ visible, cancelable }: LoadingModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const hideModal = useCallback(() => {
    if (cancelable) {
      dispatch(toggleLoadingAction(false));
    }
  }, []);

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={hideModal}
      customBackdrop={<Pressable onPress={hideModal} style={styles.mask} />}
      animationInTiming={10}
      animationOutTiming={10}
    >
      <View style={styles.container}>
        <Loader />
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = ExtendedStyleSheet.create({
  container: {
    backgroundColor: theme.background,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    borderRadius: moderateScale(10),
    height: heightPercentage(20),
    zIndex: 100,
  },
  mask: {
    ...ExtendedStyleSheet.absoluteFillObject,
    backgroundColor: "#a1a1a1",
    opacity: 0.6,
  },
});
