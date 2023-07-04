//Simulador de gastos - Inicio

// Conversor de divisas
let conversorDivisa = [0.025, 40];

function convertirDivisa() {
    let monto = document.getElementById('monto').value;
    let monedaDe = document.getElementById('monedaDe').value;
    let monedaA = document.getElementById('monedaA').value;
    let resultado;

    if (monedaDe === 'uyu' && monedaA === 'usd') {
        resultado = monto * conversorDivisa[0];
        document.getElementById('resultado').innerHTML = `UYU${monto} = USD${resultado}`;
    } else if (monedaDe === 'usd' && monedaA === 'uyu') {
        resultado = monto * conversorDivisa[1];
        document.getElementById('resultado').innerHTML = `USD${monto} = UYU${resultado}`;
    } else {
        resultado = 'No se puede realizar la conversión';
    }
}

//Crear lista de activiades extras
let actividades = [];
let gastoExtraPersona = 0;

document.addEventListener("DOMContentLoaded", function () {
    function agregarActividad() {
        const actividad = document.getElementById("actividadInput").value;
        const precio = parseFloat(document.getElementById("precioInput").value);

        if (actividad.trim() === "" || isNaN(precio) || precio <= 0) {
            alert("Por favor, ingresa una actividad válida y su precio.");
            return;
        }

        const actividadPrecio = {
            actividad: actividad,
            precio: precio
        };

        actividades.push(actividadPrecio);
        mostrarActividades();
        calcularGastoExtraPersona();
        limpiarCampos();
    }

    function eliminarActividad(indice) {
        actividades.splice(indice, 1);
        mostrarActividades();
        calcularGastoExtraPersona();
    }

    function mostrarActividades() {
        const listaActividades = document.getElementById("actividadesLista");
        listaActividades.innerHTML = "";

        actividades.forEach((actividad, indice) => {
            const elementoLista = document.createElement("li");
            const textoElemento = document.createTextNode(`${actividad.actividad}: ${actividad.precio}`);

            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.addEventListener("click", () => {
                eliminarActividad(indice);
            });

            botonEliminar.classList.add("boton");
            botonEliminar.style.marginLeft = "20px";


            elementoLista.appendChild(textoElemento);
            elementoLista.appendChild(botonEliminar);
            listaActividades.appendChild(elementoLista);
        });
    }

    function calcularGastoExtraPersona() {
        let sumaPrecios = 0;

        for (let i = 0; i < actividades.length; i++) {
            sumaPrecios += actividades[i].precio;
        }

        gastoExtraPersona = sumaPrecios;
    }

    function limpiarCampos() {
        document.getElementById("actividadInput").value = "";
        document.getElementById("precioInput").value = "";
    }

    document.getElementById("agregar").addEventListener("click", agregarActividad);
});





































