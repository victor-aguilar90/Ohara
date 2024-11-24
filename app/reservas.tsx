import { Text, View, StyleSheet, Pressable, Image, ScrollView} from "react-native";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';
import { useRouter} from 'expo-router';
import CaixaReservas from '@/components/CaixaReservas';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


export default function Reservas() {

    const [fontsLoaded] = useFonts({
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    });

    if (!fontsLoaded) {
        return <Text>Carregando...</Text>;
    }

    
  
  const router = useRouter();

  const reservas = [
    {
        urlImagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia.jpg',
        titulo: 'Mestres do Tempo',
        descricao: 'Uma aventura épica no controle do tempo.',
        dataDevolucao: '2024-12-10', // Exemplo de data
    },
    {
        urlImagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia.jpg',
        titulo: 'Mestres do Tempo',
        descricao: 'Uma aventura épica no controle do tempo.',
        dataDevolucao: '2024-12-15', // Exemplo de data
    },
    {
        urlImagem: 'https://ocapista.com.br/imgs/capas/capa_livro_fantasia.jpg',
        titulo: 'Mestres do Tempo',
        descricao: 'Uma aventura épica no controle do tempo.',
        dataDevolucao: '2024-12-20', // Exemplo de data
    },
];

  return (
    <View style = {Styles.container}>
        <View style = {Styles.topo}>
            <Pressable style = {Styles.voltar} onPress={() => router.back()}>
                <FontAwesomeIcon icon={faArrowLeft} size={30} />
            </Pressable>
            <Text style = {Styles.titulo}>Reservas</Text>
        </View>
        <ScrollView contentContainerStyle = {Styles.favoritos}>
                {reservas.map((item, index) => (
                    <CaixaReservas
                        key={index}
                        urlImagem={item.urlImagem}
                        titulo={item.titulo}
                        descricao={item.descricao}
                        dataDevolucao={item.dataDevolucao}
                    />
                ))}
        </ScrollView>

    </View>
  );
}

const Styles = StyleSheet.create ({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center"
    },

    topo: {
        marginTop: 20,
        width: '80%',
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
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
        fontSize: RFPercentage(3.8)
    },

    favoritos: {
        padding: 5,
        width: "100%",
        alignItems: "center"
    }
})