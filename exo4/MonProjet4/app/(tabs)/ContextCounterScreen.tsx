import { useCounter } from "../context/CounterContext";
import { Button, Text, StyleSheet,TouchableOpacity, View } from "react-native";

export default function ContextCounterScreen(){
    const { count, increment, decrement, reset } = useCounter();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Context</Text>
            <Text>Compteur : {count}</Text>
            <Button title="Incrémenter" onPress={increment} />
            <Button title="Décrémenter" onPress={decrement} />
            <TouchableOpacity onPress={reset}>
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





