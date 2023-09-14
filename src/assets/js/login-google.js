function loadGoogleSignInScript() {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

// Llama a la función para cargar el script
loadGoogleSignInScript();

/* function decodeJWTToken(token) {
  return JSON.parse(atob(token.split(".")[1]));
}
function handleCredentialResponse(response) {
  // to decode the credential response.
  const responsePayload = decodeJWTToken(response.credential);
  sessionStorage.setItem("loggedInUser", JSON.stringify(responsePayload));
  window.location.href = "/";
}
function handleSignout() {
  google.accounts.id.disableAutoSelect();
} */

function handleCredentialResponse(response) {
  const body = { id_token: response.credential };

  fetch("http://localhost:10001/api/login/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      sessionStorage.setItem("token", resp.token);
    })
    .catch(console.warn);
  window.location.href = "/";
}
