

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ProductListScreen from "../screens/ProductListScreen";
import AddProductScreen from "../screens/AddProductScreen";
import OrderScreen from "../screens/OrderScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./AppNavigator"; // Import the root stack type

// Define types for the bottom tab navigator
export type BottomTabParamList = {
  Products: undefined;
  "Add Product": undefined;
  Orders: undefined;
  Logout: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Auth" }], // Reset stack to AuthNavigator
    });
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: Record<keyof BottomTabParamList, keyof typeof Ionicons.glyphMap> = {
            Products: "list",
            "Add Product": "add-circle",
            Orders: "cart",
            Logout: "log-out-outline",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Products" component={ProductListScreen} />
      {/* <Tab.Screen name="Add Product" component={AddProductScreen} /> */}
      <Tab.Screen name="Orders" component={OrderScreen} />
      {/* Custom Logout Tab */}
      <Tab.Screen
        name="Logout"
        component={() => <View />} // Empty screen to avoid errors
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              onPress={handleLogout}
              style={{ alignItems: "center", padding: 10 }}
            >
              <Ionicons name="log-out-outline" size={24} color="red" />
              <Text style={{ color: "red", fontSize: 12 }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
