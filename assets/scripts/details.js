const { createApp } = Vue;

const options = {
  data() {
    return {
      eventos: [],
      eventoElegido: [],
      parametro: "",
      enlaceParametro: "",
      idEvento: "",
    };
  },

  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((respuesta) => respuesta.json())
      .then((data) => {
        this.eventos = data.events;
        this.parametro = location.search;
        this.enlaceParametro = new URLSearchParams(this.parametro)
        this.idEvento = this.enlaceParametro.get("parametro")
        this.eventoElegido = this.eventos.find(evento => evento._id == this.idEvento)
        console.log(this.eventoElegido);
      })
      .catch((error) => console.log(error));
  },
};

const app = createApp(options);
app.mount("#app");
