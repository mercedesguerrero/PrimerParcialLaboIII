
var http= new XMLHttpRequest();
var btnAlta;
var divFrm;
var frmAlta;
var divInfo;
var btnCancelar;

var lista;

window.onload= inicializar;

    function inicializar()
    {
        // var btn= document.getElementById("btnEnviar");
        // btn.onclick= login;

        http.onreadystatechange= callback;
        http.open("GET","http://localhost:3000/personas", true);
        
        document.getElementById('btnAlta').addEventListener('click',crearFormulario);
        traerPersonas();

        http.send();
    }

    function callback(){
        console.log("Llego respuesta", http.readyState);
    
        if(http.readyState===4 && http.status===200){
        
            console.log("tenemos un 200");

            crearTabla(JSON.parse(http.responseText));

            //document.write(http.responseText);
            // if(http.responseText){
            //     alert("Login ok");
            // }else{
            //     alert("Error!");
            // }
        }else{
            console.log("Tenemos un error!"); 
        }
        console.log("Termino llamada");
    }

    function crearTabla(personas) {
        var div = document.getElementById("info");
        var tabla = document.createElement("table");
        //tabla.setAttribute("border", "1px");
        div.appendChild(tabla, personas);
        crearCabecera(tabla, personas);
        crearCeldas(tabla, personas);
    }
    
    function crearCabecera(tabla, personas){
        //tr= table row (fila)
        var filaCabecera = document.createElement("tr");
        var atributo;
        var columna;
        var texto;
    
        tabla.appendChild(filaCabecera);
    
        for(atributo in personas[0])
        {
            console.log(atributo);//atributo es la clave-- usuarios[prop] devuelve el valor
    
            columna = document.createElement("th");
            filaCabecera.appendChild(columna);
            texto = document.createTextNode(atributo);
            columna.appendChild(texto);
        }
    }
    
    function crearCeldas(tabla, personas){
    
        for(var i = 0; i < personas.length; i++)
        {
            var filaNueva = document.createElement("tr");
            var atributo;
            var columna;
            var texto;
            filaNueva.addEventListener("dblclick", clickEnTabla);
            tabla.appendChild(filaNueva);

            for(atributo in personas[i])
            {
                columna = document.createElement("td");
                filaNueva.appendChild(columna);
                texto = document.createTextNode(personas[i][atributo]);
                columna.appendChild(texto);
            }
        }
    }

    function clickEnTabla(e){
        console.log("Llego a click en Tabla", http.readyState);
    
        if(http.readyState===4 && http.status===200){
        
            console.log("tenemos un 200");

            var trClick= e.target.parentNode;
            var atributo;

            for(atributo in personas[i])
            {
                trClick.childNodes[i].innerHTML;
            }

            // document.getElementById("id").value= trClick.childNodes[0].innerHTML;
            // document.getElementById("nombre").value= trClick.childNodes[1].innerHTML;
            // document.getElementById("apellido").value= trClick.childNodes[2].innerHTML;
            // document.getElementById("fecha").value= trClick.childNodes[3].innerHTML;
            //la fecha hay que parsearla al formato de la tabla 

            console.log(trClick.childNodes[0].textContent);

            
        }else{
            console.log("Tenemos un error!"); 
        }
        console.log("Termino llamada");
    }

    // function ejecutarPost(){

    //     var httpPost= new XMLHttpRequest();

    //     httpPost.onreadystatechange= function(){

    //         if(httpPost.readyState===4 && httpPost.status===200){

    //             alert(httpPost.responseText);
    //         }

    //         httpPost.open("POST","http://localhost:3000/nuevapersona", true);
    //         httpPost.setRequestHeader("Content-Type","application/json");//para saber que va a viajar en el body, en este caso json
    //         var json= '{"nombre":"Mercedes","apellido":"Guerrero","fecha":"2019-05-01","telefono":463782991}'
    //         httpPost.send(JSON.stringify(json));

    //     }
    // }

