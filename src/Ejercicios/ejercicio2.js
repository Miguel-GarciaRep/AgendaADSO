const nombre = "Miguel" /* Creamos una variable constate con mi nombre, servira para mostrarlo despues */
const ficha = 3412785 /* Creamos una variable constante de la ficha, que usaremos para mostrarlo despues */
let calificaciones = [0.0 , 0.5 , 3.8] /* Creamos un arreglo de calificaciones con las cuales vamos a sacar el promedio */

/* Sacamos el promedio, sumamos las 3 calificaciones usando su index y los dividimos entre 3 para sacar el promedio de estas */
let promedio = (calificaciones[0] + calificaciones[1] + calificaciones[2]) / 3 

/* Creamos el "Recibo" que muestra todos los valores hechos 
en donde mostramos nombre, fucha y las notas, agregamos .tofixed(valor) para indicar cuantos decimales queremos que se muestren
tambien mostramos promedio y estado, en el cual se hace una validacion de que si el promedio es mayor a 3 el usuario aprobara, si no
desaprobara
*/
console.log(`
====================
SITEMA DE NOTAS SENA
====================
Aprendiz: ${nombre}
Ficha: ${ficha}
Notas: ${calificaciones[0].toFixed(1)} , ${calificaciones[1].toFixed(1)} , ${calificaciones[2].toFixed(1)}
====================
Promedio: ${promedio.toFixed(2)}
Estado: ${promedio >= 3 ? "Aprobado" : "Desaprobado"}
`)