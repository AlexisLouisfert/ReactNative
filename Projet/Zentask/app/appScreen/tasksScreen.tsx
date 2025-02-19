import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useTasks } from '../context/tasksContext';

export default function TasksScreen() {
  const { tasks, loadTasks, addTask, updateTask, deleteTask } = useTasks();
  const [newTask, setNewTask] = useState('');

  // Charger (ou recharger) les tâches lors du montage de l’écran
  useEffect(() => {
    loadTasks();
  }, []);

  // Fonction de création de tâche
  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask); // Ajouter une tâche avec le texte
      setNewTask(''); // Réinitialiser l'input
    } else {
      Alert.alert('Erreur', 'La tâche ne peut pas être vide.');
    }
  };

  // Fonction de suppression de tâche
  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  // Fonction pour marquer une tâche comme terminée
  const handleToggleTask = (taskId: string) => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      updateTask(taskId, { completed: !task.completed }); // Mise à jour du statut de la tâche
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nouvelle tâche..."
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
      />
      
      <TouchableOpacity onPress={handleAddTask}>
        <Text style={styles.button}>Ajouter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={loadTasks}>
        <Text style={styles.button}>Rafraîchir</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={[styles.taskText, item.completed && styles.completedText]}>
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => handleToggleTask(item.id)}>
                <Text style={styles.button}>✅</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Text style={styles.button}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#ffffff',
    fontSize: 16,
    width: "80%",
  },
  button: {
    fontSize: 18,
    color: "lightsteelblue",
    backgroundColor: "midnightblue",
    textAlign: "center",
    padding: 10,
    width: "80%",
    marginTop: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    width: "80%",
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  textinput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "80%",
    marginBottom: 10,
  },
});
