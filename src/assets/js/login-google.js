function loadGoogleSignInScript() {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

// Llama a la función para cargar el script
loadGoogleSignInScript();

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
      window.location.href = "/";
    })
    .catch((err) => {
      console.warn;
      /* Mensaje de Error de Logueo */
      toastr.error("Error al iniciar sesión con Google", "Error");
      //window.location.href = "/login";
    });
}
