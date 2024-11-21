import { Text, View, StyleSheet, Pressable } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


export default function Notificacoes() {
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

    return (
        <View style={Styles.container}>
            <View style = {Styles.topo}>
            <Pressable style = {Styles.voltar} onPress={() => router.back()}>
                <FontAwesomeIcon icon={faArrowLeft} size={30} />
            </Pressable>
            <Text style = {Styles.titulo}>Notificações</Text>
        </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center"
    },

    topo: {
        marginTop: 20,
        width: '80%',
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

    
})