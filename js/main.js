const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

const btnLimpiar = document.getElementById("btnLimpiar"); // Asegúrate de tener un botón con este ID en tu HTML

let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;
let datos = new Array(); //Almacena los elementos de la tabla

function validarCantidad(){
    if (txtNumber.value.trim().length <= 0){
        return false;
    }//length<=0
    if(isNaN(txtNumber.value)){
        return false;
    }

    //Número
    //Mayor de 0
    if(Number(txtNumber.value)<=0){
        return false;
    }

    return true;
}//Validar cantidad

function getPrecio(){
    return Math.round((Math.random()*10000)) / 100;
}//getPrecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    //Bandera, al ser true permite agregar los datos a la tabla 
    let isValid = true;

    alertValidacionesTexto.innerHTML =" ";
    alertValidaciones.style.display="none";
    txtNumber.style.border="";
    txtName.style.border="";

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length < 3){
        txtName.style.border="solid medium red";
        alertValidacionesTexto.innerHTML ="<strong>El nombre del producto no es correcto</strong>";
        alertValidaciones.style.display="block";
        isValid =true;
    }//length>=3
    if(! validarCantidad()){
        txtNumber.style.border="solid medium red";
        alertValidacionesTexto.innerHTML +="<br/><strong>La cantidad no es correcta.</strong>";
        alertValidaciones.style.display="block";
        isValid = false;
    }//Validar cantidad
    
    if(isValid){
        cont ++;
        let precio = getPrecio();
        let row = `<tr>
        <td>${cont}</td>          
        <td>${txtName.value}</td>          
        <td>${txtNumber.value}</td>          
        <td>${precio}</td>          
        </tr>`;
    let elemento = {
        "cont":cont,
        "Nombre":txtName.value,
        "cantidad":txtNumber.value,
        "precio":precio,
    };

    datos.push(elemento);

    localStorage.setItem("datos", JSON.stringify(datos));
    
    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    
     costoTotal += precio * Number(txtNumber.value);
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    totalEnProductos += Number (txtNumber.value);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;
    let resumen = {
        "cont":cont,
        "totalEnProductos":totalEnProductos,
        "costoTotal":costoTotal,
    };
    localStorage.setItem("resumen", JSON.stringify(resumen));


    txtName.value="";
    txtNumber.value="";
    txtName.focus();
    }//Ifisvalid

});//btnAgregar.addEventListener click

btnLimpiar.addEventListener("click", function(event) {
    event.preventDefault();

    // Limpiar el resumen
    cont = 0;
    costoTotal = 0;
    totalEnProductos = 0;

    // Actualizar los elementos del DOM
    contadorProductos.innerText = cont;
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    productosTotal.innerText = totalEnProductos;

    // Limpiar la tabla
    cuerpoTabla.innerHTML = "";

    // Limpiar los campos de entrada
    txtName.value = "";
    txtNumber.value = "";

    // Ocultar alertas
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    // Limpiar localStorage
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");

    // Enfocar el campo de nombre
    txtName.focus();
});

window.addEventListener("load", function(event){
    event.preventDefault();

    if(this.localStorage.getItem("datos")!=null){
    datos = JSON.parse (this.localStorage.getItem("datos"));
    }//datos != null

    datos.forEach((d)=>{
        let row = `<tr>
        <td>${d.cont}</td>
        <td>${d.Nombre}</td>
        <td>${d.cantidad}</td>
        <td>${d.precio}</td>`
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });




    if(this.localStorage.getItem("resumen")!=null){
    let resumen = JSON.parse(this.localStorage.getItem("resumen"));
    costoTotal = resumen.costoTotal;
    totalEnProductos = resumen.totalEnProductos;
    cont = resumen.cont;
    }//resumen != null

    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;
});//window.addEventListener load