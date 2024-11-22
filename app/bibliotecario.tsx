import { Text, View, StyleSheet, TouchableOpacity, Pressable, Image, StatusBar } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faClipboard, faBook  } from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useRouter } from 'expo-router';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


dayjs.locale('pt-br');

export default function Bibliotecario() {  
    const router = useRouter();

    const dataDia = dayjs().format('DD MMM');

    const [fontsLoaded] = useFonts({
        'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Light': require('../assets/fonts/Poppins-Light.ttf'),
        
      });

    if (!fontsLoaded) {
        return <Text>Carregando fontes...</Text>;  // Ou algum indicador de carregamento
    }

    return (
        <View style={Styles.container}>
            <StatusBar translucent={true} barStyle={"light-content"}/>
            <View style = {Styles.content}>
                <View style = {Styles.topo}>
                    <View style = {Styles.titulo}>
                        <Text style = {Styles.diaMes}>{dataDia}</Text>
                        <Text style = {Styles.txt}>Olá, Victor!</Text>
                    </View>
                    <Pressable onPress={() => router.push("/noticacoes")}>
                        <FontAwesomeIcon icon={faBell} size={36} />
                    </Pressable>
                </View>
                <View style = {Styles.caixa}>
                    <Image style = {Styles.imgAluno} source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwr_zZjgvmu4BccwDNIHic8K5dyehw7cSYA&s"}}></Image>
                    <Text style = {Styles.labels}>Sede:</Text>
                    <Text style = {Styles.dados} >Etec JK</Text>
                    <Text style = {Styles.labels}>Bibliotecario:</Text>
                    <Text style = {Styles.dados}>Roberto</Text>
                </View>
                <View style = {Styles.caixaBotoes}>
                    <TouchableOpacity style = {Styles.botoes} onPress={() => router.push('/cadastroLivro')}>
                        <FontAwesomeIcon icon={faBook} size={40} />
                        <Text style = {Styles.botoesTxt}>Cadastrar Livros</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {Styles.botoes} onPress={() => router.push('/declaracoes')} >
                        <FontAwesomeIcon icon={faClipboard} size={40}/>
                        <Text style = {Styles.botoesTxt}>Declarações</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create ({
    container: {
        width: "100%",
        height:"100%",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        width: 293,
        height: 727,
    },
    topo: {
        marginTop: 40,
        width: 293,
        height: 49,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 35
    },
    titulo: {
        width: 148,
        height: "100%",
    },
    diaMes: {
        fontFamily: "Light",
        fontSize: RFPercentage(2)
    },
    txt: {
        fontFamily: "Regular",
        fontSize: RFPercentage(3.2),
    },
    caixa: {
        marginTop: 40,
        width: 293,
        height: 300,
        borderRadius: 20,
        backgroundColor: "white",
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    imgAluno: {
        backgroundColor: "black",
        width:100,
        height: 100,
        borderRadius: 100,
        marginBottom: 15
    },
    labels: {
        width: 243,
        fontFamily: "Regular",
        fontSize: RFPercentage(2)
    },
    dados: {
        width: 243,
        fontFamily: "Light",
        fontSize: RFPercentage(1.95),
        marginBottom: 15
    },
    caixaBotoes: {
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between",
        width: 293,
        height: 200,
    },
    botoes: {
        width:135,
        height:135,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        elevation: 5,
        borderRadius: 20,
        backgroundColor: "white"
    },
    botoesTxt: {
        width: 95,
        textAlign: "center",
        fontSize: RFPercentage(2.15),
        fontFamily: "Light",
        marginTop: 10
    }
})