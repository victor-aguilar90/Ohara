import { Text, View, TextInput, StyleSheet, Modal, Pressable } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Cadastro () {

    const [modalVisible, setModalVisible] = useState(false);

    const [fontsLoaded] = useFonts({
        'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Light': require('../assets/fonts/Poppins-Light.ttf'),
        
    });

    const router = useRouter();
    
    if (!fontsLoaded) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style = {Styles.container}>
            <View style={Styles.topo}>
                <Pressable style={Styles.voltar} onPress={() => router.back()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={30} />
                </Pressable>
                <Text style={Styles.titulo}>Voltar</Text>
            </View>
            <View style = {Styles.form}>
                <Text style = {Styles.tituloRec}>recuperar sua senha</Text>
                <Text style={Styles.subTit}>Esqueceu sua senha? Não se preocupe! Vamos te ajudar a recuperar o acesso à sua conta em poucos passos. Vamos te enviar um código de 6 dígitos pelo email cadastrado.</Text>
                <Text style = {Styles.label}>Email</Text>
                <TextInput style = {Styles.inp} keyboardType="email-address" placeholder="Digite seu email cadastrado"/>
                <Pressable style={Styles.botao} onPress={() => setModalVisible(true)}>
                    <Text style={Styles.botaoTexto}>ENVIAR</Text>
                </Pressable>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible} 
                onRequestClose={() => setModalVisible(false)} 
            >
                <View style={Styles.fundo}>
                    <View style={Styles.popup}>
                        <Text style={Styles.txtPopup}>Verifique seu e-mail</Text>
                        <Text style={Styles.subPopup}>Insira o código de segurança que enviamos para o seu e-mail para continuar o processo de recuperação de senha.</Text>
                        <TextInput placeholder="Dígite os 6 dígitos" style = {Styles.input}/>
                        <Pressable style={Styles.botao} onPress={() => router.push("/senhaNova")}>
                            <Text style={Styles.botaoTexto}>VERIFICAR</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal>
        </View>
    );
}

const Styles = StyleSheet.create ({
    container: {
        width:"100%",
        height:"100%",
        alignItems: "center",
    },

    topo: {
        marginTop: 20,
        width: '80%',
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 60
    },

    voltar: {
        backgroundColor: "white",
        width: 60,
        height: 60,
        borderRadius: 100,
        borderWidth: 0,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },

    titulo: {
        fontFamily: "Regular",
        fontSize: 24,
        marginLeft: 30
    },

    form: {
        width: "80%",
        alignItems: "center",
        height:200,


    },

    tituloRec: { 
        fontSize: 24,
        fontFamily: "Regular",
        width: "100%",
        marginBottom: 10
    },

    subTit: {
        width:"100%",
        textAlign: "left",
        fontFamily: "Light",
        fontSize: 14,
        marginBottom: 15
    },

    label: {
        fontFamily:"Regular",
        width: "100%",
        fontSize: 20,
        marginBottom: 3
    },

    inp: {
        width: "100%",
        height: 55,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
        fontFamily: "Light",
        fontSize: 15,
        paddingLeft: 10

    },

    botao: {
        width: "100%",
        height: 50,
        color: "white",
        backgroundColor: "black",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 10,
        marginTop: 20,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        elevation: 5,
      },
    
    botaoTexto: {
       fontFamily:'Medium',
       fontSize: 21,
       color: "white"
    },

    fundo: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
    
      popup: {
        width: "80%",
        padding:20,
        height: 350,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius:10
      },

      txtPopup: {
        fontFamily: "Medium",
        fontSize: 19,
        marginBottom: 10
      },

      subPopup: {
        fontFamily: "Light",
        fontSize: 14,
        marginBottom: 15
      },

      input: {
        width: "100%",
        height: 55,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
        fontFamily: "Light",
        fontSize: 14,
        paddingLeft: 10
      }

    
});