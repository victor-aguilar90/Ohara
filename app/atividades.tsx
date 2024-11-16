import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

export default function Atividades() {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Light': require('../assets/fonts/Poppins-Light.ttf'),
        
    });

    if (!fontsLoaded) {
        return <Text>Carregando fontes...</Text>;  // Ou algum indicador de carregamento
    }

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
                    <View style = {Styles.caixa}>
                        <View style = {Styles.txt}>
                            <Text style = {Styles.materia}>DTCC</Text>
                            <Text style = {Styles.prof}>Prof° Érica</Text>
                            <Text style = {Styles.descricao}>dskdoaksodksadasdkosadosada</Text>
                        </View>
                        <TouchableOpacity style = {Styles.enviarAtv}>
                            <FontAwesomeIcon icon={faPaperPlane} size={25} color={"white"}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {Styles.caixa}>
                        <View style = {Styles.txt}>
                            <Text style = {Styles.materia}>DTCC</Text>
                            <Text style = {Styles.prof}>Prof° Érica</Text>
                            <Text style = {Styles.descricao}>dskdoaksodksadasdkosadosada</Text>
                        </View>
                        <TouchableOpacity style = {Styles.enviarAtv}>
                            <FontAwesomeIcon icon={faPaperPlane} size={25} color={"white"}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {Styles.caixa}>
                        <View style = {Styles.txt}>
                            <Text style = {Styles.materia}>DTCC</Text>
                            <Text style = {Styles.prof}>Prof° Érica</Text>
                            <Text style = {Styles.descricao}>dskdoaksodksadasdkosadosada</Text>
                        </View>
                        <TouchableOpacity style = {Styles.enviarAtv}>
                            <FontAwesomeIcon icon={faPaperPlane} size={25} color={"white"}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {Styles.caixa}>
                        <View style = {Styles.txt}>
                            <Text style = {Styles.materia}>DTCC</Text>
                            <Text style = {Styles.prof}>Prof° Érica</Text>
                            <Text style = {Styles.descricao}>dskdoaksodksadasdkosadosada</Text>
                        </View>
                        <TouchableOpacity style = {Styles.enviarAtv}>
                            <FontAwesomeIcon icon={faPaperPlane} size={25} color={"white"}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {Styles.caixa}>
                        <View style = {Styles.txt}>
                            <Text style = {Styles.materia}>DTCC</Text>
                            <Text style = {Styles.prof}>Prof° Érica</Text>
                            <Text style = {Styles.descricao}>dskdoaksodksadasdkosadosada</Text>
                        </View>
                        <TouchableOpacity style = {Styles.enviarAtv}>
                            <FontAwesomeIcon icon={faPaperPlane} size={25} color={"white"}/>
                        </TouchableOpacity>
                    </View>
                    
                </ScrollView>
            </View>
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
        width: 310,
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
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginRight: 25
    },

    titulo: {
        fontFamily: "Regular",
        fontSize: 30
    },

    rolarAtv:{
        padding: 5,
        width: 307,
        alignItems: "center"
    },

    caixa: {
        width: 300,
        height: 130,
        backgroundColor: "white",
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        elevation: 5,
        borderRadius: 15,
        marginBottom: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },

    txt: {
        width: 149,
        height: 88,
        flexDirection: "column",
        justifyContent: "space-between"
    },

    materia: {
        fontFamily: "Regular",
        fontSize: 17
    },

    prof: {
        fontFamily: "Light",
        fontSize: 16
    },

    descricao: {
        fontFamily: "Light",
        fontSize: 14
    },

    enviarAtv: {
        width: 54,
        height: 54,
        backgroundColor: "black",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center"
    }

})