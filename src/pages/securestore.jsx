import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function SecureStoreTab() {
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useState('');

  const saveData = async () => {
    try {
      await SecureStore.setItemAsync('secure_key', inputValue);
      alert('Dato guardado correctamente');
      setInputValue('');
    } catch (error) {
      alert('Error al guardar el dato');
    }
  };

  const loadData = async () => {
    try {
      const value = await SecureStore.getItemAsync('secure_key');
      if (value) {
        setStoredValue(value);
      } else {
        alert('No hay datos almacenados');
      }
    } catch (error) {
      alert('Error al recuperar los datos');
    }
  };

  const deleteData = async () => {
    try {
      await SecureStore.deleteItemAsync('secure_key');
      setStoredValue('');
      alert('Dato eliminado');
    } catch (error) {
      alert('Error al eliminar los datos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Secure Store</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe algo para guardar..."
        value={inputValue}
        onChangeText={setInputValue}
        placeholderTextColor="#90A4AE"
      />

      <View style={styles.buttonGroup}>
        <Button title="💾 Guardar" onPress={saveData} color="#1976D2" />
        <Button title="📥 Cargar" onPress={loadData} color="#388E3C" />
        <Button title="🗑️ Eliminar" onPress={deleteData} color="#D32F2F" />
      </View>

      {storedValue ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Dato almacenado:</Text>
          <Text style={styles.resultText}>{storedValue}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: '#ECEFF1',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    color: '#263238',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
    fontSize: 16,
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
    marginBottom: 30,
  },
  resultBox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    width: '100%',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#455A64',
  },
  resultText: {
    fontSize: 18,
    color: '#263238',
  },
});
