import { Counter, Rate, Trend } from "k6/metrics";
import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let postLoginFailRate = new Rate("post_login_fail_rate");
export let postLoginReqs = new Counter("post_login_reqs");

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

export default function () {
  const url = "http://localhost:8080/api/user/login";

  const payload = JSON.stringify({
    email: "user@gmail.com",
    senha: "senha",
  })

  let res = http.post(url, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  postLoginFailRate.add(res.status !== 200);
  postLoginReqs.add(1);

  check(res, {
    'response code was 200': (res) => res.status == 200,
  });
}
