import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "../../store/authStore";

const Home = () => {
  const { logout } = useAuthStore();

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={logout}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
