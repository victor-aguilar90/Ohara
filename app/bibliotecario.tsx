import { Text, View, StyleSheet, TouchableOpacity, Image, StatusBar } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useRouter } from 'expo-router';
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';

dayjs.locale('pt-br');

export default function Biblioteca() {
  const router = useRouter();
  const dataDia = dayjs().format('DD MMM');

  const [biblioteca, setBiblioteca] = useState<null | any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [fontsLoaded] = useFonts({
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
  });

  // Função para buscar os dados do bibliotecário
  const fetchBibliotecaData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        const response = await fetch('http://192.168.10.181:3000/mee', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${storedToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          if (data) {
            setBiblioteca(data);
          } else {
            setError('Dados da biblioteca não encontrados');
          }
        } else {
          setError('Erro ao recuperar dados da biblioteca');
        }
      } else {
        setError('Token de autenticação não encontrado');
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBibliotecaData();
  }, []);

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  if (loading) {
    return <Text>Carregando dados...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={Styles.container}>
      <StatusBar translucent={true} barStyle={"light-content"} />
      <View style={Styles.content}>
        <View style={Styles.topo}>
          <View style={Styles.titulo}>
            <Text style={Styles.diaMes}>{dataDia}</Text>
            <Text style={Styles.txt}>Olá, {biblioteca?.biblioterio}!</Text>
          </View>
        </View>
        <View style={Styles.caixa}>
          <Image
            style={Styles.imgAluno}
            source={{ uri: biblioteca?.url_imagem || "https://via.placeholder.com/100" }}
          />
          <Text style={Styles.labels}>Sede:</Text>
          <Text style={Styles.dados}>{"JK"}</Text>
          <Text style={Styles.labels}>Bibliotecário:</Text>
          <Text style={Styles.dados}>{biblioteca?.biblioterio || "Não informado"}</Text>
        </View>
        <View style={Styles.caixaBotoes}>
          <TouchableOpacity style={Styles.botoes} onPress={() => router.push('/cadastroLivro')}>
            <FontAwesomeIcon icon={faBook} size={40} />
            <Text style={Styles.botoesTxt}>Cadastrar Livros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
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
    marginBottom: 35,
  },
  titulo: {
    width: 148,
    height: "100%",
  },
  diaMes: {
    fontFamily: "Light",
    fontSize: RFPercentage(2),
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  imgAluno: {
    backgroundColor: "black",
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 15,
  },
  labels: {
    width: 243,
    fontFamily: "Regular",
    fontSize: RFPercentage(2),
  },
  dados: {
    width: 243,
    fontFamily: "Light",
    fontSize: RFPercentage(1.95),
    marginBottom: 15,
  },
  caixaBotoes: {
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
    width: 293,
    height: 200,
  },
  botoes: {
    width: 135,
    height: 135,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 20,
    backgroundColor: "white",
  },
  botoesTxt: {
    width: 95,
    textAlign: "center",
    fontSize: RFPercentage(2),
    fontFamily: "Light",
    marginTop: 10,
  },
});
