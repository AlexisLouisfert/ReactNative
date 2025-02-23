import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNotes } from '../context/diaryContext';

export default function DiaryScreen() {
  const { notes, loadNotes, addNote, updateNote, deleteNote } = useNotes();
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState<{ id: string; text: string } | null>(null);

  // Charger les notes au montage de l'écran
  useEffect(() => {
    loadNotes();
  }, []);

  // Ajouter une note
  const handleAddNote = async () => {
    if (newNote.trim() === '') {
      Alert.alert('Erreur', 'La note ne peut pas être vide.');
      return;
    }
    await addNote(newNote);
    setNewNote('');
  };

  // Modifier une note
  const handleEditNote = async () => {
    if (!editingNote) return;
    await updateNote(editingNote.id, newNote);
    setNewNote('');
    setEditingNote(null);
  };

  // Supprimer une note (adapter uniquement pour telephone)
  const handleDeleteNote = async (noteId: string) => {
    Alert.alert('Supprimer', 'Voulez-vous supprimer cette note ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', onPress: async () => await deleteNote(noteId), style: 'destructive' },
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nouvelle note..."
        value={newNote}
        onChangeText={setNewNote}
        style={styles.input}
      />
      
      <TouchableOpacity onPress={editingNote ? handleEditNote : handleAddNote}>
        <Text style={styles.button}>{editingNote ? 'Modifier' : 'Ajouter'}</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{item.text}</Text>
            <TouchableOpacity onPress={() => { setEditingNote(item); setNewNote(item.text); }}>
                <Text style={styles.button}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
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
  noteContainer: {
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
  noteText: {
    fontSize: 16,
    flex: 1,
  },
});
