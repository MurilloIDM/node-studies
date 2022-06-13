const axios = require("axios");

const api = axios.create({
  baseURL: "https://api.github.com",
});

function handler() {
  const users = ["MurilloIDM", "defunkt"];

  const promises = users.map((user) => {
    return api.get(`https://api.github.com/users/${user}`)
      .then(({ data }) => {
        return {
          name: data?.name,
          bio: data?.bio,
          followers: data?.followers,
        }
      });
  });

  execAll(promises)
    .then((response) => {
      console.log("Response [all] => ", response);
    })
    .catch(({ response: { data } }) => console.log("Error [all] => ", data));

  execAllSettled(promises)
    .then((response) => {
      console.log("Response [allSettled] => ", response);
    })
    .catch(({ response: { data }}) => console.log("Error [allSettled] => ", data));

  execRace(promises)
    .then((response) => {
      console.log("Response [race] => ", response);
    })
    .catch(({ response: { data }}) => console.log("Error [race] => ", data));
}

function execAll(promises) {
  return Promise.all(promises);
}

function execAllSettled(promises) {
  return Promise.allSettled(promises);
}

function execRace(promises) {
  return Promise.race(promises);
}

handler();