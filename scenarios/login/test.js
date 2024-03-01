import { fail } from "k6";
import { Httpx } from "https://jslib.k6.io/httpx/0.1.0/index.js";

const EMAIL = "user@gmail.com";
const PASSWORD = "senha";

const session = new Httpx({
      baseURL: "http://localhost:8080/api",
      headers: { "Content-Type": "application/json" },
      timeout: 5000,
});

export default function testSuite() {
      const loginResp = session.post(
            `/user/login`,
            JSON.stringify({
                  email: EMAIL,
                  senha: PASSWORD,
            })
      );

      console.log(`Auth token: ${loginResp.status}`);

      if (loginResp.status !== 200) {
            fail("registration failed");
      }

      const authToken = loginResp.json("token");

      session.addHeader("Authorization", `Bearer ${authToken}`);

      const respCreateCrocodile = session.get(`http://localhost:8080/api/pacientes`);
      console.log(`Auth token: ${respCreateCrocodile.status}`);
      if (respCreateCrocodile.status !== 200) {
            fail("Crocodile creation failed");
      } else {
            console.log("New crocodile created");
      }
}
