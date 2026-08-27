import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  TableRow,
  TableCell,
  Table,
  WidthType,
  ShadingType,
  Tab,
  TabStopType,
  TabStopPosition,
  ExternalHyperlink,
  Footer,
  Header,
  PageNumber,
  NumberFormat,
} from "docx";
import fs from "fs";

const PURPLE = "7C3AED";
const GRAY = "6B7280";
const DARK = "1F2937";
const LIGHT_BG = "F3F4F6";
const BORDER_COLOR = "D1D5DB";

function titulo(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    heading: level,
    spacing: { before: 300, after: 150 },
    children: [
      new TextRun({
        text,
        bold: true,
        color: PURPLE,
        font: "Inter",
        size: level === HeadingLevel.HEADING_1 ? 32 : level === HeadingLevel.HEADING_2 ? 26 : 22,
      }),
    ],
  });
}

function parrafo(text, options = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    ...options,
    children: [
      new TextRun({
        text,
        font: "Inter",
        size: 22,
        color: DARK,
      }),
    ],
  });
}

function parrafoNegrita(text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({
        text,
        font: "Inter",
        size: 22,
        bold: true,
        color: DARK,
      }),
    ],
  });
}

function codigo(text) {
  return new Paragraph({
    spacing: { after: 120 },
    shading: {
      type: ShadingType.SOLID,
      color: LIGHT_BG,
      fill: LIGHT_BG,
    },
    children: [
      new TextRun({
        text,
        font: "Consolas",
        size: 20,
        color: DARK,
      }),
    ],
  });
}

function placeholder(text) {
  return new Paragraph({
    spacing: { after: 200 },
    border: {
      top: { style: BorderStyle.DASHED, color: PURPLE, size: 1 },
      bottom: { style: BorderStyle.DASHED, color: PURPLE, size: 1 },
      left: { style: BorderStyle.DASHED, color: PURPLE, size: 1 },
      right: { style: BorderStyle.DASHED, color: PURPLE, size: 1 },
    },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: `[${text}]`,
        font: "Inter",
        size: 22,
        color: PURPLE,
        italics: true,
      }),
    ],
  });
}

function separador() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: {
      bottom: { style: BorderStyle.SINGLE, color: BORDER_COLOR, size: 1 },
    },
    children: [],
  });
}

