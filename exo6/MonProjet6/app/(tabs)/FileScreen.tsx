import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as FileSystem from 'expo-file-system';


export default function FileScreen() {
    const [text, setText] = useState('');

    const saveFile = async () => {
        const path = FileSystem.documentDirectory + 'test.txt';
        try {
            await FileSystem.writeAsStringAsync(path, "Hello expo!", { encoding: FileSystem.EncodingType.UTF8 });
            console.log('Fichier sauvegardé avec succès.');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du fichier :', error);
        }
    };

    const readFile = async () => {
        const path = FileSystem.documentDirectory + 'test.txt';
        try {
            const fileContent = await FileSystem.readAsStringAsync(path, { encoding: FileSystem.EncodingType.UTF8 });
            console.log('Contenu du fichier :', fileContent);
        } catch (error) {
            console.error('Erreur lors de la lecture du fichier :', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Entrez votre texte :</Text>
            <TextInput style={styles.container} placeholder="Tapez ici..." value={text} onChangeText={setText}/>
            <TouchableOpacity onPress={saveFile}>
                <Text style={styles.button}>sauvegarder un fichier</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={readFile}>
                <Text style={styles.button}>lire le fichier</Text>
            </TouchableOpacity>
            <Text>Vous avez tapé : {text}</Text>
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
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
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