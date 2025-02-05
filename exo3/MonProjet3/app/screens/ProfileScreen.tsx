import 'react-native-gesture-handler';
import { View, Text, StyleSheet, Button} from 'react-native';


export default function ProfileScreen({route, navigation}:any) {
    const { itemId } = route.params;

return (

    <View style={styles.container}>
    <Text style={styles.title}>itemId : {itemId}</Text>
    <Button title="accueil" onPress={() => navigation.navigate('Home')} />
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