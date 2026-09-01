

**CLASE 11 – Edición de contactos y cierre del ABP (Agenda ADSO v9) Desarrollo Web – ReactJS – Proyecto ABP Agenda ADSO** Programa: Análisis y Desarrollo de Software (ADSO) 

Instructor: Gustavo Bolaños 

" 

o--m C O. ATRUD D | 1 oo ee 

## **Propósito de aprendizaje** 

#### **Implementar edición** 

Desarrollar la funcionalidad de **edición de contactos** (UPDATE) completando el CRUD 

#### **Cerrar el ABP** 

Finalizar con una revisión de calidad y demo final del proyecto 

#### **Reutilizar formulario** 

Usar el mismo formulario para crear y editar contactos de manera eficiente 

#### **Portafolio listo** 

Dejar Agenda ADSO v9 lista para mostrar en tu portafolio profesional 

03 

## **Cómo vamos a editar un** 

## **contacto** 

01 

02 

#### **Agregar botón "Editar"** 

#### **Al hacer clic en "Editar"** 

El formulario se llena con los datos del contacto, el botón cambia a "Guardar cambios" y aparece un botón "Cancelar edición" 

Colocar un botón de edición en cada tarjeta de contacto para iniciar el proceso 

#### **Al guardar** 

Se llama a la API con un **PUT** , el contacto se actualiza en el estado global y la interfaz refleja los cambios inmediatamente 





<!-- Start of picture text -->
= ©<br><!-- End of picture text -->

# = © <mark>=</mark> a 

## **Nueva función en api.js** 

### **Endpoint:** 

PUT /contactos/:id 

### **Recibe:** 

- **id** del contacto a actualizar 

**data** con los campos actualizados 

### **Comportamiento:** 

Si la respuesta no es ok, lanza un error. De lo contrario, devuelve el contacto actualizado. 



## **api.js – función UPDATE** 

Esta función permite actualizar un contacto existente en el servidor mediante una petición HTTP PUT. Es la pieza clave para completar la operación de edición en nuestro CRUD. 

export async function actualizarContacto(id, data) { 

const res = await fetch(`${API_BASE_URL}/${id}`, { 

method: "PUT", 

headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), 

}); 

if (!res.ok) throw new Error("Error al actualizar el contacto"); 

return res.json(); // Devuelve el contacto actualizado 

} 

La función es asíncrona, maneja errores apropiadamente y devuelve el objeto actualizado para mantener sincronizado el estado de la aplicación. 

Edittiing Mode v sOormM o Betzor B rrow (Pew ® Faloy @ isos loa & ean a @ Cotte > a Gorttne > | Perc | 8 8 x ea SS “a 3¢on Crabreneen Bane ee ® 





sa 2 08 S 6x60 mio S s0-00. AIO PF 21257 Ang 



## **contactoEnEdicion y handlers** 

### **Estados:** 

### **Funciones:** 

onEditarClick(contacto) → llena contactoEnEdicion 

const [contactoEnEdicion, 

setContactoEnEdicion] = useState(null); 

onCancelarEdicion() → vuelve a null 

onActualizarContacto(contactoActualizado): 

Llama a actualizarContacto en la API Actualiza el arreglo contactos 

Estas funciones coordinan toda la lógica de edición, permitiendo iniciar, cancelar y completar el proceso de actualización de contactos de manera controlada. 

rv 

Ci. (@eee )-= 





<!-- Start of picture text -->
eres, —o—_ —_e—_<br>[Semmi| ined A<br>a = .<br>—-—<br>nn<br>nes ooo<br><!-- End of picture text -->

## **Texto dinámico en los botones** 

### **Botón principal:** 

Modo crear → **"Agregar contacto"** 

Modo edición → **"Guardar cambios"** 

### **Botón secundario (solo en edición):** 

##### **"Cancelar edición"** 

Ambos respetan el estado enviando para desactivarse mientras se guarda, evitando envíos duplicados. 





<!-- Start of picture text -->
Contact (~)<br>Name|tri : ;<br>/ == =<br><!-- End of picture text -->

## **Resumen del flujo UPDATE** 

#### **Usuario hace clic en "Editar"** 

**1** 

En una tarjeta de la lista de contactos 

**App.jsx guarda el contacto** En contactoEnEdicion y pasa la info al FormularioContacto 

**2** 

**3** 

**4** 

**ContactoCard llama a onEditar(c)** Pasa el objeto del contacto al componente padre 

#### **FormularioContacto muestra datos** 

Carga los datos y al enviar, llama onActualizar 

**App.jsx actualiza** 

**5** 

Llama a actualizarContacto en la API, actualiza el estado contactos y limpia contactoEnEdicion 

= 





<!-- Start of picture text -->
ll<br><!-- End of picture text -->

Qualalty Testing USER INTERFACE FUNCTIONALITY | PERFORMANCE a Js~ COMPATIBILITY TN \ yy y 



to 

: 



<!-- Start of picture text -->
Ge<br>ae<br>|<br>= Qs<br><!-- End of picture text -->



<!-- Start of picture text -->
i<br><!-- End of picture text -->

i = n pi 

Gcoooy 

Pone 

Bqpes 

Conbwise 

Aoatsioioint 

Céacoa 

= 



<!-- Start of picture text -->
©<br><!-- End of picture text -->





<!-- Start of picture text -->
©<br><!-- End of picture text -->

CovwmunsicintConsiosiol Pilofsoner 20ras80em4 20: 288.0001 



<!-- Start of picture text -->
\<br><!-- End of picture text -->



<!-- Start of picture text -->
Rourfione > (=) <<br>Porfeoliono<br><!-- End of picture text -->

> Whe tavewienieceu! laiviola Wat t elosixernaaoal. oboestin denicla!:foretehe sie tclesef| nacknsalet oesfioans otbelle colotwect thevoletesach onteat ortiendd 



<!-- Start of picture text -->
doclessitdor emdrdert or oobostciostt oc otdertiabiaecs<br>“K Pialiues<br><!-- End of picture text -->

## **Evidencias para la CLASE 11** 

#### 📸 **Captura del formulario en modo edición** 

Con datos cargados del contacto 

📸 **Captura del botón "Cancelar edición"** 

Mostrando la opción de cancelar el proceso 

#### 📸 **Captura del contacto actualizado** 

En la lista mostrando los cambios guardados 

seleccionado 

##### **Commit recomendado:** 

Clase_11_Agenda_ADSO_v9_Editar_Contactos_Cierre_ABP 

Estas evidencias documentan el trabajo realizado y son fundamentales para la evaluación del proyecto ABP. 



