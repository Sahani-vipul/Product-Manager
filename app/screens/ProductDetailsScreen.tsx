import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { NavigationProp, RouteProp } from "@react-navigation/native";

type ProductDetailsProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: { product: any } }, "params">;
};

const ProductDetailsScreen: React.FC<ProductDetailsProps> = ({ navigation, route }) => {
  const { product } = route.params;

  const handleDelete = async () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await axios.delete(`http://192.168.43.246:5000/api/products/delete/${product._id}`);
            Alert.alert("Success", "Product deleted successfully.");
            navigation.goBack();
          } catch (error) {
            Alert.alert("Error", "Failed to delete product.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{product.productName}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <Text style={styles.stock}>Stock: {product.quantity}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditProduct", { product })}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F9FAFB" },
  header: { fontSize: 24, fontWeight: "bold", color: "#333" },
  description: { fontSize: 16, color: "#555", marginVertical: 8 },
  price: { fontSize: 18, fontWeight: "bold", color: "#9b87f5" },
  category: { fontSize: 14, color: "#777" },
  stock: { fontSize: 14, color: "#777", marginBottom: 20 },
  editButton: { backgroundColor: "#9b87f5", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  deleteButton: { backgroundColor: "#ff4d4f", padding: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default ProductDetailsScreen;
