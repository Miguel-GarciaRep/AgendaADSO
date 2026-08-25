// Capa de datos de la Agenda.
// Antes usaba JSON Server (http://localhost:3002), pero eso solo funciona
// en tu computadora, no en un sitio publicado en Netlify.
// Ahora usamos localStorage del navegador: los contactos se guardan
// directamente en el navegador de quien visita la página.

const STORAGE_KEY = "contactos";

// Lee el arreglo de contactos guardado en localStorage (o [] si no hay nada)
function leerContactos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error al leer contactos de localStorage:", e);
    return [];
  }
}

// Guarda el arreglo completo de contactos en localStorage
function guardarContactos(contactos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contactos));
}

// GET: listar contactos
// Se mantiene como función async para no tener que cambiar App.jsx
export async function listarContactos() {
  return leerContactos();
}

// POST: crear contacto
export async function crearContacto(data) {
  const contactos = leerContactos();

  // Generamos un id único simple (similar al que generaba JSON Server)
  const nuevoContacto = {
    id: Date.now().toString(),
    ...data,
  };

  contactos.push(nuevoContacto);
  guardarContactos(contactos);

  return nuevoContacto;
}

// DELETE: eliminar contacto por id
export async function eliminarContactoPorId(id) {
  const contactos = leerContactos();
  const filtrados = contactos.filter((c) => c.id !== id);
  guardarContactos(filtrados);
  return true;
}
