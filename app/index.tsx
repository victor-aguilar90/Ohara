import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLoginAluno = async () => {
    setLoading(true);
    setError('');
    console.log('Iniciando o processo de login de aluno');
  
    try {
      console.log('Enviando requisição ao servidor com:', { username, password });
      const response = await fetch('http://192.168.10.181:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      console.log('Resposta recebida do servidor:', response);
      const data = await response.json();
      console.log('Dados retornados do servidor:', data);
  
      if (response.ok) {
        if (data.token) {
          console.log('Login de aluno bem-sucedido, armazenando token no AsyncStorage');
          await AsyncStorage.setItem('userToken', data.token);
          console.log('Armazenando aluno:', data.aluno); 
          await AsyncStorage.setItem('aluno', JSON.stringify(data.aluno));
          
          router.push('/principal');
        } else {
          setError('Token inválido ou não encontrado');
        }
      } else {
        setError(data.message || 'Erro ao tentar fazer login');
      }
    } catch (err) {
      console.error('Erro no bloco catch durante o login de aluno:', err);
      setError('Erro ao tentar fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginBiblioteca = async () => {
    setLoading(true);
    setError('');
    console.log('Iniciando o processo de login de biblioteca');
  
    try {
      console.log('Enviando requisição ao servidor com:', { username, password });
      const response = await fetch('http://192.168.10.181:3000/login/biblioteca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      console.log('Resposta recebida do servidor:', response);
      const data = await response.json();
      console.log('Dados retornados do servidor:', data);
  
      if (response.ok) {
        if (data.token) {
          console.log('Login de biblioteca bem-sucedido, armazenando token no AsyncStorage');
          await AsyncStorage.setItem('userToken', data.token);
          console.log('Armazenando bibliotecário:', data.bibliotecario); 
          await AsyncStorage.setItem('bibliotecario', JSON.stringify(data.bibliotecario));
          
          router.push('/bibliotecario');
        } else {
          setError('Token inválido ou não encontrado');
        }
      } else {
        setError(data.message || 'Erro ao tentar fazer login');
      }
    } catch (err) {
      console.error('Erro no bloco catch durante o login de biblioteca:', err);
      setError('Erro ao tentar fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={Styles.container}>
      {!fontsLoaded ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <View style={Styles.form}>
          <Text style={Styles.titulo}>Login</Text>
          <Text style={Styles.label}>RM</Text>
          <TextInput
            placeholder="Digite seu RM"
            style={Styles.input}
            keyboardType="number-pad"
            value={username}
            onChangeText={setUsername}
          />
          <Text style={Styles.label}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha"
            style={Styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable style={Styles.botao} onPress={handleLoginAluno} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={Styles.botaoTexto}>ENTRAR COMO ALUNO</Text>
            )}
          </Pressable>
          <Pressable style={Styles.botao} onPress={handleLoginBiblioteca} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={Styles.botaoTexto}>ENTRAR COMO BIBLIOTECÁRIO</Text>
            )}
          </Pressable>
          {error && <Text style={Styles.error}>{error}</Text>}
          <Text style={Styles.txt}>Esqueceu a senha?</Text>
          <Text style={Styles.cadastro} onPress={() => router.push('/cadastro')}>
            Trocar senha
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  form: {
    width: '90%',
    maxWidth: 350,
    height: 'auto',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
  },
  titulo: {
    fontFamily: 'Medium',
    fontSize: RFPercentage(5),
    fontWeight: '500',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontFamily: 'Light',
    fontSize: RFPercentage(2.5),
    fontWeight: '400',
    marginBottom: 6,
    color: '#333',
  },
  botao: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 12,
    elevation: 5,
  },
  botaoTexto: {
    fontFamily: 'SemiBold',
    fontSize: RFPercentage(2.2),
    color: 'white',
  },
  input: {
    fontFamily: 'Light',
    fontSize: RFPercentage(2),
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  txt: {
    marginTop: 32,
    fontFamily: 'Regular',
    fontSize: RFPercentage(2),
    color: '#333',
    textAlign: 'center',
  },
  cadastro: {
    fontSize: RFPercentage(2),
    fontFamily: 'Regular',
    color: '#0146F6',
    textAlign: 'center',
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontSize: RFPercentage(2),
    marginTop: 10,
    textAlign: 'center',
  },
});
