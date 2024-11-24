import { Text, ScrollView, StyleSheet, Modal, Pressable, View, Image } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useFonts } from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useState } from "react";

export default function ListaLivros() {
    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);
    const [livroSelecionado, setLivroSelecionado] = useState(null);

    const abrirModal = (livro) => {
        setLivroSelecionado(livro);
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setLivroSelecionado(null);
    };

    const livros = [
        { 
            id: '1', 
            titulo: 'Livro 1', 
            imagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia_romance.jpg',
            autor: 'Autor 1',
            descricao: 'Este é um livro de fantasia que conta a história de...'
        },
        { 
            id: '2', 
            titulo: 'Livro 2', 
            imagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia_romance.jpg',
            autor: 'Autor 2',
            descricao: 'Em uma terra distante, um herói enfrenta desafios épicos...'
        },
        { 
            id: '3', 
            titulo: 'Livro 3', 
            imagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia_romance.jpg',
            autor: 'Autor 3',
            descricao: 'Uma jornada emocionante que mistura magia e aventura...'
        },
        { 
            id: '4', 
            titulo: 'Livro 4', 
            imagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia_romance.jpg',
            autor: 'Autor 4',
            descricao: 'Descubra o segredo por trás de um mundo cheio de mistérios...'
        },
        { 
            id: '5', 
            titulo: 'Livro 5', 
            imagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia_romance.jpg',
            autor: 'Autor 5',
            descricao: 'Uma história de amizade e superação no coração de um império...'
        },
        { 
            id: '6', 
            titulo: 'Livro 6', 
            imagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia_romance.jpg',
            autor: 'Autor 6',
            descricao: 'Uma trama envolvente que explora os limites da lealdade...'
        },
        { 
            id: '7', 
            titulo: 'Livro 7', 
            imagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia_romance.jpg',
            autor: 'Autor 7',
            descricao: 'Misteriosos eventos acontecem em um mundo de magia antiga...'
        },
        { 
            id: '8', 
            titulo: 'Livro 8', 
            imagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia_romance.jpg',
            autor: 'Autor 8',
            descricao: 'A luta pelo poder começa enquanto destinos se cruzam...'
        },
        { 
            id: '9', 
            titulo: 'Livro 9', 
            imagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia.jpg',
            autor: 'Autor 9',
            descricao: 'Em um mundo onde nada é o que parece, a busca por respostas nunca termina...'
        }
    ];

    const [fontsLoaded] = useFonts({
        Regular: require('../assets/fonts/Poppins-Regular.ttf'),
        SemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
        Medium: require('../assets/fonts/Poppins-Medium.ttf'),
        Light: require('../assets/fonts/Poppins-Light.ttf'),
    });

    if (!fontsLoaded) {
        return <Text>Carregando fontes...</Text>;
    }

    return (
        <View style={Styles.container}>
            <View style = {Styles.topo}>
                <Pressable style = {Styles.voltar} onPress={() => router.back()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={30} />
                </Pressable>
                <Text style = {Styles.titulo}>Lista de Livros</Text>
            </View>
            <Text style = {Styles.titLivros}>Livros Cadastrados:</Text>
            <ScrollView contentContainerStyle={Styles.caixaLivros}>
                {livros.map((livro) => (
                        <Pressable 
                        key={livro.id} 
                        onPress={() => abrirModal(livro)}
                        >
                        <Image 
                            source={{ uri: livro.imagem }} 
                            style={Styles.imagemLivro} 
                            resizeMode="cover" 
                        />
                    </Pressable>
                ))}
            </ScrollView>
            {livroSelecionado && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={fecharModal}
                >
                    <View style={Styles.modalContainer}>
                        <View style={Styles.modalConteudo}>
                            <Text style={Styles.modalTitulo}>{livroSelecionado.titulo}</Text>
                            <Image source={{uri: livroSelecionado.imagem}} style={Styles.modalImagem}/>
                            <Text style={Styles.modalAutor}>Autor: {livroSelecionado.autor}</Text>
                            <Text style={Styles.modalDescricao}>{livroSelecionado.descricao}</Text>
                            <Pressable style={Styles.modalEditar}>
                                <Text style={Styles.modalEditarTexto}>Editar</Text>
                            </Pressable>
                            <Pressable style={Styles.modalExcluir}>
                                <Text style={Styles.modalExcluirTexto}>Excluir</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const Styles = StyleSheet.create ({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
    },

    topo: {
        marginTop: 20,
        width: '80%',
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
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
        fontSize: RFPercentage(4)
    },

    titLivros: {
        width: "80%",
        fontFamily: "Regular",
        fontSize: RFPercentage(3),
        marginBottom: 10
    },

    caixaLivros: {
        width: "80%",
        padding: 5,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap"
    },

    imagemLivro: {
        width: 130,
        height: 190,
        borderRadius: 5,
        marginBottom: 20
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    modalConteudo: {
        width: "80%",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalImagem: {
        width: 120,
        height: 180,
        marginBottom: 20,
        borderRadius: 5,
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
    },

    modalTitulo: {
        fontFamily: "SemiBold",
        fontSize: RFPercentage(3),
        marginBottom: 10,
        textAlign: "center",
    },

    modalAutor: {
        fontFamily: "Medium",
        fontSize: RFPercentage(2.5),
        marginBottom: 10,
    },

    modalDescricao: {
        fontFamily: "Light",
        fontSize: RFPercentage(2),
        marginBottom: 20,
    },

    modalEditar: {
        width: "100%",
        backgroundColor: "black",
        borderRadius: 8,
        padding: 10,
        alignItems: "center",
        marginBottom: 10
    },

    modalEditarTexto: {
        color: "#fff",
        fontFamily: "SemiBold",
        fontSize: RFPercentage(2),
    },

    modalExcluir: {
        width: "100%",
        backgroundColor: "#ff5757",
        borderRadius: 8,
        padding: 10,
        alignItems: "center",
    },

    modalExcluirTexto: {
        color: "white",
        fontFamily: "SemiBold",
        fontSize: RFPercentage(2),
    },
})