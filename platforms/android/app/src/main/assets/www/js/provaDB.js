var db = firebase.firestore();

/*var array = [
"Buset D.",
"Braido D.",
"Carli P.",
"Causevic J.",
"Ceh E.",
"Kosirnik J.",
"Kraljc B.",
"Marcelja R.",
"Nacinovic M.",
"Scapolan F.",
"Sommacal D.",
"Ziraldo M."
]
const gioc = db.collection("giocatori")

array.forEach( function(nome) {
    gioc.add({
        name: nome ,
        squadra: "Pontese"
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
} )*/

/*db.collection("giocatori").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

            // doc.data() is never undefined for query doc snapshots
            gioc.add(doc.data()).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
*/

/*const campionato = db.collection("campionati/A1_1819/classifica")
const squadre = db.collection("squadre").where("campionato","==","A1_1819")

squadre.get()   
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            campionato.add({
                squadra: doc.id,
                punti: 0,
                punti_fatti: 0,
                punti_subiti: 0,
                vittorie: 0,
                sconfitte: 0,
                pareggi: 0
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });*/


/*var array = [
"belluno",
"borgonese",
"brb",
"chiavarese",
"ferriera",
"gaglianico",
"la perosina",
"mondovì",
"noventa",
"pontese"
]

const squadre = db.collection("squadre")
array.forEach( function(nome) {
    squadre.doc(nome).set({
        campionato: "A1_1819",
        squadra: nome.charAt(0).toUpperCase() + nome.slice(1)
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
})*/


/*var giocatori = db.collection("giocatori")


giocatori.get()   
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            console.log(doc.id, "=>", doc.data() )
            
            var update_giocatore = {}
            update_giocatore["statistiche_1819"] = {
                "combinato" : {
                    vinte: Math.floor(Math.random() * 10),
                    pareggiate: Math.floor(Math.random() * 3),
                    perse: Math.floor(Math.random() * 10),
                    media: getRndInteger(18,26)
                },
                "coppia" : {
                    vinte: Math.floor(Math.random() * 10),
                    pareggiate: Math.floor(Math.random() * 3),
                    perse: Math.floor(Math.random() * 10)
                },
                "individuale" : {
                    vinte: Math.floor(Math.random() * 10),
                    pareggiate: Math.floor(Math.random() * 3),
                    perse: Math.floor(Math.random() * 10)
                },
                "progressivo_3" : {
                    vinte: Math.floor(Math.random() * 10),
                    pareggiate: Math.floor(Math.random() * 3),
                    perse: Math.floor(Math.random() * 10),
                    media: getRndInteger(28,46)
                },
                "progressivo_6" : {
                    vinte: Math.floor(Math.random() * 10),
                    pareggiate: Math.floor(Math.random() * 3),
                    perse: Math.floor(Math.random() * 10),
                    media: getRndInteger(25,45)
                },
                "staffetta" : {
                    vinte: Math.floor(Math.random() * 10),
                    pareggiate: Math.floor(Math.random() * 3),
                    perse: Math.floor(Math.random() * 10),
                    media: getRndInteger(30,50)
                },
                "terna" : {
                    vinte: Math.floor(Math.random() * 10),
                    pareggiate: Math.floor(Math.random() * 3),
                    perse: Math.floor(Math.random() * 10)
                },
                "tiro_tecnico" : {
                    vinte: Math.floor(Math.random() * 10),
                    pareggiate: Math.floor(Math.random() * 3),
                    perse: Math.floor(Math.random() * 10),
                    media: getRndInteger(10,25)
                }
            }
            
            db.doc("giocatori/"+doc.id).update(update_giocatore)
            .then(function() {
                console.log("Document successfully updated!");
            });
            
        })
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });

function getRndInteger(min, max) {
    return roundTo(Math.random() * (max - min) + min,2);
}

function roundTo(value, decimalpositions)
{
    var i = value * Math.pow(10,decimalpositions);
    i = Math.round(i);
    return i / Math.pow(10,decimalpositions);
}*/



