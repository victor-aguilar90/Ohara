import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const CaixaAtividade = ({ materia, professor, descricao }) => (
  <View style={Styles.caixa}>
    <View style={Styles.txt}>
      <Text style={Styles.materia}>{materia}</Text>
      <Text style={Styles.prof}>{professor}</Text>
      <Text style={Styles.descricao}>{descricao}</Text>
    </View>
    <TouchableOpacity style={Styles.enviarAtv}>
      <FontAwesomeIcon icon={faPaperPlane} size={25} color={"white"} />
    </TouchableOpacity>
  </View>
);

const Styles = StyleSheet.create({
  caixa: {
    width: "100%",
    height: 130,
    backgroundColor: "white",
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.35)',
    elevation: 5,
    borderRadius: 15,
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  txt: {
    width: "50%",
    height: 88,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  materia: {
    fontFamily: "Regular",
    fontSize: RFPercentage(2.3),
  },
  prof: {
    fontFamily: "Regular",
    fontSize: RFPercentage(2.1),
  },
  descricao: {
    fontFamily: "Light",
    fontSize: RFPercentage(1.9),
  },
  enviarAtv: {
    width: 60,
    height: 60,
    backgroundColor: "black",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
});

export default CaixaAtividade;
