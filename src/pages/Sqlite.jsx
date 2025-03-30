import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

let db;

const initDB = async () => {
  try {
    db = await SQLite.openDatabaseAsync('tasks.db');
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );
    `);
    console.log('Base de datos lista.');
  } catch (error) {
    console.error('Error al iniciar la base de datos:', error);
  }
};

const addTask = async (task) => {
  try {
    if (!task.trim()) return;

    // Elimina todas las tareas anteriores
    await db.runAsync('DELETE FROM tasks;');

    // Inserta la nueva tarea
    const result = await db.runAsync('INSERT INTO tasks (name) VALUES (?);', [task]);
    console.log('Tarea guardada con ID:', result.lastInsertRowId);
  } catch (error) {
    console.error('Error al guardar la tarea:', error);
  }
};


const getLastTask = async () => {
  try {
    const result = await db.getAllAsync('SELECT * FROM tasks ORDER BY id DESC LIMIT 1;');
    return result[0] || null;
  } catch (error) {
    console.error('Error al obtener la última tarea:', error);
    return null;
  }
};

export default function SQLiteScreen() {
  const [taskName, setTaskName] = useState('');
  const [lastTask, setLastTask] = useState(null);

  useEffect(() => {
    initDB();
  }, []);

  const handleAddTask = async () => {
    if (taskName.trim() === '') {
      Alert.alert('Campo vacío', 'Debes escribir una tarea antes de guardarla.');
      return;
    }
    await addTask(taskName);
    setTaskName('');
  };

  const handleShowLast = async () => {
    const task = await getLastTask();
    if (task) {
      setLastTask(task);
    } else {
      Alert.alert('Sin tareas', 'Aún no has guardado ninguna tarea.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarea Guardada</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe una nueva tarea"
        value={taskName}
        onChangeText={setTaskName}
      />

      <View style={styles.buttonGroup}>
        <Button title="Guardar tarea" onPress={handleAddTask} color="#1976D2" />
        <Button title="Mostrar última tarea" onPress={handleShowLast} color="#388E3C" />
      </View>

      {lastTask && (
        <View style={styles.taskBox}>
          <Text style={styles.taskText}>Última tarea: {lastTask.name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#263238',
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#B0BEC5',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 30,
  },
  taskBox: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#90A4AE',
    backgroundColor: '#ECEFF1',
    borderRadius: 8,
    width: '100%',
  },
  taskText: {
    fontSize: 18,
    color: '#37474F',
  },
});
