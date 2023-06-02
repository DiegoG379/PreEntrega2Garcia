//Simulador de gastos - Inicio

//Se solicitan datos mediante prompt y se corrobora que sean bien ingresados mediante bucle while.

let presupuesto = parseInt(prompt("¿Cuál es el presupuesto para tu viaje?"));
if (isNaN(presupuesto) || (presupuesto < 0)) {
    while (isNaN(presupuesto) || (presupuesto < 0)) {
        presupuesto = parseInt(prompt("Por favor, ingresa un número para continuar. Necesitamos saber el presupuesto total para tu viaje."));
    }
}

let diasViaje = parseInt(prompt("¿Cuál es la duración en días de tu viaje?"));
if (isNaN(diasViaje) || (diasViaje < 0)) {
    while (isNaN(diasViaje) || (diasViaje < 0)) {
        diasViaje = parseInt(prompt("Por favor, ingresa el número de días que durará tu viaje."));
    }
}

let cantidadPersonas = parseInt(prompt("¿Cuál es la cantidad de personas que viajarán?"));
if (isNaN(cantidadPersonas) || (cantidadPersonas < 0)) {
    while (isNaN(cantidadPersonas) || (cantidadPersonas < 0)) {
        cantidadPersonas = parseInt(prompt("Por favor, ingresa el número de personas que participarán en el viaje."));
    }
}

let gastoTransportePersona = parseInt(prompt("¿Cuánto estarías dispuesto/a a gastar en pasajes?"));
if (isNaN(gastoTransportePersona) || (gastoTransportePersona < 0)) {
    while (isNaN(gastoTransportePersona)|| (gastoTransportePersona < 0)) {
        gastoTransportePersona = parseInt(prompt("Por favor, ingresa un número válido para el gasto en transporte."));
    }
}

let gastoAlojamiento = parseInt(prompt("¿Cuánto estarías dispuesto/a a gastar en alojamiento?"));
if (isNaN(gastoAlojamiento) || (gastoAlojamiento < 0)) {
    while (isNaN(gastoAlojamiento) || (gastoAlojamiento < 0)) {
        gastoAlojamiento = parseInt(prompt("Por favor, ingresa un número válido para el gasto en alojamiento."));
    }
}

let gastoComidaDia = parseInt(prompt("¿Cuánto estarías dispuesto/a a gastar en comidas por día y por persona?"));
if (isNaN(gastoComidaDia) || (gastoComidaDia < 0)) {
    while (isNaN(gastoComidaDia) || (gastoComidaDia < 0)) {
        gastoComidaDia = parseInt(prompt("Por favor, ingresa un número válido para el gasto en comidas"));
    }
}

let gastoExtraPersona = parseInt(prompt("¿Cuánto estarías dispuesto/a a gastar en otras actividades durante tu viaje?"));
if (isNaN(gastoExtraPersona) || (gastoExtraPersona < 0)) {
    while (isNaN(gastoExtraPersona) || (gastoExtraPersona < 0)) {
        gastoExtraPersona = parseInt(prompt("Por favor, ingresa un número válido para el gasto en actividades extras."));
    }
}
