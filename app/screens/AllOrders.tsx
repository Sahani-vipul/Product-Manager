

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    fetchAuthToken();
  }, []);

  const fetchAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);
        fetchOrders(token); // Call fetchOrders only after getting the token
      } else {
        Alert.alert("Error", "Authentication token not found. Please login again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching auth token:", error);
      setLoading(false);
    }
  };

  const fetchOrders = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get("http://192.168.43.246:5000/api/orders/getOrder", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error);
      Alert.alert("Error", "Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Orders</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#9b87f5" />
      ) : orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.orderId}>Order ID: {item._id}</Text>
              <Text style={styles.totalAmount}>Total Amount: ${item.totalAmount}</Text>
              <Text style={styles.status}>Status: {item.status}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  noOrdersText: { fontSize: 16, color: "#777", textAlign: "center", marginTop: 20 },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderId: { fontSize: 16, fontWeight: "bold", color: "#333" },
  totalAmount: { fontSize: 14, color: "#555", marginBottom: 6 },
  status: { fontSize: 14, color: "#777" },
});
