import { useEffect, useMemo, useState } from "react";
import { listarContactos, crearContacto, eliminarContactoPorId, actualizarContacto } from "./api";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

// --- Datos de identificación del aprendiz (personalizar aquí) ---
const FICHA = "3223876";
const GRUPO = "Desarrollo Web ReactJS - CTMA";

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  // Estado que controla la vista activa del dashboard: "crear" | "contactos"
  const [vista, setVista] = useState("crear");

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

  // --- Navegación entre vistas (sin React Router) ---
  const irAVerContactos = () => {
    setVista("contactos");
    setContactoEnEdicion(null);
  };

  const irACrearContacto = () => {
    setVista("crear");
    setContactoEnEdicion(null);
    setBusqueda("");
  };

  const estaEnVistaCrear = vista === "crear";
  const estaEnVistaContactos = vista === "contactos";

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

  // --- Indicadores del panel lateral ---
  const totalContactos = contactos.length;

  const ultimoContacto = useMemo(() => {
    if (contactos.length === 0) return null;
    // Los ids se generan con Date.now(), así que el mayor id es el más reciente
    return [...contactos].sort((a, b) => Number(b.id) - Number(a.id))[0];
  }, [contactos]);

  const contactosPorCategoria = useMemo(() => {
    const conteo = {};
    contactos.forEach((c) => {
      const etiqueta = c.etiqueta?.trim() || "Sin categoría";
      conteo[etiqueta] = (conteo[etiqueta] || 0) + 1;
    });
    return Object.entries(conteo).sort((a, b) => b[1] - a[1]);
  }, [contactos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-slate-100">
      {/* Barra superior fija */}
      <header className="sticky top-0 z-20 backdrop-blur bg-slate-900/80 border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-indigo-900/40">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">Agenda ADSO</p>
              <p className="text-xs text-slate-400 leading-tight">Dashboard de gestión de contactos</p>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-xs font-medium text-indigo-300">Ficha {FICHA} · SENA CTMA</span>
            <span className="text-[11px] text-slate-400">{GRUPO}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {error && (
          <div className="mb-6 rounded-xl bg-red-950/60 border border-red-800 px-4 py-3 flex items-center gap-3 animate-slide-in">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium text-red-200">{error}</p>
          </div>
        )}

        {cargando ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex items-center gap-3 text-indigo-300">
              <div className="w-6 h-6 border-3 border-indigo-800 border-t-indigo-400 rounded-full animate-spin"></div>
              <span className="text-lg font-medium">Cargando contactos...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Contenido principal */}
            <main className="lg:col-span-2 space-y-6">
              <div className="bg-white text-slate-900 rounded-2xl shadow-xl border border-white/10 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 mb-1">
                      {estaEnVistaCrear ? "Modo creación" : "Modo contactos"}
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {estaEnVistaCrear ? "Crear contacto" : "Ver contactos"}
                    </h1>
                  </div>

                  {estaEnVistaCrear ? (
                    <button
                      type="button"
                      onClick={irAVerContactos}
                      className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200"
                    >
                      Ver contactos
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={irACrearContacto}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200"
                    >
                      Volver a crear contacto
                    </button>
                  )}
                </div>

                {/* Vista "crear": exclusivamente el formulario */}
                {estaEnVistaCrear && (
                  <FormularioContacto
                    onAgregar={onAgregarContacto}
                    contactoEnEdicion={null}
                    onGuardarEdicion={onActualizarContacto}
                    onCancelarEdicion={onCancelarEdicion}
                  />
                )}

                {/* Vista "contactos": búsqueda, orden, lista, edición y eliminación */}
                {estaEnVistaContactos && (
                  <>
                    {contactoEnEdicion && (
                      <FormularioContacto
                        onAgregar={onAgregarContacto}
                        contactoEnEdicion={contactoEnEdicion}
                        onGuardarEdicion={onActualizarContacto}
                        onCancelarEdicion={onCancelarEdicion}
                      />
                    )}

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
                        <div className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-100 animate-fade-in">
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
                        <div className="grid gap-4 sm:grid-cols-2">
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
              </div>
            </main>

            {/* Panel lateral */}
            <aside className="space-y-6">
              {/* Banner principal con degradado morado */}
              <div className="rounded-2xl p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-700 shadow-xl shadow-purple-950/40 text-white">
                <h2 className="text-lg font-bold mb-1">Agenda ADSO – Dashboard</h2>
                <p className="text-sm text-indigo-100/90 mb-5">
                  CRUD completo de contactos construido con React y una capa de
                  persistencia en el navegador, presentado en un layout tipo dashboard.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-2xl font-extrabold leading-none">{totalContactos}</p>
                    <p className="text-[11px] uppercase tracking-wide text-indigo-100/80 mt-1">
                      Contactos registrados
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-sm font-semibold leading-tight truncate">
                      {ultimoContacto ? ultimoContacto.nombre : "—"}
                    </p>
                    <p className="text-[11px] uppercase tracking-wide text-indigo-100/80 mt-1">
                      Último contacto agregado
                    </p>
                  </div>
                </div>

                {contactosPorCategoria.length > 0 && (
                  <div className="mb-5">
                    <p className="text-[11px] uppercase tracking-wide text-indigo-100/80 mb-2">
                      Contactos por categoría
                    </p>
                    <ul className="space-y-1.5">
                      {contactosPorCategoria.map(([categoria, cantidad]) => (
                        <li key={categoria} className="flex items-center justify-between text-sm bg-white/5 rounded-lg px-3 py-1.5">
                          <span className="capitalize">{categoria}</span>
                          <span className="font-semibold">{cantidad}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="border-t border-white/20 pt-4">
                  <p className="text-sm italic text-indigo-50">
                    "Escribo código pensando en la próxima persona que lo va a leer,
                    incluyéndome a mí en seis meses. Para mí, ser desarrollador no es
                    solo hacer que algo funcione, sino construirlo con la claridad
                    suficiente para que otros puedan confiar en él y hacerlo crecer."
                  </p>
                </div>
              </div>

              {/* Tarjeta de identificación SENA CTMA */}
              <div className="rounded-2xl p-6 bg-slate-800/70 border border-slate-700 shadow-lg">
                <p className="text-sm font-semibold text-indigo-300 mb-1">
                  SENA CTMA · ADSO — Desarrollo Web · ReactJS
                </p>
                <p className="text-xs text-slate-400 mb-3">
                  Ficha {FICHA} — {GRUPO}
                </p>
                <p className="text-sm text-slate-200">
                  Este proyecto hace parte de mi formación como Tecnólogo en Análisis
                  y Desarrollo de Software en el Centro Tecnológico de Manufactura
                  Avanzada del SENA.
                </p>
              </div>
            </aside>
          </div>
        )}

        <footer className="mt-12 text-center text-xs text-slate-500 border-t border-slate-800 pt-6">
          <p className="font-medium text-slate-400">Desarrollo Web - ReactJS | Proyecto ADSO</p>
          <p className="mt-1">Instructor: Gustavo Adolfo Bolanos Dorado</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
