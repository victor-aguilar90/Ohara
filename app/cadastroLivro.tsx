/*
import { Text, View, TextInput, StyleSheet, Modal, Pressable, Button } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { useState } from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';


export default function CadastroLivro () {

    const [modalVisible, setModalVisible] = useState(false);

    const [imageUri, setImageUri] = useState(null);

    const pickImage = async () => {
    // Solicitar permissões para acessar a galeria
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permissão para acessar a galeria foi negada!');
      return;
    }

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
        }, 2500); 
    };
    
    if (!fontsLoaded) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style = {Styles.container}>
            <View style = {Styles.form}>
                <Text style = {Styles.tituloRec}>Cadastrar Livros</Text>
                
                <Text style = {Styles.label}>Título:</Text>
                <TextInput style = {Styles.inp} placeholder="Digite o título"/>
                <Text style = {Styles.label}>Autor:</Text>
                <TextInput style = {Styles.inp} placeholder="Digite o nome do autor"/>
                <Text style = {Styles.label}>Descrição:</Text>
                <TextInput style = {Styles.inp} placeholder="Digite uma pequena descrição"/>
                <Text style = {Styles.label}>Quantidade Dísponivel:</Text>
                <TextInput style = {Styles.inp} placeholder="Digite o título"/>
                <Text style = {Styles.label}>Anexar Imagem:</Text>
                <Button title="Selecionar Imagem" onPress={pickImage} />

                <Pressable style={Styles.botao} onPress={mostrarPopupTempo}>
                    <Text style={Styles.botaoTexto}>CADASTRAR</Text>
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
*/