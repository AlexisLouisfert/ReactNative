import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function HomeScreen({ navigation }: any) {
    const handleSignOut = () => {
        navigation.navigate("Authentification");
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Diary")}>
            <Text style={styles.button}>Journal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
            <Text style={styles.button}>Tâches</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.button}>Profil utilisateur</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut}>
            <Text style={styles.button}>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      marginTop: 10,
    },
    textinput: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      paddingHorizontal: 10,
      width: "80%",
      marginBottom: 10,
    },
    success: {
      color: "green",
      marginTop: 10,
      fontSize: 16,
      fontWeight: "bold",
    },
    button: {
      fontSize: 18,
      color: "lightsteelblue",
      backgroundColor: "midnightblue",
      textAlign: "center",
      padding: 10,
      width: "80%",
      marginTop: 10,
    },
    error: {
      color: "red",
      fontSize: 12,
      marginBottom: 5,
    },
  });