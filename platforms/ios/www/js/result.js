var db = firebase.firestore()
var form = document.getElementsByTagName("form")[0]
var prima_s, seconda_s;

document.getElementById("inviaResult").addEventListener("click", sendResult, false)

function logicAddResult() {
    
    document.removeEventListener("backbutton", closeTabellino); 
    document.getElementsByClassName("backButton")[0].removeEventListener("click", closeTabellino); 
    
    document.getElementsByClassName("backButton")[0].addEventListener("click", closeResult, false);

    document.addEventListener("backbutton", closeResult, false); 
    
    document.getElementsByClassName("backButton")[0].style.display = "block";
    
}

function closeResult() {
    //e.preventDefault(); 
        
    document.getElementById("page_result").classList.remove("page_show")
    document.getElementById("page_result").classList.add("no_page_show")
    
    document.getElementById("page_tabellino").classList.add("page_show")
    document.getElementById("page_tabellino").classList.remove("no_page_show")
  
    document.removeEventListener("backbutton", closeResult);  
    document.getElementsByClassName("backButton")[0].removeEventListener("click", closeResult); 

    logicTabellino()
    refreshTabellino()
    
}

function sendResult( event ) {
    event.preventDefault()
    
    var tipo = $("#provaForm option:selected").attr('class');
    var prova = $("#provaForm").val();
    var g_1 = $('#form1Squadra').val();
    var g_2 = $('#form2Squadra').val();
    var p_1 = parseInt($('#punteggio1Squadra').val());
    var p_2 = parseInt($('#punteggio2Squadra').val());
    console.log(p_1,p_2)
    if (prova != null && g_1 != null && g_2 != null && !isNaN(p_1) && !isNaN(p_2)) {
        console.log("P1",p_1)
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
         navigator.notification.alert("Alcuni campi non sono stati inseriti!!", function(){}, "Successo!")
    }
}

