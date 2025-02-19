import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DiaryScreen() {
  const [notes, setNotes] = useState<{ id: string; text: string }[]>([]);
  const [newNote, setNewNote] = useState("");
  const [editingNote, setEditingNote] = useState<{ id: string; text: string } | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  // Charger les notes depuis AsyncStorage
  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem("diary_notes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des notes :", error);
    }
  };

  // Sauvegarder les notes dans AsyncStorage
  const saveNotes = async (notesToSave: { id: string; text: string }[]) => {
    try {
      await AsyncStorage.setItem("diary_notes", JSON.stringify(notesToSave));
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des notes :", error);
    }
  };

  // Ajouter une note
  const addNote = () => {
    if (newNote.trim() === "") {
      Alert.alert("Erreur", "La note ne peut pas être vide.");
      return;
    }

    const newEntry = { id: Date.now().toString(), text: newNote };
    const updatedNotes = [...notes, newEntry];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setNewNote("");
  };

  // Modifier une note
  const editNote = (note: { id: string; text: string }) => {
    setNewNote(note.text);
    setEditingNote(note);
  };

  // Sauvegarder la modification
  const saveEditedNote = () => {
    if (!editingNote) return;

    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id ? { ...note, text: newNote } : note
    );

    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setNewNote("");
    setEditingNote(null);
  };

  // Supprimer une note
  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Écris ta note ici..."
        value={newNote}
        onChangeText={setNewNote}
        style={styles.input}
      />
      {editingNote ? (
        <TouchableOpacity onPress={saveEditedNote}>
          <Text style={styles.button2}>Modifier la note</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={addNote}>
          <Text style={styles.button2}>Ajouter la note</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{item.text}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => editNote(item)} style={styles.button}>
                <Text style={styles.buttonText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteNote(item.id)} style={styles.button}>
                <Text style={styles.buttonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
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
    borderColor: "#bdc3c7",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  noteContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  noteText: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "midnightblue",
    padding: 10,
    borderRadius: 5,
  },
  button2: {
    color: "lightsteelblue",
    backgroundColor: "midnightblue",
    width: "80%",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
