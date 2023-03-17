// Obtenemos el elemento a seguir
var caja = document.getElementById("caja");

// Agregamos el evento para el movimiento del mouse
document.addEventListener("mousemove", function (evento) {
  // Obtenemos la posición del mouse
  var x = evento.clientX;
  var y = evento.clientY;

  // Actualizamos la posición de la caja
  caja.style.left = x + "px";
  caja.style.top = y + "px";
});
