class Juego {
  constructor() {
    this.palabraSecreta = this.#getPalabraSecreta();
    this.numeroCaracteres = this.#getNumeroCaracteres();
    this.turnos = 6;
    this.aciertos = 0;
    this.catacteresUsados = [];
    this.guiones = this.#getGuiones();
  }
  //===========================DECLARACIÓN DE MÉTODOS================================
  #getPalabraSecreta() {
    //método que retona una palabra aleatoria de la lista de palabras establecida.
    const listaPalabras = [
      "javascript",
      "programacion",
      "computadora",
      "desarrollo",
      "tecnologia",
      "internet",
      "aplicacion",
      "seguridad",
      "software",
      "hardware",
      "aprendizaje",
      "interfaz",
      "codigo",
      "base",
      "datos",
      "desarrollador",
      "sistema",
      "proyecto",
      "programador",
      "pagina",
      "usuario",
      "redes",
      "web",
      "teclado",
      "raton",
      "monitor",
      "servidor",
      "celular",
      "movil",
      "archivo",
      "funcion",
      "variable",
    ];

    const indiceRandom = Math.round(Math.random() * listaPalabras.length);
    return listaPalabras[indiceRandom].toUpperCase();
  }

  //Método que retorna el número de caracteres de la palabra secreta
  #getNumeroCaracteres() {
    return this.palabraSecreta.length;
  }

  #getGuiones() {
    let guiones = " ";
    for (let i = 0; i < this.numeroCaracteres; i++) {
      guiones += " _ ";
    }
    return guiones;
  }
  #getLetrasUsadas(letra) {
    let stringLetras = "";
    if (this.catacteresUsados.length === 0) {
      stringLetras = "";
    } else {
      this.catacteresUsados.forEach((l) => {
        stringLetras += `[${l}] - `;
      });
    }
    return stringLetras;
  }
  #getDibujoStatus() {
    const dibujosAhorcado = [
      `
     _________
    |         |
    |
    |
    |
    |
    |
    ===
    ========`,
      `
     _________
    |         |
    |         O
    |
    |
    |
    |
    ===
    ========`,
      `
     _________
    |         |
    |         O
    |         |
    |
    |
    |
    ===
    ========`,
      `
     _________
    |         |
    |         O
    |        /|
    |
    |
    |
    ===
    ========`,
      `
     _________
    |         |
    |         O
    |        /|\\
    |
    |
    |
    ===
    ========`,
      `
     _________
    |         |
    |         O
    |        /|\\
    |        /
    |
    |
    ===
    ========`,
      `
     _________
    |         |
    |         O
    |        /|\\
    |        / \\
    |
    |
    ===
    ========`,
    ];
    return dibujosAhorcado[6 - this.turnos];
  }

  #evaluador(letra) {
    this.guiones = "";
    let actalizaGuiones = [];
    let ocurrencias = 0;
    if (this.catacteresUsados.find((l) => l == letra)) {
      alert(
        `Ya introdujo la letra [${letra}] anteriormente. Pruebe con una distinta.`
      );
    } else {
      this.catacteresUsados.push(this.input);

      //Filtro para determinar si la letra introducida ya se introdujo antes

      //Evaluación para determinar si hay aciertos o fallos
      if (this.palabraSecreta.includes(letra)) {
        for (let i = 0; i < this.palabraSecreta.length; i++) {
          this.palabraSecreta.charAt(i) === letra ? ocurrencias++ : false;
        }
        this.aciertos += ocurrencias;
      } else {
        this.turnos--;
      }
      //Bucles for anidadados para sustituir los guiones de la palabra incógnito por las letras reveladas
      for (let a = 0; a < this.palabraSecreta.length; a++) {
        actalizaGuiones[a] = " _ ";
      }
      for (let i = 0; i < this.catacteresUsados.length; i++) {
        for (let j = 0; j < this.palabraSecreta.length; j++) {
          if (this.palabraSecreta[j] === this.catacteresUsados[i]) {
            actalizaGuiones[j] = this.palabraSecreta[j];
          }
        }
      }

      for (let b = 0; b < actalizaGuiones.length; b++) {
        this.guiones += actalizaGuiones[b];
      }
      //Declaración de juego ganado
      if (this.aciertos === this.numeroCaracteres) {
        alert(`Felicitaciones Ganaste la partida! \n
      Descubriste la palbra secreta ${this.palabraSecreta.toUpperCase()}\n
      `);
        window.location.reload();
      }
    }
  }

  #entrada() {
    console.log("Palabra secreta( Solo para tramposos):", this.palabraSecreta);
    const letraRegex = /^[a-zA-Z]$/;

    this.input = prompt(`\t\t\t\t\t\t\t AHORCADO\n
=======================================================\n
Para salir del juego escriba la palabra: SALIR\n
TURNOS: ${this.turnos}\n\n
ACIERTOS: ${this.aciertos}\n\n
LETRAS USADAS: ${this.#getLetrasUsadas()}\n\n
CANTIDAD LETRAS: ${this.numeroCaracteres}\n\n
PALABRA SECRETA: ${this.guiones}\n\n
${this.#getDibujoStatus()}\n\n


`).toUpperCase();

    if (letraRegex.test(this.input)) {
      this.#evaluador(this.input);
    } else {
      alert("Ingresa solo una letra.");
    }
  }

  jugar() {
    alert(
      `Mi proyecto final será una app para poder generar personajes de Rol de Fate Acelerado\n
      Se podrán generar enemigos, fichas de personaje y tiradas de datos.\n
      Como todavía no podemos usar el DOM, no puedo avanzar en el proyecto hasta la próxima entrega.\n
      Dejo un juego de AHORCADO mientras tanto
      `
    );
    do {
      if (this.turnos > 0) {
        this.#entrada();
      } else {
        alert("Lo lamento perdiste, refresca la pagina para volver a jugar");
        this.input = "SALIR";
      }
    } while (this.input !== "SALIR");
  }
}

juegoNuevo = new Juego();
juegoNuevo.jugar();
