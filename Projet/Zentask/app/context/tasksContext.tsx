import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../configFirebase/firebaseConfig';
import { getAuth } from 'firebase/auth';

// Typage de chaque tâche
interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdBy: string;
  }
  
  // Typage du contexte
  interface TaskContextValue {
    tasks: Task[];
    loadTasks: () => Promise<void>;
    addTask: (title: string) => Promise<void>;
    updateTask: (taskId: string, updatedData: Partial<Pick<Task, 'title' | 'completed'>>) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
  }
  
  // Création du contexte
  const TaskContext = createContext<TaskContextValue | undefined>(undefined);

// Fonction TaskProvider qui initialise et fournit les données du contexte
export default function TaskProvider({ children }: { children: ReactNode }) {
const [tasks, setTasks] = useState<Task[]>([]);
const auth = getAuth();

/**
   * Fonction pour charger (ou recharger) toutes les tâches
   * depuis Firestore, filtrées par utilisateur connecté.
   */
const loadTasks = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;  // Pas d'utilisateur connecté ?
      
      const tasksCol = collection(db, 'tasks');
      const snapshot = await getDocs(tasksCol);

      const taskList: Task[] = snapshot.docs
        .map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: data.title,
            completed: data.completed,
            createdBy: data.createdBy
          } as Task;
        })
        .filter(task => task.createdBy === user.uid);
      
      setTasks(taskList);
    } catch (error) {
      console.error('Erreur lors du chargement des tâches :', error);
    }
  };

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
      const user = auth.currentUser; 
      if (!user) throw new Error("Aucun utilisateur connecté.");

      await addDoc(collection(db, 'tasks'), {
        title,
        completed: false,
        createdBy: user.uid, 
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
    }
    loadTasks();
  };

  // Mettre à jour une tâche
  const updateTask = async (
    taskId: string,
    updatedData: Partial<Pick<Task, 'title' | 'completed'>>
  ) => {
    try {
      const taskDoc = doc(db, 'tasks', taskId);
      await updateDoc(taskDoc, updatedData);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
    }
    loadTasks();
  };

  // Supprimer une tâche
  const deleteTask = async (taskId: string) => {
    try {
      const taskDoc = doc(db, 'tasks', taskId);
      await deleteDoc(taskDoc);
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
    }
    loadTasks();
  };

  // Fournir le contexte avec les valeurs définies
  return (
    <TaskContext.Provider value={{ tasks, loadTasks, addTask, updateTask, deleteTask }}>
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
