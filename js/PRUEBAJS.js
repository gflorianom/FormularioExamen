var formElement=null;
var respuestaText=null;
var respuestaSelect=null;
var respuestaSelect1=null;
var respuestaSelectMultiple=[];
var respuestaSelectMultipleA=[];
var respuestaSelectMultiple1=[];
var respuestasCheckbox = [];
var respuestasCheckbox1 = [];
var respuestasRadio=[];
var respuestasRadio1=[];
var respuestaRadio=null;
var respuestaText1=null;
var xmlDoc=null;
var xslDoc=null;
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
   if(comprobar()){
   lasnotas();
   corregirText();
   corregirText1();
   corregirSelect();
   corregirSelect1();
  corregirCheckbox();
  corregirCheckbox1();
  corregirSelectMultiple();
  corregirSelectMultiple1();

  corregirRadio();
  corregirRadio1();
   
   presentarNota();
   resultado();  

   onsubmit=window.location = "#tituloInput"; window.scrollTo(0,0);
 }
  
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
 var tituloInput=xmlDoc.getElementsByTagName("title")[2].innerHTML;
 ponerDatosInputHtml(tituloInput);
 respuestaText=xmlDoc.getElementById("CJP003").getElementsByTagName("answer")[0].innerHTML;
 
// text1
  var tituloInput=xmlDoc.getElementsByTagName("title")[3].innerHTML;
 ponerDatosInputHtml1(tituloInput);
 respuestaText1=xmlDoc.getElementById("CJP004").getElementsByTagName("answer")[0].innerHTML;
 

 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta

  var tituloSelect=xmlDoc.getElementsByTagName("title")[8].innerHTML;
  var xpath="/questions/question[@id='CJP009']/option";
 var nodesSelect =  xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectHtml(tituloSelect,nodesSelect);
 respuestaSelect=xmlDoc.getElementById("CJP009").getElementsByTagName("answer")[0].innerHTML;
 

// SELECT1
 
var tituloSelect1=xmlDoc.getElementsByTagName("title")[9].innerHTML;
  var xpath="/questions/question[@id='CJP010']/option";
  var nodesSelect1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectHtml1(tituloSelect1,nodesSelect1);
 respuestaSelect1=xmlDoc.getElementById("CJP010").getElementsByTagName("answer")[0].innerHTML;
 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[0].innerHTML;
var xpath="/questions/question[@id='CJP001']/option";
 var nodesCheckbox = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
 
 ponerDatosCheckboxHtml(tituloCheckbox,nodesCheckbox);
 var nres = xmlDoc.getElementById('CJP001').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById('CJP001').getElementsByTagName("answer")[i].innerHTML;
 }
//CHECKBOX1
  var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[1].innerHTML;
var xpath="/questions/question[@id='CJP002']/option";
 var nodesCheckbox1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
 
 ponerDatosCheckboxHtml1(tituloCheckbox1,nodesCheckbox1);
 var nres1 = xmlDoc.getElementById('CJP002').getElementsByTagName('answer').length;
 for (i = 0; i < nres1; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById('CJP002').getElementsByTagName("answer")[i].innerHTML;
 }
//SELECT multiple
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[4].innerHTML;
 var xpath="/questions/question[@id='CJP005']/option";
 var nodesMultiple= xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectMultipleHtml(tituloSelect,nodesMultiple);
 for (i = 0; i < nres; i++) { 
  respuestaSelectMultiple[i]=xmlDoc.getElementById('CJP005').getElementsByTagName("answer")[i].innerHTML;
 }
 

 //SELECT multiple1
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[5].innerHTML;
var xpath="/questions/question[@id='CJP006']/option";
 var nodesMultiple1= xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
 
 ponerDatosSelectMultiple1Html(tituloSelect,nodesMultiple1);
 for (i = 0; i < nres; i++) { 
  respuestaSelectMultiple1[i]=xmlDoc.getElementById('CJP006').getElementsByTagName("answer")[i].innerHTML;
 }


 //RADIO
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[6].innerHTML;
var xpath="/questions/question[@id='CJP007']/option";
 var nodesRadio = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
  
 ponerDatosRadioHtml(tituloCheckbox,nodesRadio);
 var nres = xmlDoc.getElementById('CJP007').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio[i]=xmlDoc.getElementById('CJP007').getElementsByTagName("answer")[i].innerHTML;
 }
  //RADIO1
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[7].innerHTML;
var xpath="/questions/question[@id='CJP008']/option";
 var nodesRadio1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 

 ponerDatosRadio1Html(tituloCheckbox,nodesRadio1);
 var nres = xmlDoc.getElementById('CJP008').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio1[i]=xmlDoc.getElementById('CJP008').getElementsByTagName("answer")[i].innerHTML;
 }

}

