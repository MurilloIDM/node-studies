const router = require("./router");

const app = router(3412);

const telephoneOperators = [
  { name: "Oi", code: 14, category: "cell", price: 2 },
  { name: "Vivo", code: 15, category: "cell", price: 1 },
  { name: "Tim", code: 41, category: "cell", price: 3 }
];

const contacts = [
  { id: 1, name: "Bruno", telephone: "9999-1111", date: new Date(), operator: telephoneOperators[0] },
  { id: 2, name: "Sandy", telephone: "9999-2222", date: new Date(), operator: telephoneOperators[2] },
  { id: 3, name: "Maria", telephone: "9999-3333", date: new Date(), operator: telephoneOperators[2] }
];

app.interceptor((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.interceptor((request, response, next) => {
  response.setHeader('Content-Type', 'application/json;charset=UTF-8');
  next();
});

app.get("/operadoras", (request, response) => {
  response.write(JSON.stringify(telephoneOperators));
  response.end();
});

app.get("/contatos", (request, response) => {
  response.write(JSON.stringify(contacts));
  response.end();
});

app.options("/contatos", (request, response) => {
  response.end();
});

app.post("/contatos", (request, response) => {
  const contact = JSON.parse(request.body);
  contacts.push(contact);
  response.end();
});