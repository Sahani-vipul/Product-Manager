
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, TextInput } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PlaceOrderScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    fetchAuthToken(); // Get the token before making API requests
    fetchProducts();
  }, []);

  const fetchAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);
      } else {
        Alert.alert("Error", "Authentication token not found. Please login again.");
      }
    } catch (error) {
      console.error("Error fetching auth token:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://192.168.43.246:5000/api/products/getProduct");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities({ ...quantities, [productId]: quantity });
  };

  const handleOrderSubmit = async (productId) => {
    if (!authToken) {
      Alert.alert("Error", "Authentication required. Please login again.");
      return;
    }

    const quantity = quantities[productId] ? parseInt(quantities[productId]) : 1;
    
    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert("Invalid Quantity", "Please enter a valid quantity.");
      return;
    }

    try {
      const order = { products: [{ product: productId, quantity }] };
      console.log("Sending Order Payload:", JSON.stringify(order)); // Debugging

      const response = await axios.post("http://192.168.43.246:5000/api/orders/createOrder", order, {
        headers: { Authorization: `Bearer ${authToken}`, "Content-Type": "application/json" },
      });

      Alert.alert("Success", "Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error);
      Alert.alert("Error", error.response?.data?.message || "Failed to place order.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Product to Order:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#9b87f5" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>${item.price}</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                keyboardType="numeric"
                value={quantities[item._id] || ""}
                onChangeText={(text) => handleQuantityChange(item._id, text)}
              />

              <TouchableOpacity style={styles.button} onPress={() => handleOrderSubmit(item._id)}>
                <Text style={styles.buttonText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  label: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  description: { fontSize: 14, color: "#555", marginBottom: 6 },
  price: { fontSize: 16, fontWeight: "bold", color: "#9b87f5" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: "#fff",
  },
  button: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center" },
});