//****************************************************************************************************
//implementación de la corrección
function corregirText(){
  var s=formElement.elements[0].value;
  var mayus=s.toUpperCase();
  var mayus2=respuestaText.toUpperCase();

  if(mayus==mayus2){

  //if (s=="Conectividad de bases de datos Java" || s=="conectividad de bases de datos java") {
   darRespuestaHtml1("P1: CORRECTA");

   nota +=1;
  }
  else {
   
  darRespuestaHtml2("P1: INCORRECTA, la respuesta correcta es [Conectividad de bases de datos Java]");
  }
}
// corregir TEXT1
function corregirText1(){
  var r=formElement.elements[1].value;// posicion de el id osea la pregunta en el html
  //var s=xmlDoc.getElementById('CJP004').getElementsByTagName('answer');
 var m=r.toUpperCase();
  var m2=respuestaText1.toUpperCase();
  if (m==m2) {
   darRespuestaHtml1("P2: CORRECTA");
   nota +=1;
  }
  else {
    darRespuestaHtml2("P2: INCORRECTA, la respuesta correcta es [Apple]");
  }
}
//corregir seelect
function corregirSelect(){

//respuestaSelect=xmlDoc.getElementById("CJP010").getElementsByTagName('answer')[0];

  var sel = formElement.elements[2];  
  if (sel.selectedIndex==respuestaSelect) {
   darRespuestaHtml1("P3: CORRECTA");
   nota +=1;
  }
  else darRespuestaHtml2("P3: INCORRECTA, la respuesta correcta es [Oracle]");
}
// select1
function corregirSelect1(){
//respuestaSelect=xmlDoc.getElementById("CJP009").getElementsByTagName('answer')[0];

  var sel = formElement.elements[3];  
  if (sel.selectedIndex==respuestaSelect1) {
   darRespuestaHtml1("P4: CORRECTA");
   nota +=1;
  }
  else darRespuestaHtml2("P4: INCORRECTA, la respuesta correcta es [System.out.println()]");
}

//multiple
function corregirSelectMultiple(){
//respuestaSelect=xmlDoc.getElementById("CJP009").getElementsByTagName('answer')[0];
var sel=[];
   sel = formElement.elements[6];  
  if (sel.selectedIndex==respuestaSelectMultiple /*&& sel.selectedIndex==respuestaSelectMultipleA*/) {
   darRespuestaHtml1("P7: CORRECTA");
   nota +=1;
  }
  else darRespuestaHtml2("P7: INCORRECTA, la respuesta correcta es [Aplicacion Web unica] y [Aplicacion Web de una sola página]");

}

function corregirSelectMultiple1(){
//respuestaSelect=xmlDoc.getElementById("CJP009").getElementsByTagName('answer')[0];

  var sel = formElement.elements[7];  
  if (sel.selectedIndex==respuestaSelectMultiple1 /*&& sel.selectedIndex==respuestaSelectMultipleA*/) {
   darRespuestaHtml1("P8: CORRECTA");
   nota +=1;
  }
  else darRespuestaHtml2("P8: INCORRECTA, la respuesta correcta es [Java] y [C++]");
}

