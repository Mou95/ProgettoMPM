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

const campionato = db.collection("campionati/A1_1819/classifica")
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
    });


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
