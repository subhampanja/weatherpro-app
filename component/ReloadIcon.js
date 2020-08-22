import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/Index";

const ReloadIcon = ({ load }) => {
  const reloadIconName = Platform.OS == "ios" ? "ios-refresh" : "md-refresh";
  return (
    <View style={style.reloadIcon}>
      <Ionicons
        onPress={load}
        name={reloadIconName}
        size={24}
        color={colors.PRIMARY_COLOR}
      />
    </View>
  );
};

const style = StyleSheet.create({
  reloadIcon: {
    position: "absolute",
    ...Platform.select({
      ios: {
        top: -50,
      },
      android: {
        top: 65,
      },
    }),
    right: 30,
  },
});

export default ReloadIcon;
