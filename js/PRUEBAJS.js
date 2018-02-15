var formElement=null;
var respuestaText=null;
var respuestaSelect=null;
var respuestaSelect1=null;
var respuestaSelectMultiple=null;
var respuestaSelectMultipleA=[];
var respuestaSelectMultiple1=[];
var respuestasCheckbox = [];
var respuestasCheckbox1 = [];
var respuestasRadio=[];
var respuestasRadio1=[];
var respuestaRadio=null;
var respuestaText1=null;
var respuestaSelectMultipleProfe=[];

//var timeout, min, seg=59, tiempo = $('#tiempo');
var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 


var second = 01;
  var minute = 10;
  
  setInterval(function(){
    if(second <10){
    document.getElementById("timer").innerHTML = "00:0"+ minute + ":0" + second;
  }else{
    document.getElementById("timer").innerHTML = "00:0"+ minute + ":" + second;
  }

    second--;

    if(second == 00){
      minute--;
      second = 59;
    }
    if(minute == 0 && second == 1){
      document.getElementById("timer").innerHTML = "Tiempo límite alcanzado";
      alert("Lo sentimos, si hubiera sido un T-REX ya estarías frito. GAME OVER");
    }
    if(minute <= -1) {
      document.getElementById("timer").innerHTML = " ";
    }
  }, 1000);


 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){






   inicializar();
   lasnotas();
   corregirText();
   corregirText1();
   corregirSelect();
   corregirSelect1();
  corregirCheckbox();
  corregirCheckbox1();
  //corregirSelectMultiple();

  corregirRadio();
  corregirRadio1();
   
   presentarNota();
   resultado();  

   onsubmit=window.location = "#tituloInput"; window.scrollTo(0,0);
  
   return false;
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "https://rawgit.com/gflorianom/FormularioExamen/master/questions.xml", true);
 xhttp.send();
}






//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 //NUMBER quiero que sea text
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput=xmlDoc.getElementsByTagName("title")[0].innerHTML;
 ponerDatosInputHtml(tituloInput);
 respuestaText=xmlDoc.getElementById("Pregunta01").getElementsByTagName("answer")[0].innerHTML;
 
// text1
  var tituloInput=xmlDoc.getElementsByTagName("title")[1].innerHTML;
 ponerDatosInputHtml1(tituloInput);
 respuestaText1=xmlDoc.getElementById("Pregunta02").getElementsByTagName("answer")[0].innerHTML;
 

 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[2].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("Pregunta03").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("Pregunta03").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect);

 respuestaSelect=xmlDoc.getElementById("Pregunta03").getElementsByTagName("answer")[0].innerHTML;

// SELECT1
  var tituloSelect=xmlDoc.getElementsByTagName("title")[3].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("Pregunta04").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("Pregunta04").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml1(tituloSelect,opcionesSelect);
 respuestaSelect1=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);

 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[4].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById('Pregunta07').getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById('Pregunta07').getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById('Pregunta07').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById('Pregunta07').getElementsByTagName("answer")[i].innerHTML;
 }
//CHECKBOX1
  var tituloCheckbox = xmlDoc.getElementsByTagName("title")[5].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById('Pregunta08').getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById('Pregunta08').getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml1(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById('Pregunta08').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById('Pregunta08').getElementsByTagName("answer")[i].innerHTML;
 }
//SELECT multiple
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[6].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("Pregunta05").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("Pregunta05").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectMultipleHtml(tituloSelect,opcionesSelect);
 respuestaSelectMultiple=xmlDoc.getElementById("Pregunta05").getElementsByTagName("answer")[0].innerHTML;
 respuestaSelectMultipleA=xmlDoc.getElementById("Pregunta05").getElementsByTagName("answer")[1].innerHTML;

 //SELECT multiple1
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[7].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("Pregunta06").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("Pregunta06").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectMultiple1Html(tituloSelect,opcionesSelect);
 respuestaSelectMultiple1=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);


 //RADIO
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[8].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById('Pregunta09').getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById('Pregunta09').getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosRadioHtml(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById('Pregunta09').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio[i]=xmlDoc.getElementById('Pregunta09').getElementsByTagName("answer")[i].innerHTML;
 }
  //RADIO1
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[9].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById('Pregunta10').getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById('Pregunta10').getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosRadio1Html(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById('Pregunta10').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio1[i]=xmlDoc.getElementById('Pregunta10').getElementsByTagName("answer")[i].innerHTML;
 }

}

