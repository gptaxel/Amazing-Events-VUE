const { createApp } = Vue;

const options = {
  data() {
    return {
      eventos: null,
      categoriaPast: [],
      arrayOrdenado: [],
      arrayPorcentaje: [],
      nombreMayorAsistencia: "",
      mayorPorcentaje: null,
      menorPorcentaje: null,
      eventoMayorCapacidad: "",
      //past
      eventosPast: [],
      arrayOrdenadoPast: [],
      estadisticasPast  : [],
      nombreMayorAsistenciaPast: "",
      nombreMenorAsistenciaPast: "",
      //upcoming
      arrayEventosFuturos: [],
      estadisticaUpcoming: [],
      categoriaUpcoming: [],
    };
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((respuesta) => respuesta.json())
      .then((data) => {
        this.eventos = data.events;
        this.eventosPast = this.eventos.filter(
          (evento) => evento.date < data.currentDate
        );

        this.arrayEventosFuturos = this.eventos.filter(
          (evento) => evento.date > data.currentDate
        );

        this.categoriaUpcoming = [
            ...new Set(
              this.arrayEventosFuturos.map((evento) => evento.category)
            ),
          ];

        this.categoriaPast = [
          ...new Set(this.eventosPast.map((evento) => evento.category)),
        ];
        console.log(this.eventosPast);

        this.arrayOrdenadoPast = Array.from(this.eventosPast).sort(
          (a, b) =>
            calcularPorcentaje(a.assistance, a.capacity) -
            calcularPorcentaje(b.assistance, b.capacity)
        );

        console.log(this.arrayEventosFuturos);

        this.arrayOrdenado = Array.from(this.eventos).sort(function (a, b) {
          return b.capacity - a.capacity;
        });

        this.nombreMayorAsistencia = this.arrayOrdenado[0].name;

        this.eventoMayorCapacidad = this.arrayOrdenado[0].capacity;

        this.nombreMayorAsistenciaPast =
          this.arrayOrdenadoPast[this.arrayOrdenadoPast.length - 1].name;

        this.mayorPorcentaje = calcularPorcentaje(
          this.arrayOrdenadoPast[this.arrayOrdenadoPast.length - 1].assistance,
          this.arrayOrdenadoPast[this.arrayOrdenadoPast.length - 1].capacity
        ).toFixed(2);

        this.nombreMenorAsistenciaPast = this.arrayOrdenadoPast[0].name;

        this.menorPorcentaje = calcularPorcentaje(
          this.arrayOrdenadoPast[0].assistance,
          this.arrayOrdenadoPast[0].capacity
        ).toFixed(2);

        function calcularPorcentaje(assistance, capacidad) {
          let porcentaje = (assistance / capacidad) * 100;
          return porcentaje;
        }

        this.estadisticaUpcoming = this.categoriaUpcoming.map((categoria) => {
          let aux = {
            nombreCategoria: categoria,
          };
          let eventosDeCategoria = this.arrayEventosFuturos.filter(
            (evento) => evento.category == categoria
          );
          let ganancias = eventosDeCategoria.reduce(
            (acumulador, elementoActual) =>
              acumulador + elementoActual.price * elementoActual.estimate,
            0
          );
          let porcentajeAsistencia =
            eventosDeCategoria.reduce(
              (acumulador, elementoActual) =>
                acumulador +
                elementoActual.estimate / (elementoActual.capacity / 100),
              0
            ) / eventosDeCategoria.length;
          aux.ganancias = ganancias.toLocaleString();
          aux.porcentajeAsistencia = porcentajeAsistencia.toFixed(2);
          return aux;
        });

        this.estadisticasPast = this.categoriaPast.map((categoria) => {
            let aux = {
              nombreCategoria: categoria,
            };
            let eventosDeCategoria = this.eventosPast.filter(
              (evento) => evento.category == categoria
            );
            let ganancias = eventosDeCategoria.reduce(
              (acumulador, elementoActual) =>
                acumulador + elementoActual.price * elementoActual.assistance,
              0
            );
            let porcentajeAsistencia =
              eventosDeCategoria.reduce(
                (acumulador, elementoActual) =>
                  acumulador +
                  elementoActual.assistance / (elementoActual.capacity / 100),
                0
              ) / eventosDeCategoria.length;
            aux.ganancias = ganancias.toLocaleString();
            aux.porcentajeAsistencia = porcentajeAsistencia.toFixed(2);
            return aux;
          });
      })
      .catch((error) => console.log(error));
  },
  methods: {},
};

const app = createApp(options);
app.mount("#app");
