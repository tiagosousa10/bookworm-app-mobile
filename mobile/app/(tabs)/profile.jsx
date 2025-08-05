import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { API_URL } from "../../constants/api";
import { useAuthStore } from "../../store/authStore";
import styles from "../../assets/styles/profile.styles";
import ProfileHeader from "../../components/ProfileHeader";
import LogoutButton from "../../components/LogoutButton";

const Profile = () => {
  const [books, setBooks] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  const { token } = useAuthStore();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/books/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(
          data.message || "Something went wrong fetching user books"
        );

      setBooks(data.books);
    } catch (error) {
      console.log("Error fetching user books:", error.message);
      Alert.alert("Error", "Something went wrong fetching user books");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />
    </View>
  );
};

export default Profile;
