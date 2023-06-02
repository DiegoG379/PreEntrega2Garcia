// let presupuesto = 1500;
// let diasViaje = 1;
// let cantidadPersonas = 3;
// let gastoTransportePersona = 300;
// let gastoAlojamiento = 100;
// let gastoComidaDia = 30;
// let gastoExtraPersona = 150;
// costoTotalViaje = 1500 - 850 = 650;





let presupuesto = 200;
let diasViaje = 1;
let cantidadPersonas = 2;
let gastoTransportePersona = 30;
let gastoAlojamiento = 60;
let gastoComidaDia = 20;
let gastoExtraPersona = 20;

let gastoComidaTotal = (gastoComidaDia * diasViaje);
let costoTotalViaje = ((gastoTransportePersona + gastoComidaTotal + gastoExtraPersona) * cantidadPersonas) + gastoAlojamiento;
let presupuestoTotal = presupuesto - costoTotalViaje;

console.log(`El costo total estimado para tu viaje es de: $${costoTotalViaje}.`);

//Función de porcentaje

let porcentaje = 0;
function porcentajeDelTotal(presupuesto, porcentaje) {
    return presupuesto * porcentaje;
}

// Valores de referencia: Transporte: 30%, Alojamiento: 25%, Comida: 25%, Extras 20%. Resto menor al 10% es presupuesto ajustado.

if (presupuestoTotal >= 0) {
    console.log(`El resto de tu presupuesto es de $${presupuestoTotal}, lo cual es suficiente para llevar a cabo el viaje que tenías planeado.`);
    if (porcentajeDelTotal(presupuesto, 0.10) > (presupuestoTotal)) {
        console.log(`Ten en cuenta que tu presupuesto disponible es un poco ajustado, pero estoy seguro de que podrás hacer un gran viaje.`);
    }
} else {
    console.log(`Desafortunadamente, para poder llevar a cabo el viaje, se requeriría un presupuesto adicional de $${-presupuestoTotal} para cubrir todos los gastos necesarios.`);
    console.log(`Deberías considerar lo siguiente:`);
    if (porcentajeDelTotal(presupuesto, 0.30) < (gastoTransportePersona * cantidadPersonas)) {
        console.log(`Podrías buscar un pasaje más económico para optimizar tu presupuesto.`);
    }
    if (porcentajeDelTotal(presupuesto, 0.25) < gastoAlojamiento) {
        console.log(`Sería conveniente explorar opciones de alojamiento más asequibles para optimizar tu presupuesto.`);
    }
    if (porcentajeDelTotal(presupuesto, 0.25) < (gastoComidaTotal * cantidadPersonas)) {
        console.log(`Considera buscar opciones de comida más económicas para aprovechar al máximo tu presupuesto destinado a las comidas.`);
    }
    if (porcentajeDelTotal(presupuesto, 0.20) < (gastoExtraPersona * cantidadPersonas)) {
        console.log(`Te sugerimos explorar opciones más económicas para tus tours y las otras actividades que tengas previstas`);
    }

}