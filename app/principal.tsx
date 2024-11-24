import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Pressable, StatusBar, ActivityIndicator } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faChartColumn, faClipboard, faBookOpen, faBookAtlas } from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useRouter } from 'expo-router';
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';

dayjs.locale('pt-br');

interface Aluno {
  nome: string;
  curso: string;
  semestre: string;
}

export default function Principal() {
  const router = useRouter();
  const dataDia = dayjs().format('DD MMM');

  const [fontsLoaded] = useFonts({
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
  });

  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAlunoData = async () => {
        try {
          console.log('[fetchAlunoData] Iniciando recuperação do token...');
          const storedToken = await AsyncStorage.getItem('userToken');
          console.log('[fetchAlunoData] Token recuperado:', storedToken);
      
          if (storedToken && storedToken.trim() !== "") {
            console.log('[fetchAlunoData] Iniciando requisição para dados do aluno...');
            const response = await fetch('http://192.168.10.181:3000/aluno/logado', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${storedToken}`,
              },
            });
      
            console.log('[fetchAlunoData] Status da resposta:', response.status);
      
            // Verifique se o status da resposta é 200
            if (response.ok) {
              const data = await response.json();
              console.log('[fetchAlunoData] Dados recebidos:', data);
      
              if (data && data.aluno) {
                console.log('[fetchAlunoData] Dados do aluno encontrados:', data.aluno);
                setAluno(data.aluno);
              } else {
                setError('Dados do aluno não encontrados ou resposta inválida');
                console.warn('[fetchAlunoData] Resposta inválida ou dados do aluno não encontrados:', data);
              }
            } else {
              console.warn('[fetchAlunoData] Resposta não OK. Status:', response.status);
              setError('Erro na requisição');
            }
          } else {
            setError('Token não encontrado ou inválido');
            console.warn('[fetchAlunoData] Token ausente ou inválido');
          }
        } catch (error) {
          console.error('[fetchAlunoData] Erro ao recuperar dados do aluno:', error);
          setError('Erro ao recuperar dados do aluno');
        } finally {
          console.log('[fetchAlunoData] Finalizando operação de carregamento.');
          setLoading(false);
        }
      };
      
      fetchAlunoData();      
  }, []);

  if (!fontsLoaded || loading) {
    console.log('[Principal] Carregando fontes ou dados do aluno...');
    return (
      <View style={Styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    console.warn('[Principal] Erro detectado:', error);
    return (
      <View style={Styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!aluno) {
    console.log('[Principal] Aluno ainda não carregado.');
    return (
      <View style={Styles.loadingContainer}>
        <Text>Carregando dados do aluno...</Text>
      </View>
    );
  }

  console.log('[Principal] Renderizando componente principal com os dados do aluno:', aluno);

  return (
    <View style={Styles.container}>
      <StatusBar translucent={true} barStyle={"light-content"} />
      <View style={Styles.content}>
        <View style={Styles.topo}>
          <View style={Styles.titulo}>
            <Text style={Styles.diaMes}>{dataDia}</Text>
            <Text style={Styles.txt}>Olá, {aluno.nome}!</Text>
          </View>
          <Pressable onPress={() => {
            console.log('[Notificações] Navegando para notificações.');
            
          }}>
            <FontAwesomeIcon icon={faBell} size={36} />
          </Pressable>
        </View>
        <View style={Styles.caixa}>
          {/* Imagem do aluno temporariamente removida */}
          <Text style={Styles.labels}>Curso:</Text>
          <Text style={Styles.dados}>{aluno.curso}</Text>
          <Text style={Styles.labels}>Semestre:</Text>
          <Text style={Styles.dados}>{aluno.semestre}</Text>
        </View>
        <View style={Styles.caixaBotoes}>
          <TouchableOpacity style={Styles.botoes} onPress={() => {
            console.log('[Notas e Faltas] Botão clicado.');
          }}>
            <FontAwesomeIcon icon={faChartColumn} size={40} />
            <Text style={Styles.botoesTxt}>Notas e Faltas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.botoes} onPress={() => {
            console.log('[Declarações] Navegando para declarações.');
            router.push('/declaracoes');
          }}>
            <FontAwesomeIcon icon={faClipboard} size={40} />
            <Text style={Styles.botoesTxt}>Declarações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.botoes} onPress={() => {
            console.log('[Atividades] Navegando para atividades.');
            router.push('/atividades');
          }}>
            <FontAwesomeIcon icon={faBookOpen} size={40} />
            <Text style={Styles.botoesTxt}>Atividades</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.botoes} onPress={() => {
            console.log('[Biblioteca] Navegando para biblioteca.');
            router.push('/biblioteca');
          }}>
            <FontAwesomeIcon icon={faBookAtlas} size={40} />
            <Text style={Styles.botoesTxt}>Biblioteca</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: "100%",
    height: 168,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 5,
    padding: 16,
    marginBottom: 30,
  },
  labels: {
    fontFamily: "Light",
    fontSize: RFPercentage(2.3),
    color: "#ABABAB",
  },
  dados: {
    fontFamily: "Regular",
    fontSize: RFPercentage(2.3),
    color: "black",
    marginBottom: 30,
  },
  caixaBotoes: {
    width: 293,
    height: 310,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  botoes: {
    width: 135,
    height: 135,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1E1E1",
    borderRadius: 10,
    marginBottom: 22,
    elevation: 5,
  },
  botoesTxt: {
    fontFamily: "Medium",
    fontSize: RFPercentage(2.1),
    marginTop: 10,
  },
});
