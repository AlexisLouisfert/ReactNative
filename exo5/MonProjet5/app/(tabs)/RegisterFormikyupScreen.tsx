import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function RegisterFormikyupScreen() {
    return (
        <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={Yup.object({
                name: Yup.string().required('Champ requis'),
                email: Yup.string().email('Invalid email address').required('Champ requis'),
                password: Yup.string().min(6, 'Too Short!').required('Champ requis'),
                confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Les mots de passe doivent correspondre").required('Champ requis'),
            })}
            onSubmit={(values, { resetForm, setStatus }) => {
                setStatus("✅ Inscription réussie !");
                setTimeout(() => {
                  resetForm();
                  setStatus("");
                }, 3000); 
              }}
              
        >
            {({handleChange, handleSubmit, handleBlur, values, errors, status}) => (
                <View style={styles.container}>
                    
                        <TextInput style={styles.input} placeholder="Nom" value={values.name} onChangeText={handleChange('name')} onBlur={handleBlur("name")}/>
                        {errors.name ? <Text style={{ color: 'red' }}>{errors.name}</Text> : null}
                        <TextInput style={styles.input} placeholder="Email" value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur("name")}/>
                        {errors.email ? <Text style={{ color: 'red' }}>{errors.email}</Text> : null}
                        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur("password")}/>
                        {errors.password ? <Text style={{ color: 'red' }}>{errors.password}</Text> : null}
                        <TextInput style={styles.input} placeholder="Confirmer le mot de passe" secureTextEntry value={values.confirmPassword} onChangeText={handleChange('confirmPassword')} onBlur={handleBlur("confirmPassword")}/>
                        {errors.confirmPassword ? <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text> : null}

                    <TouchableOpacity onPress={() => handleSubmit()}>
                        <Text style={styles.button}>Entrer</Text>
                    </TouchableOpacity>

                    {status && <Text style={styles.success}>{status}</Text>}

                </View>
            )}
        </Formik>
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
        marginTop: 10,
    },
    success: {
        color: "green",
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    button: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: '#000',
        textAlign: 'center',
        marginTop: 10,
    },
});