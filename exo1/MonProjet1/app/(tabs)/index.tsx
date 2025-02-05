import { View, Text, StyleSheet, Image } from 'react-native';
export default function HomeScreen() {
return (
<View style={styles.container}>
<Image source={require('../../assets/images/smuge-meme-cat.png')} style=
{styles.image} />
<Text style={styles.title}>Bienvenue sur mon app React Native ! 🎉
</Text>
<Text style={styles.subtitle}>Première modification réussie ✅</Text>
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
subtitle: {
fontSize: 18,
color: '#555',
marginTop: 10,
},
});