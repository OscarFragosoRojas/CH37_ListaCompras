// El código va aquí -> 
let btnAgregar= document.getElementById("btnAgregar");
let btnClear=document.getElementById("btnClear");
let txtNombre= document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tablaListaCompras= document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let precio=0;
let isValid=true;
let contador=0;
let costoTotal=0;
let totalEnProductos=0;

let datos = new Array();

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal =document.getElementById ("productosTotal");
let precioTotal = document.getElementById("precioTotal");

btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value="";
    txtNumber.value="";
    contador=0;
    costoTotal=0;
    totalEnProductos=0;
    precio=0;
    contadorProductos.innerText = contador;
    productosTotal.innerText= totalEnProductos;
    precioTotal.innerText = `$${costoTotal.toFixed(2)}`;
    cuerpoTabla.innerHTML="";
    
    localStorage.setItem("contadorProductos",contador);
    localStorage.setItem("totalEnProductos",totalEnProductos);
    localStorage.setItem("costoTotal",costoTotal);

    localStorage.removeItem("datos");
    datos=new Array();
    cuerpoTabla.innerHTML="";
        
    txtNombre.focus();
});

function validadCantidad(){
    if(txtNumber.value.length==0){
        return false;
    }//Length
    if (isNaN(txtNumber.value)){
        return false;
    }//IsNaN
    if(Number(txtNumber.value)<=0){
        return false;
    }//#positivos
    return true;
}

function getPrecio(){
   return parseInt((Math.random() *75)*100)/100;
}//Obtener precio aleatorio

btnAgregar.addEventListener("click",function(event){
    event.preventDefault();
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    isValid=true;
    txtNombre.value = txtNombre.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtNombre.value.length<3){
        alertValidacionesTexto.insertAdjacentHTML("beforeend",`El <strong>NOMBRE</strong> NO es correcto</br>`);
        alertValidaciones.style.display="block";
        txtNombre.style.border="solid red thin"
        isValid=false;
    }//validacion
    if (! validadCantidad()){
        alertValidacionesTexto.insertAdjacentHTML("beforeend",`La <strong>CANTIDAD</strong> NO es correcto</br>`);
        alertValidaciones.style.display="block";
        txtNumber.style.border="solid red thin"
        isValid=false;
    }

    if(isValid){
        contador++;
        precio = getPrecio();
        row=`<tr>
            <td>${contador}</td>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </tr>
        `;
        let elemento=`{"id":${contador},
                       "nombre":"${txtNombre.value}",
                       "cantidad":${txtNumber.value},
                       "precio":${precio}}`;

        datos.push(JSON.parse(elemento));
        console.log(datos);
        localStorage.setItem("datos",JSON.stringify(datos));        

        cuerpoTabla.insertAdjacentHTML("beforeend",row)

        contadorProductos.innerText = contador;
        totalEnProductos+=parseFloat(txtNumber.value);

        productosTotal.innerText=totalEnProductos;

        costoTotal +=precio * parseFloat(txtNumber.value);
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;

        localStorage.setItem("contadorProductos",contador);
        localStorage.setItem("totalEnProductos",totalEnProductos);
        localStorage.setItem("costoTotal",costoTotal);

        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();
        //Renglones de la tabla
    }//Validacion para crear precio
});

window.addEventListener("load",function(event){
    event.preventDefault();
    if (this.localStorage.getItem("contadorProductos") !=null){
        contador = this.localStorage.getItem("contadorProductos");
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
        costoTotal = Number(this.localStorage.getItem("costoTotal"));

        contadorProductos.innerText = contador;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText =`$ ${costoTotal.toFixed(2)}`;
    }
    if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) =>{
            let=   row=`<tr>
                 <td>${r.id}</td>
                 <td>${r.nombre}</td>
                 <td>${r.cantidad}</td>
                 <td>${r.precio}</td>
                </tr>`;
                cuerpoTabla.insertAdjacentHTML("beforeend",row);
        });
    }
});