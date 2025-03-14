

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useFocusEffect, NavigationProp } from "@react-navigation/native";

type ProductListProps = {
  navigation: NavigationProp<any>;
};

const ProductListScreen: React.FC<ProductListProps> = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://192.168.43.246:5000/api/products/getProduct"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddProduct")}
      >
        <Text style={styles.addButtonText}>+ Add Product</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#9b87f5" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchProducts} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("ProductDetails", { product: item })}
            >
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.priceCategoryRow}>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
              <Text style={styles.stock}>Stock: {item.quantity}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 12, color: "#333" },
  addButton: {
    backgroundColor: "#9b87f5",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  addButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
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
  productName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  description: { fontSize: 14, color: "#555", marginBottom: 6 },
  priceCategoryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  price: { fontSize: 16, fontWeight: "bold", color: "#9b87f5" },
  category: { backgroundColor: "#f3f4f6", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, fontSize: 12, color: "#333" },
  stock: { fontSize: 12, color: "#777" },
});

export default ProductListScreen;
