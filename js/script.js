let modoOscuro = false; // Establece el modo oscuro como falso.

function cambiarFondo() {
    const body = document.body; // Obtiene el body.
    const icono = document.getElementById("iconoFondo"); // Obtiene el icono.

    modoOscuro = !modoOscuro; // Cambia entre verdadero/falso.

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

    if (seccion === "edad") {
        document.getElementById("seccionEdad").style.display = "block"; // Muestra la sección de edad.
    } else if (seccion === "temperatura") {
        document.getElementById("seccionTemperatura").style.display = "block"; // Muestra la sección de temperatura.
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