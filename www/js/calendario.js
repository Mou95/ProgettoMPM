/*GESTIRE LOGICA CON NUMERI CALCOLATI DOPO CREAZIONE TABELLE*/

var db = firebase.firestore();
var active_day = 0;
var n_giornate;
var all_giornate;
var tbody_giornate;

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

function loadLogicCalendar() {
    tbody_giornate = tableCalendar.getElementsByTagName("tbody");
    
    selectActiveDay()

    $( ".giornataIntera" ).on( "swiperight", swipeRightCalendar );
    $( ".giornataIntera" ).on( "swipeleft", swipeLeftCalendar );
    $( ".NumeroGiornata" ).on( "tap", selectTableCalendar );
}

function swipeRightCalendar( event ){
    if (active_day > 0) {

        tbody_giornate[active_day].style.display = "none";
        all_giornate[active_day].classList.remove("selected");
        
        active_day -= 1;
        
        tbody_giornate[active_day].style.display = "table-row-group";
        all_giornate[active_day].classList.add("selected");
        all_giornate[active_day].scrollIntoView({behavior: "smooth", block: "end", inline: "center"})
    }
}

function swipeLeftCalendar( event ){
    if (active_day < n_giornate - 1) {

        tbody_giornate[active_day].style.display = "none";
        all_giornate[active_day].classList.remove("selected");
        
        active_day += 1;
        
        tbody_giornate[active_day].style.display = "table-row-group";
        all_giornate[active_day].classList.add("selected");
        all_giornate[active_day].scrollIntoView({behavior: "smooth", block: "end", inline: "center"})
    }
}

function selectTableCalendar( event ) {
    var new_active = Array.prototype.indexOf.call(all_giornate, event.target);
    
    if (new_active != active_day) {
        
        tbody_giornate[active_day].style.display = "none";
        all_giornate[active_day].classList.remove("selected");
        
        active_day = new_active;
        
        tbody_giornate[active_day].style.display = "table-row-group";
        all_giornate[active_day].classList.add("selected");
        all_giornate[active_day].scrollIntoView({behavior: "smooth", block: "end", inline: "center"})
    } 
}

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
    
    all_giornate = navCalendar.getElementsByClassName("NumeroGiornata");
}

function createTableGiornate() {
    
    console.log("start")
    
    /*Tabella*/
    
    var camp = document.getElementById("selCampionato").value;
    
    n_giornate = array_giornate[camp].length
    
    addLi(n_giornate)
    
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

    loadLogicCalendar()
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

/*Seleziona la giornata più vicina temporalemente*/
function selectActiveDay() {
    active_day = 0;
    
    tbody_giornate[active_day].style.display = "table-row-group";
    all_giornate[active_day].classList.add("selected");
    all_giornate[active_day].scrollIntoView({behavior: "smooth", block: "end", inline: "center"})
}

