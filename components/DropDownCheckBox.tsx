import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";

interface MultiSelectProps {
  data: Array<{ label: string; value: string }>;
  selected: string[];
  setSelected: (values: string[]) => void;
  placeholder: string;
}

export default function MultiSelectDropdown({
  data,
  selected,
  setSelected,
  placeholder,
}: MultiSelectProps) {
  const [visible, setVisible] = useState(false);

  const toggleSelection = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <>
      {/* Dropdown Trigger */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.text}>
          {selected.length > 0 ? `${selected.length} selected` : placeholder}
        </Text>
      </TouchableOpacity>

      {/* Modal Dropdown */}
      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalBox}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => toggleSelection(item.value)}
                >
                  <Checkbox
                    value={selected.includes(item.value)}
                    onValueChange={() => toggleSelection(item.value)}
                    color="#262943"
                  />
                  <Text style={styles.label}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    width: 250,
    backgroundColor: "white",
  },
  text: {
    color: "#444",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 10,
    maxHeight: "75%",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  label: {
    marginLeft: 10,
    flex: 1,
    color: "#333",
  },
  doneBtn: {
    backgroundColor: "#262943",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  doneText: {
    color: "white",
    fontWeight: "600",
  },
});
