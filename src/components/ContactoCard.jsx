function ContactoCard({ id, nombre, telefono, correo, etiqueta, onEliminar, index = 0 }) {
  const etiquetaColors = {
    default: "bg-indigo-100 text-indigo-700",
    trabajo: "bg-blue-100 text-blue-700",
    familia: "bg-pink-100 text-pink-700",
    amigos: "bg-green-100 text-green-700",
    escuela: "bg-yellow-100 text-yellow-700",
  };

  const getEtiquetaColor = (etiqueta) => {
    const key = etiqueta?.toLowerCase() || "default";
    return etiquetaColors[key] || etiquetaColors.default;
  };

  const delay = index * 100;

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 truncate">{nombre}</h3>
          {etiqueta && (
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getEtiquetaColor(etiqueta)}`}>
              {etiqueta}
            </span>
          )}
        </div>
        <button
          onClick={() => onEliminar(id)}
          className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:text-red-700 flex items-center gap-2 flex-shrink-0"
          title="Eliminar contacto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Eliminar
        </button>
      </div>
      <div className="mt-5 space-y-3 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <span className="font-medium">{telefono}</span>
        </div>
        {correo && (
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-medium truncate">{correo}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactoCard;
