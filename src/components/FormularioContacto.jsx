import { useEffect, useState } from "react";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const FORM_VACIO = { nombre: "", telefono: "", correo: "", etiqueta: "" };

function FormularioContacto({
  onAgregar,
  contactoEnEdicion = null,
  onGuardarEdicion,
  onCancelarEdicion,
}) {
  const modoEdicion = Boolean(contactoEnEdicion);

  const [form, setForm] = useState(FORM_VACIO);

  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [touched, setTouched] = useState({});

  // Cuando cambia el contacto en edición, cargamos (o limpiamos) el formulario
  useEffect(() => {
    if (contactoEnEdicion) {
      setForm({
        nombre: contactoEnEdicion.nombre || "",
        telefono: contactoEnEdicion.telefono || "",
        correo: contactoEnEdicion.correo || "",
        etiqueta: contactoEnEdicion.etiqueta || "",
      });
    } else {
      setForm(FORM_VACIO);
    }
    setErrores({ nombre: "", telefono: "", correo: "" });
    setTouched({});
  }, [contactoEnEdicion]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  function validarFormulario() {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El telefono es obligatorio.";
    }
    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ nombre: true, telefono: true, correo: true });

    const esValido = validarFormulario();
    if (!esValido) return;

    try {
      setEnviando(true);
      await delay(modoEdicion ? 1500 : 4000);

      if (modoEdicion) {
        await onGuardarEdicion(contactoEnEdicion.id, form);
        // Al confirmarse, App.jsx limpia contactoEnEdicion y el useEffect
        // de arriba se encarga de vaciar el formulario.
      } else {
        await onAgregar(form);
        setForm(FORM_VACIO);
      }

      setErrores({ nombre: "", telefono: "", correo: "" });
      setTouched({});
    } finally {
      setEnviando(false);
    }
  };

  const onCancelarClick = () => {
    if (enviando) return;
    onCancelarEdicion?.();
  };

  const inputClasses = (name) => {
    const hasError = errores[name] && touched[name];
    return `w-full rounded-xl border-2 transition-all duration-200 ${
      hasError
        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
        : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 hover:border-gray-300"
    } bg-white px-4 py-3 text-gray-900 placeholder-gray-400`;
  };

  return (
    <form
      className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-5 mb-8 border border-gray-100 animate-fade-in"
      onSubmit={onSubmit}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {modoEdicion ? "Editar contacto" : "Nuevo contacto"}
        </h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          className={inputClasses("nombre")}
          name="nombre"
          placeholder="Ej: Camila Perez"
          value={form.nombre}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="name"
        />
        {errores.nombre && touched.nombre && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1 animate-slide-in">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errores.nombre}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
          Telefono <span className="text-red-500">*</span>
        </label>
        <input
          className={inputClasses("telefono")}
          name="telefono"
          placeholder="Ej: 300 123 4567"
          value={form.telefono}
          onChange={onChange}
          onBlur={onBlur}
          type="tel"
          autoComplete="tel"
        />
        {errores.telefono && touched.telefono && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1 animate-slide-in">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errores.telefono}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
          Correo <span className="text-red-500">*</span>
        </label>
        <input
          className={inputClasses("correo")}
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
          onBlur={onBlur}
          type="email"
          autoComplete="email"
        />
        {errores.correo && touched.correo && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1 animate-slide-in">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errores.correo}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
          Etiqueta <span className="text-gray-400 text-xs">(opcional)</span>
        </label>
        <input
          className="w-full rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 hover:border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200"
          name="etiqueta"
          placeholder="Ej: Trabajo, Familia, Amigos..."
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={enviando}
          className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                     disabled:from-indigo-300 disabled:to-purple-300 disabled:cursor-not-allowed
                     text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/25
                     disabled:shadow-none transition-all duration-200
                     flex items-center justify-center gap-2"
        >
          {enviando ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Guardando...
            </>
          ) : modoEdicion ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Guardar cambios
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Agregar contacto
            </>
          )}
        </button>

        {modoEdicion && (
          <button
            type="button"
            onClick={onCancelarClick}
            disabled={enviando}
            className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed
                       text-gray-700 px-8 py-3.5 rounded-xl font-semibold border border-gray-200
                       transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioContacto;
