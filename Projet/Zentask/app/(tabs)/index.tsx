import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationIndependentTree } from '@react-navigation/native';
import AuthScreen from '../appScreen/authScreen';
import HomeScreen from '../appScreen/homeScreen';
import DiaryScreen from '../appScreen/diaryScreen';
//import ProfileScreen from '../appScreen/profileScreen';
import TasksScreen from '../appScreen/tasksScreen';
import TaskProvider from '../context/tasksContext';
import NotesProvider from '../context/diaryContext';

const Stack = createStackNavigator();

export default function App() {
    return(
      <NavigationIndependentTree>
        <TaskProvider><NotesProvider>
          <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Authentification'  
                              component={AuthScreen} 
                              options={{ title: 'Authentification', 
                              headerStyle: { 
                                backgroundColor: 'midnightblue' },
                                headerTintColor: 'lightsteelblue' }
                              }/>
                <Stack.Screen name='Home'  
                              component={HomeScreen} 
                              options={{ title: 'Accueil', 
                              headerStyle: { 
                                backgroundColor: 'midnightblue' },
                                headerTintColor: 'lightsteelblue' }
                              }/>
                <Stack.Screen name='Diary'  
                              component={DiaryScreen} 
                              options={{ title: 'Journal', 
                              headerStyle: { 
                                backgroundColor: 'midnightblue' },
                                headerTintColor: 'lightsteelblue' }
                              }/>
                {/* <Stack.Screen name='Profile'  
                              component={ProfileScreen} 
                              options={{ title: 'Profil utilisateur', 
                              headerStyle: { 
                                backgroundColor: 'midnightblue' },
                                headerTintColor: 'lightsteelblue' }
                              }/> */}
                  <Stack.Screen name='Tasks'  
                                component={TasksScreen} 
                                options={{ title: 'Tâches', 
                                headerStyle: { 
                                  backgroundColor: 'midnightblue' },
                                  headerTintColor: 'lightsteelblue' }
                                }/>                  
            </Stack.Navigator>
          </NavigationContainer>
        </NotesProvider></TaskProvider>              
      </NavigationIndependentTree>
    );
  }