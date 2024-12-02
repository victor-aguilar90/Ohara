import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, TextInput, Modal } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { faArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import { useRouter } from 'expo-router';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  if (!fontsLoaded) {
    return null;
  }

  interface Declaracao {
    protocolo: string;
    status: string;
    // Adicione outros campos conforme necessário
  }

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

  // Solicitar declaração (com a API '/solicitar-declaracao')
  const solicitarDeclaracao = async () => {
    try {
      const token = await getToken(); // Obtém o token antes de fazer a solicitação
      console.log('Iniciando solicitação de declaração...');
      const response = await fetch('http://192.168.10.181:3000/solicitar-declaracao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Usando o token armazenado
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
        console.log('Solicitação realizada com sucesso, protocolo:', data.protocolo);
      } else {
        console.error('Erro ao solicitar declaração:', data.message || 'Tente novamente.');
        alert('Erro ao solicitar declaração: ' + (data.message || 'Tente novamente.'));
      }
    } catch (error) {
      console.error('Erro ao fazer solicitação:', error);
      alert('Erro ao fazer solicitação: ' + error);
    }
  };

  const consultarDeclaracao = async () => {
    try {
      const token = await getToken(); // Obtém o token antes de consultar
      console.log('Consultando declaração com protocolo:', protocolo);
      const response = await fetch(`http://192.168.10.181:3000/minhas-declaracoes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Usando o token armazenado
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Tipando a variável 'declaracao' com a interface Declaracao
        const declaracao: Declaracao | undefined = data.declaracoes.find(
          (decl: Declaracao) => decl.protocolo === protocolo
        );
  
        if (declaracao) {
          setStatus(declaracao.status);  // Atribui o status retornado
          console.log('Status da declaração:', declaracao.status);
        } else {
          console.error('Declaração não encontrada com o protocolo informado.');
          alert('Declaração não encontrada');
        }
      } else {
        console.error('Erro ao consultar declaração:', data.message || 'Tente novamente.');
        alert('Erro ao consultar declaração');
      }
    } catch (error) {
      console.error('Erro ao consultar declaração:', error);
      alert('Erro ao consultar declaração');
    }
  };

  const mostrarPopupTempo = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2500);
  };

  useEffect(() => {
    getToken(); // Chama a função para verificar o token ao carregar o componente
  }, []);

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
          <Picker.Item style={Styles.pickerTxt} label="Declaração de matrícula" value="Decla" />
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
        <Text style={Styles.txt}>N° do protocolo:</Text>
        <TextInput
          placeholder="Digite aqui o protocolo"
          style={Styles.input}
          value={protocolo}
          onChangeText={setProtocolo}
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
              <Text style={Styles.txtPopup}>Protocolo: {protocolo}</Text>
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
    fontSize: RFPercentage(2.1),
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
    fontSize: RFPercentage(1.9),
    alignItems:"center",
    fontFamily: "Light",
    marginBottom: 25,
  },
  botao: {
    width: "80%",
    height: 45,
    backgroundColor: "#00B0B9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  botaoTexto: {
    color: "white",
    fontFamily: "Regular",
    fontSize: RFPercentage(2.1),
  },
  protocolos: {
    width: "80%",
    height: 270,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  status: {
    fontFamily: "Regular",
    fontSize: RFPercentage(2),
    marginTop: 10,
    color: "green",
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
    width: "80%",
    fontFamily: "Medium",
    fontSize: RFPercentage(2.1),
    textAlign: "center",
    marginTop: 15,
  },
});