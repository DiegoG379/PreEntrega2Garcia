//Simulador de gastos - Inicio

// Conversor de divisas
let conversorDivisa = [0.025, 37.56, 0.024, 41.19];
function tomarMoneda() {
    let moneda = parseInt(prompt("Por favor, elige una opción ingresando el número correspondiente: 1. Peso a Dólar, 2. Dólar a Peso, 3. Peso a Euro, 4. Euro a Peso, Presiona cualquier tecla para omitir el conversor."));
    if (moneda === 1) {
        let pesos = parseInt(prompt("Ingresa la cantidad de pesos que deseas convertir a dólares"));
        let dolares = pesos * conversorDivisa[0];
        return alert(`Serían USD ${dolares}`);
    } else if (moneda === 2) {
        let dolares = parseInt(prompt("Ingresa la cantidad de dólares que deseas convertir a pesos"));
        let pesos = dolares * conversorDivisa[1];
        return alert(`Serían UYU ${pesos}`);
    } else if (moneda === 3) {
        let pesos = parseInt(prompt("Ingresa la cantidad de pesos que deseas convertir a euros"));
        let euros = pesos * conversorDivisa[2];
        return alert(`Serían EUR ${euros}`);
    } else if (moneda === 4) {
        let euros = parseInt(prompt("Ingresa la cantidad de euros que deseas convertir a pesos"));
        let pesos = euros * conversorDivisa[3];
        return alert(`Serían UYU ${pesos}`);
    } else {
        let mensaje = "Decidiste no usar el conversor. Sigue con los pasos siguientes para simular los gastos de tu viaje";
        return alert(mensaje);
    }
}

let resultado = tomarMoneda();

//Se solicitan datos mediante prompt y se corrobora que sean bien ingresados mediante bucle while, posterior se realizan los cálculos para el simulador
function pedirDatos(mensaje) {
    let valor = parseInt(prompt(mensaje));
    while (isNaN(valor) || valor < 0) {
        valor = parseInt(prompt("Por favor, ingresa un número válido."));
    }
    return valor;
}

let presupuesto = pedirDatos("¿Cuál es el presupuesto para tu viaje?");
let diasViaje = pedirDatos("¿Cuál es la duración en días de tu viaje?");
let cantidadPersonas = pedirDatos("¿Cuál es la cantidad de personas que viajarán?");
let gastoTransportePersona = pedirDatos("¿Cuánto estarías dispuesto/a a gastar en pasajes?");
let gastoAlojamiento = pedirDatos("¿Cuánto estarías dispuesto/a a gastar en alojamiento?");
let gastoComidaDia = pedirDatos("¿Cuánto estarías dispuesto/a a gastar en comidas por día y por persona?");
let gastoExtraPersona = pedirDatos("¿Cuánto estarías dispuesto/a a gastar en otras actividades durante tu viaje?");

let costoComidaTotal = (gastoComidaDia * diasViaje);
let costoTotalViaje = ((gastoTransportePersona + costoComidaTotal + gastoExtraPersona) * cantidadPersonas) + gastoAlojamiento;
let presupuestoRestante = presupuesto - costoTotalViaje;

alert(`El costo total estimado para tu viaje es de: $${costoTotalViaje}.`);

// Objeto de valores de referencia y función de porcentaje
let valoresReferencia = {
    ajustado: 0.10,
    transporte: 0.30,
    alojamiento: 0.25,
    comida: 0.25,
    extras: 0.20
};

function porcentajeDelTotal(presupuesto, porcentaje) {
    return presupuesto * porcentaje;
}

