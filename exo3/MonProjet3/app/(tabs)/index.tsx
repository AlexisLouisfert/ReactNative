import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationIndependentTree } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
    return(
      <NavigationIndependentTree>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home'  
                              component={HomeScreen} 
                              options={{ title: 'Home', 
                              headerStyle: { 
                                backgroundColor: 'midnightblue' },
                                headerTintColor: 'lightsteelblue' }
                              }/>
                <Stack.Screen name='Details'  
                              component={DetailsScreen} 
                              options={{ title: 'Info User', 
                              headerStyle: { 
                                backgroundColor: 'deeppink' },
                                headerTintColor: 'saddlebrown' }
                              }/>
                <Stack.Screen name='Profile' 
                              component={ProfileScreen} 
                              options={{ title: 'Profil User', 
                              headerStyle: { 
                                backgroundColor: 'seagreen' },
                                headerTintColor: 'rebeccapurple' }
                              }/>
            </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    );
  }