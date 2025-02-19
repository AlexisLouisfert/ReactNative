import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../configFirebase/firebaseConfig';
import { getAuth } from 'firebase/auth';

// Création du contexte pour les tâches
const TaskContext = createContext<{
  tasks: { id: string; title: string; completed: boolean; createdBy: string }[];
  addTask: (title: string) => Promise<void>;
  updateTask: (taskId: string, updatedData: Partial<{ title: string; completed: boolean }>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
} | undefined>(undefined);

// Fonction TaskProvider qui initialise et fournit les données du contexte
export default function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<{ id: string; title: string; completed: boolean; createdBy: string }[]>([]);
  const auth = getAuth();

  // Fonction pour récupérer les tâches de l'utilisateur connecté
  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      const tasksCol = collection(db, 'tasks');
      const unsubscribe = onSnapshot(tasksCol, (querySnapshot) => {
        const taskList = querySnapshot.docs
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              completed: data.completed,
              createdBy: data.createdBy
            };
          })
          .filter(task => task.createdBy === user.uid); // Filtrer par utilisateur
  
        setTasks(taskList);
      });
  
      return () => unsubscribe(); // Nettoyage du listener
    }
  }, []);
  
  // Ajouter une tâche
  const addTask = async (title: string) => {
    try {
      const user = auth.currentUser; // Obtenez l'utilisateur connecté
      if (!user) throw new Error("Aucun utilisateur connecté.");

      // Ajouter une tâche avec l'UID de l'utilisateur
      await addDoc(collection(db, 'tasks'), {
        title,
        completed: false,
        createdBy: user.uid, // Associer l'UID de l'utilisateur à la tâche
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
    }
  };

  // Mettre à jour une tâche
  const updateTask = async (taskId: string, updatedData: Partial<{ title: string; completed: boolean }>) => {
    try {
      const taskDoc = doc(db, 'tasks', taskId);
      await updateDoc(taskDoc, updatedData);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
    }
  };

  // Supprimer une tâche
  const deleteTask = async (taskId: string) => {
    try {
      const taskDoc = doc(db, 'tasks', taskId);
      await deleteDoc(taskDoc);
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
    }
  };

  // Fournir le contexte avec les valeurs définies
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// Accéder au contexte plus facilement
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
