import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable, Alert } from "react-native";
import { faArrowLeft, faPaperclip, faXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import CaixaAtividade from "@/components/CaixaAtividade";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import * as ImagePicker from 'expo-image-picker';

export default function Atividades() {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [atividades, setAtividades] = useState([
        { id: 1, materia: "DTCC", professor: "Prof° Érica", descricao: "Descrição da atividade 1", isCompleted: false },
        { id: 2, materia: "Matemática", professor: "Prof° João", descricao: "Descrição da atividade 2", isCompleted: false },
        { id: 3, materia: "História", professor: "Prof° Ana", descricao: "Descrição da atividade 3", isCompleted: false },
        { id: 4, materia: "Física", professor: "Prof° Carlos", descricao: "Descrição da atividade 4", isCompleted: false },
        { id: 5, materia: "Química", professor: "Prof° Lucas", descricao: "Descrição da atividade 5", isCompleted: false },
    ]);
    
    // Função para buscar as atividades
    const fetchAtividades = async () => {
        const token = await getToken();
        try {
            const response = await fetch('http://192.168.86.205:3000/atividades', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data && data.atividades) {
                setAtividades(data.atividades);
            } else {
                alert("Nenhuma atividade encontrada.");
            }
        } catch (error) {
            console.error("Erro ao carregar atividades:", error);
            alert("Erro ao carregar atividades.");
        }
    };

    // Carregar atividades na primeira renderização
    useEffect(() => {
        fetchAtividades();
    }, []);

    // Função para abrir a galeria
    const pickImage = async (atividadeId: number) => {
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

                // Simular a remoção da atividade após anexar a imagem
                setAtividades(prevAtividades => 
                    prevAtividades.map(atividade => 
                        atividade.id === atividadeId ? { ...atividade, isCompleted: true } : atividade
                    )
                );
            }
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao tentar anexar a imagem.");
            console.error(error);
        }
    };

    // Função para obter o token
    const getToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('userToken');
            if (!storedToken) {
                console.error('Token não encontrado, por favor faça login novamente.');
                alert('Token não encontrado. Redirecionando para login...');
                // Caso não tenha token, redireciona para o login
                router.push('/principal');
            }
            return storedToken;
        } catch (error) {
            console.error('Erro ao acessar o token:', error);
            alert('Erro ao acessar o token');
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

    return (
        <View style={Styles.container}>
            <View style={Styles.content}>
                <View style={Styles.topo}>
                    <TouchableOpacity style={Styles.voltar} onPress={() => router.back()}>
                        <FontAwesomeIcon icon={faArrowLeft} size={30} />
                    </TouchableOpacity>
                    <Text style={Styles.titulo}>Atividades</Text>
                </View>
                <ScrollView contentContainerStyle={Styles.rolarAtv}>
                    {atividades.map((atividade) => (
                        !atividade.isCompleted && (
                            <CaixaAtividade
                                key={atividade.id}
                                materia={atividade.materia || "Matematica"}
                                descricao={atividade.descricao}
                                popup={() => pickImage(atividade.id)}
                            />
                        )
                    ))}
                </ScrollView>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={!!selectedImage}
                onRequestClose={() => setSelectedImage(null)}
            >
                <View style={Styles.fundo}>
                    <View style={Styles.popup}>
                        <FontAwesomeIcon icon={faCircleCheck} size={45} color="green" />
                        <Text style={Styles.txtPopup}>Atividade enviada com sucesso!</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const Styles = StyleSheet.create({
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
        fontSize: RFPercentage(3.2)
    },

    rolarAtv:{
        padding: 5,
        width: "100%",
        alignItems: "center"
    },

    fundo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
      },
      popup: {
        width:"80%",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
      },
      txtPopup: {
        width: "70%",
        fontFamily: "Medium",
        fontSize: RFPercentage(2.4),
        textAlign: "center",
        marginTop: 20,
      },
});