//****************************************************************************************************
//implementación de la corrección
function corregirText(){
  var s=formElement.elements[0].value;
  var mayus=s.toUpperCase();
  var mayus2=respuestaText.toUpperCase();

  if(mayus==mayus2){

  darRespuestaHtml1("P1: CORRECTA");

   nota +=1;
  }
  else {
   
  darRespuestaHtml2("P1: INCORRECTA, la respuesta correcta es [National Basketball Association]");
  }
}
// corregir TEXT1
function corregirText1(){
  var r=formElement.elements[1].value;// posicion de el id osea la pregunta en el html
 var m=r.toUpperCase();
  var m2=respuestaText1.toUpperCase();
  if (m==m2) {
   darRespuestaHtml1("P2: CORRECTA");
   nota +=1;
  }
  else {
    darRespuestaHtml2("P2: INCORRECTA, la respuesta correcta es [James Naismith]");
  }
}
//corregir seelect
function corregirSelect(){

//respuestaSelect=xmlDoc.getElementById("Pregunta03").getElementsByTagName('answer')[0];

  var sel = formElement.elements[2];  
  if (sel.selectedIndex==respuestaSelect) {
   darRespuestaHtml1("P3: CORRECTA");
   nota +=1;
  }
  else darRespuestaHtml2("P3: INCORRECTA, la respuesta correcta es [6,75 metros]");
}
// select1
function corregirSelect1(){
//respuestaSelect=xmlDoc.getElementById("Pregunta04").getElementsByTagName('answer')[0];

  var sel = formElement.elements[3];  
  if (sel.selectedIndex==respuestaSelect1) {
   darRespuestaHtml1("P4: CORRECTA");
   nota +=1;
  }
  else darRespuestaHtml2("P4: INCORRECTA, la respuesta correcta es [2]");
}

//multiple
function corregirSelectMultiple(){
//respuestaSelect=xmlDoc.getElementById("Pregunta04").getElementsByTagName('answer')[0];

  var sel = formElement.elements[4];  
  if (sel.selectedIndex==respuestaSelectMultiple /*&& sel.selectedIndex==respuestaSelectMultipleA*/) {
   darRespuestaHtml1("P5: CORRECTA");
   nota +=1;
  }
  else darRespuestaHtml2("P5: INCORRECTA,");
}
// multiple 1
/*function corregirSelectMultiple1(){
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.sel1.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.sel1[i].selected) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestaSelectMultiple1.length; j++) {
     if (i==respuestaSelectMultiple1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestaSelectMultiple1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P6: CORRECTA");    
    } else {
     nota -=1.0/respuestaSelectMultiple1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P6: INCORRECTA, la respuesta correcta es [1995]");
    }   
   } 
  }
*/
function corregirRadio(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadio.length; j++) {
     if (i==respuestasRadio[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasRadio.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml1("P9: CORRECTA");    
    } else {
     nota -=1.0/respuestasRadio.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml2("P9: INCORRECTA, la respuesta correcta es [3,05 metros]");
    }   
   } 
  }
}

function corregirRadio1(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.POKEMON.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.POKEMON[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadio1.length; j++) {
     if (i==respuestasRadio1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasRadio1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml1("P10: CORRECTA");    
    } else {
     nota -=1.0/respuestasRadio1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml2("P10: INCORRECTA, la respuesta correcta es [5]");
    }   
   } 
  }
}

