import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../configFirebase/firebaseConfig";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  password: Yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").required("Le mot de passe est requis"),
});

export default function AuthScreen({ navigation }: any) {
  const [user, setUser] = useState("");

  const handleSignUp = (values: { email: string; password: string }) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        setUser(userCredential.user.email ?? "Email inconnu");
        handleSignIn(values);
        navigation.navigate("Home");
      })
      .catch((error) => alert(error.message));
  };

  const handleSignIn = (values: { email: string; password: string }) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        setUser(userCredential.user.email ?? "Email inconnu");
      })
      .catch((error) => alert(error.message));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => setUser(""))
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setStatus }) => {
            handleSignIn(values);
            setStatus("✅ Connexion réussie !");
            setTimeout(() => {
              resetForm();
              navigation.navigate("Home");
              setStatus("");
            }, 3000); 
          }}
      >
        {({ handleChange, handleSubmit, handleBlur,values, errors, status }) => (
          <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Email" value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur("email")}/>
            {errors.email ? <Text style={{ color: 'red' }}>{errors.email}</Text> : null}
            <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur("password")}/>
            {errors.password ? <Text style={{ color: 'red' }}>{errors.password}</Text> : null}

            <TouchableOpacity onPress={() => handleSignUp(values)}>
              <Text style={styles.button}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSubmit()}>
              <Text style={styles.button}>Se connecter</Text>
            </TouchableOpacity>
            {status && <Text style={styles.success}>{status}</Text>}
            {user ? <Text>Bienvenue {user} !</Text> : null}
            <TouchableOpacity onPress={handleSignOut}>
                <Text style={styles.button}>Se déconnecter</Text>
            </TouchableOpacity>
            </View>
        )}
      </Formik>

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
