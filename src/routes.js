import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();
export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const {search} = req.query
      const users = database.select("users",search ? {
        name: search,
        Hobby:search
      } : null);
      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { name, password, Hobby } = req.body;

      const user = {
        id: randomUUID(),
        name,
        password,
        Hobby,
      };

      database.insert("users", user);

      return res.writeHead(201).end("Criado com sucesso");
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const id = req.params.id;
      database.delete("users", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
     
      const id = req.params.id;
      const {name,Hobby} =  req.body
      database.update("users", id,{name,Hobby});

      return res.writeHead(204).end();
    },
  },
];
