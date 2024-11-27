import { Text, View, StyleSheet, Pressable, Modal, TouchableOpacity, FlatList } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { RFPercentage } from "react-native-responsive-fontsize";
import { useState } from "react";

export default function Notas() {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Light': require('../assets/fonts/Poppins-Light.ttf'),
    });

    const [selectedValue, setSelectedValue] = useState("Selecione uma matéria");
    const [isModalVisible, setModalVisible] = useState(false);
  
    const options = [
      { label: "Linguagem, Tecnologia e Trabalho", value: "Linguagem, Tecnologia e Trabalho" },
      { label: "Programação WEB III", value: "Programação WEB III" },
      { label: "Sistemas de Segurança", value: "Sistemas de Segurança" },
      { label: "Banco de Dados III", value: "Banco de Dados III" },
      { label: "Programação de Aplicativos", value: "Programação de Aplicativos" },
    ];

    const getRandomGrade = () => {
        const grades = ["MB", "B", "R", "I"]; // Médias possíveis
        return grades[Math.floor(Math.random() * grades.length)];
    };

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const selectOption = (value) => {
      setSelectedValue(value);
      setModalVisible(false);
    };
  
    if (!fontsLoaded) {
        return <Text>Carregando fontes...</Text>;  // Ou algum indicador de carregamento
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.topo}>
                <Pressable style={Styles.voltar} onPress={() => router.back()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={30} />
                </Pressable>
                <Text style={Styles.titulo}>Notas e Faltas</Text>
            </View>

            <TouchableOpacity
                style={Styles.pickerButton}
                onPress={() => setModalVisible(true)}
            >
                <FontAwesomeIcon icon={faArrowDown} size={20}/>
                <Text style={Styles.buttonText}>{selectedValue || "Selecione"}</Text>
            </TouchableOpacity>

            <View style={Styles.caixa}>
                <View style={Styles.caixaNotas}>
                    <Text style={Styles.titNotas}>1° Bim:</Text>
                    <Text style={Styles.notas}>{getRandomGrade()}</Text>
                </View>
                <View style={Styles.caixaNotas}>
                    <Text style={Styles.titNotas}>2° Bim:</Text>
                    <Text style={Styles.notas}>{getRandomGrade()}</Text>
                </View>
                <View style={Styles.caixaNotas}>
                    <Text style={Styles.titNotas}>Faltas:</Text>
                    <Text style={Styles.notas}>{getRandomNumber(0, 20)}</Text>
                </View>
                <View style={Styles.caixaNotas}>
                    <Text style={Styles.titNotas}>Faltas Permitidas:</Text>
                    <Text style={Styles.notas}>{getRandomNumber(20, 30)}</Text>
                </View>
                <View style={Styles.caixaNotas}>
                    <Text style={Styles.titNotas}>Freq. Atual:</Text>
                    <Text style={Styles.notas}>{getRandomNumber(50, 100)}</Text>
                </View>
                <View style={Styles.caixaNotas}>
                    <Text style={Styles.titNotas}>Freq. Total:</Text>
                    <Text style={Styles.notas}>{getRandomNumber(50, 100)}</Text>
                </View>
            </View>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={Styles.modalContainer}>
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                    <TouchableOpacity
                        style={Styles.item}
                        onPress={() => selectOption(item.value)}
                    >
                        <Text style={Styles.itemText}>{item.label}</Text>
                    </TouchableOpacity>
                    )}
                />
                </View>
            </Modal>
        </View>
    );
}

const Styles = StyleSheet.create({
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
        marginBottom: 25
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
        fontSize: RFPercentage(3.5)
    },

    pickerButton: {
        width: "80%",
        height: 50,
        flexDirection: "row",
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.35)',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },

    buttonText: {
        color: 'Black',
        fontFamily: "Regular",
        fontSize: RFPercentage(1.9),
        marginLeft: 15
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
        paddingTop: "30%"
    },

    item: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius:10
    },

    itemText: {
        color: 'Black',
        fontFamily: "Regular",
        fontSize: RFPercentage(1.9),
        padding: 10
    },

    caixa:{
        marginTop: 40,
        width: "80%",
        height: 400,
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between",
        flexDirection: "row"
    },

    caixaNotas: {
        width: "45%",
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.35)',
        borderRadius: 10

    },

    titNotas: {
        textAlign: "center",
        width: "80%",
        fontFamily: "Regular",
        fontSize: RFPercentage(2)
    },

    notas: {
        marginTop: 5,
        fontFamily: "Light",
        fontSize: RFPercentage(3)
    }
});
