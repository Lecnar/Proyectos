// Generamos un número al azar entre 1 y 100
const numeroAleatorio = Math.floor(Math.random() * 100) + 1;

// Obtenemos los elementos del DOM
const inputNumero = document.getElementById("inputNumero");
const btnAdivinar = document.getElementById("btnAdivinar");
const mensaje = document.getElementById("mensaje");

// Función que se ejecuta cuando se presiona el botón "Adivinar"
btnAdivinar.onclick = function() {
  // Obtenemos el número introducido por el usuario
  const numeroUsuario = parseInt(inputNumero.value);
  
  // Comparamos el número introducido con el número aleatorio generado al azar
  if (numeroUsuario === numeroAleatorio) {
    mensaje.innerHTML = "¡Correcto! Has adivinado el número.";
    mensaje.style.color = "#2ECC71";
  } else if (numeroUsuario < numeroAleatorio) {
    mensaje.innerHTML = "El número es mayor. Sigue intentando.";
    mensaje.style.color = "#E74C3C";
  } else {
    mensaje.innerHTML = "El número es menor. Sigue intentando.";
    mensaje.style.color = "#E74C3C";
  }
  
  // Limpiamos el input
  inputNumero.value = "";
  
  // Ponemos el foco en el input
  inputNumero.focus();
}
