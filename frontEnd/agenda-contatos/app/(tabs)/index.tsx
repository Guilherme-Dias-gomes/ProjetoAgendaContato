import { useEffect, useState } from "react";
import { StyleSheet, TextInput, FlatList, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import axios from "axios";

interface Contato {
  id: number;
  nome: string;
  email: string;
  dataRegistro: string;
}

export default function HomeScreen() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    buscarContatos();
  }, []);

  const buscarContatos = async () => {
    try {
      const response = await axios.get(
        `http://SEU_BACKEND/contatos?filtro=${filtro}`
      );
      setContatos(response.data);
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    }
  };

  const renderItem = ({ item }: { item: Contato }) => (
    <ThemedView style={styles.item}>
      <ThemedText type="defaultSemiBold">{item.nome}</ThemedText>
      <ThemedText>{item.email}</ThemedText>
      <ThemedText>{item.dataRegistro}</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Cabeçalho */}
      <ThemedText type="title" style={styles.header}>
        Agenda de Contatos
      </ThemedText>

      {/* Filtro */}
      <TextInput
        style={styles.input}
        placeholder="Filtrar por nome, email ou data..."
        value={filtro}
        onChangeText={setFiltro}
        onSubmitEditing={buscarContatos}
      />

      {/* Lista */}
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <ThemedText style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum contato encontrado
          </ThemedText>
        }
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={buscarContatos}>
          <ThemedText style={{ color: "blue" }}>Atualizar Lista</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 1, margin: 20, borderWidth: 2, borderColor: 'black'},
  header: { textAlign: "center", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    gap: 2,
  },
  footer: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    marginTop: 10,
  },
});
