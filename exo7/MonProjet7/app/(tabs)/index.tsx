import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationIndependentTree } from '@react-navigation/native';
import AuthScreen from '../confScreen/AuthScreen';
import PreferenceScreen from '../confScreen/PreferenceScreen';

const Stack = createStackNavigator();

export default function App() {
    return(
      <NavigationIndependentTree>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Authentification'  
                              component={AuthScreen} 
                              options={{ title: 'Authentification', 
                              headerStyle: { 
                                backgroundColor: 'midnightblue' },
                                headerTintColor: 'lightsteelblue' }
                              }/>
                <Stack.Screen name='Preference'  
                              component={PreferenceScreen} 
                              options={{ title: 'Preference', 
                              headerStyle: { 
                                backgroundColor: 'deeppink' },
                                headerTintColor: 'saddlebrown' }
                              }/>
            </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    );
  }