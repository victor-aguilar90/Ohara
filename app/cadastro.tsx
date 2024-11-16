import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';

export default function Cadastro () {
    return (
        <View style = {Styles.container}>
            <View style = {Styles.form}>
                <Text style = {Styles.titulo}>Cadastre-se</Text>
                <Text style = {Styles.label}>Nome Completo</Text>
                <TextInput style = {Styles.inp}/>
                <Text style = {Styles.label}>Email</Text>
                <TextInput style = {Styles.inp} keyboardType="email-address" />
                <Text style = {Styles.label}>Senha</Text>
                <TextInput style = {Styles.inp} maxLength={10} secureTextEntry={true} />
                <Text style = {Styles.label}>Confirme sua senha</Text>
                <TextInput style = {Styles.inp} maxLength={10} secureTextEntry={true} />
                <TouchableOpacity style={[Styles.botao]}>
                    <Text style = {Styles.botaoTexto}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create ({
    container: {
        width:"100%",
        height:"100%",
        alignItems: "center",
        justifyContent: "center",
    },

    form: {
        width: 290,
        height: 642,
        display:"flex",
        flexDirection: "column"
    },

    titulo: {
        fontFamily:"Medium",
        fontSize: 36,
        marginBottom: 40

    },

    label: {
        fontFamily: "Light",
        fontSize: 20,
        marginBottom: 6
    },

    inp: {
        fontSize: 16,
        fontFamily: "Light",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        height: 44,
        marginBottom: 31,
    },

    botao: {
        width: '100%',
        height: 50,
        color: "white",
        backgroundColor: "black",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 10,
        marginTop: 12,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        elevation: 5,
    },

    botaoTexto: {
        fontFamily: "SemiBold",
        fontSize: 24,
        color:"white",
    }

});