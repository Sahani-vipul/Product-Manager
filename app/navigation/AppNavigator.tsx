

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import MainStackNavigator from "./MainStackNavigator";
import AddProductScreen from "../screens/AddProductScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import EditProductScreen from "../screens/EditProductScreen";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  AddProduct: undefined;
  ProductDetails: { product: any }; // Ensure navigation passes a product object
  EditProduct: { product: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainStackNavigator} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="EditProduct" component={EditProductScreen} />
    </Stack.Navigator>
  );
}