function checkResult(n, min, max, p_vittoria, p_pareggio, prova, tipo,  g_1, g_2, p_1, p_2) {
    //if (g_1.length == n && g_2.length == n && p_1 >= min && p_1 <= max && p_2 >= min && p_2 <= max) {
    //numero giocatori
    if (g_1.length == n && g_2.length == n) {
        //punteggio corretto
        if (p_1 >= min && p_1 <= max && p_2 >= min && p_2 <= max) {
            console.log("posso inserire il tabellino")

            console.log(id_giornata)
            var partita = db.doc("giornate/"+id_giornata)

            partita.get()
            .then(function(doc) {
                var tabellino = doc.data()["partite"][numero_partita]["tabellino"] 

                if (tabellino[prova] == null) {

                    /*Update tabellino*/
                    var update_tabellino = doc.data()
                    update_tabellino["partite"][numero_partita]["tabellino"] [prova] = {
                        "g_1" : g_1,
                        "g_2" : g_2,
                        "p_1" : p_1,
                        "p_2" : p_2
                    }

                    if (prova == "6" || prova == "7") {
                        if (update_tabellino["partite"][numero_partita]["tabellino"]["6"] != null && update_tabellino["partite"][numero_partita]["tabellino"]["7"] != null) {
                            /*Calcolo punto aggiuntivo tecnico*/

                            var sum_prima_squadra = update_tabellino["partite"][numero_partita]["tabellino"]["6"]["p_1"] + update_tabellino["partite"][numero_partita]["tabellino"]["7"]["p_1"]
                            var sum_seconda_squadra = update_tabellino["partite"][numero_partita]["tabellino"]["6"]["p_2"] + update_tabellino["partite"][numero_partita]["tabellino"]["7"]["p_2"]

                            console.log("TECNICO "+sum_prima_squadra+" "+sum_seconda_squadra)

                            if (sum_prima_squadra > sum_seconda_squadra) {
                                update_tabellino["partite"][numero_partita]["punteggio_1"] += 1;

                            } else if (sum_seconda_squadra > sum_prima_squadra) {
                                update_tabellino["partite"][numero_partita]["punteggio_2"] += 1;               
                            }
                        }                       
                    }

                    /*Update risultato totale e statistiche giocatori*/
                    if (p_1 > p_2) {
                        /*Vinto prima squadra*/
                        update_tabellino["partite"][numero_partita]["punteggio_1"] += p_vittoria; p_vittoria;
                        updateStats(g_1, prima_s, p_1, "w")
                        updateStats(g_2, seconda_s, tipo, p_2, "l")

                    } else if (p_2 > p_1) {
                        /*Vinto seconda squadra*/
                        update_tabellino["partite"][numero_partita]["punteggio_2"] += p_vittoria;
                        updateStats(g_1, prima_s, tipo, p_1, "l")
                        updateStats(g_2, seconda_s, tipo, p_2, "w")

                    } else {
                        /*Pareggio*/
                        update_tabellino["partite"][numero_partita]["punteggio_1"] += p_pareggio;
                        update_tabellino["partite"][numero_partita]["punteggio_2"] += p_pareggio;
                        updateStats(g_1, prima_s, tipo, p_1, "t")
                        updateStats(g_2, seconda_s, tipo, p_2, "t")

                    }

                    if (Object.keys(update_tabellino["partite"][numero_partita]["tabellino"]).length == 13 && !update_tabellino["partite"][numero_partita]["completo"]) {

                        update_tabellino["partite"][numero_partita]["completo"] = true;

                        var tot_1 = update_tabellino["partite"][numero_partita]["punteggio_1"]
                        var tot_2 = update_tabellino["partite"][numero_partita]["punteggio_2"]

                        //Aggiorno classifica!!!
                        updateStanding(tot_1, tot_2, db.collection("campionati/"+id_campionato+"/classifica").where("squadra","==", prima_s))

                        updateStanding(tot_2, tot_1, db.collection("campionati/"+id_campionato+"/classifica").where("squadra","==", seconda_s))

                        //closeResult()

                    }

                    partita.update(update_tabellino)
                    .then(function() {

                        navigator.notification.alert("Tabellino aggiornato!!", function(){
                             closeResult()
                        }, "Successo!")
                        console.log("Document successfully updated!");
                    });

                    form.reset()

                } else {
                    /*Tabellino già presente*/
                    navigator.notification.alert("Il tabellino contiene già la partita che hai inserito", function(){}, "Attenzione!")
                    console.log("tabellino già presente")
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        } else {
            navigator.notification.alert("Il punteggio inserito non è corretto", function(){}, "Errore!")
        }
        
    } else {
        navigator.notification.alert("Il numero dei giocatori selezionati non è corretto per la specialità scelta", function(){}, "Errore!")
        console.log("Valori sballati")
    }
}

function updateStanding(tot_1, tot_2, squadra) {
    
    squadra.get()
    .then(function(querySelector) {
        querySelector.forEach(function(doc) {

            var update = doc.data()
            update["punti_fatti"] += tot_1
            update["punti_subiti"] += tot_2

            if (tot_1 > tot_2) {   
                update["punti"] += 2
                update["vittorie"] += 1

            } else if (tot_2 == tot_1) {
                update["punti"] += 1
                update["pareggi"] += 1

            } else {
                update["sconfitte"] += 1

            }

            db.doc("campionati/"+id_campionato+"/classifica/"+doc.id).update(update)
            .then(function() {
                console.log("Standing successfully updated!");
            });

        })    

    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
}


function updateStats(giocatori, squadra, tipo, punteggio, risultato) {
    
    giocatori.forEach(function(giocatore) {
        var pl = db.collection("giocatori").where("name", "==", giocatore).where("squadra", "==", squadra)
        
        pl.get()
        .then(function(querySelector) {
            querySelector.forEach(function(doc) {
                    
                var update_stat = doc.data()
                
                if (tiri.includes(tipo)) {
                    
                    var prove_svolte = update_stat["statistiche_1819"][tipo]["vinte"]+update_stat["statistiche_1819"][tipo]["pareggiate"]+update_stat["statistiche_1819"][tipo]["perse"] 
                    
                    var media = update_stat["statistiche_1819"][tipo]["media"] 
                    
                    var new_media = roundTo(((media*prove_svolte) + punteggio) / (prove_svolte + 1), 2)
                    
                    update_stat["statistiche_1819"][tipo]["media"] = new_media
                    
                }

                switch (risultato) {
                    case "w":
                        update_stat["statistiche_1819"][tipo]["vinte"] += 1;
                        break;
                    case "t":
                        update_stat["statistiche_1819"][tipo]["pareggiate"] += 1;
                        break;
                    case "l":
                        update_stat["statistiche_1819"][tipo]["perse"]  += 1;
                        break;
                }

                db.doc("giocatori/"+doc.id).update(update_stat)
                .then(function() {
                    console.log("Document successfully updated!");
                });
                
            })    
            
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    })
    
}

function loadTeams() {
    
    var match = array_giornate[id_campionato][numero_giornata][numero_partita]
        
    prima_s = match["prima_squadra"]
    seconda_s = match["seconda_squadra"]

    var legends = document.getElementsByTagName("legend")
    legends[0].innerHTML = prima_s
    legends[1].innerHTML = seconda_s

    var prima_select = document.getElementById("form1Squadra");
    var seconda_select = document.getElementById("form2Squadra");
    
    $('#form1Squadra').find('option').remove();
    $('#form2Squadra').find('option').remove();

    addOptions(db.collection("giocatori").where("squadra","==",prima_s).orderBy("name"), prima_select)
    addOptions(db.collection("giocatori").where("squadra","==",seconda_s).orderBy("name"), seconda_select)
    
}

function addOptions(players, select) {
    players.get()   
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            console.log(doc.data()["name"])
            var option = document.createElement("option");
            option.text = doc.data()["name"];
            select.add(option);
            
        })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function roundTo(value, decimalpositions)
{
    var i = value * Math.pow(10,decimalpositions);
    i = Math.round(i);
    return i / Math.pow(10,decimalpositions);
}
