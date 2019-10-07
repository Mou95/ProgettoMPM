
var t = [
"Pittarelli L.",
"Strocco G.",
"Croveri M.",
"Franco C.",
"Ariello D.",
"Ronco M.",
"Nicolino E.",
"Luciano P.L.",
"Favaretto E.",
"Sacco G.",
"Borca M.",
"Porta A."
]

/*t.forEach(function(gioc) {
    db.collection("campionati/A2_1920_ovest/classifica").add({
        squadra: gioc,
        punti: 0,
        punti_fatti: 0,
        punti_subiti: 0,
        vittorie: 0,
        sconfitte: 0,
        pareggi: 0
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
})*/

/*t.forEach(function(gioc) {
    db.collection("giocatori").add({
        name: gioc,
        squadra: "Pozzo Strada",
        statistiche_1920: {
            combinato: {
                perse:0,
                vinte:0,
                pareggiate:0,
                media:0
            },
            progressivo_3: {
                perse:0,
                vinte:0,
                pareggiate:0,
                media:0
            },
            staffetta: {
                perse:0,
                vinte:0,
                pareggiate:0,
                media:0
            },
            tiro_tecnico: {
                perse:0,
                vinte:0,
                pareggiate:0,
                media:0
            },
            individuale: {
                perse:0,
                vinte:0,
                pareggiate:0
            },
            coppia: {
                perse:0,
                vinte:0,
                pareggiate:0
            },
            terna: {
                perse:0,
                vinte:0,
                pareggiate:0
            }
        }  

    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
})
*/
        

/*for (var i=1; i<19; i++) {
    db.collection("giornate").doc("g"+i+"_A2_O").set({
        numero: i,
        campionato: "A2_1920_ovest",
        partite:[
            {
                completo:false, 
                prima_squadra:"", 
                seconda_squadra:"",
                punteggio_1:0,
                punteggio_2:0,
                tabellino:{}
            },
            {completo:false, prima_squadra:"", seconda_squadra:"",
                punteggio_1:0,punteggio_2:0,tabellino:{}},
            {completo:false, prima_squadra:"", seconda_squadra:"",
                punteggio_1:0,punteggio_2:0,tabellino:{}},
            {completo:false, prima_squadra:"", seconda_squadra:"",
                punteggio_1:0,punteggio_2:0,tabellino:{}},
            {completo:false, prima_squadra:"", seconda_squadra:"",
                punteggio_1:0,punteggio_2:0,tabellino:{}}
                                     
        ]
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}*/

var dots_stat = document.getElementById("page_statistiche").getElementsByClassName("dot")
var campionato = ["A1_1920", "A2_1920_est",  "A2_1920_ovest"];
var name_campionati = ["Serie A1 19/20", "Serie A2 est 19/20", "Serie A2 ovest 19/20"];

var n = campionato.length;
var backArrow_stat = document.getElementById("backArrow_stat");
var forwArrow_stat = document.getElementById("forwArrow_stat");


var active_stat = 0;
var specialita = document.getElementById("selSpecialita");
var tableProve = document.getElementById("tableStatProve");
var tableTiri = document.getElementById("tableStatTiri");
var tables = document.getElementById("stat-slider").getElementsByClassName("classifica");
var title_stat = document.getElementById("titleStat");
var db = firebase.firestore();

var campionati = db.collection("campionati")
var squadre = db.collection("squadre");
var giocatori = db.collection("giocatori");

var tiri = ["staffetta", "progressivo_3", "tiro_tecnico", "combinato"]

var array_player = {
    A1_1920: [],
    A2_1920_est: [],
    A2_1920_ovest: []
}

$(function(){
    // Bind the swipeHandler callback function to the swipe event on classifica-slider
    console.log("swiped");
    $( "#stat-slider" ).on( "swiperight", swipeRightStat );
    $( "#stat-slider" ).on( "swipeleft", swipeLeftStat );
    $( "#backArrow_stat" ).on( "tap", swipeRightStat );
    $( "#forwArrow_stat" ).on( "tap", swipeLeftStat );
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

function createStats() {
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
    if (specialita.value != "") {
        
        deleteTable();
        
        var spec_id = specialita.value;

        console.log("Filtro "+spec_id)

        createTable(spec_id)
        
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
    console.log(array_player)
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
    
    console.log(array_player[campionato[active_stat]].length)
    
    array_player[campionato[active_stat]].forEach(function(player) {
        
        if (player["statistiche_1920"][spec_id]["vinte"]+player["statistiche_1920"][spec_id]["pareggiate"]+player["statistiche_1920"][spec_id]["perse"] != 0) {
        
            tbody.appendChild(createTableRow(player, medie, spec_id))
        }
        
    })
    
        
        
    if (medie) {
        tables[1].classList.add("show");
        sort("tableStatTiri",5)
    }
    else {
        tables[0].classList.add("show");
        sort("tableStatProve",2)
    }
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
    td.appendChild(document.createTextNode(player["statistiche_1920"][spec_id]["vinte"]))
    tr.appendChild(td);
    
    /*Pareggiate*/
    var td = document.createElement('td');
    td.classList.add("pareggi_s");  
    td.appendChild(document.createTextNode(player["statistiche_1920"][spec_id]["pareggiate"]))
    tr.appendChild(td);
    
    /*Perse*/
    var td = document.createElement('td');
    td.classList.add("sconfitte_s");  
    td.appendChild(document.createTextNode(player["statistiche_1920"][spec_id]["perse"]))
    tr.appendChild(td);
    
    if (medie) {
        /*Perse*/
        var td = document.createElement('td');
        td.classList.add("medie_s");  
        td.appendChild(document.createTextNode(player["statistiche_1920"][spec_id]["media"]))
        tr.appendChild(td);
        
    }
    
    return tr
}

function sort(id,n) {
    
    var table, rows, switching, i, x, y, shouldSwitch, t;
    table = document.getElementById(id);
    switching = true;

    while (switching) {

        switching = false;
        rows = table.rows;
        
        console.log(rows.length+"lenght")
        for (i = 1; i < (rows.length - 1); i++) {
          
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            
            w = rows[i].getElementsByTagName("TD")[3];
            z = rows[i + 1].getElementsByTagName("TD")[3];
            
            console.log(x.innerHTML.toLowerCase()+" "+y.innerHTML.toLowerCase())

            if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {

                console.log(x.innerHTML.toLowerCase()+" "+y.innerHTML.toLowerCase())
                shouldSwitch = true;
                break;
            
            } else {
                //discrima i pareggi
                if (id == "tableStatProve") {
                    if (parseInt(x.innerHTML) == parseInt(y.innerHTML) && parseInt(w.innerHTML) < parseInt(z.innerHTML)) {
                        console.log("Pareggi sort")
                        shouldSwitch = true;
                        break;
                    } 
                }
            }
        }
        if (shouldSwitch) {
            
            console.log(rows[i].getElementsByTagName("TD")[0].innerHTML+ " "+rows[i+1].getElementsByTagName("TD")[0].innerHTML)
        
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            
            switching = true;
        }
    }

}

