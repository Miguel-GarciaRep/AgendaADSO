function ContactoCard({ id, nombre, telefono, correo, etiqueta, onEliminar }) {
  const getEtiquetaColor = (etiqueta) => {
    if (!etiqueta) return "bg-slate-100 text-slate-600";
    const colors = [
      "bg-indigo-100 text-indigo-700",
      "bg-purple-100 text-purple-700",
      "bg-pink-100 text-pink-700",
      "bg-emerald-100 text-emerald-700",
      "bg-amber-100 text-amber-700",
      "bg-rose-100 text-rose-700",
      "bg-cyan-100 text-cyan-700",
      "bg-orange-100 text-orange-700",
    ];
    let hash = 0;
    for (let i = 0; i < etiqueta.length; i++) {
      hash = etiqueta.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const etiquetaColor = getEtiquetaColor(etiqueta);

  return (
    <article
      className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 p-6 animate-fade-in relative overflow-hidden"
      role="listitem"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-slate-900 truncate pr-2">{nombre}</h3>
          {etiqueta && (
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${etiquetaColor}`}
            >
              {etiqueta}
            </span>
          )}
        </div>

        <button
          onClick={() => onEliminar(id)}
          className="flex-shrink-0 p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 focus:ring-2 focus:ring-red-500/20 focus:outline-none group-hover:text-red-500 group-hover:bg-red-50"
          aria-label={`Eliminar a ${nombre}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-3 text-slate-600 transition-colors duration-200 group-hover:text-slate-700">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          </div>
          <span className="text-sm font-medium truncate">{telefono}</span>
        </div>

        {correo && (
          <div className="flex items-center gap-3 text-slate-600 transition-colors duration-200 group-hover:text-slate-700">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <span className="text-sm font-medium truncate">{correo}</span>
          </div>
        )}
      </div>
    </article>
  );
}

export default ContactoCard;