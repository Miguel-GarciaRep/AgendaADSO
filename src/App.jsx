// Importamos useEffect y useState para manejar estados y efectos en el componente principal
import { useEffect, useState } from "react";

// Importamos los servicios que se comunican con JSON Server
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api";

// Importamos los componentes hijos
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

// Componente principal de la aplicación
function App() {
  // Estado que almacena la lista de contactos obtenidos de la API
  const [contactos, setContactos] = useState([]);

  // Estado que indica si estamos cargando información (por ejemplo, al inicio)
  const [cargando, setCargando] = useState(true);

  // Estado para guardar mensajes de error generales de la aplicación
  const [error, setError] = useState("");

  // useEffect que se ejecuta una sola vez al montar el componente
  // Aquí cargamos los contactos iniciales desde JSON Server
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true); // Indicamos que estamos cargando
        setError(""); // Limpiamos posibles errores anteriores

        const data = await listarContactos(); // Llamamos a la API
        setContactos(data); // Guardamos la lista de contactos en el estado
      } catch (error) {
        // En caso de error, lo registramos en consola para depuración
        console.error("Error al cargar contactos:", error);

        // Y mostramos un mensaje amigable al usuario
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false); // Finalizamos el estado de carga
      }
    };

    cargarContactos();
  }, []);

  // Función que se encarga de agregar un nuevo contacto usando la API
  // Esta función es async para poder usarla con await en el formulario
  const onAgregarContacto = async (nuevoContacto) => {
    try {
      // Limpiamos cualquier error viejo antes de intentar guardar
      setError("");

      // Llamamos al servicio que crea el contacto en JSON Server
      const creado = await crearContacto(nuevoContacto);

      // Actualizamos el estado agregando el contacto recién creado a la lista
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      // Mostramos el error en consola para facilitar la depuración
      console.error("Error al crear contacto:", error);

      // Si falla la creación, mostramos un mensaje claro y útil
      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );

      // Relanzar el error es opcional según cómo quieras manejarlo desde el formulario
      throw error;
    }
  };

  // Función para eliminar un contacto por su id
  const onEliminarContacto = async (id) => {
    try {
      setError(""); // Limpiamos errores previos
      await eliminarContactoPorId(id); // Llamamos al servicio de eliminación

      // Filtramos el contacto eliminado de la lista local
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      // Mostramos el error en consola para depurar
      console.error("Error al eliminar contacto:", error);

      // Si algo falla al eliminar, informamos al usuario
      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };

  // JSX que renderiza la aplicación
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Contenedor principal centrado */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Encabezado principal de la Agenda */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Desarrollo Web ReactJS • Ficha 3223876
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
            Proyecto ADSO
          </h1>
          <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Gestión de contactos conectada a una API local con JSON Server,
            ahora con validaciones y mejor experiencia de usuario.
          </p>
        </header>

        {/* Si hay un error global, lo mostramos en un recuadro rojo */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-center gap-3 animate-slide-in">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Si estamos cargando, mostramos un mensaje de carga */}
        {cargando ? (
          <div className="text-center py-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 text-indigo-600">
              <div className="w-6 h-6 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <span className="text-lg font-medium">Cargando contactos...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Formulario para crear nuevos contactos */}
            <FormularioContacto onAgregar={onAgregarContacto} />

            {/* Listado de contactos */}
            <section className="space-y-4 mt-2">
              {contactos.length === 0 ? (
                // Mensaje cuando no existen contactos aún
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center border border-gray-100 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No hay contactos aún</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    Agrega tu primer contacto usando el formulario superior para comenzar.
                  </p>
                </div>
              ) : (
                // Recorremos la lista de contactos y mostramos una tarjeta por cada uno
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {contactos.map((c, index) => (
                    <ContactoCard
                      key={c.id}
                      nombre={c.nombre}
                      telefono={c.telefono}
                      correo={c.correo}
                      etiqueta={c.etiqueta}
                      onEliminar={() => onEliminarContacto(c.id)}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* Pie de página con los datos del instructor */}
        <footer className="mt-12 text-center text-xs text-gray-400 border-t border-gray-100 pt-6">
          <p className="font-medium text-gray-500">Desarrollo Web – ReactJS | Proyecto ADSO</p>
          <p className="mt-1">Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>
      </div>
    </div>
  );
}

// Exportamos el componente principal
export default App;
