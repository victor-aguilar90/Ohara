import { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://192.168.86.205:3000/login', { // IP do servidor backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        router.push('/principal'); // Redireciona para a tela principal
      } else {
        setError(data.message); // Exibe mensagem de erro
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao tentar fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={Styles.container}>
      {!fontsLoaded ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <View style={Styles.form}>
          <Text style={Styles.titulo}>Login</Text>
          <Text style={Styles.label}>RM</Text>
          <TextInput
            placeholder="Digite seu RM"
            style={Styles.input}
            keyboardType="email-address"
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
          <Pressable style={Styles.botao} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={Styles.botaoTexto}>ENTRAR</Text>
            )}
          </Pressable>
          {error && <Text style={Styles.error}>{error}</Text>}
          <Text style={Styles.txt}>Esqueceu a senha?</Text>
          <Text style={Styles.cadastro} onPress={() => router.push('/cadastro')}>
            Trocar senha
          </Text>
        </View>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: 300,
    height: 500,
  },
  titulo: {
    fontFamily: 'Medium',
    fontSize: 40,
    fontWeight: '500',
    marginBottom: 56,
  },
  label: {
    fontFamily: 'Light',
    fontSize: RFPercentage(2.8),
    fontWeight: '400',
    marginBottom: 6,
  },
  botao: {
    width: 300,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 12,
    elevation: 5,
  },
  botaoTexto: {
    fontFamily: 'SemiBold',
    fontSize: RFPercentage(2.4),
    color: 'white',
  },
  input: {
    fontFamily: 'Light',
    fontSize: RFPercentage(2.1),
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 31,
  },
  txt: {
    marginTop: 32,
    fontFamily: 'Regular',
    fontSize: 16,
  },
  cadastro: {
    fontSize: RFPercentage(2),
    fontFamily: 'Regular',
    color: '#0146F6',
  },
  error: {
    color: 'red',
    fontSize: RFPercentage(2),
    marginTop: 10,
  },
});