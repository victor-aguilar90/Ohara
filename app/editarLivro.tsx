/*

import { Text, View, TextInput, StyleSheet, Modal, Pressable, Button, Alert, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck, faPaperclip, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as ImagePicker from 'expo-image-picker';

export default function EditarLivro() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const params = useGlobalSearchParams();
    const [titulo, setTitulo] = useState(params.titulo || '');
    const [autor, setAutor] = useState(params.autor || '');
    const [descricao, setDescricao] = useState(params.descricao || '');
    const [imagem, setImagem] = useState(params.imagem || '');

    const [modalVisible, setModalVisible] = useState(false);
    const [deletingModalVisible, setDeletingModalVisible] = useState(false); // Modal para exclusão
    const [fontsLoaded] = useFonts({
        'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Light': require('../assets/fonts/Poppins-Light.ttf'),
    });

    const router = useRouter();

    const salvarAlteracoes = () => {
        console.log({
            titulo,
            autor,
            descricao,
            imagem,
        });
        router.back(); // Voltar para a tela anterior
    };

    // Função para abrir a galeria
    const pickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert("Permissão necessária", "Você precisa permitir o acesso à galeria para anexar imagens.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
                setImagem(result.assets[0].uri); // Atualiza o estado da imagem
            }
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao tentar anexar a imagem.");
            console.error(error);
        }
    };

    // Função para exibir a mensagem de sucesso após a exclusão
    const excluirLivro = async () => {
        try {
            const response = await fetch('http://192.168.10.181:3000/excluir-livro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    biblioteca_id: params.biblioteca_id, // Assume que biblioteca_id é passado na URL ou como parâmetro
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setDeletingModalVisible(true); // Exibe o modal de sucesso
                setTimeout(() => {
                    setDeletingModalVisible(false);
                    router.push('/listaLivros'); // Volta para a lista de livros
                }, 2500);
            } else {
                Alert.alert('Erro', data.message || 'Não foi possível excluir o livro.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar excluir o livro.');
            console.error(error);
        }
    };

    const mostrarPopupTempo = () => {
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
            router.push('/listaLivros');
        }, 2500);
    };

    if (!fontsLoaded) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.form}>
                <Text style={Styles.tituloRec}>Editar Livro</Text>
                <Text style={Styles.label}>Título:</Text>
                <TextInput
                    style={Styles.inp}
                    placeholder="Digite o título"
                    value={titulo}
                    onChangeText={setTitulo}
                />
                <Text style={Styles.label}>Autor:</Text>
                <TextInput
                    style={Styles.inp}
                    placeholder="Digite o nome do autor"
                    value={autor}
                    onChangeText={setAutor}
                />
                <Text style={Styles.label}>Descrição:</Text>
                <TextInput
                    style={Styles.inp}
                    placeholder="Digite uma pequena descrição"
                    value={descricao}
                    onChangeText={setDescricao}
                />
                <Text style={Styles.label}>Quantidade Disponível:</Text>
                <TextInput
                    style={Styles.inp}
                    placeholder="Digite a quantidade"
                />
                <Text style={Styles.label}>URL da Imagem</Text>
                <TextInput
                    style={Styles.inp}
                    value={imagem}
                    onChangeText={setImagem}
                />
                <Pressable style={Styles.botao} onPress={mostrarPopupTempo}>
                    <Text style={Styles.botaoTexto}>Salvar</Text>
                </Pressable>
                <Pressable style={Styles.anexo} onPress={pickImage}>
                    <FontAwesomeIcon icon={faPaperclip} size={20} color="white" />
                    <Text style={Styles.txtAnexo}>Escolher Imagem</Text>
                </Pressable>
                {selectedImage && <Image source={{ uri: selectedImage }} style={Styles.image} />}
                
            
                <Pressable style={Styles.botaoExcluir} onPress={() => setDeletingModalVisible(true)}>
                    <FontAwesomeIcon icon={faTrashAlt} size={20} color="white" />
                    <Text style={Styles.botaoExcluirTexto}>Excluir Livro</Text>
                </Pressable>
            </View>

            
            <Modal
                animationType="fade"
                transparent={true}
                visible={deletingModalVisible}
                onRequestClose={() => setDeletingModalVisible(false)}
            >
                <View style={Styles.fundo}>
                    <View style={Styles.popup}>
                        <Text style={Styles.txtPopup}>Tem certeza que deseja excluir este livro?</Text>
                        <Pressable style={Styles.botaoExcluirConfirmar} onPress={excluirLivro}>
                            <Text style={Styles.botaoExcluirTexto}>Confirmar Exclusão</Text>
                        </Pressable>
                        <Pressable style={Styles.botaoExcluirCancelar} onPress={() => setDeletingModalVisible(false)}>
                            <Text style={Styles.botaoExcluirTexto}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={Styles.fundo}>
                    <View style={Styles.popup}>
                        <FontAwesomeIcon icon={faCircleCheck} size={45} color="green" />
                        <Text style={Styles.txtPopup}>Edição feita com sucesso!</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        width: "80%",
        alignItems: "center",
    },
    tituloRec: {
        fontSize: RFPercentage(3),
        fontFamily: "Regular",
        width: "100%",
        marginBottom: 10,
    },
    label: {
        fontFamily: "Regular",
        width: "100%",
        fontSize: RFPercentage(2.3),
        marginTop: 10,
    },
    inp: {
        width: "100%",
        height: 45,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        fontFamily: "Light",
        fontSize: RFPercentage(2),
        paddingLeft: 10,
        marginBottom: 15,
    },
    botao: {
        width: "100%",
        height: 50,
        color: "white",
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 15,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        elevation: 5,
    },
    botaoTexto: {
        fontFamily: 'Medium',
        fontSize: RFPercentage(2.2),
        color: "white",
    },
    fundo: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popup: {
        width: "80%",
        height: 200,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    txtPopup: {
        fontFamily: "Regular",
        fontSize: RFPercentage(2),
        width: "50%",
        textAlign: "center",
        marginTop: 15,
    },
    anexo: {
        marginTop: 5,
        width: "80%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        flexDirection: "row",
        marginBottom: 10,
        borderRadius: 10,
    },
    txtAnexo: {
        color: "white",
        fontFamily: "Regular",
        fontSize: RFPercentage(2),
        marginLeft: 14,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 10,
    },

    botaoExcluir: {
      width: "100%",
      height: 50,
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginTop: 15,
  },
  botaoExcluirTexto: {
      fontFamily: 'Medium',
      fontSize: RFPercentage(2.2),
      color: "white",
  },
  botaoExcluirConfirmar: {
      width: "100%",
      height: 50,
      backgroundColor: "green",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
  },
  botaoExcluirCancelar: {
      width: "100%",
      height: 50,
      backgroundColor: "gray",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginTop: 10,
  },
});

*/
