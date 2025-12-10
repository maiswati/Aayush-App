import * as React from "react";
import {
  View,
  Modal,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { RadioButton, Text } from "react-native-paper";

const screenHeight = Dimensions.get("window").height;

export type SortOption =
  | "recommended"
  | "priceLowHigh"
  | "priceHighLow"
  | "ratingHighLow"
  | "nearest";

interface SortProps {
  visible: boolean;
  onClose: () => void;
  search: string;
  sort: (option: SortOption) => void;
  sortOption: SortOption;
}

export default function SortPanel({
  visible,
  onClose,
  search,
  sort,
  sortOption,
}: SortProps) {
  const [value, setValue] = React.useState<SortOption>(sortOption);

  const slideAnim = React.useRef(new Animated.Value(screenHeight)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : screenHeight,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleDone = () => {
    sort(value);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      />

      <Animated.View
        style={[styles.panel, { transform: [{ translateY: slideAnim }] }]}
      >
        <Text style={styles.title}>Sort By</Text>

        <RadioButton.Group
          onValueChange={(v) => setValue(v as SortOption)}
          value={value}
        >
          <RadioButton.Item label="Recommended" value="recommended" />
          <RadioButton.Item label="Price Low to High" value="priceLowHigh" />
          <RadioButton.Item label="Price High to Low" value="priceHighLow" />
          <RadioButton.Item label="Rating High to Low" value="ratingHighLow" />
          <RadioButton.Item 
            label={`Nearest ${search}`}
            value="nearest"
          />
        </RadioButton.Group>

        <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  panel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    // Shadow
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },

  doneBtn: {
    backgroundColor: "#00AA5D",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  doneText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
});
