//Simulador de gastos - Inicio

function validarCampo(input) {
    let valor = parseInt(input.value);

    if (isNaN(valor) || valor < 0) {
        input.value = "";
    }
}





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
        let resultado = {};

        if (medioTransporte === "automovil") {
            camposAdicionalesDiv.style.display = "block";
            pasajesInput.style.display = "none";
            pasajesInput.disabled = true;

            let consumoCombustibleValor = parseFloat(consumoCombustibleInput.value) || 15;
            let distanciaKmValor = parseFloat(distanciaKmInput.value) || 0;
            let precioCombustibleValor = parseFloat(precioCombustibleInput.value) || 0;
            let gastoAutomovil = (distanciaKmValor / consumoCombustibleValor) * precioCombustibleValor;

            resultado.medioTransporte = "automovil";
            resultado.gasto = gastoAutomovil;
        } else {
            camposAdicionalesDiv.style.display = "none";
            pasajesInput.style.display = "block";
            pasajesInput.disabled = false;

            let pasajesValor = parseFloat(pasajesInput.value) || 0;

            resultado.medioTransporte = "otros";
            resultado.gasto = pasajesValor;
        }

        return resultado;
    }

    let enviarButton = document.getElementById('enviar');
    enviarButton.addEventListener('click', function () {

        let presupuesto = parseInt(document.getElementById('presupuesto').value);
        let diasViaje = parseInt(document.getElementById('duracion').value);
        let cantidadPersonas = parseInt(document.getElementById('personas').value);
        let gastoAlojamiento = parseInt(document.getElementById('alojamiento').value);
        let gastoComidaDia = parseInt(document.getElementById('comidas').value);

        let gastoTransportePersona = mostrarCamposAdicionales();
        if (gastoTransportePersona.medioTransporte === "automovil") {
            gastoTransportePersona = parseInt(gastoTransportePersona.gasto / cantidadPersonas);
        } else {
            gastoTransportePersona = parseInt(gastoTransportePersona.gasto);
        }

        // Cálculo de costos
        let costoComidaTotal = gastoComidaDia * diasViaje;
        let costoTotalViaje = (gastoTransportePersona + costoComidaTotal + gastoExtraPersona) * cantidadPersonas + gastoAlojamiento;
        let presupuestoRestante = presupuesto - costoTotalViaje;

        // Generar resultados en el archivo HTML 
        let resultadosDiv = document.getElementById("resultados");
        resultadosDiv.innerHTML = "";

        const resultados = [
            { texto: `Presupuesto: $${presupuesto}.` },
            { texto: `Duración del viaje: ${diasViaje} día/días.` },
            { texto: `Cantidad de personas: ${cantidadPersonas} viajero/viajeros.` },
            { texto: `Gasto en transporte por persona: $${gastoTransportePersona}` },
            { texto: `Gasto en alojamiento por persona: $${gastoAlojamiento/cantidadPersonas}` },
            { texto: `Gasto en comidas durante toda la estadía por persona: $${costoComidaTotal}` },
            { texto: `Gastos extras por persona: $${gastoExtraPersona}` },
            { texto: `El costo de tu viaje por persona es: $${costoTotalViaje/cantidadPersonas}` },
            { texto: `El costo total de tu viaje es: $${costoTotalViaje}` }
        ];

        let h3Elemento = document.createElement("h3");
        h3Elemento.textContent = "Detalles de tu última simulación de viaje";
        resultadosDiv.appendChild(h3Elemento);

        resultados.forEach((resultado) => {
            let resultadoElemento = document.createElement("p");
            resultadoElemento.textContent = resultado.texto;
            resultadosDiv.appendChild(resultadoElemento);
        });

        // Objeto de valores de referencia y función de porcentaje
        let valoresReferencia = {
            ajustado: 0.10,
            transporte: 0.30,
            alojamiento: 0.25,
            comida: 0.25,
            extras: 0.20
        };

        // Función para calcular el porcentaje del presupuesto
        function porcentajeDelTotal(presupuesto, porcentaje) {
            return presupuesto * porcentaje;
        }

        // Recomendaciones personalizadas
        if (presupuestoRestante >= 0) {
            let resultadoPresupuestoRestante = document.createElement("p");
            resultadoPresupuestoRestante.textContent = `El resto de tu presupuesto es de $${presupuestoRestante}, lo cual es suficiente para llevar a cabo el viaje que tenías planeado.`;
            resultadosDiv.appendChild(resultadoPresupuestoRestante);
            if (porcentajeDelTotal(presupuesto, valoresReferencia.ajustado) > presupuestoRestante) {
                let resultadoPresupuestoAjustado = document.createElement("p");
                resultadoPresupuestoAjustado.textContent = `Ten en cuenta que tu presupuesto disponible es un poco ajustado, pero estoy seguro de que podrás hacer un gran viaje.`;
                resultadosDiv.appendChild(resultadoPresupuestoAjustado);
            }
        } else {
            let resultadoPresupuestoAdicional = document.createElement("p");
            resultadoPresupuestoAdicional.textContent = `Desafortunadamente, para poder llevar a cabo el viaje se requeriría de un presupuesto adicional de $${-presupuestoRestante} para cubrir todos los gastos necesarios. Deberías considerar lo siguiente:`;
            resultadosDiv.appendChild(resultadoPresupuestoAdicional);
            if (porcentajeDelTotal(presupuesto, valoresReferencia.transporte) < (gastoTransportePersona * cantidadPersonas)) {
                let resultadoOptimizarTransporte = document.createElement("p");
                resultadoOptimizarTransporte.textContent = `Podrías buscar un pasaje más económico para optimizar tu presupuesto.`;
                resultadoOptimizarTransporte.classList.add("recomendaciones");
                resultadosDiv.appendChild(resultadoOptimizarTransporte);
            }
            if (porcentajeDelTotal(presupuesto, valoresReferencia.alojamiento) < gastoAlojamiento) {
                let resultadoOptimizarAlojamiento = document.createElement("p");
                resultadoOptimizarAlojamiento.textContent = `Sería conveniente explorar opciones de alojamiento más asequibles para optimizar tu presupuesto.`;
                resultadoOptimizarAlojamiento.classList.add("recomendaciones");
                resultadosDiv.appendChild(resultadoOptimizarAlojamiento);
            }
            if (porcentajeDelTotal(presupuesto, valoresReferencia.comida) < (costoComidaTotal * cantidadPersonas)) {
                let resultadoOptimizarComidas = document.createElement("p");
                resultadoOptimizarComidas.textContent = `Considera buscar otras opciones más económicas para aprovechar al máximo tu presupuesto para las comidas.`;
                resultadoOptimizarComidas.classList.add("recomendaciones");
                resultadosDiv.appendChild(resultadoOptimizarComidas);
            }
            if (porcentajeDelTotal(presupuesto, valoresReferencia.extras) < (gastoExtraPersona * cantidadPersonas)) {
                let resultadoOptimizarExtras = document.createElement("p");
                resultadoOptimizarExtras.textContent = `Te sugerimos explorar opciones más económicas para las actividades y otros tours que tengas previstos.`;
                resultadoOptimizarExtras.classList.add("recomendaciones");
                resultadosDiv.appendChild(resultadoOptimizarExtras);
            }
        }
    });
});