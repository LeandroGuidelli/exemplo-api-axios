import axios from "axios";

// Cria a instância da API
const api = axios.create({
  baseURL: "https://dog.ceo/api",
  timeout: 5000,
});

// Função para buscar imagens aleatórias de cachorro
export const getRandomDogs = async (count = 1) => {
  const requests = Array.from({ length: count }, () =>
    api.get("/breeds/image/random")
  );
  const responses = await Promise.all(requests);
  // Remove duplicadas
  const urls = Array.from(new Set(responses.map(r => r.data.message)));
  return urls;
};

export default api;
