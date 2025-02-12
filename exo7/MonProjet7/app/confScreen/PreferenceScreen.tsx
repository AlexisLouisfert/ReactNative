import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PreferenceScreen({navigation} : any) {
    const [name, setName] = useState('');
    const [savedName, setSavedName] = useState('');

    const saveData = async () => {
        await AsyncStorage.setItem('username', name);
    }

    const loadData = async () => {
        const storeName = await AsyncStorage.getItem('username');
        setSavedName(storeName || 'Aucun nom enregistré');
    }
    return (
        <View style={styles.container}>
            <Text>Entrez votre nom :</Text>
            <TextInput style={styles.textinput} placeholder="Nom" value={name} onChangeText={setName}/>
            <TouchableOpacity onPress={saveData}>
                <Text style={styles.button}>sauvegarder le nom</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={loadData}>
                <Text style={styles.button}>charger le nom</Text>
            </TouchableOpacity>
            <Text>Nom enregistré : {savedName}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Authentification')}>
                <Text style={styles.button}>Retour à l'authentification</Text>
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
    textinput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    button: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: '#000',
        textAlign: 'center',
        marginTop: 10,
    },
});