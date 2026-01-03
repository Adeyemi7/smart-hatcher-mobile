import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    title: "Monitor Live",
    description: "Monitor temperature and humidity live.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAF42WaZyerusKfsgIrcNSyZFuC9yE_fP6bo16zewc33Hl6QxUzo1LPLYlv7L9FIcQ8mxxkGijGIKNCuU7AHYKyN5pk0dBub_BiOOJ4Xy0JTlYjWM8yDKTyqJHR6mJhilGD8Lr3xSQlkUdLTpGc4Fz6YSOgoccnzDgGhCGWws3qw7VaZ_n_O2J854STTzY8Ji3eqrLqzi4XwTEWtuLA8KR9JOuUDhD-p7PZQoX78knTLFeF_F0s46Ws-58nH_N5B_Lfff4mhw26nwE",
  },
  {
    key: "2",
    title: "Automated Turning",
    description: "Automatically turn eggs every 6 hours.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMnwWF9UdK21XHaEMVXqcZRhMUI0B5Gr3zlrp_fWc7z6it6ToVbzfTj7nOpn-jPJtJ6uQlP4m1crEmEQAa79Uu9ijguKzzzjlEsr0rJzcSlPNpItOqfvt-s42ZBHFkdlZM2I3F5Uaxd-qS3cnTQXuLMaQlbmx4Mlv-_D3pH-kOPsZzmDFzW8y5AxQo1bJYPqUQb8dMkEsDASqi_KOSr2uKMGACeCaiUyMmnleQu2qrBheVEVR9fZx8RSDydllxCt6FeMJQuW7f5zw",
  },
  {
    key: "3",
    title: "Instant Alerts",
    description: "Get alerts when environmental conditions change.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBdinXWaTi45r26q8iVPM0J9_CCbotNtDoVHLBKcTAtLLbD3lTZF0d1-t8G_9S4giLzk9IjbdhfGFQI8pzhxZmRmBr6CIj3-s2XL5WM2eNTazG3Y_LbEATNHR-m_rWrWYqFlQ8VwL3Dmv92Bbtx0FZBTMoIEcora-n-0boEo4rvltT8UEuNRQSic7JO7YwiZpG5B41LeWhBkB3R4amOE__mZVzaShQwhDrO_P7p489mUeQH9irZ-Y2suJ6-qn8uCUgR0I8T6NjhYFw",
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveSlide(index);
  };

  const homeScreen = () => {
    router.push("/Auth/WelcomeScreen");
  };

  const renderItem = ({ item }: { item: (typeof slides)[0] }) => (
    <View style={styles.slide}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeSlide ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={homeScreen}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", justifyContent: "center" },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    paddingTop: 64,
    paddingHorizontal: 24,
  },
  card: {
    width: 256,
    height: 256,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  image: { width: 128, height: 128, resizeMode: "contain" },
  title: { fontSize: 24, fontWeight: "700", color: "#212121", marginBottom: 8 },
  description: {
    fontSize: 16,
    color: "rgba(33,33,33,0.7)",
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  dot: {
    marginHorizontal: 4,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  button: {
    backgroundColor: "#4CAF50",
    marginHorizontal: 24,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
