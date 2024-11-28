import { Text, View, FlatList, StyleSheet, Pressable, Image } from "react-native";
import { faArrowLeft, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { RFPercentage } from "react-native-responsive-fontsize";

export default function Biblioteca() {

    const livros = [
        { 
            id: '1', 
            titulo: 'Mestres do tempo', 
            autor: 'H.G. Wells', 
            descricao: 'Uma fascinante jornada pelo tempo e suas possibilidades.', 
            imagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia.jpg' 
        },
        { 
            id: '2', 
            titulo: 'Sessão da Meia-Noite', 
            autor: 'Edgar Allan Poe', 
            descricao: 'Contos sombrios que exploram os medos mais profundos da humanidade.', 
            imagem: 'https://ocapista.com.br/imgs/capas/livro_de_horror_capa_livro_2.jpg' 
        },
        { 
            id: '3', 
            titulo: 'Filhas da lua', 
            autor: 'Sarah J. Maas', 
            descricao: 'Uma história épica sobre magia, amor e sacrifício.', 
            imagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia_romance.jpg' 
        },
        {
            id:'4',
            titulo: 'Código Limpo: Habilidades Práticas do Agile Software',
            descricao: 'Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode acabar com uma empresa de desenvolvimento.',
            imagem: 'https://images-americanas.b2w.io/produtos/7484566912/imagens/codigo-limpo-edicao-revisada-robert-c-martin/7484566912_1_large.jpg'
        },
        {
            id:'5',
            titulo: 'Entendendo Algoritmos',
            descricao: 'Um guia ilustrado para programadores e outros curiosos.',
            imagem: 'https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg'
        },
        {
            id: '6',
            titulo: 'Lógica de Programação e Algoritmos com JavaScript',
            descricao: 'Uma introdução à programação de computadores com exemplos e exercícios para iniciantes.',
            imagem: 'https://m.media-amazon.com/images/I/71X7hMhMEUL._AC_UF1000,1000_QL80_.jpg'
        },
        {
            id:'7',
            titulo: 'Introdução à Linguagem SQL',
            descricao: 'Uma abordagem prática para iniciantes aprenderem SQL.',
            imagem: 'https://images-na.ssl-images-amazon.com/images/I/711siL1zU1L._AC_UL900_SR615,900_.jpg'
        },
        {
            id: '8',
            titulo: 'Data Science do Zero',
            descricao: 'Noções fundamentais de data science com Python.',
            imagem: 'https://pdfcoffee.com/img/200x200/data-science-from-scratch-first-principles-with-python-joel-grus-3-pdf-free.jpg'
        },
        {
            id: '9',
            titulo: 'Python Para A. de Dados',
            descricao: 'Instruções completas para manipular e processar dados com Python.',
            imagem: 'https://http2.mlstatic.com/D_NQ_NP_709338-MLB47073819223_082021-O.webp'
        }
    ];

    const [fontsLoaded] = useFonts({
        'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Light': require('../assets/fonts/Poppins-Light.ttf'),
    });

    const router = useRouter();

    if (!fontsLoaded) {
        return null; // Evita erros enquanto a fonte não é carregada
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.topo}>
                <Pressable style={Styles.voltar} onPress={() => router.back()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={30} />
                </Pressable>
                <Text style={Styles.titulo}>OharaLib</Text>
            </View>
            <View style={Styles.itens}>
                <Pressable style={Styles.botoes} onPress={() => router.push("/reservas")}>
                    <FontAwesomeIcon icon={faBookmark} size={38} />
                    <Text style={Styles.txtBotao}>Reservas</Text>
                </Pressable>
            </View>
            <FlatList
                data={livros}
                renderItem={({ item }) => (
                    <Pressable 
                        style={Styles.item} 
                        onPress={() => router.push({
                            pathname: '/livro',
                            params: {
                                titulo: item.titulo,
                                imagem: item.imagem,
                                autor: item.autor,
                                descricao: item.descricao
                            }
                        })}
                    >
                        <Image source={{ uri: item.imagem }} style={Styles.imagem} />
                        <Text style={Styles.tituloLivro}>{item.titulo}</Text>
                    </Pressable>
                )}
                keyExtractor={(item) => item.id}
                numColumns={2} // Exibe duas colunas
                columnWrapperStyle={Styles.row} // Estilo para a linha
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9"
    },
    topo: {
        marginTop: 20,
        width: '80%',
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 40,
        alignSelf: "center"
    },
    voltar: {
        backgroundColor: "white",
        width: 60,
        height: 60,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 25
    },
    titulo: {
        fontFamily: "Regular",
        fontSize: RFPercentage(3.5)
    },
    itens: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "center",
        height: 130,
        marginBottom: 25,
        alignSelf: "center"
    },
    botoes: {
        width: "45%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 15
    },
    txtBotao: {
        fontFamily: "Regular",
        fontSize: RFPercentage(1.76),
        marginTop: 15
    },
    item: {
        flex: 1,
        margin: 10,
        alignItems: "center",
        maxWidth: "45%", // Ajusta para 2 colunas responsivas
    },
    imagem: {
        width: 120,
        height: 180,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: 8,
        marginBottom: 10
    },
    tituloLivro: {
        width: "80%",
        fontFamily: "Medium",
        fontSize: RFPercentage(1.8),
        textAlign: "center"
    },
    row: {
        justifyContent: "space-between", // Distribui os itens igualmente
    }
});
