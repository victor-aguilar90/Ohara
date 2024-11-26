import { Text, View,  StyleSheet, Pressable, Image, Modal} from "react-native";
import { faArrowLeft,faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";

export default function Livro() {

    const [fontsLoaded] = useFonts({
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    });

    if (!fontsLoaded) {
      return <Text>Carregando...</Text>;
    }

    const [modalVisible, setModalVisible] = useState(false);

    const mostrarPopupTempo = () => {
      setModalVisible(true);

      setTimeout(() => {
          setModalVisible(false);
      }, 2500); 
    };

  const router = useRouter();


  const { titulo = 'Título não encontrado', imagem, autor, descricao } = useLocalSearchParams(); // useLocalSearchParams é usado aqui

  return (
    <View style={Styles.container}>
      <View style={Styles.topo}>
        <Pressable style={Styles.voltar} onPress={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} size={30} />
        </Pressable>
        <Text style={Styles.titulo}>Detalhes</Text>
      </View>
      {imagem ? (
        <Image source={{ uri: imagem }} style={Styles.imagem} resizeMode="cover" />
      ) : (
        <Text>Imagem não disponível</Text>
      )}
      <Text style={Styles.tituloLivro}>{titulo}</Text>
      <Text style={Styles.autorLivro}>{autor}</Text>
      <Text style={Styles.titDesc}>Descrição:</Text>
      <Text style={Styles.descricao}>{descricao}</Text>
      <Pressable style={Styles.botao2} onPress={mostrarPopupTempo}>
        <Text style={Styles.txtBotao}>RESERVAR</Text>
      </Pressable>

      <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible} 
            onRequestClose={() => setModalVisible(false)} 
            >
                <View style={Styles.fundo}>
                    <View style={Styles.popup}>
                        <FontAwesomeIcon icon={faCircleCheck} size={45} color="green"/>
                        <Text style={Styles.txtPopup}>Reserva feita com sucesso!</Text>
                    </View>
                </View>

            </Modal>
    </View>
  );
}

const Styles = StyleSheet.create ({
    container: {
        flex:1,
        width: "100%",
        alignItems: "center"
    },

    topo: {
        marginTop: 20,
        width: '90%',
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 40
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
        fontSize: RFPercentage(3.5),
        marginLeft: 30
    },

    imagem: {
        width: 155, 
        height: 230, 
        borderRadius: 10, 
        boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.35)',
        elevation: 6,
        marginBottom: 20
    },

    tituloLivro: {
        width: "80%",
        textAlign: "center",
        fontFamily: "Medium",
        fontSize: RFPercentage(3.4)
    },

    autorLivro: {
        fontFamily: "Light",
        fontSize: RFPercentage(2),
        marginBottom:15
    },

    titDesc: {
      width: "80%",
      fontFamily: "Medium",
      fontSize: RFPercentage(2.1),
      marginBottom: 5
    },

    descricao: {
        width: "80%",
        fontFamily: "Regular",
        fontSize: RFPercentage(2),
        textAlign: "justify",
        marginBottom: 25
    },

    botao2: {
      position: "absolute",
      left:"15%",
      bottom: 30,
      right:"15%",
      width: "70%",
      height: 70,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "black",
      borderRadius: 10,
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.35)',
    },

    txtBotao: {
        fontSize: RFPercentage(3.2),
        color: "white",
        fontFamily: "Medium"
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
})