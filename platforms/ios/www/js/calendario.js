/*GESTIRE LOGICA CON NUMERI CALCOLATI DOPO CREAZIONE TABELLE*/

var active = 0;
var giornate = document.getElementsByClassName("giornataIntera")
var n_giornate = document.getElementsByClassName("NumeroGiornata")
var n = giornate.length;
var db = firebase.firestore();

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
    var giornate = db.collection("giornate").orderBy("numero", "asc");
    var body = document.getElementById("allGiornate")
    var nav = document.getElementById("ulGiornate")
    
    giornate.get()   
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            addLi(nav, doc.data()["numero"])
            createTableGiornata(body, doc)
        
        })
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    loadLogic()
}

function addLi(nav, index) {
    var li = document.createElement("li");
    li.classList.add("NumeroGiornata");
    li.appendChild(document.createTextNode("Giornata "+ index))
    nav.appendChild(li)
}

function createTableGiornata(body, giornata) {
    /*div contenente tabella*/
    var div = document.createElement("div");
    div.classList.add("giornataIntera");
    div.classList.add("show");
    
    /*Tabella*/
    var table = document.createElement("table");
    table.classList.add("tableGiornata")
    
    var partite = db.collection("giornate/"+giornata.id+"/partite");
    
    partite.get()   
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            console.log("row of "+doc.data())
            var row = table.insertRow(0);
            
            var uri = "tabellino.html?idg="+giornata.id+"&idp="+doc.id;
            var res = uri;
            
            row.onclick = function(){window.open(res, "_self")}

            var td = row.insertCell(0);
            td.classList.add("PrimaSquadra");
            td.appendChild(document.createTextNode(doc.data()["prima_squadra"]));

            var td = row.insertCell(1);
            td.classList.add("PunteggioPrimaSquadra");
            td.appendChild(document.createTextNode(doc.data()["punteggio_1"]));

            var td = row.insertCell(2);
            td.classList.add("StatoPartita");
            td.appendChild(document.createTextNode("22/11"));

            var td = row.insertCell(3);
            td.classList.add("PunteggioSecondaSquadra");
            td.appendChild(document.createTextNode(doc.data()["punteggio_2"]));

            var td = row.insertCell(4);
            td.classList.add("SecondaSquadra");
            td.appendChild(document.createTextNode(doc.data()["seconda_squadra"]));
            
            div.appendChild(table)
            body.appendChild(div)
        
        })
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
    
    
    console.log("Create table ")
    
}


