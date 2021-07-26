// -------- Variables de id recuperados de html -------
const _presupuesto = document.getElementById('presupuesto');
const _porcentaje = document.getElementById('porcentaje');
const _ingreso = document.getElementById('ingresos');
const _egreso = document.getElementById('egresos');
const _listaIngresos = document.getElementById('lista-ingresos');
const _listaEgresos = document.getElementById('lista-egresos');
const _formulario = document.forms['formulario'];
const _tipo = formulario['tipo'];
const _descripcion = formulario['descripcion'];
const _valor = formulario['valor'];


//------ Declaración de arrays --------

const ingresos = [
    new Ingreso('Sueldo', 2000.00),
    new Ingreso('Venta auto', 1500),
    new Ingreso('Venta casa', 3000)

];

const egresos = [
    new Egreso('Alquiler departamento', 1000),
    new Egreso('Ropa', 500),
    new Egreso('Nafta', 200)
];

//-------------- Funciones iniciales ---------------

let cargarApp = () =>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;

    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    } return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;

    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    } return totalEgreso;
}


let cargarCabecero = () =>{
    let presupuestoTotal = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();

    _presupuesto.innerHTML = formatoMoneda(presupuestoTotal);
    _porcentaje.innerHTML = formatoPorcentaje(porcentajeEgreso);
    _ingreso.innerHTML = formatoMoneda(totalIngresos());
    _egreso.innerHTML = formatoMoneda(totalEgresos());

}


// ------- Funciones para el formato de la moneda y el porcentaje ---------

const formatoMoneda = (valor) =>{
    return valor.toLocaleString('en-US', {style: 'currency', currency : 'USD', minimumFractionDigits: 2});
}

const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('en-US', {style:'percent', minimumFractionDigits: 2})
}

// -------- Funciones para la carga de los ingresos y egresos ---------

const cargarIngresos = () =>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    _listaIngresos.innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name='close-outline'
                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
    </div>`;
    return ingresoHTML;
}


const cargarEgresos = () =>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    _listaEgresos.innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) =>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
           <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name='close-outline'
                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
        </div>
    </div>`;
    return egresoHTML;
}


//------- Funciones para eliminar ingresos o egresos -------

const eliminarIngreso = (id) =>{
    let indiceDelete = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceDelete, 1);
    cargarCabecero();
    cargarIngresos();
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

//--------- Función para agregar nuevos ingresos o egresos a la lista --------

const agregarDato = () =>{
    if(_descripcion.value !== '' && _valor.value !== ''){
        if(_tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(_descripcion.value, +_valor.value));
            cargarCabecero();
            cargarIngresos();

        } else if(_tipo.value === 'egreso'){
            egresos.push(new Egreso(_descripcion.value, +_valor.value));
            cargarCabecero();
            cargarEgresos();

        }
    }
}