import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function Index() {
  const { user, token, checkAuth, logout } = useAuthStore();
  console.log("🚀 ~ Index ~ user:", user);

  useEffect(() => {
    checkAuth();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {user?.username}</Text>
      <Text style={styles.title}>Token: {token}</Text>

      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Link href={"/(auth)/signup"}>SignUp Page</Link>
      <Link href={"/(auth)/"}>Login Page</Link>
      <Image />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "blue",
  },
});
