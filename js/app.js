//variables
const miPresusupuesto = prompt('Ingrese su Presuspuesto Semanal');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;







//clases 

class presuspuesto{
    constructor(presuspuesto){
        this.presuspuesto = Number(presuspuesto);
        this.restante = Number(presuspuesto);
    }
    //calculo del presupuesto restante 
    presuspuestoRestante(cantidad = 0 ){
        return this.restante -= Number(cantidad);

    }
}

//clase de interfaz recoje todo lo del html 
class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //Inserto en el HTML 
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');


        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));


        document.querySelector('.primario ').insertBefore(divMensaje, formulario);


        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        },3000);
    }
    //insertar gasto a la lista 
    agregarGasto(nombre, cantidad){
        const gastos = document.querySelector('#gastos ul');

        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        li.innerHTML = `
            ${nombre}
           <span class="badge badge-primary badge-pill"> $ ${cantidad}</span>
        `;
        //agregar al html
        gastos.appendChild(li);
        
    }
    //comprueba el presupeusto restante
    presuspuestoRestante(cantidad){
        const restante = document.querySelector('span#restante'); 
        const presupuestoRestanteUsuario = cantidadPresupuesto.presuspuestoRestante(cantidad)
        restante.innerHTML = `${presupuestoRestanteUsuario}`;

        this.comprobarPresupuesto();
    }
    comprobarPresupuesto() {
        const presupuestoTotal = cantidadPresupuesto.presuspuesto;
        const presuspuestoRestante = cantidadPresupuesto.restante;
        

        //comprobar el cincuentaporciento del gsto
        if((presupuestoTotal/4)> presuspuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');

        }else if((presupuestoTotal / 2) > presuspuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning')
        }
    }
}





//eventlisteners
document.addEventListener('DOMContentLoaded', function(){
    if(miPresusupuesto === null || miPresusupuesto === '' ){
        window.location.reload();

    }else{
       cantidadPresupuesto = new presuspuesto(miPresusupuesto);
        //instancio la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presuspuesto);
    }
    //cambio de color el presupuesto restante 
    

});

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    //leer del formulario
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidaGasto = document.querySelector('#cantidad').value;
    //instanciar la interfaz
    const ui = new Interfaz();


    //comprobar que los campos no esten vacios 
    if(nombreGasto === '' || cantidaGasto === ''){
        ui.imprimirMensaje('Hubo un Error', 'error')   
    }else{
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGasto(nombreGasto, cantidaGasto);
        ui.presuspuestoRestante(cantidaGasto);

    }
});