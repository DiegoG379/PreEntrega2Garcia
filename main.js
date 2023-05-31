


let presupuesto = 15000;
let diasViaje = 10;
let cantidadPersonas = 2;
let gastoTransporte = 1000;
let gastoAlojamiento = 1000;
let gastoComidaDia = 100;
let gastoExtras = 500;

let gastoComidaTotal = (gastoComidaDia * diasViaje) * cantidadPersonas;
let gastoTotal = gastoTransporte + gastoAlojamiento + gastoComidaTotal + gastoExtras;
let presupuestoTotal = presupuesto - gastoTotal;


console.log(`El costo total estimado para tu viaje es de: $${gastoTotal}.`);

if (presupuestoTotal >= 0) {
    console.log(`El resto de tu presupuesto es de $${presupuestoTotal}, lo cual es suficiente para llevar a cabo el viaje que tenías planeado.`);
} else {
    console.log(`Desafortunadamente, para poder llevar a cabo el viaje, se requeriría un presupuesto adicional de $${-presupuestoTotal} para cubrir todos los gastos necesarios.`);
}
