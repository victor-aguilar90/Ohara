import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable } from "react-native";
import { faArrowLeft, faPaperclip, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import CaixaAtividade from "@/components/CaixaAtividade";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

export default function Atividades() {
    const router = useRouter();

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

    const [fontsLoaded] = useFonts({
        'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Light': require('../assets/fonts/Poppins-Light.ttf'),
        
    });

    if (!fontsLoaded) {
        return <Text>Carregando fontes...</Text>;
    }

    const [modalVisible, setModalVisible] = useState(false);

  
    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const atividades = [
        { materia: "DTCC", professor: "Prof° Érica", descricao: "Descrição da atividade 1" },
        { materia: "Matemática", professor: "Prof° João", descricao: "Descrição da atividade 2" },
        { materia: "História", professor: "Prof° Ana", descricao: "Descrição da atividade 3" },
        { materia: "Física", professor: "Prof° Carlos", descricao: "Descrição da atividade 4" },
        { materia: "Química", professor: "Prof° Lucas", descricao: "Descrição da atividade 5" },
      ];

    return(
        <View style = {Styles.container}>
            <View style = {Styles.content}>
                <View style = {Styles.topo}>
                    <TouchableOpacity style = {Styles.voltar} onPress={() => router.back()}>
                        <FontAwesomeIcon icon={faArrowLeft} size={30} />
                    </TouchableOpacity>
                    <Text style = {Styles.titulo}>Atividades</Text>
                </View>
                <ScrollView contentContainerStyle = {Styles.rolarAtv}>
                    {atividades.map((atividade, index) => (
                        <CaixaAtividade
                            key={index}
                            materia={atividade.materia}
                            descricao={atividade.descricao}
                            popup={showModal}
                        />
                    ))} 
                </ScrollView>
            </View>
            <Modal
                animationType="fade"  // Pode ser 'slide', 'fade', ou 'none'
                transparent={true}      // Torna o fundo semi-transparente
                visible={modalVisible}  // Controla se o modal está visível
                onRequestClose={hideModal}  // Fechar o modal ao pressionar o botão de "Voltar"
            >
                <View style={Styles.fundo}>
                    <View style={Styles.caixa}>
                        <Text style={Styles.tituloAtv}>Atividade Fluter</Text>
                        <Text style={Styles.dataVenc}>Vence 13 de novembro de 2024 às 23:59</Text>
                        <Text style = {Styles.titDesc}>Descrição:</Text>
                        <Text style = {Styles.descricao}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, qui. Aliquid voluptatem nesciunt, unde consectetur, deserunt earum eos eius adipisci impedit ratione quia dolorum modi veniam magnam incidunt tempora nostrum?</Text>
                        <Text style={Styles.titTrabalho}>Meu trabalho:</Text>
                        <Pressable style={Styles.botao} onPress={pickImage}>
                            <FontAwesomeIcon icon={faPaperclip} color="white" size={16} />
                            <Text style={Styles.txtAnexo}>Anexo</Text>
                        </Pressable>
                        <Pressable style={Styles.fecharPopup} onPress={hideModal}>
                            <FontAwesomeIcon icon={faXmark} size={26} color="black"/>
                        </Pressable>
                        
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const Styles = StyleSheet.create ({
    container: {
        width: "100%",
        height: '100%',
        alignItems: "center",
        justifyContent: "center",

    },

    content: {
        width: "85%",
        height: "95%",
        flexDirection: "column",
        alignItems: "center",
    },

    topo: {
        width: '100%',
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
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginRight: 25
    },

    titulo: {
        fontFamily: "Regular",
        fontSize: RFPercentage(4.2)
    },

    rolarAtv:{
        padding: 5,
        width: "100%",
        alignItems: "center"
    },

    fundo: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    caixa: {
        width: "80%",
        height: 400,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 20,
        justifyContent: "center",
        position: "relative"
    },

    tituloAtv: {
        fontFamily: "Medium",
        fontSize: RFPercentage(2.7),
        marginBottom: 5
    },

    dataVenc: {
        fontFamily: "Regular",
        fontSize: RFPercentage(1.7),
        marginBottom: 15
    },

    titDesc: {
        fontFamily: "Medium",
        fontSize: RFPercentage(1.9),
        marginBottom: 5
    },

    descricao: {
        fontFamily: "Regular",
        fontSize: RFPercentage(1.6),
        marginBottom:5
    },

    titTrabalho: {
        fontFamily: "Medium",
        fontSize: RFPercentage(1.7),
        marginTop: 10,
        marginBottom: 5
    },

    botao: {
        flexDirection:"row",
        alignItems: "center",
        width: 120,
        height: 40, 
        backgroundColor:"black",
        borderRadius: 10,
        justifyContent: "center"
    },

    txtAnexo: {
        fontSize: RFPercentage(1.6),
        color: "white",
        fontFamily: "Regular",
        marginLeft: 10
    },

    fecharPopup: {
        top: "5%",
        right: "5%",
        position: "absolute"
    }


})