import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { group } from "k6";

import PostLogin from "./scenarios/login/Post-Login.js";

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

export default () => {
  group("Login", () => {
    PostLogin();
  });
};
