import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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

    return(
        <View style = {Styles.container}>
            <View style = {Styles.content}>
                <View style = {Styles.topo}>
                    <TouchableOpacity style = {Styles.voltar} onPress={() => router.push('/principal')}>
                        <FontAwesomeIcon icon={faArrowLeft} size={30} />
                    </TouchableOpacity>
                    <Text style = {Styles.titulo}>Atividades</Text>
                </View>
                <ScrollView contentContainerStyle = {Styles.rolarAtv}>
                    <View style = {Styles.caixa}>
                        <Text>dsadsadsa</Text>
                    </View>
                    <View style = {Styles.caixa}>
                        <Text>dsadsadsa</Text>
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
        height: "90%",
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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25, 
        shadowRadius: 4,
        elevation: 5,
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
        width: 307,
        justifyContent: "center"
    },

    caixa: {
        width: 300,
        height: 130,
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25, 
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 15,
        marginBottom: 40
    }

})