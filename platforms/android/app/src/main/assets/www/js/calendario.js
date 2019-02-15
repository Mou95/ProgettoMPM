/*GESTIRE LOGICA CON NUMERI CALCOLATI DOPO CREAZIONE TABELLE*/

var db = firebase.firestore();

/*function loadLogic() {
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
}*/

var array_giornate = {
    A1_1819: [],
    A2_1819_est: []
}

var titleC = {
    A1_1819: "Serie A1 18/19",
    A2_1819_est: "Serie A2 Est 18/19"
}

var tableCalendar = document.getElementById("tableGiornate");
var navCalendar = document.getElementById("ulGiornate")
var titleCalendar = document.getElementById("titleCalendar")


function createCalendar() {
    var giornate = db.collection("giornate").orderBy("numero", "asc");
    
    giornate.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "modified") {

                changeEntryTableCalendar(change)
                refreshTabellino()

            }
            if (change.type === "added") {

                var add = change.doc.data()["partite"];
                add["id"] = change.doc.id;

                array_giornate[change.doc.data()["campionato"]].push(add)

            }

        })
    });

    //loadLogic()
}

function changeEntryTableCalendar(change) {
    
    console.log(change.doc.data())
    var campionato = change.doc.data()["campionato"];  
    var giornata = change.doc.data()["numero"]-1; 
    
    //var id = array_giornate[campionato][giornata]["id"]
    array_giornate[campionato][giornata] = change.doc.data()["partite"]
    array_giornate[campionato][giornata]["id"] = change.doc.id;
    
    refreshCalendar();
    
}

function addLi(n) {
    
    $("#ulGiornate").html("")
    
    for (var i = 0; i < n; i++) {
        var li = document.createElement("li");
        li.classList.add("NumeroGiornata");
        li.appendChild(document.createTextNode("Giornata "+ (i+1)))
        navCalendar.appendChild(li)
    }
}

function createTableGiornate() {
    
    console.log("start")
    
    /*Tabella*/
    
    var camp = document.getElementById("selCampionato").value;
    
    addLi(array_giornate[camp].length)
    
    array_giornate[camp].forEach(function(partite, index_giornata) {
        
        console.log("new body")
        
        var tbody = document.createElement("tbody");
        
        partite.forEach(function(partita, index) {
            
            console.log("Id "+partite["id"]+" "+index)
            
            var row = tbody.insertRow(0);

            /*var uri = "tabellino.html?idg="+giornata.id+"&idp="+doc.id;
            var res = uri;

            row.onclick = function(){window.open(res, "_self")}*/

            var td = row.insertCell(0);
            td.classList.add("PrimaSquadra");
            td.appendChild(document.createTextNode(partita["prima_squadra"]));

            var td = row.insertCell(1);
            td.classList.add("PunteggioPrimaSquadra");
            td.appendChild(document.createTextNode(partita["punteggio_1"]));

            var td = row.insertCell(2);
            td.classList.add("PunteggioSecondaSquadra");
            td.appendChild(document.createTextNode(partita["punteggio_2"]));

            var td = row.insertCell(3);
            td.classList.add("SecondaSquadra");
            td.appendChild(document.createTextNode(partita["seconda_squadra"]));
            
            row.addEventListener("touchend", function() {
                openTabellino()
                createTabellino(partite["id"], camp, index_giornata, index)
            }, false)

        })
        
        tableCalendar.appendChild(tbody)
    })
    
    tableCalendar.getElementsByTagName("tbody")[0].style.display = "table-row-group";

    console.log("Create table ")
    
}

function openTabellino() {
    
    document.getElementById("page_calendario").classList.remove("page_show")
    document.getElementById("page_calendario").classList.add("no_page_show")
    
    document.getElementById("page_tabellino").classList.add("page_show")
    document.getElementById("page_tabellino").classList.remove("no_page_show")
    logicTabellino()
    
}

function refreshCalendar() {
    
    tableCalendar.querySelectorAll('tbody').forEach(function(tbody) {
        tableCalendar.removeChild(tbody);
    });
    
    navCalendar.querySelectorAll('li').forEach(function(li) {
        navCalendar.removeChild(li);
    }); 
    
    console.log(titleC[document.getElementById("selCampionato").value])
    
    titleCalendar.innerHTML = titleC[document.getElementById("selCampionato").value]
    createTableGiornate()
}

