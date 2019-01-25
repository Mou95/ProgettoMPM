var db = firebase.firestore();

var array = [
"Buzzai C.",
"Cosolo S.",
"Gurnari R.",
"Pevec B.",
"Podgorsek K.",
"Ranieri L.",
"Sartor O.",
"Scapinello P.",
"Taddeo S.",
"Travain S.",
"Trobec A.",
"Zan R."
]
const gioc = db.collection("giocatori")

array.forEach( function(nome) {
    gioc.add({
        name: nome ,
        squadra: "Villaraspa"
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
} )

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


  
