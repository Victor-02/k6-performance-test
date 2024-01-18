import http from "k6/http";
import { check } from "k6";

let headers = null;

export default function () {
  const payload = {
    email: "user@gmail.com",
    senha: "senha",
  };

  const res = http.post(
    "http://localhost:8080/api/atendente/login",
    JSON.stringify(payload),
    { "Content-Type": "application/json" }
  );

  check(res, {
    "Requisição de login bem-sucedida": (r) => r.status === 200,
  });

  headers = {
    Authorization: `Bearer ${res.json("token")}`,
    "Content-Type": "application/json",
  };
}
