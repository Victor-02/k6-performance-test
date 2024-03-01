export default () => {

  const payload = {
    email: "user@gmail.com",
    senha: "senha",
  };

  let headers;  // Declare headers variable outside the fetch

  fetch("http://localhost:8080/api/atendente/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();  // Parse the response JSON
    })
    .then((data) => {
      console.log(data);  // Check the structure of the response data
      headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + data.token,  // Access the token from the response
      };
      // Perform actions with headers here or return them if needed
      return headers;
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}
