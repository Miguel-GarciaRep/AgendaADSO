import { useState, useEffect } from "react";
import "./App.css";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const contactosGuardados =
    JSON.parse(localStorage.getItem("contactos")) || [];

  const [contactos, setContactos] = useState(contactosGuardados);
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, nuevo]);
  };

  const eliminarContacto = (correo) => {
    setContactos((prev) => prev.filter((c) => c.correo !== correo));
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
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v8</h1>
      <p className="subtitulo">
        Búsqueda y ordenamiento de contactos
      </p>

      <FormularioContacto onAgregar={agregarContacto} />

      <div className="barra-herramientas">
        <input
          className="input-busqueda"
          type="text"
          placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button
          className="btn-orden"
          type="button"
          onClick={() => setOrdenAsc((prev) => !prev)}
        >
          {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
        </button>
      </div>

      <p className="contador">
        Mostrando {contactosOrdenados.length} contacto(s)
      </p>

      <section className="lista-contactos">
        {contactosOrdenados.length === 0 ? (
          <p className="sin-resultados">
            No se encontraron contactos que coincidan con "{busqueda}"
          </p>
        ) : (
          contactosOrdenados.map((c) => (
            <ContactoCard
              key={c.correo}
              {...c}
              onEliminar={eliminarContacto}
            />
          ))
        )}
      </section>
    </main>
  );
}