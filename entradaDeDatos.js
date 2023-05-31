//Simulador de gastos - Inicio

//Se solicitan datos mediante prompt y se corrobora que sean bien ingresados mediante bucle while.

let presupuesto = parseInt(prompt("Días de viaje"));
if (isNaN(presupuesto) || (presupuesto < 0)) {
    while (isNaN(presupuesto) || (presupuesto < 0)) {
        presupuesto = parseInt(prompt("Por favor, ingrese un número para poder continuar."));
    }
}

let diasViaje = parseInt(prompt("Días de viaje"));
if (isNaN(diasViaje) || (diasViaje < 0)) {
    while (isNaN(diasViaje) || (diasViaje < 0)) {
        diasViaje = parseInt(prompt("Por favor, ingrese un número para poder continuar."));
    }
}

let cantidadPersonas = parseInt(prompt("Cuantos viajan?"));
if (isNaN(cantidadPersonas) || (cantidadPersonas < 0)) {
    while (isNaN(cantidadPersonas) || (cantidadPersonas < 0)) {
        cantidadPersonas = parseInt(prompt("Por favor, ingrese un número para poder continuar."));
    }
}

let gastoTransporte = parseInt(prompt("Cuanto gastarias en pasajes?"));
if (isNaN(gastoTransporte) || (gastoTransporte < 0)) {
    while (isNaN(gastoTransporte)|| (gastoTransporte < 0)) {
        gastoTransporte = parseInt(prompt("Por favor, ingrese un número para poder continuar."));
    }
}

let gastoAlojamiento = parseInt(prompt("Cuanto gastarias en alojamiento?"));
if (isNaN(gastoAlojamiento) || (gastoAlojamiento < 0)) {
    while (isNaN(gastoAlojamiento) || (gastoAlojamiento < 0)) {
        gastoAlojamiento = parseInt(prompt("Por favor, ingrese un número para poder continuar."));
    }
}

let gastoComidaDia = parseInt(prompt("Cuanto gastarias en comidas?"));
if (isNaN(gastoComidaDia) || (gastoComidaDia < 0)) {
    while (isNaN(gastoComidaDia) || (gastoComidaDia < 0)) {
        gastoComidaDia = parseInt(prompt("Por favor, ingrese un número para poder continuar."));
    }
}

let gastoExtras = parseInt(prompt("Cuanto gastarias en otras actividades?"));
if (isNaN(gastoExtras) || (gastoExtras < 0)) {
    while (isNaN(gastoExtras) || (gastoExtras < 0)) {
        gastoExtras = parseInt(prompt("Por favor, ingrese un número para poder continuar."));
    }
}
