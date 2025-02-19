import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../configFirebase/firebaseConfig';
import { getAuth } from 'firebase/auth';

// Création du contexte pour les tâches`
const TaskContext = createContext<{
  tasks: { id: string; title: string; completed: boolean; createdBy: string; }[];
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
      const fetchTasks = async () => {
        const user = auth.currentUser; // Obtenez l'utilisateur connecté
        if (!user) return; // Si aucun utilisateur n'est connecté, ne rien faire
  
        const tasksCol = collection(db, 'tasks');
        const taskSnapshot = await getDocs(tasksCol);
        const taskList = taskSnapshot.docs
          .filter(doc => doc.data().createdBy === user.uid) // Filtrer les tâches par email
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || '',  // Vérifie si le titre existe
              completed: data.completed || false, // Vérifie si 'completed' existe
              createdBy: data.createdBy || '', // Vérifie si 'createdBy' existe
            };
          });
  
        setTasks(taskList);
      };
  
      fetchTasks();
    }, []); // Ceci se déclenche une seule fois lors du montage du composant
  
    // Mise à jour en temps réel des tâches
    useEffect(() => {
      const user = auth.currentUser; // Obtenez l'utilisateur connecté
      if (!user) return;
  
      const tasksCol = collection(db, 'tasks');
      const unsubscribe = onSnapshot(tasksCol, snapshot => {
        const taskList = snapshot.docs
          .filter(doc => doc.data().createdBy === user.uid) // Filtrer les tâches par email
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || '',
              completed: data.completed || false,
              createdBy: data.createdBy || '',
            };
          });
  
        setTasks(taskList);
      });
  
      // Cleanup pour ne pas laisser de listeners après la déconnexion
      return () => unsubscribe();
    }, []);

  // Ajouter une tâche
  const addTask = async (title: string) => {
    try {
      const user = getAuth().currentUser;
      if (user) {
        await addDoc(collection(db, 'tasks'), {
          title,
          completed: false,
          createdBy: user.uid,  
        });
      }
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

  // Fournir le contexte avec les tâches
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// Accéder au context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
