const { createApp } = Vue;

const options = {
  data() {
    return {
      eventos: [],
      categorias: [],
      categoriaElegida: [],
      categoriasFiltradas: [],
      eventosPasadosSeleccionado: [],
      currentDate: "",
      valorBusqueda: "",
    };
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((respuesta) => respuesta.json())
      .then((data) => {
        this.eventos = data.events;
        this.currentDate = data.currentDate;
        this.categoriasFiltradas = data.events.filter(
          (evento) => evento.date < this.currentDate
        );
        let categoriasRepetidas = this.eventos.map((evento) => evento.category);
        this.categorias = Array.from(new Set(categoriasRepetidas));
      })
      .catch((error) => console.log(error));
  },
  computed:{
    filtrar() {
      this.eventosPasadosSeleccionado = this.categoriasFiltradas.filter((evento) => {
        return (
          evento.name
            .toLowerCase()
            .startsWith(this.valorBusqueda.toLowerCase()) &&
          (this.categoriaElegida.includes(evento.category) ||
            this.categoriaElegida.length == 0)
        );
      });
    }
  }
};
const app = createApp(options);
app.mount("#app");
