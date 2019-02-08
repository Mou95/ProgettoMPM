/* TODO
- MIGLIORARE CREAZIONE/ELIMINAZIONE TABELLE E SELEZIONE TABLE SHOW
- FILTRARE TABELLE PER NOME DEL GIOCATORE
- PREVEDERE PULSANTE CERCA
- GESTIONE ERRORI
- FILTERING PRIMA DI CREAZIONE TABELLA
- ELIMINARE GIOCATORI CHE NON HANNO FATTO QUELLE PROVE
*/

var campionato = document.getElementById("selCampionato");
var specialita = document.getElementById("selSpecialita");
var tableProve = document.getElementById("tableStatProve");
var tableTiri = document.getElementById("tableStatTiri");
var tables = document.getElementsByClassName("classifica");
var nome = document.getElementById("nomeGiocatore");
var db = firebase.firestore();

var squadre = db.collection("squadre");
var giocatori = db.collection("giocatori");

var tiri = ["staffetta", "progressivo_6", "progressivo_3", "tiro_tecnico"]


function refreshTable() {
    if (campionato.value != "" && specialita.value != "") {
        
        deleteTable();
        
        /*Calcola statistiche*/
        console.log("Entrato")
        var camp_id = campionato.value;
        var spec_id = specialita.value;

        console.log("Filtro "+camp_id+" "+spec_id)

        /*Cerco tutti i giocatori delle squadre che fanno parte del campionato scelto*/
        var squadre_camp = squadre.where("campionato","==",camp_id)

        createTable(squadre_camp, spec_id)
        
    } else {
        
        /*Do Nothing*/
        
    }
}

function deleteTable() {
    var table_active = document.getElementsByClassName("show")[0]
    
    if (table_active != null) {
        var tbody = table_active.getElementsByTagName('tbody')[0]

        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        table_active.classList.remove("show");
        console.log("Eliminato body della tabella attiva")
    }
}
    
function createTable(squadre_camp, spec_id) {
    
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

    squadre_camp.get()   
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

            console.log("Squadra ", doc.data()["squadra"])
            var players = giocatori.where("squadra","==",doc.data()["squadra"])

            players.get()   
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(pl) {

                    var stat = db.doc("giocatori/"+pl.id+"/statistiche_1819/"+spec_id)

                    stat.get()
                    .then(function(risultati) {
                        
                        tbody.appendChild(createTableRow(risultati, pl, medie))
                        
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });
                })
                
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        })
        
        if (medie)
            tables[1].classList.add("show");
        else
            tables[0].classList.add("show");
        console.log("Set show")
        
        /*Filtro*/
        if (nome.value != "") 
            filterTable();
        
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
}

function createTableRow(risultati, player, medie) {

    var tr = document.createElement('tr');

    /*Giocatore*/
    var td = document.createElement('td');
    td.classList.add("giocatore_s");  
    td.appendChild(document.createTextNode(player.data()["name"]))
    tr.appendChild(td);
    
    /*Squadra*/
    var td = document.createElement('td');
    td.classList.add("squadra_s");  
    td.appendChild(document.createTextNode(player.data()["squadra"]))
    tr.appendChild(td);
    
    /*Vinte*/
    var td = document.createElement('td');
    td.classList.add("vittorie_s");  
    td.appendChild(document.createTextNode(risultati.data()["vinte"]))
    tr.appendChild(td);
    
    /*Pareggiate*/
    var td = document.createElement('td');
    td.classList.add("pareggi_s");  
    td.appendChild(document.createTextNode(risultati.data()["pareggiate"]))
    tr.appendChild(td);
    
    /*Perse*/
    var td = document.createElement('td');
    td.classList.add("sconfitte_s");  
    td.appendChild(document.createTextNode(risultati.data()["perse"]))
    tr.appendChild(td);
    
    if (medie) {
        /*Perse*/
        var td = document.createElement('td');
        td.classList.add("medie_s");  
        td.appendChild(document.createTextNode(risultati.data()["media"]))
        tr.appendChild(td);
        
    }
    
    console.log("wow")
    
    return tr
}


function filterTable() {
    console.log("Filtering")
    
      // Declare variables 
    var input, filter, table, tr, td, i, txtValue;
    input = nome.value;
    filter = input.toUpperCase();
    table = document.getElementsByClassName("show")[0];
    tr = table.getElementsByTagName("tr");
    
    console.log("TR ", tr.length)

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        } 

}
    
}