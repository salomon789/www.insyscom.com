//variable que mantienen el estado visible del carrito
var carritoVisible = false;

//esperamos que todos los elementos de la pagina se carguen para continuar con el scrip
if(document.readyState=='loading'){ 
    document.addEventListener('DOMContentLoaded',ready)
 }else{
    ready();
  }

  function ready(){
   //agregamos funcionalidad a los botones del carrito 
   var botonEliminarItem = document.getElementsByClassName('btn-eliminar');
   for(var i=0; i < botonesEliminarItem.length;i++){
    var button = botonesEliminarItem(i);
    button.addEventListener('click' , eliminarItemCarrito);
   }

   //Agrego funcionalidad al boton sumar cantidad
   var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
   for(var i=0; i < botonesSumarCantidad.length;i++){ 
       var button = botonesSumarCantidad(i); 
       button.addEventListener('click' ,sumarCantidad);
    }

      //Agrego funcionalidad al boton restar cantidad
   var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
   for(var i=0; i < botonesRestarCantidad.length;i++){ 
       var button = botonesRestarCantidad(i); 
       button.addEventListener('click' , restarCantidad);
    }

//Agrego funcionalidad a los botones Agregar al carrito
var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
for (var i=0; i<botonesAgregarAlCarrito.length;i++){
    var button = botonesAgregarAlCarrito(i);
    button.addEventListener('click',agregarAlcarritoClicked);
}

//Agregar funcionalidad al boton pagar
document.getElementsByClassName('btn-pagar')(0).addEventListener('click',pagarClicked)
}


//Elimina el item seleccionado del carrito
function eliminarItemCarrito(event){ 
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();


    //Actualizamos el total del carrito una vez que hemos eliminado un item 
    actualizarTotalCarrito(); 

    //la siguiente funcion controla si hay elementos en el carrito una vez que se elimino
    //si no hay debe ocultar el carrito
    
    ocultarcarrito();
}

 //Actualizamos el total del carrito
 function actualizarTotalCarrito(){ 
//seleccionamos el contenedor de carritos
var carritoContenedor = document.getElementsByClassName('carrito') (0);
var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
var total = 0;


//recorremos cada elemento del carrito para actualizar el total
for (var i=0; i < carritoItems.length;i++){
    var item = carritoItems(i);
    var precioElemento = item.getElementsByClassName('carrito-item-precio')(0);
    console.log(precioElemento);
 //Quitamos el simbolo precio y el punto de milesima
 var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.',''));    
 console.log(precio);   
 var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')(0);
  var cantidad = cantidadItem.value;
  console.log(cantidad);
  total = total + (precio * cantidad);
}
total = Math.round(total*100)/100;
document.getElementsByClassName('carrito-precio-total')(0).innerText = '$' + total.toLocaleString("es") + ',00';
}

function ocultarcarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')(0);
    if(carritoItems.chidElementCount==0){
        var carrito = document.getElementsByClassName('carrito')(0);
        carrito.style.marginRight = '-100%';
        carrito.style.opacity='0';
        carritoVisible = false;

        //ahora maximizo el contenedor de los elementos
        var items = document.getElementsByClassName('contenedor-items')(0);
        items.style.width = '100%';
    }
}

//Aumento en uno la cantidad del elemento seleccionado
function sumarcantidad(event){
    var buttonclicked = event.target;
    var selector = buttonclicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')(0).value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')(0).value = cantidadActual;
    //actualizamos el total
    actualizarTotalCarrito();
}

function restarcantidad(event){
    var buttonclicked = event.target;
    var selector = buttonclicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')(0).value;
    console.log(cantidadActual);
    cantidadActual--;

    //controlamos que sea menor que uno
    if (cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')(0).value = cantidadActual;
        //actualizamos el total
        actualizarTotalCarrito();
    }

    }

    function agregarAlcarritoClicked(event){
        var button = event.target;
        var item = button.parentElement;
        var titulo = item.getElementsByClassName('titulo-item')(0).innerText;
        console.log(titulo);
        var precio = item.getElementsByClassName('precio-item')(0).innerText;
        var imagenSrc = item.getElementsByClassName('img-item')(0).src;
        console.log(imagenSrc);

        //la siguiente funcion agrega el elemento al carrito. Le mando por parametros los valores
        agregarItemAlcarrito(titulo,precio, imagenSrc) 

      //hacemos visible el carrito cuando agregamos por primera vez
      hacerVisibleCarrito();
     }
    function agregarAlcarrito(titulo, precio, imagenSrc){
     var item = document.createElement('div');
     item.classList.add = 'item';
     var itemsCarrito = document.getElementsByClassName('carrito-items')(0);

     //Vamos a controlar que el item que esta ingresando no se encuentra ya en el carrito
      var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
      for (var i=0; i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito(i).innerText==titulo) {
           alert("El item ya se encuentra en el carrito");
           return; 
        }
    }

       var itemCarritoContenido = `
       <div class="carrito-item">
       <img src="$(imagenSrc)" alt=""  width="80px">
       <div class="carrito-item-detalles">
           <span class="carrito-item-titulo">$(titulo)</span>
           <div class="selector-cantidad">
               <i class="fa-solid fa-minus restar-cantidad"></i>
           </div>
           <input type="text" value="1" class="carrito-item-cantidad" disabled>
           <i class="fa-solid fa-plus sumar-cantidad"></i>
       </div>
        <span class="carrito-item-precio">$(precio)</span>
       </div>
        <span class="btn-eliminar">
       <i class="fa-solid fa-trash"></i>
        </span>
       </div>
       `

       item.innerHTML = itemCarritoContenido;
       itemsCarrito.append(item);

       //Agregamos la funcionalidad Eliminar del nuevo item  
       item.getElementsByClassName('btn-eliminar')(0).addEventListener('click',eliminarItemCarrito);
      
    //Agregamos la funcionalidad  de sumar del nuevo item
       var botonesSumarCantidad= item.getElementsByClassName('sumar-cantidad')(0);
       botonesSumarCantidad.addEventListener('click',sumarCantidad);   


           //Agregamos la funcionalidad  de restar del nuevo item
           var botonesRestarCantidad = item.getElementsByClassName('restar-cantidad')(0);
           botonesRestarCantidad.addEventListener('click',restarCantidad);
     }

     function pagarClicked(event){
        alert("gracias por su compra");
        //Elimina todos los elementos del carrito
        var carritoItems = document.getElementsByClassName('carrito-items') (0);
        while(carritoItems.hasChildNodes()){ 
            carritoItems.removeChid(carritoItems.firsChild);
      }
      actualizarTotalCarrito();

      //funcion que hace ucultar el carrito
      ocultarcarrito()
      }

      function hacerVisibleCarrito(){
        carritoVisible = true;
        var carrito = document.getElementsByClassName('carrito')(0);
        carritostyle.marginRight = '0';
        carrito.style.opacity = '1';

        var items = document.getElementsByClassName('contenedor-items')(0);
        items.style.width = '60%';

      }