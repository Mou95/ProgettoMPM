var db = firebase.firestore();
function loadUser(){
    var user = firebase.auth().currentUser;
    
    if (user) {
        console.log(user)

        document.getElementById("username_user").innerHTML = user.displayName;

        document.getElementById("email_user").innerHTML = user.email;
        // User is signed in.
        var log = document.getElementById("logoutButton");
        var change = document.getElementById("pswButton");
        var conferma = document.getElementById("newPswButton");

        log.addEventListener("click", function() {

            navigator.notification.confirm("Vuoi fare il logout?", function(buttonIndex) {

                if (buttonIndex == 1) {
                    
                    if (window.localStorage.getItem("email") != null) {
                        window.localStorage.removeItem("email");
                        window.localStorage.removeItem("psw");
                    }
                    firebase.auth().signOut();
                    window.open("index.html", "_self")
                }

            }, "Conferma", ["Sì", "No"]) 

        }, false);

        change.addEventListener("click", function() {
            var psw = document.getElementById("changePsw");
            if (psw.style.display === "block")
                psw.style.display = "none";
            else
                psw.style.display = "block";
        }, false);

        conferma.addEventListener("click", changePsw, false);

    } else {
        //user is signed out
        window.open("index.html", "_self")
        console.log("user not logged")
    }
}

function changePsw() {
               
    var user = firebase.auth().currentUser;
    if (user) {
        var old_psw = document.getElementById("old_psw").value;
        var new_psw = document.getElementById("new_psw").value;

        firebase.auth().signInWithEmailAndPassword(user.email, old_psw).then(function() {

            user.updatePassword(new_psw).then(function() {
              // Update successful.
                navigator.notification.alert("Password cambiata!", function() {}, "Successo") 


            }).catch(function(error) {
              // An error happened.
                navigator.notification.alert("La nuova password deve contenere almeno 6 caratteri", function() {}, "Attenzione") 
            });

        }).catch(function(error) {
            //Handle errors
            navigator.notification.alert("La vecchia password inserita non corrisponde", function() {}, "Attenzione") 
        })

    } else {
        window.open("index.html", "_self")
    }

}