//Condicionales que evalúan y realizan recomendaciones personalizadas
if (presupuestoRestante >= 0) {
    alert(`El resto de tu presupuesto es de $${presupuestoRestante}, lo cual es suficiente para llevar a cabo el viaje que tenías planeado.`);
    if (porcentajeDelTotal(presupuesto, valoresReferencia.ajustado) > presupuestoRestante) {
        alert("Ten en cuenta que tu presupuesto disponible es un poco ajustado, pero estoy seguro de que podrás hacer un gran viaje.");
    }
} else {
    alert(`Desafortunadamente, para poder llevar a cabo el viaje, se requeriría un presupuesto adicional de $${-presupuestoRestante} para cubrir todos los gastos necesarios.`);
    alert("Deberías considerar lo siguiente:");
    if (porcentajeDelTotal(presupuesto, valoresReferencia.transporte) < (gastoTransportePersona * cantidadPersonas)) {
        alert("Podrías buscar un pasaje más económico para optimizar tu presupuesto.");
    }
    if (porcentajeDelTotal(presupuesto, valoresReferencia.alojamiento) < gastoAlojamiento) {
        alert("Sería conveniente explorar opciones de alojamiento más asequibles para optimizar tu presupuesto.");
    }
    if (porcentajeDelTotal(presupuesto, valoresReferencia.comida) < (costoComidaTotal * cantidadPersonas)) {
        alert("Considera buscar opciones de comida más económicas para aprovechar al máximo tu presupuesto destinado a las comidas.");
    }
    if (porcentajeDelTotal(presupuesto, valoresReferencia.extras) < (gastoExtraPersona * cantidadPersonas)) {
        alert("Te sugerimos explorar opciones más económicas para las actividades y otros tours que tengas previstos.");
    }
}

//Consultar por paquetes de viajes
alert("¡Tal vez tengamos un destino recomendado para ti basado en tu presupuesto! Ingresa nuevamente tu presupuesto total en dólares, y te diremos qué paquete All-inclusive de 5 días tenemos disponible.");
function preguntarDestinosDisponibles() {
    let pregunta = parseInt(prompt("¿Quieres conocer el destino disponible? Responde con 1 para sí o 2 para no."));
    while (isNaN(pregunta) || pregunta < 1 || pregunta > 2) {
        pregunta = parseInt(prompt("Por favor, responde con 1 para sí o 2 para no."));
    }
    return pregunta;
}

let pregunta = preguntarDestinosDisponibles();

if (pregunta === 1) {
    function pedirPresupuestoDolares(mensaje) {
        let presupuestoDolares = parseInt(prompt(mensaje));
        while (isNaN(presupuestoDolares) || presupuestoDolares < 0) {
            presupuestoDolares = parseInt(prompt("Por favor, ingresa un número válido."));
        }
        return presupuestoDolares;
}

    let presupuestoDolares = pedirPresupuestoDolares("¿Cuál es tu presupuesto total en dólares para gastar en tu viaje?");

    let destinos = [
        { nombre: "Cancún", costo: 1500 },
        { nombre: "Buenos Aires", costo: 650 },
        { nombre: "Río de Janeiro", costo: 800 },
        { nombre: "Santiago", costo: 1000 },
        { nombre: "Lima", costo: 1150 },
        { nombre: "Cartagena", costo: 1300 },
        { nombre: "Punta del Este", costo: 400 },
        { nombre: "Miami", costo: 2100 },
        { nombre: "París", costo: 2800 }
    ];

    let destinosDisponibles = destinos.filter(destino => destino.costo <= presupuestoDolares);

    if (destinosDisponibles.length > 0) {
    destinosDisponibles.sort((a, b) => a.costo - b.costo);

    alert("Los destinos disponibles dentro de tu presupuesto, son:");
    destinosDisponibles.forEach(destino => {
        alert(`Destino: ${destino.nombre}\nCosto: ${destino.costo} dólares`);
    });
    } else {
    alert("Lo sentimos, no hay destinos disponibles dentro de tu presupuesto.");
    }
} else {
    alert("Entendemos que no estés interesado en este momento. No obstante, estamos a tu disposición para brindarte asesoramiento en cualquier otra ocasión que lo necesites. ¡No dudes en contactarnos!");
}





