import { Counter, Rate, Trend } from "k6/metrics";
import http from "k6/http";

export let getPacientesDuration = new Trend("get_pacientes_duration");
export let getPacientesFailRate = new Rate("get_pacientes_fail_rate");
export let getPacientesSuccessRate = new Trend("get_pacientes_success_rate");
export let getPacientesReqs = new Counter("get_pacientes_reqs");

export default function () {
  let res = http.get("http://localhost:8080/api/pacientes?search=01");

  getPacientesDuration.add(res.timings.duration);
  getPacientesFailRate.add(res.status !== 200);
  getPacientesSuccessRate.add(res.status === 200);
  getPacientesReqs.add(1);
}
