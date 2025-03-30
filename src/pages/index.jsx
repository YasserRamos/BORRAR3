import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const [tempData, setTempData] = useState("");
  const [data, setData] = useState("");
  const [storedData, setstoredData] = useState("");

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("userData", data);
      setTempData(data);
      Alert.alert("✅ Guardado", "Dato guardado correctamente.");
    } catch (error) {
      Alert.alert("❌ Error", "No se pudo guardar el dato.");
    }
  };

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem("userData");
      if (value !== null) {
        setstoredData(value);
      }
    } catch (error) {
      Alert.alert("❌ Error", "No se pudo cargar el dato.");
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      setstoredData("");
      Alert.alert("🗑️ Eliminado", "Dato eliminado correctamente.");
    } catch (error) {
      Alert.alert("❌ Error", "No se pudo eliminar el dato.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 AsyncStorage</Text>

      <Text style={styles.label}>Ingresa un dato:</Text>
      <TextInput
        value={data}
        onChangeText={setData}
        placeholder="Ej. Mi nombre"
        placeholderTextColor="#90A4AE"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="💾 Guardar Dato" onPress={saveData} color="#1976D2" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="📥 Cargar Dato" onPress={loadData} color="#388E3C" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="🗑️ Eliminar Dato" onPress={clearData} color="#D32F2F" />
      </View>

      {storedData ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Dato guardado:</Text>
          <Text style={styles.resultText}>{storedData}</Text>
        </View>
      ) : null}

      {tempData ? (
        <Text style={styles.temp}>🕒 Dato temporal: {tempData}</Text>
      ) : null}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#ECEFF1",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#263238",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#455A64",
  },
  input: {
    borderWidth: 1,
    borderColor: "#B0BEC5",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    fontSize: 16,
    color: "#263238",
  },
  buttonContainer: {
    marginBottom: 14,
  },
  resultBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#B0BEC5",
    padding: 16,
    marginTop: 25,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#37474F",
    marginBottom: 4,
  },
  resultText: {
    fontSize: 18,
    color: "#263238",
  },
  temp: {
    marginTop: 20,
    fontSize: 14,
    color: "#607D8B",
    fontStyle: "italic",
  },
});
