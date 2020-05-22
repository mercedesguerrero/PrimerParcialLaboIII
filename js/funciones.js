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
        //http.open("GET","http://localhost:3000/materias", true);

        document.getElementById('btnAlta').addEventListener('click',crearFormulario);
        
        traerPersonas();

    }

    var xhr;
    function traerPersonas() 
    {
        var url = "http://localhost:3000/materias"
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = traerManejador;
        xhr.open('GET',url,true);
        xhr.send();
    }

    function callback(){
        console.log("Llego respuesta", http.readyState);
    
        if(http.readyState===4 && http.status===200){
        
            console.log("tenemos un 200");

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

    function traerManejador()
    {
        if(xhr.readyState == 4)
        {
            if(xhr.status == 200)
            {
            document.getElementById('spinner').style.display = 'none';
            var lista = JSON.parse(xhr.responseText);
            actualizarTabla(lista);
            }
            else
            {
            //alert("Error: " + xhr.status + " - " + xhr.statusText);
            }
        }
        else
        {
            document.getElementById('spinner').style.display = 'block';    
        }
    }

    function postManejador()
    {
        if(xhr.readyState == 4)
        {
        if(xhr.status == 200)
        {
            document.getElementById('spinner').style.display = 'none';
            traerPersonajes();
        }
        else
        {
            //alert("Error: " + xhr.status + " - " + xhr.statusText);
        }
        }
        else
        {
        document.getElementById('spinner').style.display = 'block';    
        }
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
                filaNueva.addEventListener('click',crearFormulario);
                columna.appendChild(texto);
            }
        }
    }

    function actualizarTabla(lista) 
    {
        var tabla = document.createElement('table');
        tabla.id = "tablaLista";
        tabla = crearTabla(lista);
        //document.body.appendChild(tabla);
    }

    function consultarFormExistente()
    {
        for(hijos of document.body.children)
        {
            if(hijos.className == 'frmAlta')
            {
                return 0;
            }
        }
    }

    function crearFormulario()
    {
        if(consultarFormExistente()==0)
        {
            return -1;
        }
        var formulario = document.createElement('form');
        formulario.className = 'frmAlta';
        var tabla = document.createElement('table');
        var header = document.getElementById('theader');
        var i = 0;
        for(i = 0; i< header.children[0].children.length; i++)
        {
            if(header.children[0].children[i].innerText == 'nombre')
            {
                continue;
            }
            var tr = document.createElement('tr');
            var label = document.createElement('label');
            label.className = 'labelForm';
            label.innerText = header.children[0].children[i].innerText;
            var td = document.createElement('td');
            td.appendChild(label);
            tr.appendChild(td);
            var input = document.createElement('input');
            input.className = 'inputForm';
            if(this.id == 'tableRow')
            {
                input.value = this.children[i].innerText;
            }
            if(header.children[0].children[i].innerText == 'id')
            {
                input.disabled = true;
            }
            if(header.children[0].children[i].innerText == 'fechaFinal')
            {
                input.type = 'fechaFinal';
            }
            if(header.children[0].children[i].innerText == 'turno')
            {
                input.type = 'checkbox';
                input.id = "turno";
                input.name = 'turno';
            }
            
            var td = document.createElement('td');
            td.appendChild(input);
            tr.appendChild(td);
            tabla.appendChild(tr);
        }
        agregarRadioButtons(tabla,this);
        agregarBotonesRow(tabla,this);
        agregarBotonEnviar(tabla,this);
        formulario.appendChild(tabla);
        document.body.appendChild(formulario);
    }

    function agregarBotonEnviar(tabla,caller)
    {
        if(caller.id == 'btnAlta')
        {
            var tr = document.createElement('tr');
            var Enviar = document.createElement('button');
            Enviar.innerText = 'Dar de Alta';
            Enviar.type = 'button';
            Enviar.className = 'btnForm';
            Enviar.addEventListener('click',altaPersona);
            var td = document.createElement('td');
            td.appendChild(Enviar);
            tr.appendChild(td);
            agregarBotonCancelar(tabla,tr);
            tabla.appendChild(tr);
        }
    }

    function agregarBotonesRow(tabla, caller)
    {
        if(caller.id == 'tableRow')
        {
            var botones = ["Eliminar","Modificar","Cancelar"];
            for(var i = 0 ; i<botones.length;i++)
            {
                var tr = document.createElement('tr');
                var boton = document.createElement('button');
                boton.innerText = botones[i];
                boton.type = 'button';
                boton.className = 'btnForm';
                if(i == 0)
                {
                    boton.addEventListener('click',eliminacionPersonaje);
                }
                else if(i==1)
                {
                    boton.addEventListener('click',modificacionPersonaje);
                }
                else
                {
                    boton.addEventListener('click',cerrarForm);
                }
                var td = document.createElement('td');
                td.appendChild(boton);
                tr.appendChild(td);
                tabla.appendChild(tr);
            }
        }
    }

    function agregarBotonCancelar(tabla,tr)
    {
        var Cancelar = document.createElement('button');
        Cancelar.innerText = 'Cancelar';
        Cancelar.type = 'button';
        Cancelar.className = 'btnForm';
        Cancelar.addEventListener('click',cerrarForm);
        var td = document.createElement('td');
        td.appendChild(Cancelar);
        tr.appendChild(td);
    }

    function agregarRadioButtons(table,caller)
    {
        var labelValor = ["Lannister","Stark","Targaryen"];
        var id = ["Lannister","Stark","Targaryen"]; 
        var tr = document.createElement('tr');    
        for(var i = 0; i<labelValor.length;i++)
        {
            var label = document.createElement('label');
            label.className = 'labelForm';
            label.innerText = labelValor[i];
            tr.appendChild(label);
            var input = document.createElement('input');
            input.type = 'radio';
            input.id = id[i];
            input.name = 'casa';
            input.className = 'inputForm';
            cargarRadioButtons(caller,input);
            tr.appendChild(input);
        }
        table.appendChild(tr);
    }

    function cargarRadioButtons(caller,input)
    {
        if(caller.id == 'tableRow')
        {
            var casa = document.getElementsByName("casa");
            var casaseleccionada;

            for(var i = 0; i < casa.length; i++) {
            if(casa[i].checked)
                casaseleccionada = casa[i].value;
            }
        }
    }

    function agregarCheckbox(table,caller)
    {
        var tr = document.createElement('tr');    
        var label = document.createElement('label');
        label.className = 'labelForm';
        label.innerText = "turno";
        tr.appendChild(label);
        var input = document.createElement('input');

        input.setAttribute("id", "turno");

        input.type = 'checkbox';
        input.id = "turno";
        input.name = 'turno';
        input.className = 'inputForm';
        //cargarRadioButtons(caller,input);
        tr.appendChild(input);
        table.appendChild(tr);
    }


    function cerrarForm()
    {
        document.body.removeChild(document.getElementsByClassName('frmAlta')[0]);
    }

    function removerObjetos()
    {
        cerrarForm();
        document.body.removeChild(document.getElementById('tablaLista'));    
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

    function eliminacionPersonaje() 
    {
        var inputs = document.getElementsByClassName('inputForm');
        if(confirm("¿Desea eliminar a " + inputs[1].value +", " +inputs[2].value+"?"))
        {
            bajaPersonaje(inputs[0].value);
            removerObjetos();        
        }
    }

    function modificacionPersonaje(persona) 
    {
        var turno = document.getElementById('turno');

        if (turno.checked == true){
            turno=true;
        }else{
            turno=false;
        }

        var casa;
        if (document.getElementById('Stark').checked) {
            casa = "Stark";
        }
        else if (document.getElementById('Targaryen').checked) {
            casa = "Targaryen";
        }
        else if (document.getElementById('Lannister').checked) {
            casa = "Lannister";
        }

        var inputs = document.getElementsByClassName('inputForm');
        var persona = new Persona(inputs[1].value,inputs[2].value,inputs[3].value,casa, turno);
        persona.id = inputs[0].value;
        modificarPersonaje(persona);
        removerObjetos();
    }

    function Persona(nombre,cuatrimestre,fechaFinal,turno){
        this.nombre = nombre;
        this.cuatrimestre = cuatrimestre;
        this.fechaFinal = fechaFinal;
        this.turno = turno;
        this.active = "true";
    }

    function guardarPersona(persona) 
    {
        var body=
        {
            'objeto':persona
        }
        var url = "http://localhost:3000/nueva";
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = postManejador;
        xhr.open('POST',url,true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body));
    }

    function bajaPersona(id) 
    {
        var body=
        {
            'id':id
        }
        var url = "http://localhost:3000/eliminar";
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = postManejador;
        xhr.open('POST',url,true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body));
    }

    function modificarPersona(persona) 
    {
        var body=
        {
            'objeto':persona
        }
        var url = "http://localhost:3000/editar";
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = postManejador;
        xhr.open('POST',url,true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body));
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