/*function corregirSelectMultiple(){
var f=formElement;
  var limite = 0;
  var escorrecta = [];
  for (i = 0; i < f.value.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.value[i].selected) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestaSelectMultiple.length; j++) {
     if (i==respuestaSelectMultiple[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestaSelectMultiple.length;  //dividido por el número de respuestas correctas   
      limite++;
    } else {
     nota -=1.0/respuestaSelectMultiple.length;  //dividido por el número de respuestas correctas   
     
    }   
   } 
  }
  if(limite==2){
     darRespuestaHtml1("P5: CORRECTA");  

  }else{
    darRespuestaHtml2("P5: INCORRECTA, la respuesta correcta es [Es un framework de javaScript para las aplicaciones de SPA] y [Es un framework de JS]");
  }
}

*/


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
     darRespuestaHtml("P8: CORRECTA");    
    } else {
     nota -=1.0/respuestaSelectMultiple1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P8: INCORRECTA, la respuesta correcta es [1995]");
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
     darRespuestaHtml2("P9: INCORRECTA, la respuesta correcta es [1995]");
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
     darRespuestaHtml2("P10: INCORRECTA, la respuesta correcta es [Software que permite ejecutar programas Java]");
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
     darRespuestaHtml1("P5: CORRECTA");  

  }else{
    darRespuestaHtml2("P5: INCORRECTA, la respuesta correcta es [Es un framework de javaScript para las aplicaciones de SPA] y [Es un framework de JS]");
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
       darRespuestaHtml1("P6: CORRECTA");   

  }else{
     darRespuestaHtml2("P6: INCORRECTA, la respuesta correcta es [1.500€] y [1583$]");
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
function ponerDatosSelectMultipleHtml(t,nodes){
  document.getElementById("tituloSelectMultiple").innerHTML=t;
  var select = document.getElementsByTagName("select")[2];// opciones
  var result =nodes.iterateNext();
  var i=0;
     while (result) { 
    var option = document.createElement("option");
    option.text = result.innerHTML;
    option.value=i+1;i++;
    select.options.add(option);
      result = nodes.iterateNext();
 }  
}
//selecctmultiple1
function ponerDatosSelectMultiple1Html(t,nodes){
  document.getElementById("tituloSelectMultiple1").innerHTML=t;
  var select = document.getElementsByTagName("select")[3];// opciones
  var result =nodes.iterateNext();
  var i=0;
     while (result) {
    var option = document.createElement("option");
    option.text = result.innerHTML;
    option.value=i+1;i++;
    select.options.add(option);
      result = nodes.iterateNext();
 }  
}


/*
function ponerDatosSelectHtml(t,nodesSelect){
  var txt="";

  //var xmlDoc = dadesXml.responseXML;
  document.getElementById("tituloSelect").innerHTML=t;
  var xpath="/questions/question[@id='CJP010']/option";
  var nodes = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
  var result = nodes.iterateNext();
    i=0;
  while (result) {
    var option = document.createElement("option");
    option.text = result.innerHTML;
    option.value=i+1; i++;
    select.options.add(option);
       txt += result.innerHTML + "<br>";
       result = nodes.iterateNext();
      
  } 
  document.getElementById('option').innerHTML = txt;

}
*/
//select

function ponerDatosSelectHtml(t,nodes){
  var txt="";
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];// opciones
  var result =nodes.iterateNext();
  var i=0;
     while (result) {
    var option = document.createElement("option");
    option.text = result.innerHTML;
    option.value=i+1; i++;
    select.options.add(option);
       txt += result.innerHTML + "<br>";
       result = nodes.iterateNext();
 }  

}

