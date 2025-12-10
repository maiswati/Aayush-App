import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const PRIMARY = "#00AA5D";
const ACCENT = "#ffffff";
const SOFT_BACKGROUND = "#F2FFF8";

type RegistrationRoute =
  | "/doctor-registration"
  | "/nurse-registration"
  | "/caretaker-registration"
  | "/service-provider-registration"
  | "/gym-center-registration"
  | "/yoga-center-registration"
  | "/wellness-center-registration"
  | "/medical-college-registration";

type RoleCardData = {
  label: string;
  detail: string;
  icon: string;
  chip: string;
  route?: RegistrationRoute;
};

type CategoryConfig = {
  title: string;
  tagline: string;
  accent: string;
  cards: RoleCardData[];
};

const CATEGORIES: CategoryConfig[] = [
  {
    title: "Professional",
    tagline: "Tell us how you care for patients to personalize your onboarding.",
    accent: PRIMARY,
    cards: [
      {
        label: "Doctor",
        detail: "Medical practitioners and specialists",
        icon: "medkit-outline",
        chip: "#00C08B",
        route: "/doctor-registration",
      },
      {
        label: "Nurse",
        detail: "Nursing professionals and healthcare staff",
        icon: "heart-outline",
        chip: "#00B0C6",
        route: "/nurse-registration",
      },
      {
        label: "Caretaker / Aaya",
        detail: "Ward assistants and at-home caregivers",
        icon: "people-outline",
        chip: "#8A63FF",
        route: "/caretaker-registration",
      },
      {
        label: "Insurance provider",
        detail: "Insurance companies, brokers and agents",
        icon: "flask-outline",
        chip: "#FF9E63",
        route: "/service-provider-registration",
      },
    ],
  },
  {
    title: "Organizations",
    tagline: "Share details about your centre to reach the My Aayush network.",
    accent: "#00804A",
    cards: [
      {
        label: "Gym center",
        detail: "Fitness studios with medical oversight",
        icon: "barbell-outline",
        chip: "#FF7EB6",
        route: "/gym-center-registration",
      },
      {
        label: "Yoga center",
        detail: "Restorative studios and trainers",
        icon: "leaf-outline",
        chip: "#80D43C",
        route: "/yoga-center-registration",
      },
      {
        label: "Wellness & alternative medicine",
        detail: "Ayurveda, naturopathy, and holistic care",
        icon: "sparkles-outline",
        chip: "#FFC24C",
        route: "/wellness-center-registration",
      },
      {
        label: "Medical colleges",
        detail: "Institutions, camps, and internship partners",
        icon: "school-outline",
        chip: "#6A9BFF",
        route: "/medical-college-registration",
      },
    ],
  },
];

export default function SectionsScreen() {
  const router = useRouter();
  const heroAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(heroAnim, {
      toValue: 1,
      damping: 12,
      stiffness: 120,
      useNativeDriver: true,
    }).start();
  }, [heroAnim]);

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sheet}>
          <Animated.View
            style={{
              opacity: heroAnim,
              transform: [
                {
                  translateY: heroAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [28, 0],
                  }),
                },
              ],
            }}
          >
            <Text style={styles.eyebrow}>Choose your path</Text>
            <Text style={styles.title}>Professionals & organizations</Text>
            <Text style={styles.subtitle}>
              Declare your role so we can guide verification, documentation, and service tools
              tailored to your journey.
            </Text>
          </Animated.View>

          {CATEGORIES.map((category, index) => (
            <CategoryBlock key={category.title} index={index} category={category} />
          ))}

          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back to create account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

type CategoryBlockProps = {
  category: CategoryConfig;
  index: number;
};

function CategoryBlock({ category, index }: CategoryBlockProps) {
  const blockAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(blockAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 150,
      useNativeDriver: true,
    }).start();
  }, [blockAnim, index]);

  return (
    <Animated.View
      style={{
        opacity: blockAnim,
        transform: [
          {
            translateY: blockAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [18, 0],
            }),
          },
        ],
      }}
    >
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <View
          style={[styles.categoryAccent, { backgroundColor: category.accent }]}
        />
      </View>
      <Text style={styles.categoryTagline}>{category.tagline}</Text>
      <View style={styles.cardList}>
        {category.cards.map((card) => (
          <RoleCard key={`${category.title}-${card.label}`} card={card} />
        ))}
      </View>
    </Animated.View>
  );
}

type RoleCardProps = {
  card: CategoryConfig["cards"][number];
};

function RoleCard({ card }: RoleCardProps) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.roleCard}
      onPress={() => (card.route ? router.push(card.route) : undefined)}
    >
      <View style={[styles.iconWrap, { backgroundColor: card.chip }]}
      >
        <Ionicons name={card.icon as any} size={22} color={ACCENT} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.roleLabel}>{card.label}</Text>
        <Text style={styles.roleDetail}>{card.detail}</Text>
        <View style={styles.roleActionRow}>
          <Text style={styles.roleAction}>Register Now</Text>
          <Ionicons name="chevron-forward-outline" size={16} color={PRIMARY} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PRIMARY,
  },
  scrollContent: {
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: 40,
  },
  sheet: {
    marginTop: 16,
    backgroundColor: SOFT_BACKGROUND,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40,
    gap: 28,
  },
  eyebrow: {
    textTransform: "uppercase",
    fontSize: 13,
    letterSpacing: 1,
    color: PRIMARY,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#082B1A",
    marginTop: 6,
  },
  subtitle: {
    marginTop: 8,
    color: "#1A3C2A",
    fontSize: 15,
    lineHeight: 22,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0B2F1C",
  },
  categoryAccent: {
    width: 64,
    height: 4,
    borderRadius: 4,
  },
  categoryTagline: {
    marginTop: 4,
    color: "#4A5F55",
  },
  cardList: {
    marginTop: 12,
    gap: 12,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: ACCENT,
    borderRadius: 18,
    gap: 16,
    shadowColor: "#0E1F18",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 16,
    elevation: 6,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  roleLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F3824",
  },
  roleDetail: {
    marginTop: 4,
    color: "#4A5F55",
    fontSize: 14,
  },
  roleActionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
  },
  roleAction: {
    color: PRIMARY,
    fontWeight: "600",
  },
  backButton: {
    alignSelf: "center",
  },
  backText: {
    color: PRIMARY,
    fontWeight: "600",
  },
});
