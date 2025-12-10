import { StyleSheet } from "react-native";

const PRIMARY = "#00AA5D";
const ACCENT = "#ffffff";
const PRIMARY_DARK = "#00854A";
const SHEET = "#D3FFED";
const CARD = "#F6FFFA";
const BORDER = "#A7F0CC";
const SHADOW = "#0E1F18";

export { ACCENT, CARD, PRIMARY };

export const caretakerRegistrationStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PRIMARY,
  },
  heroAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: "#00B76D",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  heroCard: {
    backgroundColor: PRIMARY,
    borderRadius: 28,
    padding: 22,
    shadowColor: SHADOW,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 18 },
    shadowRadius: 32,
    elevation: 10,
  },
  scrollContent: {
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: 40,
  },
  sheet: {
    marginTop: 16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: SHEET,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 60,
    gap: 18,
  },
  heroBlock: {
    marginBottom: 20,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  backText: {
    color: ACCENT,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: ACCENT,
  },
  subtitle: {
    marginTop: 4,
    color: "#E2FFEF",
  },
  infoCard: {
    flexDirection: "row",
    padding: 18,
    borderRadius: 22,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    gap: 16,
  },
  infoAvatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#E0F7EE",
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: {
    fontWeight: "600",
    color: "#0F3824",
    marginBottom: 4,
  },
  infoHighlight: {
    color: PRIMARY,
    fontWeight: "700",
    marginBottom: 8,
  },
  infoMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  infoMetaText: {
    color: "#4D5E56",
  },
  dualCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 18,
    borderRadius: 22,
    backgroundColor: CARD,
    borderColor: BORDER,
    borderWidth: 1,
  },
  dualTitle: {
    fontWeight: "700",
    color: "#0F3824",
  },
  dualSubtitle: {
    color: "#4D5E56",
    marginTop: 4,
  },
  dualButton: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  dualButtonText: {
    color: CARD,
    fontWeight: "600",
  },
  dropZone: {
    marginTop: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: PRIMARY,
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  dropZoneText: {
    color: PRIMARY,
    fontWeight: "600",
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },
  shadowed: {
    shadowColor: "#0E1F18",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 16,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F3824",
  },
  cardSubtitle: {
    color: "#4D5E56",
    marginTop: 4,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  sectionContent: {
    marginTop: 16,
    gap: 14,
  },
  fieldBlock: {
    gap: 6,
  },
  label: {
    color: "#2D3F35",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#0B2F1C",
    backgroundColor: "#FBFFFD",
  },
  textArea: {
    height: 110,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FBFFFD",
  },
  selectPlaceholder: {
    color: "#7C8A83",
  },
  selectValue: {
    color: "#0B2F1C",
    fontWeight: "600",
  },
  dropdownPanel: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: "#0E1F18",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 8,
    zIndex: 20,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownText: {
    color: "#173326",
    fontSize: 15,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: PRIMARY,
    borderRadius: 16,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: CARD,
    fontWeight: "700",
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: "#E6FFF2",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    color: PRIMARY,
    fontWeight: "600",
  },
  entryCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    backgroundColor: "#FBFFFD",
    gap: 12,
  },
  entryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteButton: {
    padding: 4,
  },
  feesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  feeInputs: {
    flexDirection: "row",
    gap: 12,
    flex: 1,
  },
  feeInput: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FBFFFD",
  },
  checkboxChecked: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  checkboxLabel: {
    color: "#2D3F35",
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    paddingVertical: 14,
    backgroundColor: CARD,
  },
  secondaryText: {
    color: "#0B2F1C",
    fontWeight: "600",
  },
  ctaButton: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: "center",
    paddingVertical: 14,
  },
  ctaText: {
    color: CARD,
    fontWeight: "700",
  },
  scanOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 20,
  },
  scanCard: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 20,
    gap: 18,
  },
  scanHeader: {
    gap: 6,
  },
  scanTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F2D1C",
  },
  scanSubtitle: {
    color: "#4A5F55",
  },
  previewBox: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#C5EED3",
    padding: 24,
    backgroundColor: "#EFFFF4",
  },
  scanStatus: {
    fontWeight: "700",
    color: "#0F3824",
    fontSize: 16,
  },
  scanHint: {
    color: "#4A5F55",
    textAlign: "center",
  },
  progressTrack: {
    width: "100%",
    height: 6,
    borderRadius: 999,
    backgroundColor: "#CBEFD8",
  },
  progressBar: {
    height: 6,
    borderRadius: 999,
    backgroundColor: PRIMARY,
  },
  instructionsBox: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E1F5E8",
    backgroundColor: "#F8FFFB",
    padding: 16,
    gap: 10,
  },
  instructionsTitle: {
    fontWeight: "700",
    color: "#0F3824",
  },
  instructionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  instructionsText: {
    color: "#42554C",
  },
  scanButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  ghostButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: BORDER,
  },
  ghostButtonText: {
    color: "#0F3824",
    fontWeight: "600",
  },
  primaryButtonFilled: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: PRIMARY,
  },
  primaryButtonFilledText: {
    color: CARD,
    fontWeight: "700",
  },
});
