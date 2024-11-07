import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

export default function Index() {

  const [fontsLoaded] = useFonts({
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
  });

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;  // Ou algum indicador de carregamento
  }

  const router = useRouter();

  return (
    <View style = {Styles.container}>
      <View style = {Styles.form}>
        <Text style = {Styles.titulo}>Login</Text>
        <Text style = {Styles.label}>Email</Text>
        <TextInput placeholder="Digite seu email" style = {Styles.input} keyboardType="email-address"></TextInput>
        <Text style = {Styles.label}>Senha</Text>
        <TextInput placeholder="Digite sua senha" style = {Styles.input} secureTextEntry={true} keyboardType="visible-password"></TextInput>
        <TouchableOpacity style={[Styles.botao]} onPress={() => router.push('/principal')}>
          <Text style = {Styles.botaoTexto}>ENTRAR</Text>
        </TouchableOpacity>
        <Text style = {Styles.txt}>Não tem conta ainda?</Text>
        <Text style = {Styles.cadastro} onPress={() => router.push('/cadastro')}>Crie uma conta</Text>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
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
    fontFamily:'Light',
    fontSize: 20,
    fontWeight:'400',
    marginBottom: 6,
  },
  
  botao: {
    width: 300,
    height: 50,
    color: "white",
    backgroundColor: "black",
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 10,
    marginTop: 12,
    shadowColor:"#000",
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.2,
    elevation: 4,
  },

  botaoTexto: {
    fontFamily:'SemiBold',
    fontSize: 21,
    color: "white"
  },

  input: {
    fontFamily: 'Light',
    fontSize: 16,
    height: 44,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 31,
  },

  txt: {
    marginTop: 32,
    fontFamily:'Regular',
    fontSize: 16,
  },

  cadastro: {
    fontSize: 16,
    fontFamily:'Regular',
    color: '#0146F6',
  }
})