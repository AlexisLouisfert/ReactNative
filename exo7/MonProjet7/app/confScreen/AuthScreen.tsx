import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import {app} from '../configFirebase/firebaseConfig';

export default function AuthScreen({navigation} : any) {
    const auth = getAuth(app);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const email = userCredential.user.email ?? "Email inconnu";
                setUser(email);
            })
            .catch((error) => alert(error.message));
    };

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) =>{
                const email = userCredential.user.email ?? "Email inconnu";
                setUser(email);
            })
            .catch((error) => alert(error.message));
    };

    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                setUser('');
            })
            .catch((error) => alert(error.message));
    };
   
    return (
        <View style={styles.container}>
            <TextInput style={styles.textinput} placeholder="Email" value={email} onChangeText={setEmail}/>
            <TextInput style={styles.textinput} placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword}/>

            <TouchableOpacity onPress={signUp}>
                <Text style={styles.button}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signIn}>
                <Text style={styles.button}>Se connecter</Text>
            </TouchableOpacity>
            {user ? <Text>Bienvenue {user} !</Text> : null}
            <TouchableOpacity onPress={signOutUser}>
                <Text style={styles.button}>Se déconnecter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Preference')}>
                <Text style={styles.button}>Aller aux Préférences</Text>
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