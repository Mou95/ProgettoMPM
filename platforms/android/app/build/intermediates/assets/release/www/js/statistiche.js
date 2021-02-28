
var t = [
'Andrici A.', 
'Barbon P.', 
'Ceolin M.', 
'Favetta A.', 
'Gigante D.', 
'Marchesin G.', 
'Ormellese G.', 
'Rosati E.', 
'Tam P.', 
'Tapacino E.', 
'Zanon R.'

]


/*var xxx = 0
db.collection("utenti")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doccc) {
            xxx += 1
        });
    })
    .then(function() {
        console.log(xxx)
    })
*/

/*t.forEach(function(gioc) {
    db.collection("campionati/A1_2021/classifica").add({
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
})
*/
/*t.forEach(function(gioc) {
    db.collection("squadre").add({
        squadra: gioc,
        campionato: "A1_2021"
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
})
*/
/*t.forEach(function(gioc) {
    db.collection("giocatori2021").add({ 
        name: gioc,
        squadra: "Tiezzese",
        statistiche_2021: {
            combinato: {
                lista:[],
                perse:0,
                vinte:0,
                pareggiate:0,
                media:0
            },
            progressivo_3: {
                lista:[],
                perse:0,
                vinte:0,
                pareggiate:0,
                media:0
            },
            staffetta: {
                lista:[],
                perse:0,
                vinte:0,
                pareggiate:0,
                media:0
            },
            tiro_tecnico: { 
                lista:[],
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
            },
            totale: {
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
/*for (var i=1; i<11; i++) {
    db.collection("giornate2021").doc("g"+i+"_A2_2021_D").set({
        numero: i,
        campionato: "A2_2021_D",
        anno: 2021,
        data: new Date(2021,02,27),
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
var campionato = ["A1_2021", "A2_2021_est",  "A2_2021_ovest"];
var name_campionati = ["Serie A1 20/21", "Serie A2 est 20/21", "Serie A2 ovest 20/21"/*, "Serie A1 Femm 19/20"*/];

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
var giocatori = db.collection("giocatori2021");

var tiri = ["staffetta", "progressivo_3", "tiro_tecnico", "combinato"]

var array_player = {
    A1_2021: [],
    A2_2021_est: [],
    A2_2021_ovest: []/*,
    A1_1920_F: []*/
}


// Bind the swipeHandler callback function to the swipe event on classifica-slider

var mc_stat = new Hammer.Manager(document.getElementById("stat-slider"));

var swipe_stat = new Hammer.Swipe({
    direction: 6
});

mc_stat.add(swipe_stat);

mc_stat.on("swiperight", function(ev) {
   swipeRightStat()
});

mc_stat.on("swipeleft", function(ev) {
   swipeLeftStat()
});
/*$( "#stat-slider" ).on( "swiperight", swipeRightStat );
$( "#stat-slider" ).on( "swipeleft", swipeLeftStat );*/
/*$( "#backArrow_stat" ).on( "tap", swipeRightStat );
$( "#forwArrow_stat" ).on( "tap", swipeLeftStat );*/

document.getElementById("backArrow_stat").addEventListener("click", swipeRightStat)
document.getElementById("forwArrow_stat").addEventListener("click", swipeLeftStat)

/*$('#selSpecialita').on('focus',function() {
    console.log("scroll")
    $("body").addClass("fixfixed");
    $("html, body").animate({ scrollTop: 0 }, 100);
    $("#footerStat").hide()
});

$('#selSpecialita').on('blur, focusout',function() {
    console.log("scrollout")
    $("body").removeClass("fixfixed");
    $("#footerStat").show()
});*/


$('#navMenu').on('click', function(e) {
    $.each($('#selSpecialita'), function(i, select) {
        if ( $(select).data('dropkick') ) {
            $(select).dropkick('close');
        }
    });
});


function swipeRightStat(){
    console.log("swipe right")
    if (active_stat > 0) {
        dots_stat[active_stat].classList.remove("active-dot")
        active_stat -= 1;
        dots_stat[active_stat].classList.add("active-dot") 
        title_stat.innerHTML = name_campionati[active_stat]
    }
    setArrowsStat()
    refreshTable()
    
    var footer_tab = $('#tableStatProve');

    console.log(footer_tab.css("margin-bottom"))
}

function swipeLeftStat(){
    console.log("Swipe left")
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
    console.log("arrow")
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
        console.log("CAMP",camp)
        var squadre_camp = squadre.where("campionato", '==', camp)
        
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

        createTable(spec_id)
        console.log("finito")
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
    console.log(spec_id+" "+active_stat)
        
    var i=1;
    array_player[campionato[active_stat]].forEach(function(player) {
        

        if (player["statistiche_2021"][spec_id]["vinte"]+player["statistiche_2021"][spec_id]["pareggiate"]+player["statistiche_2021"][spec_id]["perse"] != 0) {

            tbody.appendChild(createTableRow(i, player, medie, spec_id))
            i++;
        }

    })
        
    if (medie) {
        tables[1].classList.add("show");
        sort("tableStatTiri",6)
    }
    else {
        tables[0].classList.add("show");
        sort("tableStatProve",3)
    }
    
}

function createTableRow(i, player, medie, spec_id) {

    var tr = document.createElement('tr');
    /*Posizione*/
    var td = document.createElement('td');
    td.classList.add("posizione_s");  
    td.appendChild(document.createTextNode(i))
    tr.appendChild(td);

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
    td.appendChild(document.createTextNode(player["statistiche_2021"][spec_id]["vinte"]))
    tr.appendChild(td);

    /*Pareggiate*/
    var td = document.createElement('td');
    td.classList.add("pareggi_s");  
    td.appendChild(document.createTextNode(player["statistiche_2021"][spec_id]["pareggiate"]))
    tr.appendChild(td);

    /*Perse*/
    var td = document.createElement('td');
    td.classList.add("sconfitte_s");  
    td.appendChild(document.createTextNode(player["statistiche_2021"][spec_id]["perse"]))
    tr.appendChild(td);
    
    
    if (medie) {
        /*Perse*/
        var td = document.createElement('td');
        td.classList.add("medie_s");  
        td.appendChild(document.createTextNode(player["statistiche_2021"][spec_id]["media"]))
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
        
        for (i = 1; i < (rows.length - 1); i++) {
          
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            
            w = rows[i].getElementsByTagName("TD")[4];
            z = rows[i + 1].getElementsByTagName("TD")[4];
            
            h = rows[i].getElementsByTagName("TD")[5];
            k = rows[i + 1].getElementsByTagName("TD")[5];

            if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
                shouldSwitch = true;
                break;
            
            } else {
                //discrima i pareggi
                if (id == "tableStatProve") {
                    if (parseInt(x.innerHTML) == parseInt(y.innerHTML) && parseInt(w.innerHTML) < parseInt(z.innerHTML)) {
                        
                        shouldSwitch = true;
                        break;
                    } 
                    if (parseInt(x.innerHTML) == parseInt(y.innerHTML) && parseInt(w.innerHTML) == parseInt(z.innerHTML) && parseInt(h.innerHTML) > parseInt(k.innerHTML)) {
                        
                        shouldSwitch = true;
                        break;
                    } 
                }
            }
        }
        if (shouldSwitch) {
            
             t = rows[i].getElementsByTagName("TD")[0].innerHTML;
            
            rows[i].getElementsByTagName("TD")[0].innerHTML = rows[i+1].getElementsByTagName("TD")[0].innerHTML;
            
            rows[i+1].getElementsByTagName("TD")[0].innerHTML = t;
        
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            
            switching = true;
        }
    }

}

