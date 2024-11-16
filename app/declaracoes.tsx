import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

export default function Declaracoes() {

const [selectedValue, setSelectedValue] = useState('declaracao1');

  const [fontsLoaded] = useFonts({
    Regular: require('../assets/fonts/Poppins-Regular.ttf'),
    SemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    Medium: require('../assets/fonts/Poppins-Medium.ttf'),
    Light: require('../assets/fonts/Poppins-Light.ttf'),
  });

  const router = useRouter();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.topo}>
        <Pressable style={Styles.voltar} onPress={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} size={30} />
        </Pressable>
        <Text style={Styles.titulo}>Declarações</Text>
      </View>

      <View style={Styles.declaracoes}>
        <Text style = {Styles.txt}>Tipo de declaração</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          style={Styles.picker}
        >
          <Picker.Item style={Styles.pickerTxt} label="Declaração 1" value="Decla" />
        </Picker>
        <Text style = {Styles.txt}>Motivo da solicitação</Text>
        <TextInput placeholder="Digite aqui o motivo" style = {Styles.input} />
        <Pressable style={Styles.botao}>
            <Text style={Styles.botaoTexto}>SOLICITAR</Text>
        </Pressable>
      </View>

      <View style={Styles.protocolos}>
        <Text style = {Styles.txt}>CONSULTAR DECLARAÇÃO</Text>
        <Text style = {Styles.txtP}>N° do protocolo:</Text>
        <TextInput placeholder="Digite aqui o protocolo" style = {Styles.input} />
        <Pressable style={Styles.botao}>
            <Text style={Styles.botaoTexto}>CONSULTAR</Text>
        </Pressable>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  topo: {
    width: "80%",
    height: "10%",
    marginTop: "4%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
    marginRight: 25,
  },

  titulo: {
    fontFamily: "Regular",
    fontSize: 25,
  },

  declaracoes: {
    width: "80%",
    height: 310,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    marginBottom: 20
  },

  txt: {
    textAlign: "center",
    fontFamily: "Regular",
    fontSize: 18,
    marginBottom: 10
  },

  picker: {
    width: "80%",
    height: 50,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "white",
    marginBottom: 20,

  },

  pickerTxt: {
    fontFamily: "Light",
    fontSize: 14,
    
  },

  input: {
    width: "80%",
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
    fontFamily: "Light",
    marginBottom: 25,
  },

  botao: {
    width: "80%",
    height: 45,
    color: "white",
    backgroundColor: "black",
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 10,
    shadowColor:"#000",
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.2,
    elevation: 4,
  },

  botaoTexto: {
    fontFamily:'SemiBold',
    fontSize: 18,
    color: "white"
  },

  protocolos: {
    width: "80%",
    height: 240,
    shadowColor:"#000",
    shadowOffset: {height: 3, width: 0},
    shadowOpacity: 0.2,
    elevation: 4,
    backgroundColor: "white",
    borderRadius:10,
    justifyContent: "center",
    alignItems: "center"
  },
  txtP: {
    width: "80%",
    fontSize: 16,
    fontFamily: "Regular",
    textAlign: "left",
    marginBottom: 5,
    marginTop: 10
  }


});