document.addEventListener('DOMContentLoaded', function () {










    let medioTransporteSelect = document.getElementById("medioTransporte");
    let pasajesInput = document.getElementById("pasajes");
    let camposAdicionalesDiv = document.getElementById("camposAdicionales");
    let consumoCombustibleInput = document.getElementById("consumoCombustible");
    let distanciaKmInput = document.getElementById("distanciaKm");
    let precioCombustibleInput = document.getElementById("precioCombustible");

    medioTransporteSelect.addEventListener("change", function () {
        mostrarCamposAdicionales();
    });

    function mostrarCamposAdicionales() {
        let medioTransporte = medioTransporteSelect.value;

        if (medioTransporte === "automovil") {
            camposAdicionalesDiv.style.display = "block";
            pasajesInput.style.display = "none";
            pasajesInput.disabled = true;

            let consumoCombustibleValor = parseFloat(consumoCombustibleInput.value) || 15;
            console.log("Valor de consumo de combustible:", consumoCombustibleValor);

            let distanciaKmValor = parseFloat(distanciaKmInput.value) || 0;
            console.log("Valor de distancia en km:", distanciaKmValor);

            let precioCombustibleValor = parseFloat(precioCombustibleInput.value) || 0;
            console.log("Valor de precio de combustible:", precioCombustibleValor);

            let gastoAutomovil = (distanciaKmValor / consumoCombustibleValor) * precioCombustibleValor;

            console.log("Gasto en automóvil:", gastoAutomovil);

            return gastoAutomovil;
        } else {
            camposAdicionalesDiv.style.display = "none";
            pasajesInput.style.display = "block";
            pasajesInput.disabled = false;

            let pasajesValor = parseFloat(pasajesInput.value) || 0;
            console.log("Valor de pasajes:", pasajesValor);

            return 0; // Otra opción si no se puede calcular el gasto en transporte por persona en este caso
        }
    }
















    let enviarButton = document.getElementById('enviar');
    enviarButton.addEventListener('click', function () {
        // Toma de datos
        let presupuesto = parseInt(document.getElementById('presupuesto').value);
        let diasViaje = parseInt(document.getElementById('duracion').value);
        let cantidadPersonas = parseInt(document.getElementById('personas').value);
        let gastoTransportePersona = parseInt(document.getElementById('pasajes').value);
        let gastoAlojamiento = parseInt(document.getElementById('alojamiento').value);
        let gastoComidaDia = parseInt(document.getElementById('comidas').value);

        let gastoTransporte = 0;
        gastoTransporte = mostrarCamposAdicionales();
        console.log("Gasto en transporte por persona:", gastoTransporte);
        if (gastoTransporte != 0) {
            gastoTransportePersona = (gastoTransporte / cantidadPersonas);
        }

        console.log('Presupuesto:', presupuesto);
        console.log('Duración en días:', diasViaje);
        console.log('Cantidad de personas:', cantidadPersonas);
        console.log('Gasto total en pasajes:', gastoTransportePersona);
        console.log('Gasto total de alojamiento:', gastoAlojamiento);
        console.log('Gasto previsto de comida:', gastoComidaDia);
        console.log('Consumo de combustible:', consumoCombustible);
        console.log('Distancia en kilómetros:', distanciaKm);
        console.log('Precio del combustible:', precioCombustible);
        console.log('gasto extra:', gastoExtraPersona);


        // Cálculo de costos
        let costoComidaTotal = gastoComidaDia * diasViaje;
        let costoTotalViaje = (gastoTransportePersona + costoComidaTotal + gastoExtraPersona) * cantidadPersonas + gastoAlojamiento;
        let presupuestoRestante = presupuesto - costoTotalViaje;

        console.log(costoComidaTotal);
        console.log(costoTotalViaje);
        console.log(presupuestoRestante);


        // Objeto de valores de referencia de porcentaje
        let valoresReferencia = {
            transporte: 0.30,
            alojamiento: 0.25,
            comida: 0.25,
            extras: 0.20
        };

        // Función para calcular el porcentaje del presupuesto
        function porcentajeDelTotal(presupuesto, porcentaje) {
            return presupuesto * porcentaje;
        }

        // Alertas
        if (presupuestoRestante >= 0) {
            alert(`El resto de tu presupuesto es de $${presupuestoRestante}, lo cual es suficiente para llevar a cabo el viaje que tenías planeado.`);
            if (porcentajeDelTotal(presupuesto, 0.10) > presupuestoRestante) {
                alert(`Ten en cuenta que tu presupuesto disponible es un poco ajustado, pero estoy seguro de que podrás hacer un gran viaje.`);
            }
        } else {
            alert(`Desafortunadamente, para poder llevar a cabo el viaje, se requeriría un presupuesto adicional de $${-presupuestoRestante} para cubrir todos los gastos necesarios.`);
            alert(`Deberías considerar lo siguiente:`);
            if (porcentajeDelTotal(presupuesto, valoresReferencia.transporte) < (gastoTransportePersona * cantidadPersonas)) {
                alert(`Podrías buscar un pasaje más económico para optimizar tu presupuesto.`);
            }
            if (porcentajeDelTotal(presupuesto, valoresReferencia.alojamiento) < gastoAlojamiento) {
                alert(`Sería conveniente explorar opciones de alojamiento más asequibles para optimizar tu presupuesto.`);
            }
            if (porcentajeDelTotal(presupuesto, valoresReferencia.comida) < (costoComidaTotal * cantidadPersonas)) {
                alert(`Considera buscar opciones de comida más económicas para aprovechar al máximo tu presupuesto destinado a las comidas.`);
            }
            if (porcentajeDelTotal(presupuesto, valoresReferencia.extras) < (gastoExtraPersona * cantidadPersonas)) {
                alert(`Te sugerimos explorar opciones más económicas para las actividades y otros tours que tengas previstos.`);
            }
        }
    });
});