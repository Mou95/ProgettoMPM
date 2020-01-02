var db = firebase.firestore()
var form = document.getElementsByTagName("form")[0]
var prima_s, seconda_s;

document.getElementById("inviaResult").addEventListener("click", sendResult, false)
console.log("Add listener enabled")
document.getElementById("inviaResult").disabled = false;

function logicAddResult() {
    
    document.removeEventListener("backbutton", closeTabellino); 
    document.getElementsByClassName("backButton")[0].removeEventListener("click", closeTabellino); 
    
    document.getElementsByClassName("backButton")[0].addEventListener("click", closeResult, false);

    document.addEventListener("backbutton", closeResult, false); 
    
    document.getElementsByClassName("backButton")[0].style.display = "block";
    
}

function closeResult() {
    //e.preventDefault(); 
    form.reset();
        
    document.getElementById("page_result").classList.remove("page_show")
    document.getElementById("page_result").classList.add("no_page_show")
    
    document.getElementById("page_tabellino").classList.add("page_show")
    document.getElementById("page_tabellino").classList.remove("no_page_show")
  
    document.removeEventListener("backbutton", closeResult);  
    document.getElementsByClassName("backButton")[0].removeEventListener("click", closeResult); 

    logicTabellino()
    refreshTabellino()
    
}


function getOldTabellino(selectObject) {
    var value = selectObject.value;  
    
    var partita = db.doc("giornate/"+id_giornata)
    
    var g_1 = document.getElementById('form1Squadra');
    var g_2 = document.getElementById('form2Squadra');
    
    var p_1 = $('#punteggio1Squadra');
    var p_2 = $('#punteggio2Squadra');

    partita.get()
    .then(function(doc) {
        
        var tabellino = doc.data()["partite"][numero_partita]["tabellino"] 
        
        if (tabellino[value] != null) {
            /*Partita già presente*/
            g_1.selectedIndex = -1;
            g_2.selectedIndex = -1;
            console.log("Riprendo valori")
            p_1.val(tabellino[value]["p_1"])
            p_2.val(tabellino[value]["p_2"])
            
            var optionsToSelect = tabellino[value]["g_1"];
            
            for (var i = 0, l = g_1.options.length, o; i < l; i++ )
            {
                o = g_1.options[i];
                if ( optionsToSelect.indexOf( o.text ) != -1 )
                {
                    o.selected = true;
                }
            }
            
            var optionsToSelect = tabellino[value]["g_2"];
            
            for (var i = 0, l=g_2.options.length, o; i < l; i++ )
            {
                o = g_2.options[i];
                if ( optionsToSelect.indexOf( o.text ) != -1 )
                {
                    o.selected = true;
                }
            }
        }
        
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
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
    if ($("input[name='group1']:checked").val()) {
        if (prova != null && g_1 != null && g_2 != null && !isNaN(p_1) && !isNaN(p_2)) {
            console.log("P1",p_1)
            
            var final = document.getElementById("partialResult2").checked;
            
            switch(prova) {
                case "1":
                    checkResult(1, 0, 40, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2, final);
                    break;
                case "2":
                case "10":
                case "13":
                    checkResult(2, 0, 11, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2, final);
                    break;
                case "3":
                case "11":
                case "12":
                    checkResult(1, 0, 11, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2, final);
                    break;
                case "4":
                    checkResult(3, 0, 11, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2, final);
                    break;
                case "5":
                    checkResult(2, 0, 65, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2, final);
                    break;
                case "6":
                case "7":
                    checkResult(1, 0, 50, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2, final);
                    break;
                case "8":
                case "9":
                    checkResult(1, 0, 55, 2, 1, prova, tipo,  g_1, g_2, p_1, p_2, final);
                    break;

            }
            
        } else {
            navigator.notification.alert("Alcuni campi non sono stati inseriti!!", function(){
            }, "Errore!")
        }
    
    } else {
        navigator.notification.alert("Specifica se si tratta di un risultato parziale o finale", function(){
        }, "Errore!")
    }
    
    
    
        
    
            
}

function checkResult(n, min, max, p_vittoria, p_pareggio, prova, tipo,  g_1, g_2, p_1, p_2, final) {
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

                var user = firebase.auth().currentUser;

                /*Update tabellino*/
                var update_tabellino = doc.data()
                
                console.log(update_tabellino)
                update_tabellino["partite"][numero_partita]["tabellino"][prova] = {
                    "g_1" : g_1,
                    "g_2" : g_2,
                    "p_1" : p_1,
                    "p_2" : p_2,
                    "user" : user.email,
                    "conclusa": final
                }
                
                update_tabellino["partite"][numero_partita]["punteggio_1"] = 0;
                update_tabellino["partite"][numero_partita]["punteggio_2"] = 0;
                
                for (p in update_tabellino["partite"][numero_partita]["tabellino"]) {
                    
                    if (update_tabellino["partite"][numero_partita]["tabellino"][p]["conclusa"]) {
                        
                        console.log(p)
                        
                        var p1 = update_tabellino["partite"][numero_partita]["tabellino"][p]["p_1"]
                        var p2 = update_tabellino["partite"][numero_partita]["tabellino"][p]["p_2"]
                        
                        if (p1 > p2) {
                            update_tabellino["partite"][numero_partita]["punteggio_1"] += 2;

                        } else if (p2 > p1) {
                            update_tabellino["partite"][numero_partita]["punteggio_2"] += 2;

                        } else {
                            /*Pareggio*/
                            update_tabellino["partite"][numero_partita]["punteggio_1"] += 1;
                            update_tabellino["partite"][numero_partita]["punteggio_2"] += 1;

                        }
                        
                    }
                }

                /*TODO*/
                if (update_tabellino["partite"][numero_partita]["tabellino"]["6"] != null && update_tabellino["partite"][numero_partita]["tabellino"]["7"] != null) {
                    if (update_tabellino["partite"][numero_partita]["tabellino"]["6"]["conclusa"] && update_tabellino["partite"][numero_partita]["tabellino"]["7"]["conclusa"]) {
                        /*Calcolo punto aggiuntivo tecnico*/

                        var sum_prima_squadra = update_tabellino["partite"][numero_partita]["tabellino"]["6"]["p_1"] + update_tabellino["partite"][numero_partita]["tabellino"]["7"]["p_1"]
                        var sum_seconda_squadra = update_tabellino["partite"][numero_partita]["tabellino"]["6"]["p_2"] + update_tabellino["partite"][numero_partita]["tabellino"]["7"]["p_2"]
                        
                        if (sum_prima_squadra > sum_seconda_squadra) {
                            update_tabellino["partite"][numero_partita]["punteggio_1"] += 1;

                        } else if (sum_seconda_squadra > sum_prima_squadra) {
                            update_tabellino["partite"][numero_partita]["punteggio_2"] += 1;               
                        }
                    }                       
                }

                

                partita.update(update_tabellino)
                .then(function() {

                    navigator.notification.alert("Tabellino aggiornato!!", function(){
                        closeResult()
                        document.getElementById("inviaResult").disabled = false;
                        console.log("Enabled")
                    }, "Successo!")
                    console.log("Document successfully updated!");
                });

                form.reset()

                
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        } else {
            navigator.notification.alert("Il punteggio inserito non è corretto", function(){
            }, "Errore!")
        }
        
    } else {
        navigator.notification.alert("Il numero dei giocatori selezionati non è corretto per la specialità scelta", function(){}, "Errore!")
        console.log("Valori sballati")
    }
}

