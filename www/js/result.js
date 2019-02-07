var db = firebase.firestore()
var id_giornata = getQueryVariable("idg")
var id_partita = getQueryVariable("idp")
var partita = db.doc("giornate/"+id_giornata+"/partite/"+id_partita)
var form = document.getElementsByTagName("form")[0]
$.mobile.autoInitializePage = false;

window.onload = function() {

    window.addEventListener("message", function(event) {
        console.log("MEssaggio ricevuto")
        console.log(event.data)
    }, false)
    
    document.getElementById("inviaResult").addEventListener("touchend", sendResult, false)
    
    optionSelect()
    
}

function sendResult( event ) {
    event.preventDefault()
    
    var tipo = $("#provaForm option:selected").attr('class');
    var prova = $("#provaForm").val();
    var g_1 = $('#form1Squadra').val();
    var g_2 = $('#form2Squadra').val();
    var p_1 = parseInt($('#punteggio1Squadra').val());
    var p_2 = parseInt($('#punteggio2Squadra').val());
     
    if (prova != null && g_1 != null && g_2 != null && p_1 != null && p_2 != null) {
    
        switch(prova) {
            case "1":
                checkResult(1, 0, 40, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2);
                break;
            case "2":
            case "10":
            case "13":
                checkResult(2, 0, 13, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2);
                break;
            case "3":
            case "11":
            case "12":
                checkResult(1, 0, 13, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2);
                break;
            case "4":
                checkResult(3, 0, 13, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2);
                break;
            case "5":
                checkResult(2, 0, 65, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2);
                break;
            case "6":
            case "7":
                checkResult(1, 0, 50, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2);
                break;
            case "8":
                checkResult(1, 0, 55, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2);
                break;
            case "9":
                checkResult(1, 0, 55, 1, 0, prova, tipo,  g_1, g_2, p_1, p_2);
                break;

        }
    } else {
        /*PRINT ERROR MESSAGE*/
    }
}

function checkResult(n, min, max, p_vittoria, p_pareggio, prova, tipo,  g_1, g_2, p_1, p_2) {
    if (g_1.length == n && g_2.length == n && p_1 >= min && p_1 <= max && p_2 >= min && p_2 <= max) {
        console.log("posso inserire il tabellino")
        /*COSE DA FARE NOW
        - aggiornare docuemnto con tabellino V
        - aggioranre statistiche giocatore v
        - aggioranre punteggio totale partita V
        - aggioranre se tabellino completo o no
        */
        
        partita.get()
        .then(function(doc) {
            if (doc.data()[prova] == null) {
                
                /*Update tabellino*/
                var update_tabellino = {}
                update_tabellino[prova] = {
                    "g_1" : g_1,
                    "g_2" : g_2,
                    "p_1" : p_1,
                    "p_2" : p_2
                }
                
                /*Update risultato totale e statistiche giocatori*/
                if (p_1 > p_2) {
                    
                    update_tabellino["punteggio_1"] = doc.data()["punteggio_1"] + p_vittoria;
                    updateStats(g_1, tipo, "w")
                    updateStats(g_2, tipo, "l")
                    
                } else if (p_2 > p_1) {
                    
                    update_tabellino["punteggio_2"] = doc.data()["punteggio_2"] + p_vittoria;
                    updateStats(g_1, tipo, "l")
                    updateStats(g_2, tipo, "w")
                    
                } else {
                    
                    update_tabellino["punteggio_1"] = doc.data()["punteggio_1"] + p_pareggio;
                    update_tabellino["punteggio_2"] = doc.data()["punteggio_2"] + p_pareggio;
                    updateStats(g_1, tipo, "t")
                    updateStats(g_2, tipo, "t")
                    
                }
                
                partita.update(update_tabellino)
                .then(function() {
                    console.log("Document successfully updated!");
                });
                
                form.reset()
                
            } else {
                /*Tabellino già presente*/
                console.log("tabellino già presente")
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
        
    } else {
        console.log("Valori sballati")
    }
}


/*PROBLEMA -> PERSONE STESSO NOME*/
//MANCA AGGIORNARE MEDIE
function updateStats(giocatori, tipo, risultato) {
    
    giocatori.forEach(function(giocatore) {
        var pl = db.collection("giocatori").where("name", "==", giocatore)
        
        pl.get()
        .then(function(querySelector) {
            querySelector.forEach(function(doc) {

                var prova = db.doc("giocatori/"+doc.id+"/statistiche_1819/"+tipo)

                prova.get()
                .then(function(stat) {
                    
                    var update_stat = {}

                    switch (risultato) {
                        case "w":
                            update_stat["vinte"] = stat.data()["vinte"] + 1;
                            break;
                        case "t":
                            update_stat["pareggiate"] = stat.data()["pareggiate"] + 1;
                            break;
                        case "l":
                            update_stat["perse"] = stat.data()["perse"] + 1;
                            break;
                    }

                    prova.update(update_stat)
                    .then(function() {
                        console.log("Document successfully updated!");
                    });
                
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            })    
            
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    })
    
}

function optionSelect() {
    
    partita.get()
    .then(function(doc) {
        
        var prima_s = doc.data()["prima_squadra"]
        var seconda_s = doc.data()["seconda_squadra"]
        
        var legends = document.getElementsByTagName("legend")
        legends[0].innerHTML = prima_s
        legends[1].innerHTML = seconda_s
        
        var prima_select = document.getElementById("form1Squadra");
        var seconda_select = document.getElementById("form2Squadra");

        var giocatori_1 = db.collection("giocatori").where("squadra","==",prima_s).orderBy("name")
        var giocatori_2 = db.collection("giocatori").where("squadra","==",seconda_s).orderBy("name")

        addOptions(giocatori_1, prima_select)
        addOptions(giocatori_2, seconda_select)
        
    }).catch(function(error) {
        console.log("Error getting document:", error);
    })
    
}

function addOptions(players, select) {
    players.get()   
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

            var option = document.createElement("option");
            option.text = doc.data()["name"];
            select.add(option);
            
        })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

