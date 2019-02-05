/*GESTIRE LOGICA CON NUMERI CALCOLATI DOPO CREAZIONE TABELLE*/

var active = 0;
var giornate = document.getElementsByClassName("giornataIntera")
var n_giornate = document.getElementsByClassName("NumeroGiornata")
var n = giornate.length;

//apply overrides here
$.mobile.autoInitializePage = false;

function loadLogic() {
    console.log("dfs");
    giornate[active].classList.add("show");
    $( ".giornataIntera" ).on( "swiperight", swipeRight );
    $( ".giornataIntera" ).on( "swipeleft", swipeLeft );
    $( ".NumeroGiornata" ).on( "tap", selectTable );
}

function swipeRight( event ){
    if (active > 0) {
        console.log("swiped");
        giornate[active].classList.remove("show");
        n_giornate[active].classList.remove("selected");
        active -= 1;
        giornate[active].classList.add("show");
        n_giornate[active].classList.add("selected");
    }
}

function swipeLeft( event ){
    if (active < n - 1) {
        console.log("swiped");
        giornate[active].classList.remove("show");
        n_giornate[active].classList.remove("selected");
        active += 1;
        giornate[active].classList.add("show");
        n_giornate[active].classList.add("selected");
    }
}

function selectTable( event ) {
    var new_active = Array.prototype.indexOf.call(n_giornate, event.target);
    
    if (new_active != active) {
        giornate[active].classList.remove("show");
        n_giornate[active].classList.remove("selected");
        active = new_active;
        giornate[active].classList.add("show");
        n_giornate[active].classList.add("selected");
    } 
}


function createPage() {
    var giornate = 10;
    var body = document.getElementsByTagName("body")[0]
    var nav = document.getElementById("ulGiornate")
    
    for (var i = 0; i < giornate; i++) {
        addLi(nav, i+1)
        createTableGiornata(body, i+1)
    }
    
    loadLogic()
}

function addLi(nav, index) {
    var li = document.createElement("li");
    li.classList.add("NumeroGiornata");
    li.appendChild(document.createTextNode("Giornata "+ index))
    nav.appendChild(li)
}

function createTableGiornata(body, index) {
    /*div contenente tabella*/
    var div = document.createElement("div");
    div.classList.add("giornataIntera");
    
    /*Tabella*/
    var table = document.createElement("table");
    table.classList.add("tableGiornata")
    
    var n_partite = 5;
    
    for (var i=0; i < n_partite; i++) {
        var row = table.insertRow(0);
        
        var td = row.insertCell(0);
        td.classList.add("PrimaSquadra");
        td.appendChild(document.createTextNode("Dolada"));
        
        var td = row.insertCell(1);
        td.classList.add("PunteggioPrimaSquadra");
        td.appendChild(document.createTextNode(20));
        
        var td = row.insertCell(2);
        td.classList.add("StatoPartita");
        td.appendChild(document.createTextNode("22/11"));
        
        var td = row.insertCell(3);
        td.classList.add("PunteggioSecondaSquadra");
        td.appendChild(document.createTextNode(i));
        
        var td = row.insertCell(4);
        td.classList.add("SecondaSquadra");
        td.appendChild(document.createTextNode("Chiesanuo"));
        
    }
    
    div.appendChild(table)
    body.appendChild(div)
    
    console.log("Create table "+index)
    
}


