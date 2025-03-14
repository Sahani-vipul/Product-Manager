import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { List, PlusCircle } from "lucide-react-native";
import AllOrders from "./AllOrders";
import PlaceOrder from "./PlaceOrder";

export default function OrderScreen() {
  const [activeTab, setActiveTab] = useState("allOrders");

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "allOrders" && styles.activeTab]}
          onPress={() => setActiveTab("allOrders")}
        >
          <List size={20} />
          <Text style={styles.tabText}>All Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "placeOrder" && styles.activeTab]}
          onPress={() => setActiveTab("placeOrder")}
        >
          <PlusCircle size={20} />
          <Text style={styles.tabText}>Place Order</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === "allOrders" ? <AllOrders /> : <PlaceOrder />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  tabContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  tab: { flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 2, borderBottomColor: "transparent" },
  activeTab: { borderBottomColor: "#007bff" },
  tabText: { marginLeft: 5, fontSize: 16 },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
});
