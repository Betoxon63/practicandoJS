let modoOscuro = false; // Inicializa el modo oscuro en falso.

function cambiarFondo() {
    const body = document.body; // Obtiene el body de la pagina.
    const icono = document.getElementById("iconoFondo"); // Obtiene el icono cambiar fondo.

    modoOscuro = !modoOscuro; // Alterna entre verdadero/falso.

    if (modoOscuro) {
        body.classList.add("modo-oscuro"); // Añade la clase modo-oscuro.
        icono.classList.remove("bi-moon-fill"); // Elimina el icono bi-moon-fill.
        icono.classList.add("bi-brightness-high-fill"); // Añade el icono bi-brightness-high-fill.
    } else {
        body.classList.remove("modo-oscuro"); // Elimina la clase modo-oscuro.
        icono.classList.remove("bi-brightness-high-fill"); // Elimina el icono bi-brightness-high-fill.
        icono.classList.add("bi-moon-fill"); // Añade el icono bi-moon-fill.
    }
}

function mostrarSeccion(seccion) {
    // Oculta todas las secciones.
    document.getElementById("seccionEdad").style.display = "none";
    document.getElementById("seccionTemperatura").style.display = "none";
    document.getElementById("seccionTareas").style.display = "none";

    if (seccion === "edad") {
        document.getElementById("seccionEdad").style.display = "block"; // Muestra la sección de edad.
    } else if (seccion === "temperatura") {
        document.getElementById("seccionTemperatura").style.display = "block"; // Muestra la sección de temperatura.
    } else if (seccion === "tareas") {
        document.getElementById("seccionTareas").style.display = "block"; // Muestra la sección de temperatura.
    }
}

function calcularEdad(fechaNacimiento) {
    const hoy = new Date(); // Obtiene la fecha actual.
    const nacimiento = new Date(fechaNacimiento); // Obtiene la fecha de nacimiento.

    let edad = hoy.getFullYear() - nacimiento.getFullYear(); // Calcula los años.
    const mes = hoy.getMonth() - nacimiento.getMonth(); // Calcula los meses.

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) { // Verifica el mes.
        edad--; // Restar un año a la edad.
    }

    return edad; // Devuelve la edad calculada.
}

function mostrarEdad() {
    const input = document.getElementById("fechaNacimiento"); // Obtiene el id del input.
    const resultado = document.getElementById("resultado"); // Obtiene el id resultado.
    const fecha = input.value; // Obtiene el valor del input.

    if (!fecha) {
        resultado.innerHTML = `
        <div class="alert alert-danger alert-dismissible">
            <div>
                <i class="bi bi-exclamation-diamond-fill me-2"></i>
                Por favor, ingresa una fecha de nacimiento.
            </div>
            <button class="btn btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        return; // Sale de la función.
    }

    const edad = calcularEdad(fecha);

    if (edad < 0) {
        resultado.innerHTML = `
        <div class="alert alert-danger alert-dismissible">
            <div>
                <i class="bi bi-exclamation-circle-fill me-2"></i>
                La fecha ingresada es futura. Por favor, ingresa una fecha válida.
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else {
        resultado.innerHTML = `
        <div class="alert alert-success alert-dismissible">
            <div>
                <i class="bi bi-check-circle-fill me-2"></i>
                Tu edad es: ${edad} años.
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }
}

// Listado de Tareas.

let tareas = ["Tarea 1", "Tarea 2", "Tarea 3"]; // Arreglo de tareas iniciales.
let listaTareas = document.getElementById("listaTareas"); // Obtiene el id de la lista de tareas.
let indiceEdicion = -1; // Controlar la tarea que estamos editando.
let modalEditarTarea = new bootstrap.Modal(document.getElementById("modalEditarTarea")); // Inicializa el modal de edición.
let modalEliminarTarea = new bootstrap.Modal(document.getElementById("modalEliminarTarea")); // Inicializa el modal de eliminación.

listarTareas(tareas); // Mostrar tareas al cargar la pagina.

function listarTareas(tareasListadas) {
    listaTareas.innerHTML = ""; // Limpia la lista de tareas.

    // Recorre cada tarea en el arreglo.
    tareasListadas.forEach((tarea, index) => {
        const li = document.createElement("li"); // Crea un elemento li.
        li.className = "list-group-item d-flex justify-content-between align-items-center"; // Añade clases al li.
        li.innerHTML = `
            <span>${tarea}</span>
            <div>
                <button class="btn btn-primary btn-sm me-2" onclick="editarTarea(${index})">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${index})">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>`;
        listaTareas.appendChild(li); // Añade el li a la lista de tareas.
    });
}