/*CALCOLO GIORNATA*/
/*document.getElementById("resettaDati").addEventListener("click", function() {

    navigator.notification.confirm("Vuoi eliminare statistiche e classifiche?", function(buttonIndex) {
        if (buttonIndex == 1) {
            resetAll();

        }
    }, "Conferma", ["Sì", "No"]) 
}, false);

document.getElementById("calcolaStat").addEventListener("click", function() {

    navigator.notification.confirm("Calcolare le statistiche?", function(buttonIndex) {
        if (buttonIndex == 1) {
            calcolaStat()

        }
    }, "Conferma", ["Sì", "No"]) 
}, false);

document.getElementById("calcolaClassifiche").addEventListener("click", function() {

    navigator.notification.confirm("Calcolare le classifiche?", function(buttonIndex) {
        if (buttonIndex == 1) {
            calcolaClassifiche()

        }
    }, "Conferma", ["Sì", "No"]) 
}, false);

function resetAll() {
    var giocatori = db.collection("giocatori")
    
    var classifiche = db.collection("campionati")
    
    classifiche.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var classifiche = db.collection("campionati/"+doc.id+"/classifica")
            
            classifiche.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(squadra) {
                    console.log(squadra.id, " => ", squadra.data());
                    
                    var update = squadra.data()

                    update["punti"] = 0
                    update["punti_fatti"] = 0
                    update["punti_subiti"] = 0
                    update["vittorie"] = 0
                    update["sconfitte"] = 0
                    update["pareggi"] = 0

                    db.doc("campionati/"+doc.id+"/classifica/"+squadra.id).update(update)
                    .then(function() {
                        console.log("Document successfully updated!");
                    });

                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
    giocatori.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            
            var update = doc.data()

            update["statistiche_1920"] = {
                combinato: {
                    lista: [],
                    perse:0,
                    vinte:0,
                    pareggiate:0,
                    media:0
                },
                progressivo_3: {
                    lista: [],
                    perse:0,
                    vinte:0,
                    pareggiate:0,
                    media:0
                },
                staffetta: {
                    lista: [],
                    perse:0,
                    vinte:0,
                    pareggiate:0,
                    media:0
                },
                tiro_tecnico: {
                    lista: [],
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

            db.doc("giocatori/"+doc.id).update(update)
            .then(function() {
                console.log("Document successfully updated!");
            });
            
        });
        
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function calcolaStat() {
    
    var giornate = db.collection("giornate");
    
    var tipo = {
        "1":"combinato",
        "2":"coppia",
        "3":"individuale",
        "4":"terna",
        "5":"staffetta",
        "6":"tiro_tecnico",
        "7":"tiro_tecnico",
        "8":"progressivo_3",
        "9":"progressivo_3",
        "10":"coppia",
        "11":"individuale",
        "12":"individuale",
        "13":"coppia" 
    } 
    
    
    
    var giocatori = {}
    
    db.collection("giocatori").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            giocatori[doc.data()["name"]+doc.data()["squadra"]] = {}
            
            giocatori[doc.data()["name"]+doc.data()["squadra"]]["data"] = doc.data()
            giocatori[doc.data()["name"]+doc.data()["squadra"]]["id"] = doc.id
            
            
        });
                              
        giornate.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {

            var update_tabellino = doc.data()

            var i = 0;
            var id_campionato = update_tabellino["campionato"]

            if (Date.now() >= update_tabellino["data"].toDate()) {

                console.log(doc.id)

                doc.data()["partite"].forEach(function(partita) {
                    var prima_s = partita["prima_squadra"]
                    var seconda_s = partita["seconda_squadra"]

                    console.log(prima_s+" "+seconda_s)
                    if (partita["tabellino"] != null) {

                        for (var prova in partita["tabellino"]) {

                            console.log(tipo[prova])

                            var p_1 = partita["tabellino"][prova]["p_1"]
                            var p_2 = partita["tabellino"][prova]["p_2"]
                            var g_1 = partita["tabellino"][prova]["g_1"]
                            var g_2 = partita["tabellino"][prova]["g_2"]

                            console.log(p_1+" "+p_2)
                            console.log(g_1+" "+g_2)

                            if (p_1 > p_2) {
                                //Vinto prima squadra

                                giocatori = updateStats(g_1, prima_s, tipo[prova], p_1, "w",giocatori)
                                giocatori = updateStats(g_2, seconda_s, tipo[prova], p_2, "l",giocatori)

                            } else if (p_2 > p_1) {
                                //Vinto seconda squadra
                                giocatori = updateStats(g_1, prima_s, tipo[prova], p_1, "l",giocatori)
                                giocatori = updateStats(g_2, seconda_s, tipo[prova], p_2, "w",giocatori)

                            } else {
                                //Pareggio
                                giocatori = updateStats(g_1, prima_s, tipo[prova], p_1, "t",giocatori)
                                giocatori = updateStats(g_2, seconda_s, tipo[prova], p_2, "t",giocatori)

                            }
                        }
                    }

                    console.log(partita)

                    update_tabellino["partite"][i]["completo"] = true;
                    db.doc("giornate/"+doc.id).update(update_tabellino)
                    .then(function() {
                        console.log("Document successfully updated!");
                    });

                    i++;
                })

            }

        })

        console.log(giocatori)

        for (var g in giocatori) {
            db.doc("giocatori/"+giocatori[g]["id"]).update(giocatori[g]["data"])
            .then(function() {
                console.log("Document successfully updated!");
            })
        }
 
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
}


function calcolaClassifiche() {
    
    var giornate = db.collection("giornate");
    
    var map_class = {}
        
    db.collection("campionati").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var classifiche = db.collection("campionati/"+doc.id+"/classifica")

            classifiche.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(squadra) {
                    map_class[squadra.data()["squadra"]] = {}

                    map_class[squadra.data()["squadra"]]["data"] = squadra.data()
                    map_class[squadra.data()["squadra"]]["id_camp"] = doc.id
                    map_class[squadra.data()["squadra"]]["id_squadra"] = squadra.id


                })
            })
        })

        console.log(map_class)
        giornate.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {

            var update_tabellino = doc.data()

            var id_campionato = update_tabellino["campionato"]

            if (Date.now() >= update_tabellino["data"].toDate()) {

                console.log(doc.id)

                doc.data()["partite"].forEach(function(partita) {
                    var prima_s = partita["prima_squadra"]
                    var seconda_s = partita["seconda_squadra"]

                    var tot_1 = partita["punteggio_1"]
                    var tot_2 = partita["punteggio_2"]

                    console.log("CAMP "+id_campionato)

                    //Aggiorno classifica!!!
                    map_class = updateStanding(tot_1, tot_2, prima_s, map_class, id_campionato)

                    map_class = updateStanding(tot_2, tot_1, seconda_s, map_class, id_campionato)
                })

            } else {
                console.log("NON GIOCATA")
            }


        })

        for (var c in map_class) {
            db.doc("campionati/"+map_class[c]["id_camp"]+"/classifica/"+map_class[c]["id_squadra"]).update(map_class[c]["data"])
            .then(function() {
                console.log("Standing successfully updated!");
            })
        }
            

        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });   
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

}

*/
