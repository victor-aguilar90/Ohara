import { Text, View, TextInput, StyleSheet, Modal, Pressable } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { useState } from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


export default function Senha () {

    const [modalVisible, setModalVisible] = useState(false);

    const [fontsLoaded] = useFonts({
        'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Light': require('../assets/fonts/Poppins-Light.ttf'),
        
    });

    const router = useRouter();
  
    const mostrarPopupTempo = () => {
        setModalVisible(true);

        setTimeout(() => {
            setModalVisible(false);
            router.push("/");
        }, 2500); 
    };
    
    if (!fontsLoaded) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style = {Styles.container}>
            <View style = {Styles.form}>
                <Text style = {Styles.tituloRec}>Redefinir sua senha</Text>
                <Text style={Styles.subTit}>Certifique-se de usar uma combinação segura de letras, números e símbolos para proteger sua conta.</Text>
                <Text style = {Styles.label}>Senha:</Text>
                <TextInput style = {Styles.inp} keyboardType="visible-password" placeholder="Deve conter 8 dígitos"/>
                <Text style = {Styles.label}>Confirmar senha:</Text>
                <TextInput style = {Styles.inp} keyboardType="visible-password" placeholder="Confirme sua nova senha"/>
                <Pressable style={Styles.botao} onPress={mostrarPopupTempo}>
                    <Text style={Styles.botaoTexto}>REDEFINIR</Text>
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
                        <FontAwesomeIcon icon={faCircleCheck} size={45} color="green"/>
                        <Text style={Styles.txtPopup}>Redefinição feita com sucesso!</Text>
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
        justifyContent: "center"
    },


    form: {
        width: "80%",
        alignItems: "center",
    },

    tituloRec: { 
        fontSize: RFPercentage(3),
        fontFamily: "Regular",
        width: "100%",
        marginBottom: 10
    },

    subTit: {
        width:"100%",
        textAlign: "left",
        fontFamily: "Light",
        fontSize: RFPercentage(2),
        marginBottom: 15
    },

    label: {
        fontFamily:"Regular",
        width: "100%",
        fontSize: RFPercentage(2.7),
        marginBottom: 3
    },

    inp: {
        width: "100%",
        height: 55,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
        fontFamily: "Light",
        fontSize: RFPercentage(2),
        paddingLeft: 10,
        marginBottom: 15

    },

    botao: {
        width: "100%",
        height: 50,
        color: "white",
        backgroundColor: "black",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 10,
        marginTop: 4,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        elevation: 5,
      },
    
    botaoTexto: {
       fontFamily:'Medium',
       fontSize: RFPercentage(2.7),
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
        height: 200,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius:10
      },
    
      txtPopup: {
        fontFamily:"Regular",
        fontSize:RFPercentage(2),
        width: "50%",
        textAlign: "center",
        marginTop: 15
      }
    

    
});