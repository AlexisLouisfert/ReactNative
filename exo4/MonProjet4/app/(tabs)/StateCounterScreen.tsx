import { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
    const [count, setCount] = useState(0);

return (

    <View style={styles.container}>
    <Text style={styles.title}>Local</Text>
   
    <Text>Compteur : {count}</Text>
    <Button title="Incrémenter" onPress={() => setCount(count + 1)} />
    <Button title="Décrémenter" onPress={() => setCount(count - 1)} />
    <TouchableOpacity onPress={() => setCount(0)}>
        <Text style={styles.button}>Réinitialiser</Text>
    </TouchableOpacity>
    

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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007bff',
        textAlign: 'center',
    },
    button: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: '#000',
        textAlign: 'center',
        marginTop: 10,
    },
});