import React, { createContext, useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ToastContext = createContext<(message: string, type?: string) => void>(
  () => {},
);

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");

  const showToast = (message: string, type: string = "info") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const colors = {
    success: "#00A28E",
    error: "#FF4E4E",
    info: "#3186EA",
    warning: "#C06F54",
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      {toastVisible && (
        <TouchableOpacity
          onPress={() => setToastVisible(false)}
          activeOpacity={0.8}
          style={[
            styles.toast,
            {
              borderLeftColor:
                colors[toastType as keyof typeof colors] || "#fff",
            },
          ]}
        >
          <Text
            style={[
              styles.toastText,
              { color: colors[toastType as keyof typeof colors] || "#fff" },
            ]}
          >
            {toastMessage}
          </Text>
        </TouchableOpacity>
      )}
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    // backgroundColor: "rgba(0,0,0,0.8)",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderLeftWidth: 5,
    zIndex: 1000,
  },
  toastText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
