import http from "http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

/*3 formas do front end enviar dados para uma API:
=> Query Parameters :  http://localhost:3333/users?userID:1 == userId=1 == params sending// URL Stateful => Filtros,Paginação

=> Route Parameters : http://localhost:3333/users/1 :identificação de recursos  


=> Request Body : Envio de informações de um formulario por exemplo em formato JSON na maioria das vezes (HTTPs)


*/

//JSON - JAVASCRIPT OBJECT NOTATION
//Cabecalhos = (Requisição/resposta) = Metadados
//HTTP - statusCode

// UUID => UNIQUE ID UNIVERSAL

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method == method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path)

  

    const {query,...params} = routeParams.groups 

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    req.params = {...routeParams.groups}
  
    return route.handler(req, res);
  }
  res.writeHead(404).end("Pagina não encontrada");
});

const port = 3000;

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port} 🎉 !!!`);
});