function prepararEdicion(index) {
    indiceEdicion = index; // Guarda el índice de la tarea que se va a editar.
    document.getElementById("tareaEditada").value = tareas[index]; // Muestra la tarea en el input.
    modalEditarTarea.show(); // Muestra el modal de edición.
}

function guardarEdicion() {
    const nuevaTarea = document.getElementById("tareaEditada").value.trim(); // Obtiene el valor del input de edición.

    if (nuevaTarea === "") {
        alert("La tarea no puede estar vacía."); // Verifica si el input está vacío.
        return; // Sale de la función.
    }

    tareas[indiceEdicion] = nuevaTarea; // Actualiza la tarea en el índice de edición.
    listarTareas(tareas); // Vuelve a listar las tareas.
    modalEditarTarea.hide(); // Oculta el modal de edición.
    indiceEdicion = -1; // Resetea el índice de edición.
}

function mostrarModalEliminar(index) {
    indiceEdicion = index; // Guarda el índice de la tarea que se va a eliminar.
    modalEliminarTarea.show(); // Muestra el modal de eliminación.
}

function confirmarEliminacion() {
    tareas.splice(indiceEdicion, 1); // Elimina la tarea del arreglo usando el índice de edición.
    listarTareas(tareas); // Vuelve a listar las tareas.
    modalEliminarTarea.hide(); // Oculta el modal de eliminación.
    indiceEdicion = -1; // Resetea el índice de edición.
}

function agregarTarea() {
    const inputTarea = document.getElementById("tarea"); // Obtiene el id del input de tarea.
    const texto = inputTarea.value.trim(); // Obtiene el valor del input y elimina espacios al inicio y al final.

    // Verifica si el input está vacío.
    if (texto === "") {
        alert("Por favor, ingresa una tarea."); 
        return;
    }

    tareas.push(texto); // Agrega la nueva tarea al arreglo de tareas.
    inputTarea.value = ""; // Limpia el input de tarea.
    listarTareas(tareas); // Vuelve a listar las tareas.
}

document.getElementById("tarea").addEventListener("keypress", function(e) { // Permitir agregar tarea con Enter
    if (e.key === "Enter") {
        agregarTarea();
    }
});

function buscarTarea() {
    const inputTarea = document.getElementById("tarea"); // Obtiene el id del input de tarea.
    const textoBusqueda = inputTarea.value.trim().toLowerCase(); // Obtiene el valor del input y lo convierte a minúsculas.

    if (textoBusqueda === "") {
        listarTareas(tareas); // Si el input está vacío, lista todas las tareas.
        return; // Sale de la función.
    }

    const tareasEncontradas = tareas.filter(tarea => tarea.toLowerCase().includes(textoBusqueda)); // Filtra las tareas que contienen el texto de búsqueda.

    if (tareasEncontradas.length > 0) {
        listarTareas(tareasEncontradas); // Lista las tareas encontradas.
    } else {
        alert("No se encontraron tareas con ese texto."); // Muestra un mensaje si no se encuentran tareas.
    }
}

function eliminarTarea() {
    // Esta función ya no es necesaria porque usamos el modal
    console.log("Usar el modal de eliminación en su lugar");
}

function EditarTarea() {
    // Esta función ya no es necesaria porque usamos el modal
    console.log("Usar el modal de edición en su lugar");
}