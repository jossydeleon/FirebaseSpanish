function observador () {
....
guardarUsuarioStorage(usuario);

}

const guardarUsuarioStorage = (usuario) => {
  if(usuario) {
      localStorage.setItem("usuario", JSON.stringify(user));
    }
    else {
        localStorage.removeItem("usuario");
    }
}

const obtenerUsuarioSesion = () => {
  return JSON.parse(localStorage.getItem("credentials")) || null;
}