//select
function ponerDatosSelectHtml1(t1,nodes1){
  var txt="";
  document.getElementById("tituloSelect1").innerHTML=t1;
  var select = document.getElementsByTagName("select")[1];// opciones y posibilidades
 var result =nodes1.iterateNext();
 var i=0;
    while (result) {
    var option = document.createElement("option");
    option.text = result.innerHTML;
    option.value=i+1; i++;
    select.options.add(option);
       txt += result.innerHTML + "<br>";
       result = nodes1.iterateNext();
 }  

}
//checkbox
function ponerDatosCheckboxHtml(t,nodes){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
 var result=nodes.iterateNext();
 i=0;
 while(result){
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=result.innerHTML;
    label.setAttribute("for", "RATON_"+i);
    input.type="checkbox";
    input.name="RATON";
    input.id="RATON_"+i;i++;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    result=nodes.iterateNext();
 }  
}
//checkbox1
function ponerDatosCheckboxHtml1(t,nodes){
 var checkboxContainer=document.getElementById('checkboxDiv1');
 document.getElementById('tituloCheckbox1').innerHTML = t;
 var result=nodes.iterateNext();
 i=0;
while(result){ 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=result.innerHTML;
    label.setAttribute("for", "FLOR_"+i);
    input.type="checkbox";
    input.name="FLOR";
    input.id="FLOR_"+i;i++;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    result=nodes.iterateNext();
 }  
}
//radio
function ponerDatosRadioHtml(t,nodes){
 var checkboxContainer=document.getElementById('checkboxDiv2');
 document.getElementById('tituloRadio').innerHTML = t;
var result=nodes.iterateNext();
 i=0;
while(result){ 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=result.innerHTML;
    label.setAttribute("for", "color_"+i);
    input.type="radio";
    input.name="color";
    input.id="color_"+i;i++;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    result=nodes.iterateNext();
 }  
}

//radio1
function ponerDatosRadio1Html(t,nodes){
 var checkboxContainer3=document.getElementById('checkboxDiv3');
 document.getElementById('tituloRadio1').innerHTML = t;
var result=nodes.iterateNext();
 i=0;
while(result){
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=result.innerHTML;
    label.setAttribute("for", "POKEMON_"+i);
    input.type="radio";
    input.name="POKEMON";
    input.id="POKEMON_"+i;i++;    
    checkboxContainer3.appendChild(input);
    checkboxContainer3.appendChild(label);
    result=nodes.iterateNext();
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
   darRespuestaHtml("Nota: "+nota+" / 10");
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

 function comprobar(){
   var f=formElement;
   var checked=false;
   var checked2=false;
   var checked3=false;
   var checked4=false;
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color[i].checked) checked=true;
   }
     for (i = 0; i < f.FLOR.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.FLOR[i].checked) checked2=true;
   }
     for (i = 0; i < f.RATON.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.RATON[i].checked) checked3=true;
   }
     for (i = 0; i < f.POKEMON.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.POKEMON[i].checked) checked4=true;
   }

 var sel=document.getElementById('sel');
 
   if ((typeof(sel))== undefined || (sel==null)) {
    f.elements[6].focus();
    alert("Selecciona una opción multiple1");
    return false;
   } 
  
  var sel1=document.getElementById('sel1');
   if ((typeof(sel1))== undefined || (sel1==null)) {
   f.elements[7].focus();
    alert("Selecciona una opción multiple2");
    return false;
   }  


   if (f.elements[0].value=="") {
    //recomendamos focus para input y select "normal", scrollIntoView para el título de select múltiple, radio y checkbox
    f.elements[0].focus(); 
    alert("Escribe una respuesta");
    return false;
   } if (f.elements[1].value=="") {
    //recomendamos focus para input y select "normal", scrollIntoView para el título de select múltiple, radio y checkbox
    f.elements[1].focus(); 
    alert("Escribe una respuesta");
    return false;
   } else if (f.elements[1].selectedIndex==0) {
    f.elements[2].focus();
    alert("Selecciona una opción");
    return false;
   } if (!checked) {    
    document.getElementsByTagName("h3")[8].scrollIntoView();
    alert("Selecciona una opción del radio");
    return false;

   } if (!checked2) {    
    document.getElementsByTagName("h3")[2].scrollIntoView();
    alert("Selecciona una opción del checkbox");
    return false;

   } if (!checked3) {    
    document.getElementsByTagName("h3")[2].scrollIntoView();
    alert("Selecciona una opción del checkbox");
    return false;

   } if (!checked4) {    
    document.getElementsByTagName("h3")[9].scrollIntoView();
    alert("Selecciona una opción del radio");
    return false;

   } else  return true;
}
