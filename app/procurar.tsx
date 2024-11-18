import { Text, View, TextInput, StyleSheet, Pressable, Image, ScrollView} from "react-native";
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";


export default function Procurar() {

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

    return(
        <View>
            <View style={Styles.topo}>
                <Pressable style={Styles.voltar} onPress={() => router.back()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={30} />
                </Pressable>
                <Text style={Styles.titulo}>Detalhes</Text>
            </View>

        </View>
    );

}

const Styles = StyleSheet.create ({
    topo: {
        marginTop: 20,
        width: '90%',
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
        fontSize: 27,
        marginLeft: 30
    },
})