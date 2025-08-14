import { useEffect, useState } from "react";
import { StyleSheet, TextInput, FlatList, View, TouchableOpacity, Alert, Modal, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import axios from "axios";

interface Contato {
  id: number;
  nome: string;
  apelido: string;
  cpf: number;
  telefone: number;
  email: string;
}

export default function HomeScreen() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [filtro, setFiltro] = useState("");
  
  // Estados para formulário
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  
  const [modalVisible, setModalVisible] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const API_URL = "http://192.168.15.10:8080/contato"; // sua API

  useEffect(() => {
    buscarContatos();
  }, []);

  const buscarContatos = async () => {
    try {
      const response = await axios.get(API_URL);
      setContatos(response.data);
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    }
  };

  const salvarContato = async () => {
    const contatoData = {
      nome,
      apelido,
      cpf: Number(cpf),
      telefone: Number(telefone),
      email,
    };

    try {
      if (editandoId) {
        await axios.put(`${API_URL}/${editandoId}`, contatoData);
      } else {
        await axios.post(API_URL, contatoData);
      }
      buscarContatos();
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar contato:", error);
    }
  };

  const editarContato = (contato: Contato) => {
    setNome(contato.nome);
    setApelido(contato.apelido);
    setCpf(String(contato.cpf));
    setTelefone(String(contato.telefone));
    setEmail(contato.email);
    setEditandoId(contato.id);
    setModalVisible(true);
  };

  const excluirContato = (id: number) => {
    Alert.alert("Confirmar", "Deseja realmente excluir este contato?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/${id}`);
            buscarContatos();
          } catch (error) {
            console.error("Erro ao excluir contato:", error);
          }
        },
      },
    ]);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setEditandoId(null);
    setNome("");
    setApelido("");
    setCpf("");
    setTelefone("");
    setEmail("");
  };

  const renderItem = ({ item }: { item: Contato }) => (
    <ThemedView style={styles.card}>
      <ThemedText type="defaultSemiBold">{item.nome} ({item.apelido})</ThemedText>
      <ThemedText>CPF: {item.cpf}</ThemedText>
      <ThemedText>Telefone: {item.telefone}</ThemedText>
      <ThemedText>Email: {item.email}</ThemedText>
      <View style={styles.cardButtons}>
        <TouchableOpacity style={[styles.botao, styles.botaoEditar]} onPress={() => editarContato(item)}>
          <ThemedText style={styles.botaoTexto}>Editar</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, styles.botaoExcluir]} onPress={() => excluirContato(item.id)}>
          <ThemedText style={styles.botaoTexto}>Excluir</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Agenda de Contatos</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Filtrar por nome..."
        value={filtro}
        onChangeText={setFiltro}
      />

      <TouchableOpacity style={styles.botaoAdicionar} onPress={() => setModalVisible(true)}>
        <ThemedText style={styles.botaoTexto}>+ Novo Contato</ThemedText>
      </TouchableOpacity>

      <FlatList
        data={contatos.filter(c => c.nome.toLowerCase().includes(filtro.toLowerCase()))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<ThemedText style={{ textAlign: "center", marginTop: 20 }}>Nenhum contato encontrado</ThemedText>}
      />

      {/* Modal de formulário */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <ThemedText type="title" style={{ textAlign: "center", marginBottom: 20 }}>
            {editandoId ? "Editar Contato" : "Novo Contato"}
          </ThemedText>

          <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
          <TextInput style={styles.input} placeholder="Apelido" value={apelido} onChangeText={setApelido} />
          <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

          <TouchableOpacity style={styles.botaoSalvar} onPress={salvarContato}>
            <ThemedText style={styles.botaoTexto}>Salvar</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoCancelar} onPress={fecharModal}>
            <ThemedText style={styles.botaoTexto}>Cancelar</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { textAlign: "center", marginBottom: 10, fontSize: 22 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  botao: { padding: 8, borderRadius: 5, flex: 1, alignItems: "center", marginHorizontal: 5 },
  botaoEditar: { backgroundColor: "#007bff" },
  botaoExcluir: { backgroundColor: "#dc3545" },
  botaoAdicionar: { backgroundColor: "#28a745", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  botaoSalvar: { backgroundColor: "#28a745", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  botaoCancelar: { backgroundColor: "#6c757d", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
  modalContainer: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
});
