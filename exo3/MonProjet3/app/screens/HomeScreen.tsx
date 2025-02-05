import 'react-native-gesture-handler';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';


export default function HomeScreen({navigation}: any) {

return (

    <View style={styles.container}>
    <Text> test </Text>
    <Button title="Profile" onPress={() => navigation.navigate('Profile',  { itemId : 42 })} />
    <Button title="Details" onPress={() => navigation.navigate('Details')} />
    

    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
});