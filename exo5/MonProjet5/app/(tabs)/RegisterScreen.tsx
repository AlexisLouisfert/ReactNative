import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validateName = () => {
        if(name.length === 0) {
            setError('Name is not valid');
        } else {
            setError('');
        }
    }

    const validateEmail = () => {
        if(!email.includes('@')) {
            setError('Email is not valid');
        } else {
            setError('');
        }
    }

    const validatePassword = () => {
        if(password.length < 6) {
            setError('Password is not valid');
        } else {
            setError('');
        }
    }

    const validateConfirmPassword = () => {
        if(password !== confirmPassword || password.length < 6) {
            setError('Confirm password is not valid');
        } else {
            setError('');
        }
    }

    return (
        <View style={styles.container}>
            <div>
                <TextInput style={styles.input} placeholder="Nom" value={name} onChangeText={setName} onBlur={validateName}/>
            </div>
            <div>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} onBlur={validateEmail}/>
            </div>
            <div>
                <TextInput style={styles.input} placeholder="Mot de passe" value={password} onChangeText={setPassword} onBlur={validatePassword}/>
            </div>
            <div>
                <TextInput style={styles.input} placeholder="Comfirmer le mot de passe" value={confirmPassword} onChangeText={setConfirmPassword} onBlur={validateConfirmPassword}/>
            </div>
                {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

            {!error ? <TouchableOpacity onPress={() => (alert(`Nom: ${name}, Email: ${email}, Password: ${password}, ConfirmPassword: ${confirmPassword}`))}>
                <Text style={styles.button}>Entrer</Text>
            </TouchableOpacity>: null}
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
    button: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: '#000',
        textAlign: 'center',
        marginTop: 10,
    },
});