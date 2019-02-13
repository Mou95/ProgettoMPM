/* TODO
- MIGLIORARE CREAZIONE/ELIMINAZIONE TABELLE E SELEZIONE TABLE SHOW
- FILTRARE TABELLE PER NOME DEL GIOCATORE
- PREVEDERE PULSANTE CERCA
- GESTIONE ERRORI
- FILTERING PRIMA DI CREAZIONE TABELLA
- ELIMINARE GIOCATORI CHE NON HANNO FATTO QUELLE PROVE
*/
var dots_stat = document.getElementById("page_statistiche").getElementsByClassName("dot")
var campionato = ["A1_1819", "A2_1819_est"];
var name_campionati = ["Serie A1 18/19", "Serie a2 est 18/19"];

var n = campionato.length;
var backArrow_stat = document.getElementById("backArrow_stat");
var forwArrow_stat = document.getElementById("forwArrow_stat");


var active_stat = 0;
var specialita = document.getElementById("selSpecialita");
var tableProve = document.getElementById("tableStatProve");
var tableTiri = document.getElementById("tableStatTiri");
var tables = document.getElementById("stat-slider").getElementsByClassName("classifica");
var nome = document.getElementById("nomeGiocatore");
var title_stat = document.getElementById("titleStat");
var db = firebase.firestore();

var campionati = db.collection("campionati")
var squadre = db.collection("squadre");
var giocatori = db.collection("giocatori");

var tiri = ["staffetta", "progressivo_6", "progressivo_3", "tiro_tecnico"]

var array_player = {
    A1_1819: [],
    A2_1819_est: []
}

$(function(){
    // Bind the swipeHandler callback function to the swipe event on classifica-slider
    console.log("swiped");
    $( "#stat-slider" ).on( "swiperight", swipeRightStat );
    $( "#stat-slider" ).on( "swipeleft", swipeLeftStat );
    $( "#backArrow_stat" ).on( "touchend", swipeRightStat );
    $( "#forwArrow_stat" ).on( "touchend", swipeLeftStat );
});

function swipeRightStat( event ){
    
    if (active_stat > 0) {
        dots_stat[active_stat].classList.remove("active-dot")
        active_stat -= 1;
        dots_stat[active_stat].classList.add("active-dot") 
        title_stat.innerHTML = name_campionati[active_stat]
    }
    setArrowsStat()
    refreshTable()
}

function swipeLeftStat( event ){
    if (active_stat < n - 1) {
        dots_stat[active_stat].classList.remove("active-dot")
        active_stat += 1;
        dots_stat[active_stat].classList.add("active-dot")
        title_stat.innerHTML = name_campionati[active_stat]
    }
    
    setArrowsStat()
    refreshTable()
}

function setArrowsStat() {
    
    if (active_stat == 0) {
        backArrow_stat.classList.remove("show");
        forwArrow_stat.classList.add("show");
        
    } else if (active_stat == n-1) {
        backArrow_stat.classList.add("show");
        forwArrow_stat.classList.remove("show");
        
    } else {
        /*Both arrow*/
        backArrow_stat.classList.add("show");
        forwArrow_stat.classList.add("show");
    } 
}

function createVariable() {
    
    var i = 0;
    campionato.forEach(function(camp) {
        
        var squadre_camp = squadre.where("campionato", "==", camp)
        
        squadre_camp.get()   
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {

                console.log("Squadra ", doc.data()["squadra"])
                var players = giocatori.where("squadra","==",doc.data()["squadra"])

                
                players.onSnapshot(function(snapshot) {
                    snapshot.docChanges().forEach(function(change) {
                        if (change.type === "modified") {

                            changeEntryTableStat(camp, change)
                            

                        }
                        if (change.type === "added") {

                            array_player[camp].push(change.doc.data())

                        }
                        
                    })
                });
            })


        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    
        i++;    
    }) 
    
}

function changeEntryTableStat(campionato, change) {
    console.log(campionato+" "+change.doc.data()["name"])
    var squadra = change.doc.data()["squadra"];  
    var name = change.doc.data()["name"]; 

    array_player[campionato].forEach(function(player) {
        if (player["name"] == name && player["squadra"] == squadra) {
            array_player[campionato][array_player[campionato].indexOf(player)] = change.doc.data()
        }
    })
    
    refreshTable();
}

function refreshTable() {
    if (campionato.value != "" && specialita.value != "") {
        
        deleteTable();
        
        /*Calcola statistiche*/
        console.log("Entrato")
        var spec_id = specialita.value;

        console.log("Filtro "+spec_id)

        /*Cerco tutti i giocatori delle squadre che fanno parte del campionato scelto*/

        createTable(spec_id)
        
    } else {
        
        /*Do Nothing*/
        
    }
}

function deleteTable() {
    var table_active = document.getElementById("stat-slider").getElementsByClassName("show")[0]
    
    if (table_active != null) {
        var tbody = table_active.getElementsByTagName('tbody')[0]

        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        table_active.classList.remove("show");
        console.log("Eliminato body della tabella attiva")
    }
}
    
function createTable(spec_id) {
    
    var medie;
    var table_to_create;
    
    if (tiri.includes(spec_id)) {
        medie = true 
        table_to_create = tableTiri;
    } else {
        medie = false;
        table_to_create = tableProve
    } 
    
    var tbody = table_to_create.getElementsByTagName('tbody')[0]
    
    console.log("Inizio creazione tabella")
    
    array_player[campionato[active_stat]].forEach(function(player) {
        
        if(player["name"].includes(nome.value)) {
            
            tbody.appendChild(createTableRow(player, medie, spec_id))

        }

    })
    
        
    if (medie)
        tables[1].classList.add("show");
    else
        tables[0].classList.add("show");
    console.log("Set show")
    
}

function createTableRow(player, medie, spec_id) {

    var tr = document.createElement('tr');

    /*Giocatore*/
    var td = document.createElement('td');
    td.classList.add("giocatore_s");  
    td.appendChild(document.createTextNode(player["name"]))
    tr.appendChild(td);
    
    /*Squadra*/
    var td = document.createElement('td');
    td.classList.add("squadra_s");  
    td.appendChild(document.createTextNode(player["squadra"]))
    tr.appendChild(td);
    
    /*Vinte*/
    var td = document.createElement('td');
    td.classList.add("vittorie_s");  
    td.appendChild(document.createTextNode(player["statistiche_1819"][spec_id]["vinte"]))
    tr.appendChild(td);
    
    /*Pareggiate*/
    var td = document.createElement('td');
    td.classList.add("pareggi_s");  
    td.appendChild(document.createTextNode(player["statistiche_1819"][spec_id]["pareggiate"]))
    tr.appendChild(td);
    
    /*Perse*/
    var td = document.createElement('td');
    td.classList.add("sconfitte_s");  
    td.appendChild(document.createTextNode(player["statistiche_1819"][spec_id]["perse"]))
    tr.appendChild(td);
    
    if (medie) {
        /*Perse*/
        var td = document.createElement('td');
        td.classList.add("medie_s");  
        td.appendChild(document.createTextNode(player["statistiche_1819"][spec_id]["media"]))
        tr.appendChild(td);
        
    }
    
    return tr
}

