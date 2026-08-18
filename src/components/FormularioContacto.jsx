import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.telefono.trim()) newErrors.telefono = "El teléfono es obligatorio";
    if (!form.correo.trim()) newErrors.correo = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = "Formato de correo inválido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onAgregar(form);
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (name) =>
    `w-full rounded-xl border-2 transition-all duration-200 px-4 py-3 text-slate-800 placeholder-slate-400 bg-white/80 backdrop-blur-sm ${
      errors[name]
        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
        : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20"
    } focus:ring-2 focus:outline-none`;

  const labelClasses = "block text-sm font-semibold text-slate-700 mb-2";

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-6 md:p-8 space-y-6 animate-slide-up"
      noValidate
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Nuevo Contacto</h2>
          <p className="text-sm text-slate-500">Completa los campos para agregar un contacto</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className={labelClasses}>
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            id="nombre"
            className={inputClasses("nombre")}
            name="nombre"
            placeholder="Ej: Camila Pérez"
            value={form.nombre}
            onChange={onChange}
            aria-invalid={errors.nombre ? "true" : "false"}
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
          />
          {errors.nombre && (
            <p id="nombre-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1 animate-shake">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
              {errors.nombre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className={labelClasses}>
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            id="telefono"
            type="tel"
            className={inputClasses("telefono")}
            name="telefono"
            placeholder="Ej: 300 123 4567"
            value={form.telefono}
            onChange={onChange}
            aria-invalid={errors.telefono ? "true" : "false"}
            aria-describedby={errors.telefono ? "telefono-error" : undefined}
          />
          {errors.telefono && (
            <p id="telefono-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1 animate-shake">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
              {errors.telefono}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="correo" className={labelClasses}>
          Correo <span className="text-red-500">*</span>
        </label>
        <input
          id="correo"
          type="email"
          className={inputClasses("correo")}
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
          aria-invalid={errors.correo ? "true" : "false"}
          aria-describedby={errors.correo ? "correo-error" : undefined}
        />
        {errors.correo && (
          <p id="correo-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1 animate-shake">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
            {errors.correo}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="etiqueta" className={labelClasses}>
          Etiqueta <span className="text-slate-400 text-normal">(opcional)</span>
        </label>
        <input
          id="etiqueta"
          className={inputClasses("etiqueta")}
          name="etiqueta"
          placeholder="Ej: Trabajo, Familia, Amigos..."
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
            Agregando...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            Agregar contacto
          </>
        )}
      </button>
    </form>
  );
}