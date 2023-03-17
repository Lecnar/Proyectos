// Variables del juego
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var carro = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 100,
  ancho: 50,
  alto: 100,
  velocidad: 5
};
var obstaculos = [];
var intervalo = null;
var puntos = 0;

// Función para dibujar el carro
function dibujarCarro() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(carro.x, carro.y, carro.ancho, carro.alto);
}

// Función para mover el carro a la izquierda
function moverIzquierda() {
  if (carro.x > 0) {
    carro.x -= carro.velocidad;
  }
}

// Función para mover el carro a la derecha
function moverDerecha() {
  if (carro.x < canvas.width - carro.ancho) {
    carro.x += carro.velocidad;
  }
}

// Función para dibujar los obstáculos
function dibujarObstaculos() {
  for (var i = 0; i < obstaculos.length; i++) {
    ctx.fillStyle = "#f00";
    ctx.fillRect(obstaculos[i].x, obstaculos[i].y, obstaculos[i].ancho, obstaculos[i].alto);
  }
}

// Función para mover los obstáculos hacia abajo
function moverObstaculos() {
  for (var i = 0; i < obstaculos.length; i++) {
    obstaculos[i].y += 5;
    
    // Si el obstáculo sale de la pantalla, lo eliminamos y sumamos un punto
    if (obstaculos[i].y > canvas.height) {
      obstaculos.splice(i, 1);
      puntos++;
    }
    
    // Si el carro choca con un obstáculo, detenemos el juego
    if (obstaculos[i].x < carro.x + carro.ancho && obstaculos[i].x + obstaculos[i].ancho > carro.x && obstaculos[i].y < carro.y + carro.alto && obstaculos[i].y + obstaculos[i].alto > carro.y) {
      detenerJuego();
    }
  }
}

// Función para generar obstáculos al azar
function generarObstaculos() {
  var ancho = Math.floor(Math.random() * 100) + 50;
  var x = Math.floor(Math.random() * (canvas.width - ancho));
  obstaculos.push({
    x: x,
    y: -50,
    ancho: ancho,
    alto: 50
  });
}

// Función para iniciar el juego
function iniciarJuego() {
  puntos = 0;
  obstaculos = [];
  intervalo = setInterval(function() {
  generarObstaculos();
  }, 2000);
  }
  
  // Función para detener el juego
  function detenerJuego() {
  clearInterval(intervalo);
  alert("Perdiste. Puntos obtenidos: " + puntos);
  iniciarJuego();
  }
  
  // Agregamos los eventos de teclado para mover el carro
  document.addEventListener("keydown", function(e) {
  if (e.keyCode === 37) {
  moverIzquierda();
  } else if (e.keyCode === 39) {
  moverDerecha();
  }
  });
  
  // Dibujamos el carro y los obstáculos continuamente
  function bucleJuego() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarCarro();
  dibujarObstaculos();
  moverObstaculos();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 20px Arial";
  ctx.fillText("Puntos: " + puntos, 10, 30);
  requestAnimationFrame(bucleJuego);
  }
  
  // Iniciamos el juego
  iniciarJuego();
  bucleJuego();
