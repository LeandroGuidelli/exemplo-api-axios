// @ts-nocheck
import { useState } from "react";
import { StyleSheet, View, Image, Text, Button, TextInput, ScrollView } from "react-native";
import { getRandomDogs } from "./src/services/api";

export default function App() {
  const [images, setImages] = useState([]);
  const [count, setCount] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDogs = async () => {
    try {
      setLoading(true);
      setError("");
      const qtd = Math.max(1, parseInt(count) || 1);
      const urls = await getRandomDogs(qtd);
      setImages(urls);
    } catch (e) {
      console.log("Erro ao buscar cachorro:", e);
      setError("Falha ao buscar imagens. Tente novamente.");
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🐶 DogsFinder 🐶</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Quantos cachorros?"
        value={count}
        onChangeText={setCount}
      />

      <Button title="Buscar cachorro(s)" onPress={fetchDogs} />

      {loading && <Text style={styles.info}>Carregando...</Text>}
      {!!error && <Text style={styles.error}>{error}</Text>}

      {images.map((url, i) => (
        <Image key={i} source={{ uri: url }} style={styles.image} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: 200,
    textAlign: "center",
    marginBottom: 10,
    borderRadius: 6,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 10,
    borderRadius: 12,
  },
  info: {
    marginTop: 20,
    fontStyle: "italic",
    color: "gray",
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
