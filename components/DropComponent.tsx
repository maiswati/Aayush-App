// app/components/Dropdown.tsx
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet } from "react-native";

interface DropComponentProps {
  data: Array<{
    label: string;
    value: string | number;
  }>;
  placeholder: string;
  val: string | number;
  setfunc: (value: string | number) => void;
}

export default function DropComponent({data, placeholder, val, setfunc}: DropComponentProps) {
  return (
    <Dropdown
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={val}
      onChange={(item: { label: string; value: string | number }) => setfunc(item.value)}
      placeholderStyle={styles.placeholder}
      containerStyle={styles.containerStyle}
      itemTextStyle={styles.itemTextStyle}
      style={styles.dropdownStyle}
    />
  );
};

const styles = StyleSheet.create({
  dropdownStyle: {
    borderRadius: 10,
    borderWidth: 0.5,
    padding: 12,
    width: 250,
    marginTop: 10,
    backgroundColor: "white",
  },
  placeholder: {
    color: "#666",
  },
  containerStyle: {},
  itemTextStyle: {},
});