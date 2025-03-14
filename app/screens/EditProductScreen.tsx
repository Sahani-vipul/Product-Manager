import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

// Define Product Type
type Product = {
  _id: string;
  productName: string;
  description: string;
  price: number;
};

// Type for EditProductScreen Props
type EditProductProps = NativeStackScreenProps<RootStackParamList, "EditProduct">;

const EditProductScreen: React.FC<EditProductProps> = ({ navigation, route }) => {
  const { product: initialProduct } = route.params;
  const [product, setProduct] = useState<Product>({ ...initialProduct });

  const handleUpdate = async () => {
    try {
      await axios.put(`http://192.168.43.246:5000/api/products/update/${product._id}`, product);
      Alert.alert("Success", "Product updated successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Update Error:", error);
      Alert.alert("Error", "Failed to update product.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name:</Text>
      <TextInput
        style={styles.input}
        value={product.productName}
        onChangeText={(text) =>
          setProduct((prev) => ({ ...prev, productName: text }))
        }
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={product.description}
        onChangeText={(text) =>
          setProduct((prev) => ({ ...prev, description: text }))
        }
      />

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={String(product.price)}
        keyboardType="numeric"
        onChangeText={(text) =>
          setProduct((prev) => ({
            ...prev,
            price: parseFloat(text) || 0,
          }))
        }
      />

      <Button title="Update Product" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 8, borderRadius: 5 },
});

export default EditProductScreen;
