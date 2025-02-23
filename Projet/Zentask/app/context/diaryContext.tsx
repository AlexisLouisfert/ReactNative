import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../configFirebase/firebaseConfig';
import { getAuth } from 'firebase/auth';

// Typage de chaque note
interface Note {
  id: string;
  text: string;
  createdBy: string;
}

// Typage du contexte
interface NotesContextValue {
  notes: Note[];
  loadNotes: () => Promise<void>;
  addNote: (text: string) => Promise<void>;
  updateNote: (noteId: string, newText: string) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
}

// Création du contexte
const NotesContext = createContext<NotesContextValue | undefined>(undefined);

// Fonction NotesProvider qui initialise et fournit les données du contexte
export default function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const auth = getAuth();

  /**
   * Fonction pour charger (ou recharger) toutes les notes
   * depuis Firestore, filtrées par utilisateur connecté.
   */
  const loadNotes = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return; // Pas d'utilisateur connecté ?
      
      const notesCol = collection(db, 'notes');
      const snapshot = await getDocs(notesCol);

      const notesList: Note[] = snapshot.docs
        .map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            text: data.text,
            createdBy: data.createdBy
          } as Note;
        })
        .filter(note => note.createdBy === user.uid);
      
      setNotes(notesList);
    } catch (error) {
      console.error('Erreur lors du chargement des notes :', error);
    }
  };

  // Fonction pour récupérer les notes de l'utilisateur connecté en temps réel
  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      const notesCol = collection(db, 'notes');
      const unsubscribe = onSnapshot(notesCol, (querySnapshot) => {
        const notesList = querySnapshot.docs
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              text: data.text,
              createdBy: data.createdBy
            };
          })
          .filter(note => note.createdBy === user.uid); // Filtrer par utilisateur

        setNotes(notesList);
      });

      return () => unsubscribe(); // Nettoyage du listener
    }
  }, []);

  // Ajouter une note
  const addNote = async (text: string) => {
    try {
      const user = auth.currentUser; 
      if (!user) throw new Error("Aucun utilisateur connecté.");

      await addDoc(collection(db, 'notes'), {
        text,
        createdBy: user.uid, 
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la note :", error);
    }
    loadNotes();
  };

  // Mettre à jour une note
  const updateNote = async (noteId: string, newText: string) => {
    try {
      const noteDoc = doc(db, 'notes', noteId);
      await updateDoc(noteDoc, { text: newText });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la note :", error);
    }
    loadNotes();
  };

  // Supprimer une note
  const deleteNote = async (noteId: string) => {
    try {
      const noteDoc = doc(db, 'notes', noteId);
      await deleteDoc(noteDoc);
    } catch (error) {
      console.error("Erreur lors de la suppression de la note :", error);
    }
    loadNotes();
  };

  // Fournir le contexte avec les valeurs définies
  return (
    <NotesContext.Provider value={{ notes, loadNotes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}

// Accéder au contexte
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
