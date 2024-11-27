import { Text, View, TextInput, StyleSheet, Modal, Pressable, Alert } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function CadastroLivro() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [bibliotecaId, setBibliotecaId] = useState(0);  // Adicionando campo bibliotecaId
    const [imagemUrl, setImagemUrl] = useState('');  // Novo campo para URL da imagem
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);

    // Função de cadastro do livro
    const handleCadastroLivro = async () => {
        if (!titulo || !autor || !quantidade || !imagemUrl) {
            Alert.alert("Erro", "Todos os campos obrigatórios (título, autor, quantidade e imagem) precisam ser preenchidos.");
            return;
        }

        setLoading(true);

        const livroData = {
            titulo,
            autor,
            descricao,
            quantidade,
            biblioteca_id: bibliotecaId || null,
            imagem_url: imagemUrl,  // Passando a URL da imagem
        };

        try {
            const response = await fetch('http://192.168.10.181:3000/cadastrar-livro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(livroData),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log('Cadastro bem-sucedido:', responseData);
                mostrarPopupTempo();
                setTitulo('');
                setAutor('');
                setDescricao('');
                setQuantidade(0);
                setBibliotecaId(0);
                setImagemUrl('');  // Resetando o campo de imagem
            } else {
                Alert.alert('Erro', responseData.message || 'Erro ao cadastrar livro');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            Alert.alert('Erro', 'Erro na comunicação com o servidor');
        } finally {
            setLoading(false);
        }
    };

    // Função para exibir o popup de sucesso
    const mostrarPopupTempo = () => {
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
        }, 2500);
    };

    const [fontsLoaded] = useFonts({
        'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Light': require('../assets/fonts/Poppins-Light.ttf'),
    });

    if (!fontsLoaded) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.form}>
                <Text style={Styles.tituloRec}>Cadastrar Livros</Text>
                <Text style={Styles.label}>Título:</Text>
                <TextInput style={Styles.inp} placeholder="Digite o título" value={titulo} onChangeText={setTitulo} />
                <Text style={Styles.label}>Autor:</Text>
                <TextInput style={Styles.inp} placeholder="Digite o nome do autor" value={autor} onChangeText={setAutor} />
                <Text style={Styles.label}>Descrição:</Text>
                <TextInput style={Styles.inp} placeholder="Digite uma pequena descrição" value={descricao} onChangeText={setDescricao} />
                <Text style={Styles.label}>Quantidade Disponível:</Text>
                <TextInput style={Styles.inp} placeholder="Digite a quantidade" keyboardType="numeric" value={String(quantidade)} onChangeText={(text) => setQuantidade(Number(text))} />
                <Text style={Styles.label}>ID da Biblioteca:</Text>
                <TextInput style={Styles.inp} placeholder="Digite o ID da biblioteca" keyboardType="numeric" value={String(bibliotecaId)} onChangeText={(text) => setBibliotecaId(Number(text))} />
                <Text style={Styles.label}>URL da Imagem:</Text>
                <TextInput 
                    style={Styles.inp} 
                    placeholder="Digite a URL da imagem" 
                    value={imagemUrl} 
                    onChangeText={setImagemUrl} 
                />
                <Pressable style={Styles.botao} onPress={handleCadastroLivro} disabled={loading}>
                    <Text style={Styles.botaoTexto}>{loading ? 'Cadastrando...' : 'CADASTRAR'}</Text>
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
                        <FontAwesomeIcon icon={faCircleCheck} size={45} color="green" />
                        <Text style={Styles.txtPopup}>Cadastro feito com sucesso!</Text>
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
    },
    botaoTexto: {
        fontFamily: 'Medium',
        fontSize: RFPercentage(2.4),
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
});
