import { Text, View, TextInput, StyleSheet, Modal, Pressable } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck, faPaperclip} from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { useState } from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as ImagePicker from 'expo-image-picker';


export default function CadastroLivro () {

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Função para abrir a galeria
  const pickImage = async () => {
    try {
      // Solicitar permissões de acesso
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert("Permissão necessária", "Você precisa permitir o acesso à galeria para anexar imagens.");
        return;
      }

      // Abrir a galeria
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Apenas imagens
        allowsEditing: true, // Permitir edição
        aspect: [4, 3], // Proporção do corte
        quality: 1, // Qualidade da imagem (0 a 1)
      });

      if (!result.canceled) {
        // Salvar a URI da imagem
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar anexar a imagem.");
      console.error(error);
    }
  };

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
                <TextInput style = {Styles.inp} placeholder="Digite a quantidade"/>
                <Text style = {Styles.label}>Anexar Imagem:</Text>
                <Pressable onPress={pickImage} style={Styles.anexo}>
                    <FontAwesomeIcon icon={faPaperclip} color="white" size={26} />
                    <Text style={Styles.txtAnexo}>Escolher Imagem</Text>
                </Pressable>
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
                        <Text style={Styles.txtPopup}>Cadastro feito com sucesso!</Text>
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
        fontSize: RFPercentage(2.3),
        marginTop: 10
    },

    inp: {
        width: "100%",
        height: 45,
        borderBottomColor: "black",
        borderBottomWidth: 1,
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
        marginTop: 15,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        elevation: 5,
      },
    
    botaoTexto: {
       fontFamily:'Medium',
       fontSize: RFPercentage(2.4),
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
      },

      anexo: {
        marginTop: 5,
        width: "80%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        flexDirection: "row",
        marginBottom:10,
        borderRadius: 10
      },
      
      txtAnexo: {
        color: "white",
        fontFamily: "Regular",
        fontSize: RFPercentage(2),
        marginLeft: 14

      }
    

    
});
