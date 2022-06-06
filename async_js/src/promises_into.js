const axios = require("axios");

const api = axios.create({
  baseURL: "https://api.github.com"
});

async function handler() {
  // with .then and .catch
  api.get("/users/MurilloIDM")
    .then((response) => console.log("response success with .then -> ", response?.data))
    .catch((error) => console.log("response error with .catch -> ", error));

  // with async/await
  try {
    const { data } = await api.get("/users/MurilloIDM");
    console.log("response success with async/await -> ", data);
  } catch (error) {
    console.log("response error with async/await -> ", error);
  }
}

handler().then(() => console.log("Execução finalizada"));