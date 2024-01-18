import { Counter, Rate, Trend } from "k6/metrics";

export let getLoginDuration = new Trend("get_login_duration");
export let getLoginFailRate = new Rate("get_login_fail_rate");
export let getLoginSuccessRate = new Trend("get_login_success_rate");
export let getLoginReqs = new Counter("get_login_reqs");

export default function () {
  const url = "http://localhost:8080/api/atendente";

  const payload = JSON.stringify({
    email: "user@gmail.com",
    senha: "senha",
  });

  let res = http.post(url, payload);

  getLoginDuration.add(res.timings.duration);
  getLoginFailRate.add(res.status !== 200);
  getLoginSuccessRate.add(res.status === 200);
  getLoginReqs.add(1);
}
