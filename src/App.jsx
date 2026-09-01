import { useEffect, useState } from "react";
import { listarContactos, crearContacto, eliminarContactoPorId, actualizarContacto } from "./api";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");
        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor este encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false);
      }
    };
    cargarContactos();
  }, []);

  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError("");
      const creado = await crearContacto(nuevoContacto);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error("Error al crear contacto:", error);
      setError(
        "No se pudo guardar el contacto. Verifica tu conexion o el estado del servidor e intenta nuevamente."
      );
      throw error;
    }
  };

  const onEliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
      if (contactoEnEdicion?.id === id) {
        setContactoEnEdicion(null);
      }
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };

  const onEditarClick = (contacto) => {
    setError("");
    setContactoEnEdicion(contacto);
  };

  const onCancelarEdicion = () => {
    setContactoEnEdicion(null);
  };

  const onActualizarContacto = async (id, datosActualizados) => {
    try {
      setError("");
      const contactoActualizado = await actualizarContacto(id, datosActualizados);
      setContactos((prev) =>
        prev.map((c) => (c.id === id ? contactoActualizado : c))
      );
      setContactoEnEdicion(null);
    } catch (error) {
      console.error("Error al actualizar contacto:", error);
      setError(
        "No se pudo actualizar el contacto. Verifica los datos e intenta nuevamente."
      );
      throw error;
    }
  };

  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    const nombre = c.nombre.toLowerCase();
    const correo = c.correo.toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();
    const telefono = c.telefono.toLowerCase();
    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino)
    );
  });

  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Desarrollo Web ReactJS &bull; Ficha 3223876
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
            Proyecto ADSO
          </h1>
          <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Gestion de contactos con almacenamiento local en el navegador,
            con validaciones y mejor experiencia de usuario.
          </p>
        </header>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-center gap-3 animate-slide-in">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {cargando ? (
          <div className="text-center py-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 text-indigo-600">
              <div className="w-6 h-6 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <span className="text-lg font-medium">Cargando contactos...</span>
            </div>
          </div>
        ) : (
          <>
            <FormularioContacto
              onAgregar={onAgregarContacto}
              contactoEnEdicion={contactoEnEdicion}
              onGuardarEdicion={onActualizarContacto}
              onCancelarEdicion={onCancelarEdicion}
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <input
                type="text"
                className="flex-1 rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="Buscar por nombre, correo, etiqueta o telefono..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setOrdenAsc((prev) => !prev)}
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Mostrando {contactosOrdenados.length} contacto(s)
            </p>

            <section className="space-y-4">
              {contactosOrdenados.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center border border-gray-100 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No se encontraron contactos
                  </h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    No hay resultados que coincidan con "{busqueda}". Intenta con otro termino de busqueda.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {contactosOrdenados.map((c, index) => (
                    <ContactoCard
                      key={c.id}
                      id={c.id}
                      nombre={c.nombre}
                      telefono={c.telefono}
                      correo={c.correo}
                      etiqueta={c.etiqueta}
                      onEliminar={onEliminarContacto}
                      onEditar={onEditarClick}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        <footer className="mt-12 text-center text-xs text-gray-400 border-t border-gray-100 pt-6">
          <p className="font-medium text-gray-500">Desarrollo Web - ReactJS | Proyecto ADSO</p>
          <p className="mt-1">Instructor: Gustavo Adolfo Bolanos Dorado</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
