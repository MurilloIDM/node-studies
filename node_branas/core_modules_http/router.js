const http = require("http");

const createRouter = function (port) {
  const api = {};
  const routes = {};
  const body = [];
  const interceptors = [];
  const methods = ['GET', 'POST', 'OPTIONS'];

  methods.forEach((method) => {
    routes[method] = {};
    api[method.toLowerCase()] = (path, fn) => {
      routes[method][path] = fn;
    }
  });

  const get = function (path, fn) {
    routes['GET'][path] = fn;
  };

  const post = function (path, fn) {
    routes['POST'][path] = fn;
  };

  api.interceptor = (interceptor) => {
    interceptors.push(interceptor);
  }

  const executeInterceptors = (number, request, response) => {
    const interceptor = interceptors[number];

    if (!interceptor) return;

    interceptor(request, response, () => {
      executeInterceptors(++number, request, response);
    });
  }

  const handleBody = (request, response, next) => {
    request.on("data", (chuck) => {
      body.push(chuck);
    })

    request.on("end", () => {
      request.body = Buffer.concat(body).toString();
      next();
    });
  }

  http.createServer((request, response) => {
    handleBody(request, response, () => {
      executeInterceptors(0, request, response);

      if (!routes[request.method][request.url]) {
        response.statusCode = 404;
        return response.end();
      }

      routes[request.method][request.url](request, response);
    });

  }).listen(port);

  return api;
};

module.exports = createRouter;