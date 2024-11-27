import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, StatusBar, ActivityIndicator } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faChartColumn, faBookOpen, faClipboard, faBookAtlas } from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useRouter } from 'expo-router';
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';

dayjs.locale('pt-br');

export default function Principal() {
  const router = useRouter();
  const dataDia = dayjs().format('DD MMM');
  const [fontsLoaded] = useFonts({
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
  });

  const [aluno, setAluno] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (!storedToken) {
        
      }
    };

    const fetchAlunoData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          const response = await fetch('http://192.168.10.181:3000/me', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${storedToken}` },
          });

          if (response.ok) {
            const data = await response.json();
            if (data && data.id) {
              setAluno(data);
            } else {
              setError('Dados do aluno não encontrados');
            }
          } else {
            setError('Erro ao recuperar dados do aluno');
          }
        } else {
          const storedAluno = await AsyncStorage.getItem('aluno');
          if (storedAluno) {
            setAluno(JSON.parse(storedAluno));
          } else {
            setError('Aluno não encontrado no armazenamento');
          }
        }
      } catch (error) {
        setError('Erro ao recuperar dados do aluno');
      } finally {
        setLoading(false);
      }
    };

    checkTokenAndRedirect();
    fetchAlunoData();
  }, [router]);

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <View style={Styles.container}>
      <StatusBar translucent={true} barStyle={"light-content"} />
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          {error && <Text style={Styles.error}>{error}</Text>}
          {aluno && (
            <View style={Styles.content}>
              <View style={Styles.topo}>
                <View style={Styles.titulo}>
                  <Text style={Styles.diaMes}>{dataDia}</Text>
                  <Text style={Styles.txt}>Olá, {aluno.nome}!</Text>
                </View>
                <FontAwesomeIcon icon={faBell} size={36} />
              </View>

              <View style={Styles.caixa}>
                <Image style={Styles.imgAluno} source={{ uri: aluno.foto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwr_zZjgvmu4BccwDNIHic8K5dyehw7cSYA&s" }} />
                <Text style={Styles.labels}>Curso:</Text>
                <Text style={Styles.dados}>{aluno.curso || "Desenvolvimento de Sistemas"}</Text>
                <Text style={Styles.labels}>Semestre:</Text>
                <Text style={Styles.dados}>{aluno.semestre || "3°DS"}</Text>
              </View>

              <View style={Styles.caixaBotoes}>
                <TouchableOpacity style={Styles.botoes} onPress={() => router.push('/notas')}>
                  <FontAwesomeIcon icon={faChartColumn} size={40} />
                  <Text style={Styles.botoesTxt}>Gráfico do Aluno</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.botoes} onPress={() => router.push('/declaracoes')}>
                  <FontAwesomeIcon icon={faClipboard} size={40} />
                  <Text style={Styles.botoesTxt}>Declarações</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.botoes} onPress={() => router.push('/atividades')}>
                  <FontAwesomeIcon icon={faBookOpen} size={40} />
                  <Text style={Styles.botoesTxt}>Atividades</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.botoes} onPress={() => router.push('/biblioteca')}>
                  <FontAwesomeIcon icon={faBookAtlas} size={40} />
                  <Text style={Styles.botoesTxt}>Biblioteca</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
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
    marginTop: 10,
    width: 293,
    height: 49,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
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
    width: 293,
    height: 300,
    borderRadius: 20,
    backgroundColor: "white",
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
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
    fontSize: RFPercentage(2.1),
  },
  dados: {
    width: 243,
    fontFamily: "Light",
    fontSize: RFPercentage(2),
    marginBottom: 15,
  },
  caixaBotoes: {
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
    width: 293,
    height: 290,
  },
  botoes: {
    width: 135,
    height: 135,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    elevation: 5,
    borderRadius: 20,
    backgroundColor: "white",
  },
  botoesTxt: {
    width: 95,
    textAlign: "center",
    fontSize: RFPercentage(2.2),
    fontFamily: "Light",
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontSize: RFPercentage(2),
    marginBottom: 20,
  },
});