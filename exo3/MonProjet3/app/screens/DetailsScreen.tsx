import 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
return (

    <View style={styles.container}>
    <Text style={styles.title}>C'est good</Text>

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
});