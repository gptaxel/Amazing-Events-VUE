const { createApp } = Vue;

const options = {
  data() {
    return {
      eventos: [],
      categorias: [],
      categoriaElegida: [],
      valorBusqueda: "",
      categoriasFiltradas: [],
    };
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((respuesta) => respuesta.json())
      .then((data) => {
        this.eventos = data.events;
        this.categoriasFiltradas = data.events;
        let categoriasRepetidas = this.eventos.map((evento) => evento.category);
        this.categorias = Array.from(new Set(categoriasRepetidas));
      })
      .catch((error) => console.log(error));
  },
  methods: {
    filtrar() {
      this.categoriasFiltradas = this.eventos.filter((evento) => {
        return (
          evento.name
            .toLowerCase()
            .startsWith(this.valorBusqueda.toLowerCase()) &&
          (this.categoriaElegida.includes(evento.category) ||
            this.categoriaElegida.length == 0)
        );
      });
    },
  },
};
const app = createApp(options);
app.mount("#app");