function lineaVacia() {
  return new Paragraph({ children: [] });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: "Inter",
          size: 22,
          color: DARK,
        },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 1440,
            right: 1440,
            bottom: 1440,
            left: 1440,
          },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "Clase 10 - Agenda ADSO v8",
                  font: "Inter",
                  size: 18,
                  color: GRAY,
                  italics: true,
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "Página ",
                  font: "Inter",
                  size: 18,
                  color: GRAY,
                }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  font: "Inter",
                  size: 18,
                  color: GRAY,
                }),
              ],
            }),
          ],
        }),
      },
      children: [
        // ===== PORTADA =====
        lineaVacia(),
        lineaVacia(),
        lineaVacia(),
        lineaVacia(),
        lineaVacia(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "CLASE 10",
              font: "Inter",
              size: 52,
              bold: true,
              color: PURPLE,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: "Búsqueda y Ordenamiento",
              font: "Inter",
              size: 40,
              bold: true,
              color: DARK,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [
            new TextRun({
              text: "Agenda ADSO v8",
              font: "Inter",
              size: 32,
              color: GRAY,
            }),
          ],
        }),
        separador(),
        lineaVacia(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: "Programa: Análisis y Desarrollo de Software (ADSO)",
              font: "Inter",
              size: 22,
              color: DARK,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: "Instructor: Gustavo Bolaños",
              font: "Inter",
              size: 22,
              color: DARK,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: "Desarrollo Web – ReactJS – Proyecto ABP Agenda ADSO",
              font: "Inter",
              size: 22,
              color: DARK,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: `Fecha: ${new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}`,
              font: "Inter",
              size: 22,
              color: GRAY,
            }),
          ],
        }),

        // ===== SALTO DE PÁGINA =====
        new Paragraph({ pageBreakBefore: true, children: [] }),

        // ===== 1. CÓMO ESTABA LA AGENDA EN LA CLASE 9 =====
        titulo("1. ¿Cómo estaba la Agenda en la Clase 9?"),
        parrafo(
          "En la clase anterior consolidamos nuestra Agenda ADSO v7, logrando una aplicación funcional y bien estructurada que nos permite gestionar contactos de manera efectiva."
        ),
        parrafoNegrita("Características de la versión anterior:"),
        parrafo("• Conexión a API establecida con JSON Server."),
        parrafo("• Validaciones y UX mejorada con config.js y APP_INFO."),
        parrafo("• Operaciones básicas de CRUD completas (crear, listar, eliminar)."),
        parrafo(
          "Hoy daremos un salto importante: implementaremos búsqueda y ordenamiento para hacer la aplicación verdaderamente usable cuando tengamos muchos contactos."
        ),

        separador(),

        // ===== 2. EL PROBLEMA QUE RESOLVEMOS =====
        titulo("2. El problema que resolvemos"),
        parrafo(
          "Imagina tener 50, 100 o más contactos en tu agenda. Sin herramientas de búsqueda y ordenamiento, la experiencia del usuario se deteriora rápidamente."
        ),
        parrafoNegrita("Desafíos actuales:"),
        parrafo("• Encontrar un contacto específico requiere desplazarse por toda la lista."),
        parrafo("• El orden depende únicamente del momento de creación."),
        parrafo("• No hay forma rápida de localizar información."),
        parrafo("• La aplicación se vuelve poco práctica con datos reales."),
        lineaVacia(),
        parrafoNegrita("Mejoras implementadas hoy:"),
        parrafo("• Un buscador que filtre por nombre, correo, etiqueta y teléfono."),
        parrafo("• Un botón para ordenar alfabéticamente A-Z o Z-A."),

        separador(),

        // ===== 3. OBJETIVOS DE APRENDIZAJE =====
        titulo("3. Objetivos de aprendizaje"),
        parrafo(
          "En esta clase implementarás funcionalidades esenciales que transformarán tu agenda en una herramienta verdaderamente profesional."
        ),
        parrafoNegrita("01 Campo de búsqueda interactivo"),
        parrafo(
          "Añadirás un input de búsqueda en la interfaz que permita al usuario escribir términos de búsqueda en tiempo real."
        ),
        parrafoNegrita("02 Filtrado reactivo con useState"),
        parrafo(
          "Implementarás la lógica de filtrado usando useState y el método filter de JavaScript para actualizar resultados instantáneamente."
        ),
        parrafoNegrita("03 Ordenamiento alfabético dinámico"),
        parrafo(
          "Crearás un sistema de ordenamiento A-Z / Z-A usando el método sort, alternando con un botón intuitivo."
        ),
        parrafoNegrita("04 Código limpio y mantenible"),
        parrafo(
          "Mantendrás las mejores prácticas evitando mutar el estado original y escribiendo código legible y bien estructurado."
        ),

        new Paragraph({ pageBreakBefore: true, children: [] }),

        // ===== 4. IMPLEMENTACIÓN DE ESTADOS =====
        titulo("4. Implementación de los estados de búsqueda y orden"),
        parrafo(
          "React utiliza el hook useState para manejar datos que cambian con el tiempo. Necesitamos dos nuevos estados en nuestro componente App.jsx para controlar la búsqueda y el ordenamiento de contactos."
        ),
        lineaVacia(),
        codigo('// Estado para el término de búsqueda'),
        codigo('const [busqueda, setBusqueda] = useState("");'),
        lineaVacia(),
        codigo("// Estado para el orden: true = A-Z, false = Z-A"),
        codigo("const [ordenAsc, setOrdenAsc] = useState(true);"),
        lineaVacia(),
        parrafoNegrita("1. busqueda"),
        parrafo(
          "Se actualizará con cada letra que escriba el usuario en el campo de búsqueda, disparando un re-render automático."
        ),
        parrafoNegrita("2. ordenAsc"),
        parrafo(
          "Nos permite alternar entre orden ascendente (A-Z) y descendente (Z-A) con un simple clic en el botón."
        ),

        separador(),

        // ===== 5. FILTRADO DE CONTACTOS =====
        titulo("5. Filtrar contactos por texto"),
        parrafo(
          "El filtrado es una operación fundamental que nos permite encontrar contactos específicos dentro de nuestra lista completa. Utilizamos el método filter de JavaScript para crear una nueva lista que solo contenga los contactos que coincidan con el término de búsqueda."
        ),
        lineaVacia(),
        codigo("// Filtramos la lista original según el término de búsqueda"),
        codigo("const contactosFiltrados = contactos.filter((c) => {"),
        codigo("  const termino = busqueda.toLowerCase();"),
        codigo("  return ("),
        codigo("    c.nombre.toLowerCase().includes(termino) ||"),
        codigo("    c.correo.toLowerCase().includes(termino) ||"),
        codigo('    (c.etiqueta || "").toLowerCase().includes(termino) ||'),
        codigo("    c.telefono.toLowerCase().includes(termino)"),
        codigo("  );"),
        codigo("});"),
        lineaVacia(),
        parrafoNegrita("Cómo funciona el filtrado:"),
        parrafo(
          'El método filter recorre cada contacto y aplica una función de prueba. Si la función retorna true, el contacto se incluye en el nuevo array. Usamos toLowerCase() para hacer búsquedas sin importar mayúsculas o minúsculas (case-insensitive).'
        ),
        parrafoNegrita("Búsqueda en múltiples campos:"),
        parrafo(
          "El operador || (OR) permite que el término aparezca en cualquiera de los cuatro campos: nombre, correo, etiqueta o teléfono. Esto hace la búsqueda más flexible y útil para el usuario."
        ),
        lineaVacia(),
        placeholder("Captura: Lista filtrada por nombre"),

        separador(),

        // ===== 6. ORDENAMIENTO =====
        titulo("6. Ordenar la lista filtrada"),
        parrafo(
          "Una vez que tenemos los contactos filtrados, necesitamos ordenarlos alfabéticamente. El método sort nos permite comparar elementos y reorganizarlos, pero debemos tener cuidado de no mutar el estado original."
        ),
        lineaVacia(),
        codigo("// Copiamos el array con spread y lo ordenamos"),
        codigo("const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {"),
        codigo("  const nombreA = a.nombre.toLowerCase();"),
        codigo("  const nombreB = b.nombre.toLowerCase();"),
        codigo("  if (nombreA < nombreB) return ordenAsc ? -1 : 1;"),
        codigo("  if (nombreA > nombreB) return ordenAsc ? 1 : -1;"),
        codigo("  return 0;"),
        codigo("});"),
        lineaVacia(),
        parrafoNegrita("¿Por qué usar [...contactosFiltrados].sort()?"),
        parrafo(
          "El operador spread ... crea una copia del array. Esto es crucial porque sort modifica el array original, y en React nunca debemos mutar el estado directamente. Si mutáramos el estado, React no detectaría el cambio y la UI no se actualizaría."
        ),
        parrafoNegrita("Función de comparación:"),
        parrafo(
          "La función dentro de sort compara dos elementos (a y b). Retorna -1 si a debe ir antes, 1 si b debe ir antes, y 0 si son iguales. El estado ordenAsc invierte esta lógica cuando es necesario."
        ),
        lineaVacia(),
        placeholder("Captura: Lista ordenada A-Z"),
        lineaVacia(),
        placeholder("Captura: Lista ordenada Z-A"),

        new Paragraph({ pageBreakBefore: true, children: [] }),

        // ===== 7. COMPONENTE VISUAL =====
        titulo("7. Componente visual de búsqueda"),
        parrafo(
          "La interfaz de búsqueda debe ser intuitiva y accesible. Se ubicará en la parte superior de la lista de contactos, proporcionando retroalimentación inmediata mientras el usuario escribe."
        ),
        lineaVacia(),
        parrafoNegrita("Características del input de búsqueda:"),
        parrafo("• Se posiciona encima de la lista de contactos para fácil acceso."),
        parrafo("• Es un input controlado por React con value={busqueda}."),
        parrafo(
          "• Actualiza el estado con onChange={(e) => setBusqueda(e.target.value)}."
        ),
        parrafo(
          '• Incluye placeholder descriptivo: "Buscar por nombre, correo, etiqueta o teléfono..."'
        ),
        parrafo("• Responde instantáneamente a cada tecla presionada."),
        lineaVacia(),
        parrafoNegrita("Input controlado:"),
        parrafo(
          "En React, un input controlado es aquel cuyo valor está completamente sincronizado con el estado del componente. Esto nos da control total sobre su comportamiento."
        ),
        lineaVacia(),
        placeholder("Captura: Campo de búsqueda con texto ingresado y botón de ordenamiento"),

        separador(),

        // ===== 8. JSX DEL INPUT Y BOTÓN =====
        titulo("8. JSX: Barra de búsqueda y botón de ordenamiento"),
        parrafo(
          "Este código JSX crea una interfaz completa de búsqueda y ordenamiento. El layout es responsive, mostrando los elementos en columna en móvil y en fila en pantallas más grandes."
        ),
        lineaVacia(),
        codigo('<div className="barra-herramientas">'),
        codigo('  <input'),
        codigo('    className="input-busqueda"'),
        codigo('    type="text"'),
        codigo('    placeholder="Buscar por nombre, correo, etiqueta o teléfono..."'),
        codigo("    value={busqueda}"),
        codigo("    onChange={(e) => setBusqueda(e.target.value)}"),
        codigo("  />"),
        codigo('  <button className="btn-orden" onClick={() => setOrdenAsc((prev) => !prev)} >'),
        codigo('    {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}'),
        codigo("  </button>"),
        codigo("</div>"),
        lineaVacia(),
        parrafoNegrita("Botón de ordenamiento:"),
        parrafo(
          'El texto del botón cambia dinámicamente mostrando la acción opuesta actual: si está en A-Z, muestra "Ordenar Z-A".'
        ),

        separador(),

        // ===== 9. MANEJO DE RESULTADOS VACÍOS =====
        titulo("9. Manejo de resultados vacíos"),
        parrafo(
          'Es importante proporcionar retroalimentación cuando la búsqueda no arroja resultados. Verificamos si contactosOrdenados.length === 0 y mostramos un mensaje amigable al usuario.'
        ),
        lineaVacia(),
        codigo("<section>"),
        codigo("  {contactosOrdenados.length === 0 ? ("),
        codigo('    <p className="sin-resultados">'),
        codigo('      No se encontraron contactos que coincidan con "{busqueda}"'),
        codigo("    </p>"),
        codigo("  ) : ("),
        codigo("    contactosOrdenados.map((c) => ("),
        codigo("      <ContactoCard key={c.correo} {...c} onEliminar={eliminarContacto} />"),
        codigo("    ))"),
        codigo("  )}"),
        codigo("</section>"),
        lineaVacia(),
        parrafoNegrita("Experiencia de usuario:"),
        parrafo(
          'Un mensaje claro como \'No se encontraron contactos que coincidan con "..."\' es mucho mejor que mostrar una pantalla vacía sin explicación.'
        ),
        lineaVacia(),
        placeholder("Captura: Mensaje de 'No se encontraron contactos'"),

        new Paragraph({ pageBreakBefore: true, children: [] }),

        // ===== 10. CONTADOR =====
        titulo("10. Mini reto 2: Contador de resultados"),
        parrafo(
          'Debajo del buscador, añadimos un elemento que muestra la cantidad de contactos visibles actualmente con el formato "Mostrando X contacto(s)".'
        ),
        lineaVacia(),
        codigo('<p className="contador">'),
        codigo("  Mostrando {contactosOrdenados.length} contacto(s)"),
        codigo("</p>"),
        lineaVacia(),
        parrafoNegrita("Comportamiento esperado:"),
        parrafo("• Si no hay filtro activo, muestra el total de contactos en la agenda."),
        parrafo(
          '• Si hay filtro pero no hay resultados, muestra "Mostrando 0 contacto(s)".'
        ),
        parrafo(
          "• Si hay resultados filtrados, muestra el número exacto de contactos que coinciden."
        ),
        parrafo("• El contador se actualiza automáticamente cuando cambia la búsqueda."),
        lineaVacia(),
        placeholder("Captura: Contador mostrando cantidad de contactos"),

        separador(),

        // ===== 11. FLUJO COMPLETO =====
        titulo("11. Resumen del flujo de datos"),
        parrafo(
          "Comprender el flujo completo de datos es fundamental para mantener un código predecible y fácil de depurar."
        ),
        lineaVacia(),
        parrafoNegrita("01 Estado base: contactos"),
        parrafo(
          "Este es el array original que viene del localStorage. Nunca lo modificamos directamente, solo lo usamos como fuente de verdad."
        ),
        parrafoNegrita("02 Primera transformación: contactosFiltrados"),
        parrafo(
          "Aplicamos el filtro basado en el término de búsqueda del usuario. Esta transformación crea un nuevo array sin modificar el original."
        ),
        parrafoNegrita("03 Segunda transformación: contactosOrdenados"),
        parrafo(
          "Aplicamos el ordenamiento alfabético (A-Z o Z-A) sobre los contactos ya filtrados. Nuevamente, creamos una copia antes de ordenar."
        ),
        parrafoNegrita("04 Renderizado final"),
        parrafo(
          "Mapeamos contactosOrdenados para renderizar los componentes ContactoCard. Este es el resultado visible para el usuario."
        ),
        lineaVacia(),
        parrafoNegrita(
          "Principio clave: En React, nunca mutamos el estado directamente. Siempre creamos nuevas copias transformadas."
        ),

        separador(),

        // ===== 12. BUENAS PRÁCTICAS =====
        titulo("12. Buenas prácticas de React aplicadas"),
        parrafo(
          "Las buenas prácticas son patrones probados que hacen tu código más robusto, mantenible y libre de bugs difíciles de rastrear."
        ),
        lineaVacia(),
        parrafoNegrita("1. Inmutabilidad del estado"),
        parrafo(
          "Usamos [...contactosFiltrados].sort() en lugar de contactosFiltrados.sort() para no mutar el array original. Esto previene bugs sutiles y hace el código más predecible."
        ),
        parrafoNegrita("2. Inputs controlados"),
        parrafo(
          "El input de búsqueda usa value y onChange, manteniendo React como única fuente de verdad. Esto facilita validaciones, transformaciones y manejo de formularios complejos."
        ),
        parrafoNegrita("3. Lógica separada del JSX"),
        parrafo(
          "Calculamos contactosFiltrados y contactosOrdenados antes del return. Esto mantiene el JSX limpio, legible y fácil de mantener."
        ),
        parrafoNegrita("4. Mensajes de retroalimentación"),
        parrafo(
          "Mostramos mensajes claros cuando no hay resultados. Nunca dejamos al usuario frente a una pantalla vacía sin explicación."
        ),

        separador(),

        // ===== 13. CÓDIGO COMPLETO =====
        new Paragraph({ pageBreakBefore: true, children: [] }),
        titulo("13. Fragmento completo de App.jsx"),
        parrafo(
          "A continuación se presenta el archivo completo App.jsx con toda la implementación de búsqueda y ordenamiento:"
        ),
        lineaVacia(),
        codigo('import { useState, useEffect } from "react";'),
        codigo('import "./App.css";'),
        codigo('import FormularioContacto from "./components/FormularioContacto";'),
        codigo('import ContactoCard from "./components/ContactoCard";'),
        lineaVacia(),
        codigo("export default function App() {"),
        codigo('  const contactosGuardados = JSON.parse(localStorage.getItem("contactos")) || [];'),
        codigo("  const [contactos, setContactos] = useState(contactosGuardados);"),
        codigo('  const [busqueda, setBusqueda] = useState("");'),
        codigo("  const [ordenAsc, setOrdenAsc] = useState(true);"),
        lineaVacia(),
        codigo("  useEffect(() => {"),
        codigo('    localStorage.setItem("contactos", JSON.stringify(contactos));'),
        codigo("  }, [contactos]);"),
        lineaVacia(),
        codigo("  const agregarContacto = (nuevo) => {"),
        codigo("    setContactos((prev) => [...prev, nuevo]);"),
        codigo("  };"),
        lineaVacia(),
        codigo("  const eliminarContacto = (correo) => {"),
        codigo("    setContactos((prev) => prev.filter((c) => c.correo !== correo));"),
        codigo("  };"),
        lineaVacia(),
        codigo("  const contactosFiltrados = contactos.filter((c) => {"),
        codigo("    const termino = busqueda.toLowerCase();"),
        codigo("    return ("),
        codigo("      c.nombre.toLowerCase().includes(termino) ||"),
        codigo("      c.correo.toLowerCase().includes(termino) ||"),
        codigo('      (c.etiqueta || "").toLowerCase().includes(termino) ||'),
        codigo("      c.telefono.toLowerCase().includes(termino)"),
        codigo("    );"),
        codigo("  });"),
        lineaVacia(),
        codigo("  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {"),
        codigo("    const nombreA = a.nombre.toLowerCase();"),
        codigo("    const nombreB = b.nombre.toLowerCase();"),
        codigo("    if (nombreA < nombreB) return ordenAsc ? -1 : 1;"),
        codigo("    if (nombreA > nombreB) return ordenAsc ? 1 : -1;"),
        codigo("    return 0;"),
        codigo("  });"),
        lineaVacia(),
        codigo("  return ("),
        codigo('    <main className="app-container">'),
        codigo('      <h1 className="app-title">Agenda ADSO v8</h1>'),
        codigo('      <p className="subtitulo">Búsqueda y ordenamiento de contactos</p>'),
        codigo('      <FormularioContacto onAgregar={agregarContacto} />'),
        lineaVacia(),
        codigo('      <div className="barra-herramientas">'),
        codigo('        <input className="input-busqueda" type="text"'),
        codigo('          placeholder="Buscar por nombre, correo, etiqueta o teléfono..."'),
        codigo("          value={busqueda}"),
        codigo("          onChange={(e) => setBusqueda(e.target.value)} />"),
        codigo('        <button className="btn-orden" onClick={() => setOrdenAsc((p) => !p)}>'),
        codigo('          {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}'),
        codigo("        </button>"),
        codigo("      </div>"),
        lineaVacia(),
        codigo('      <p className="contador">Mostrando {contactosOrdenados.length} contacto(s)</p>'),
        lineaVacia(),
        codigo("      {contactosOrdenados.length === 0 ? ("),
        codigo('        <p className="sin-resultados">No se encontraron contactos</p>'),
        codigo("      ) : ("),
        codigo("        contactosOrdenados.map((c) => ("),
        codigo('          <ContactoCard key={c.correo} {...c} onEliminar={eliminarContacto} />'),
        codigo("        ))"),
        codigo("      )}"),
        codigo("    </main>"),
        codigo("  );"),
        codigo("}"),

        separador(),

        // ===== 14. CONCLUSIÓN =====
        titulo("14. Conclusión"),
        parrafo(
          "Con esta clase, la Agenda ADSO se transforma de un simple prototipo académico en una aplicación verdaderamente usable y profesional. Has implementado funcionalidades que los usuarios esperan de cualquier aplicación moderna: búsqueda instantánea y ordenamiento intuitivo."
        ),
        lineaVacia(),
        parrafoNegrita("Logros alcanzados:"),
        parrafo("• 2 estados nuevos: busqueda y ordenAsc."),
        parrafo("• Campos de búsqueda: nombre, correo, etiqueta y teléfono."),
        parrafo("• 100% funcional sin mutar el estado original."),
        lineaVacia(),
        parrafo(
          "Has aplicado conceptos fundamentales de React como inmutabilidad, inputs controlados y separación de lógica. Estos patrones los usarás una y otra vez en tu carrera como desarrollador. ¡Excelente trabajo!"
        ),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
const outputPath = "Clase_10_Agenda_ADSO_v8_Busqueda_Orden.docx";
fs.writeFileSync(outputPath, buffer);
console.log(`Documento generado exitosamente: ${outputPath}`);
