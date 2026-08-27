const STORAGE_KEY = "contactos";

function leerContactos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error al leer contactos de localStorage:", e);
    return [];
  }
}

function guardarContactos(contactos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contactos));
}

export async function listarContactos() {
  return leerContactos();
}

export async function crearContacto(data) {
  const contactos = leerContactos();
  const nuevoContacto = {
    id: Date.now().toString(),
    ...data,
  };
  contactos.push(nuevoContacto);
  guardarContactos(contactos);
  return nuevoContacto;
}

export async function eliminarContactoPorId(id) {
  const contactos = leerContactos();
  const filtrados = contactos.filter((c) => c.id !== id);
  guardarContactos(filtrados);
  return true;
}
