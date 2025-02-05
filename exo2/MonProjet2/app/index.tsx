import { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, FlatList } from 'react-native';

const DATA = [
    { id : '1', title : 'Title 1' },
    { id : '2', title : 'Title 2' },
    { id : '3', title : 'Title 3' },
    { id : '4', title : 'Title 4' },
    { id : '5', title : 'Title 5' }
]
export default function HomeScreen() {
    const [count, setCount] = useState(0);

return (

    <View style={styles.container}>
    <Text style={styles.title}>Bienvenue sur mon app React Native ! 🎉</Text>
    <Image source={require('../assets/images/smuge-meme-cat.png')} style={styles.image} />

    <Text>Compteur : {count}</Text>
    <Button title="Incrémenter" onPress={() => setCount(count + 1)} />
    <Button title="Décrémenter" onPress={() => setCount(count - 1)} />
    <TouchableOpacity onPress={() => setCount(0)}>
        <Text style={styles.button}>Réinitialiser</Text>
    </TouchableOpacity>
    <FlatList 
        data = {DATA}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Text>{item.title}</Text>}
        />

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
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
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