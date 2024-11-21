import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, TextInput, Modal } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { faArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function Declaracoes() {
  const [selectedValue, setSelectedValue] = useState('declaracao1');
  const [motivo, setMotivo] = useState('');
  const [protocolo, setProtocolo] = useState('');
  const [status, setStatus] = useState('');
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

  const [modalVisible, setModalVisible] = useState(false);

  const mostrarPopupTempo = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2500);
  };
  const solicitarDeclaracao = async () => {
    try {
      const response = await fetch('http://192.168.10.181:3000/solicitar-declaracao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo: selectedValue,
          motivo: motivo,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setProtocolo(data.protocolo); // Armazena o protocolo retornado
        mostrarPopupTempo(); // Exibe o popup com sucesso
      } else {
        alert('Erro ao solicitar declaração: ' + data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer solicitação:', error);
      alert('Erro ao fazer solicitação');
    }
  };
  ;

  const consultarDeclaracao = async () => {
    try {
      const response = await fetch(`http://192.168.10.181:3000/consultar-declaracao/${protocolo}`);
      const data = await response.json();
      if (response.ok) {
        setStatus(data.status);  // Atribui o status retornado
      } else {
        alert('Declaração não encontrada');
      }
    } catch (error) {
      console.error('Erro ao consultar declaração:', error);
      alert('Erro ao consultar declaração');
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.topo}>
        <Pressable style={Styles.voltar} onPress={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} size={30} />
        </Pressable>
        <Text style={Styles.titulo}>Declarações</Text>
      </View>

      <View style={Styles.declaracoes}>
        <Text style={Styles.txt}>Tipo de declaração</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          style={Styles.picker}
        >
          <Picker.Item style={Styles.pickerTxt} label="Declaração 1" value="Decla" />
        </Picker>
        <Text style={Styles.txt}>Motivo da solicitação</Text>
        <TextInput
          placeholder="Digite aqui o motivo"
          style={Styles.input}
          value={motivo}
          onChangeText={setMotivo}
        />
        <Pressable style={Styles.botao} onPress={solicitarDeclaracao}>
          <Text style={Styles.botaoTexto}>SOLICITAR</Text>
        </Pressable>
      </View>

      <View style={Styles.protocolos}>
        <Text style={Styles.txt}>CONSULTAR DECLARAÇÃO</Text>
        <Text style={Styles.txtP}>N° do protocolo:</Text>
        <TextInput
          placeholder="Digite aqui o protocolo"
          style={Styles.input}
          value={protocolo}
          editable={false} // O campo de protocolo será apenas para leitura após a solicitação
        />
        <Pressable style={Styles.botao} onPress={consultarDeclaracao}>
          <Text style={Styles.botaoTexto}>CONSULTAR</Text>
        </Pressable>
        {status && (
          <Text style={Styles.status}>Status: {status}</Text>
        )}
      </View>

      <Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}>
  <View style={Styles.fundo}>
    <View style={Styles.popup}>
      <FontAwesomeIcon icon={faCircleCheck} size={45} color="green" />
      <Text style={Styles.txtPopup}>Solicitação feita com sucesso!</Text>
      {protocolo ? (
        <Text style={Styles.txtPopup}>Protocolo: {protocolo}</Text>  // Exibe o número do protocolo
      ) : (
        <Text style={Styles.txtPopup}>Aguarde enquanto geramos o protocolo...</Text>
      )}
    </View>
  </View>
</Modal>

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
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginRight: 25,
  },
  titulo: {
    fontFamily: "Regular",
    fontSize: RFPercentage(3.5),
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
    marginBottom: 20,
  },
  txt: {
    textAlign: "center",
    fontFamily: "Regular",
    fontSize: RFPercentage(2.4),
    marginBottom: 10
  },
  picker: {
    width: "80%",
    height: 50,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
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
    fontSize: RFPercentage(2),
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
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  botaoTexto: {
    fontFamily:'SemiBold',
    fontSize: RFPercentage(2.7),
    color: "white"
  },
  protocolos: {
    width: "80%",
    height: 240,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
    elevation: 5,
    backgroundColor: "white",
    borderRadius:10,
    justifyContent: "center",
    alignItems: "center"
  },
  txtP: {
    width: "80%",
    fontSize: RFPercentage(2.2),
    fontFamily: "Regular",
    textAlign: "left",
    marginBottom: 5,
  },
  status: {
    fontSize: RFPercentage(2.2),
    fontFamily: "Regular",
    color: "green",
    marginTop: 10,
  },
  fundo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  popup: {
    backgroundColor: "white",
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    padding: 20,
  },
  txtPopup: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Medium",
  },
});