//checkbox
function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var limite = 0;
  var escorrecta = [];
  for (i = 0; i < f.RATON.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.RATON[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
      limite++;
    } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     
    }   
   } 
  }
  if(limite==2){
     darRespuestaHtml1("P7: CORRECTA");  

  }else{
    darRespuestaHtml2("P7: INCORRECTA, la respuesta correcta es [3 puntos], [2 puntos] y [1 punto]");
  }
}

//checkbox 1
function corregirCheckbox1(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var limite1 = 0;
  var escorrecta = [];
  for (i = 0; i < f.FLOR.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.FLOR[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox1.length; 
      //dividido por el número de respuestas correctas  
      limite1++; 
    
    } else {
     nota -=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
    
    }   
   } 
  }
  if(limite1==2){
       darRespuestaHtml1("P8: CORRECTA");   

  }else{
     darRespuestaHtml2("P8: INCORRECTA, la respuesta correcta es [Tablero], [Aro] y [Red]");
  }
}


//****************************************************************************************************
// poner los datos recibidos en el HTML
//text
function ponerDatosInputHtml(t){
 document.getElementById("tituloInput").innerHTML = t;
}
//text1
function ponerDatosInputHtml1(t){
 document.getElementById("tituloInput1").innerHTML = t;
}
//selectMultiple
function ponerDatosSelectMultipleHtml(t,opt){
  document.getElementById("tituloSelectMultiple").innerHTML=t;
  var select = document.getElementsByTagName("select")[2];// opciones
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}
//selecctmultiple1
function ponerDatosSelectMultiple1Html(t,opt){
  document.getElementById("tituloSelectMultiple1").innerHTML=t;
  var select = document.getElementsByTagName("select")[3];// opciones
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}
//select
function ponerDatosSelectHtml(t,opt){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];// opciones
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}
//select
function ponerDatosSelectHtml1(t,opt){
  document.getElementById("tituloSelect1").innerHTML=t;
  var select = document.getElementsByTagName("select")[1];// opciones y posibilidades
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}
//checkbox
function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "RATON_"+i);
    input.type="checkbox";
    input.name="RATON";
    input.id="RATON_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}
//checkbox1
function ponerDatosCheckboxHtml1(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv1');
 document.getElementById('tituloCheckbox1').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "FLOR_"+i);
    input.type="checkbox";
    input.name="FLOR";
    input.id="FLOR_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}
//radio
function ponerDatosRadioHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv2');
 document.getElementById('tituloRadio').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="radio";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}

//radio1
function ponerDatosRadio1Html(t,opt){
 var checkboxContainer3=document.getElementById('checkboxDiv3');
 document.getElementById('tituloRadio1').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "POKEMON_"+i);
    input.type="radio";
    input.name="POKEMON";
    input.id="POKEMON_"+i;;    
    checkboxContainer3.appendChild(input);
    checkboxContainer3.appendChild(label);
 }  
}

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}
//preguntas correctas
function darRespuestaHtml1(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.style.color = '#269900';
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}
//preguntas incorrectas
function darRespuestaHtml2(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.style.color = '#cc3300';
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}
function lasnotas(){
  darRespuestaHtml("Los resultados son:");
  darRespuestaHtml("");
}
function resultado(){
  darRespuestaHtml(" ");
  if(nota<5){
    darRespuestaHtml("Sabrás de fútbol, pero de teoría de la programación... mejor vete a casa.");
  }
  if(nota>4 && nota<7){
    darRespuestaHtml("Has aprobado, eres medio-listo, sigue mejorando.");
  }
  if(nota>6 && nota<10){
    darRespuestaHtml("Eres bastante aceptable en cuanto a teoría de programación, ponte a programar");
  }
  if(nota==10){
    darRespuestaHtml("Martín,¿Eres tú?... oh, nada, es broma, si ya lo sabes todo que haces aquí.");
  }

}
//****************************************************************************************************

 