function updateStanding(tot_1, tot_2, squadra, map_class, id_campionato) {
    
    map_class[squadra]["data"]
    map_class[squadra]["data"]["punti_fatti"] += tot_1
    map_class[squadra]["data"]["punti_subiti"] += tot_2

    if (tot_1 > tot_2) {   
        map_class[squadra]["data"]["punti"] += 2
        map_class[squadra]["data"]["vittorie"] += 1

    } else if (tot_2 == tot_1) {
        map_class[squadra]["data"]["punti"] += 1
        map_class[squadra]["data"]["pareggi"] += 1

    } else {
        map_class[squadra]["data"]["sconfitte"] += 1

    }
    
    return map_class
}


function updateStats(giocatori, squadra, tipo, punteggio, risultato, map_giocatori) {
    
    console.log("squadra"+squadra)
    
    giocatori.forEach(function(giocatore) {
        
        console.log(giocatore)
        
        /*pl.get()
        .then(function(querySelector) {
            querySelector.forEach(function(doc) {
                    
                var update_stat = doc.data()
                */
        if (tiri.includes(tipo)) {

            var prove_svolte = map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"][tipo]["vinte"]+map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"][tipo]["pareggiate"]+map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"][tipo]["perse"] 

            var lista_prove = []
            if (map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"][tipo]["lista"] != null) 
                lista_prove = map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"][tipo]["lista"]

            lista_prove.push(punteggio)

            var media = map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"][tipo]["media"] 

            console.log(prove_svolte+" "+media+" "+punteggio)

            var new_media = roundTo(((media*prove_svolte) + punteggio) / (prove_svolte + 1), 2)

            console.log("MEDIA"+new_media)

            map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"][tipo]["media"] = new_media
            map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"][tipo]["lista"] = lista_prove

        }

        switch (risultato) {
            case "w":
                map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"]["totale"]["vinte"] += 1
                map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"][tipo]["vinte"] += 1;
                break;
            case "t":
                map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"]["totale"]["pareggiate"] += 1
                map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"][tipo]["pareggiate"] += 1;
                break;
            case "l":
                map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"]["totale"]["perse"] += 1
                map_giocatori[giocatore+""+squadra]["data"]["statistiche_1920"][tipo]["perse"]  += 1;
                break;
        }
        /*db.doc("giocatori/"+doc.id).update(update_stat)
        .then(function() {
            console.log("Document successfully updated!");
        });*/

    })    
            
    return map_giocatori
    
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
