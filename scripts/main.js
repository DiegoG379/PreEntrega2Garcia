// Se muestra logo de carga
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        document.body.style.backgroundImage = 'url(media/wallpaper.webp)';
    }, 3000);
});

//Simulador de gastos - Inicio
// Verificar que sean solamente números y además positivos en todos los campos input
function validarCampo(input) {
    let valor = parseInt(input.value);

    if (isNaN(valor) || valor < 0) {
        input.value = "";
    }
}

// Conversor de divisas
async function convertirDivisa() {
    const monto = document.getElementById("monto").value;
    const monedaDe = document.getElementById("monedaDe").value;
    const monedaA = document.getElementById("monedaA").value;

    if (isNaN(monto) || monto.trim() === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Ingrese un monto válido a convertir',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'my-custom-button',
                popup: 'my-custom-popup'
            }
        });
        return;
    }

    const url = `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=${monedaDe.toUpperCase()}&want=${monedaA.toUpperCase()}&amount=${monto}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1ae058be27mshbc8100951fb20b8p1c6c17jsn8ea181589eae',
            'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const mensajeResultado = `${monto} ${monedaDe.toUpperCase()} = ${result.new_amount} ${monedaA.toUpperCase()}`;
        const resultadoElement = document.getElementById("resultado");
        resultadoElement.textContent = `${mensajeResultado}`;
    } catch (error) {
        Swal.fire({
            icon: 'warning',
            title: 'Ups, algo salió mal. Por favor, inténtalo nuevamente más tarde.',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'my-custom-button',
                popup: 'my-custom-popup'
            }
        });
    }
}

// Crear lista de actividades extras
let actividades = [];
let gastoExtraPersona = 0;

document.addEventListener("DOMContentLoaded", function () {
    restaurarActividades();

    function agregarActividad() {
        const actividad = document.getElementById("actividadInput").value;
        const precio = parseFloat(document.getElementById("precioInput").value);

        if (actividad.trim() === "" || isNaN(precio) || precio <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Ingresa una actividad válida y su respectivo precio.',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'my-custom-button',
                    popup: 'my-custom-popup'
                }
            });
            return;
        }

        const actividadPrecio = {
            actividad: actividad,
            precio: precio
        };

        actividades.push(actividadPrecio);
        mostrarActividades();
        calcularGastoExtraPersona();
        guardarActividades();
        limpiarCampos();
    }

    function eliminarActividad(indice) {
        actividades.splice(indice, 1);
        mostrarActividades();
        calcularGastoExtraPersona();
        guardarActividades();
    }

    function mostrarActividades() {
        const listaActividades = document.getElementById("actividadesLista");
        listaActividades.innerHTML = "";

        actividades.forEach((actividad, indice) => {
            const elementoLista = document.createElement("li");
            const textoElemento = document.createTextNode(
                `${actividad.actividad}: ${actividad.precio}`
            );
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

    function guardarActividades() {
        localStorage.setItem("actividades", JSON.stringify(actividades));
    }

    function restaurarActividades() {
        const actividadesGuardadas = localStorage.getItem("actividades");
        if (actividadesGuardadas) {
            actividades = JSON.parse(actividadesGuardadas);
            mostrarActividades();
            calcularGastoExtraPersona();
        }
    }

    document.getElementById("agregar").addEventListener("click", agregarActividad);
});

// Función para mostrar u ocultar los campos de transporte según la opción seleccionada.
let medioTransporteSelect = document.getElementById("medioTransporte");
let pasajesInput = document.getElementById("pasajes");
let camposAdicionalesDiv = document.getElementById("camposAdicionales");
let consumoCombustibleInput = document.getElementById("consumoCombustible");
let distanciaKmInput = document.getElementById("distanciaKm");
let precioCombustibleInput = document.getElementById("precioCombustible");

function mostrarCamposAutomovil() {
    let medioTransporte = medioTransporteSelect.value;
    let resultado = {};

    if (medioTransporte === "automovil") {
        camposAdicionalesDiv.style.display = "block";
        pasajesInput.style.display = "none";
        pasajesInput.disabled = true;

        let consumoCombustibleValor = parseFloat(consumoCombustibleInput.value) || 15;
        let distanciaKmValor = parseFloat(distanciaKmInput.value);
        let precioCombustibleValor = parseFloat(precioCombustibleInput.value);
        let gastoAutomovil = parseInt(distanciaKmValor / consumoCombustibleValor) * precioCombustibleValor;

        resultado.medioTransporte = "automovil";
        resultado.gasto = gastoAutomovil;
    } else {
        camposAdicionalesDiv.style.display = "none";
        pasajesInput.style.display = "block";
        pasajesInput.disabled = false;

        let pasajesValor = parseInt(pasajesInput.value);

        resultado.medioTransporte = "otros";
        resultado.gasto = pasajesValor;
    }

    return resultado;
}

// Función para mostrar u ocultar el campo de ingreso de gastos de comidas según la opción seleccionada.
const tipoComidasSelect = document.getElementById("tipoComidas");
const comidasInput = document.getElementById("comidas");

function ocultarCampoComidas() {
    if (tipoComidasSelect.value === "all-inclusive") {
        comidasInput.style.display = "none";
        gastoComidaDia = 0;
    } else {
        comidasInput.style.display = "block";
        gastoComidaDia = parseInt(comidasInput.value);
    }
    return gastoComidaDia;
}

// Toma de datos, procesamiento de los mismos y devolución de recomendaciones
document.addEventListener('DOMContentLoaded', function () {

    medioTransporteSelect.addEventListener("change", function () {
        mostrarCamposAutomovil();
    });

    tipoComidasSelect.addEventListener("change", function () {
        ocultarCampoComidas();
    });

    let enviarButton = document.getElementById('enviar');
    enviarButton.addEventListener('click', function () {

        let presupuesto = parseInt(document.getElementById('presupuesto').value);
        let diasViaje = parseInt(document.getElementById('duracion').value);
        let cantidadPersonas = parseInt(document.getElementById('personas').value);
        let gastoAlojamiento = parseInt(document.getElementById('alojamiento').value);
        let gastoComidaDia = ocultarCampoComidas();
        let gastoTransportePersona = mostrarCamposAutomovil();
        if (gastoTransportePersona.medioTransporte === "automovil") {
            gastoTransportePersona = parseInt(gastoTransportePersona.gasto / cantidadPersonas);
        } else {
            gastoTransportePersona = parseInt(gastoTransportePersona.gasto);
        }

        //Verifica que todos los campos hayan sido llenados y ademas que Presupuesto, DiasViaje y CantidadPersonas no sean 0.
        if (presupuesto === 0 || diasViaje === 0 || cantidadPersonas === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Por favor, ingrese valores válidos para continuar.',
                html: 'Los siguientes campos deben ser mayores a cero:<br><strong>Presupuesto</strong><br><strong>Duración en días</strong><br><strong>Cantidad de personas</strong>',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'my-custom-button',
                    popup: 'my-custom-popup'
                }
            });
            return;
        }
        
        if (isNaN(presupuesto) || isNaN(diasViaje) || isNaN(cantidadPersonas) || isNaN(gastoAlojamiento) || isNaN(gastoTransportePersona) || isNaN(gastoComidaDia)) {
            Swal.fire({
                icon: 'warning',
                title: 'Completa todos los campos antes de simular.',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'my-custom-button',
                    popup: 'my-custom-popup'
                }
            });
            return;
        }

        // Cálculo de costos
        let costoComidaTotal = gastoComidaDia * diasViaje;
        let costoTotalViaje = (gastoTransportePersona + costoComidaTotal + gastoExtraPersona) * cantidadPersonas + gastoAlojamiento;
        let presupuestoRestante = presupuesto - costoTotalViaje;

        // Generar resultados en el archivo HTML 
        let SeleccionTipoTransporte = document.getElementById("medioTransporte").value;
        let SeleccionTipoAlojamiento = document.getElementById("tipoAlojamiento").value;
        let SeleccionTipoComidas = document.getElementById("tipoComidas").value;
        let resultadosDiv = document.getElementById("resultados");
        resultadosDiv.innerHTML = "";

        const resultados = [
            { texto: `Presupuesto: $${presupuesto}.` },
            { texto: `Duración del viaje: ${diasViaje} día/días.` },
            { texto: `Cantidad de personas: ${cantidadPersonas} viajero/viajeros.` },
            { texto: `Has seleccionado ${SeleccionTipoTransporte} como medio de transporte. El gasto en transporte por persona es de $${gastoTransportePersona}` },
            { texto: `Se ha seleccionado ${SeleccionTipoAlojamiento} como tipo de alojamiento para tu estadía. El gasto por persona en alojamiento es de $${gastoAlojamiento/cantidadPersonas}.` },
            { texto: `El régimen de comidas seleccionado es ${SeleccionTipoComidas}. El gasto en comidas durante toda la estadía por persona es de $${costoComidaTotal}.` },
            { texto: `Gastos extras por persona: $${gastoExtraPersona}` },
            { texto: `El costo de tu viaje por persona es: $${costoTotalViaje/cantidadPersonas}` },
            { texto: `El costo total de tu viaje es: $${costoTotalViaje}` }
        ];

        let h3Elemento = document.createElement("h3");
        h3Elemento.textContent = "Detalles de tu $imulación de viaje";
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
                resultadoPresupuestoAjustado.textContent = `Ten en cuenta que tu presupuesto disponible es un poco ajustado, pero estamos seguros de que podrás hacer un gran viaje.`;
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
// Simulador de gastos - Final

// Almacenamiento de datos en el formulario - Inicio
const formulario = document.querySelector('#simulador');
const btnEnviar = document.querySelector('#enviar');

btnEnviar.addEventListener('click', function () {
    const campos = formulario.querySelectorAll('input, select');
    const valores = {};

    campos.forEach(function (campo) {
        valores[campo.name] = campo.value;
    });

    const selectMedioTransporte = document.querySelector('#medioTransporte');
    valores[selectMedioTransporte.name] = selectMedioTransporte.options[selectMedioTransporte.selectedIndex].value;

    const selectTipoAlojamiento = document.querySelector('#tipoAlojamiento');
    valores[selectTipoAlojamiento.name] = selectTipoAlojamiento.options[selectTipoAlojamiento.selectedIndex].value;

    const selectTipoComidas = document.querySelector('#tipoComidas');
    valores[selectTipoComidas.name] = selectTipoComidas.options[selectTipoComidas.selectedIndex].value;

    localStorage.setItem('datosFormulario', JSON.stringify(valores));

    campos.forEach(function (campo) {
        campo.value = '';
    });

    mostrarDatosAlmacenados();
});

function mostrarDatosAlmacenados() {
    const datosAlmacenados = localStorage.getItem('datosFormulario');

    if (datosAlmacenados) {
        const valores = JSON.parse(datosAlmacenados);

        Object.keys(valores).forEach(function (nombreCampo) {
            const campo = formulario.querySelector(`[name="${nombreCampo}"]`);
            if (campo) {
                campo.value = valores[nombreCampo];
            }
        });
    }
}
mostrarDatosAlmacenados();
// Almacenamiento de datos en el formulario - Final

// Borrar los datos almacenados en el local storage y limpiar los campos del formulario - Inicio
const btnBorrar = document.getElementById('borrarDatosAlmacenados');
btnBorrar.addEventListener('click', function () {
    localStorage.clear();

    const campos = formulario.querySelectorAll('input');
    campos.forEach(function (campo) {
        campo.value = '';
    });
    location.reload();
});
// Borrar los datos almacenados en el local storage y limpiar los campos del formulario - Final