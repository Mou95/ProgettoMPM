//TODO:
/* 
GESTIRE ERRORI DB
CREARE FUNZIONE DEDICATA A UNICO CAMPIONATO COSì PER RENDERE + SEMPLICE UPDATE
SE AGGIORNAMENTO LIVE GESTIRE ELIMINAZIONE/AGGIORNAMENTO TBODY
*/


//apply overrides here
$.mobile.autoInitializePage = false;


var db = firebase.firestore();

/*db.collection("campionati/A1_1819/classifica")
    .onSnapshot(function(querySnapshot) {
        var cities = [];
        aggiornaView()
        
    });*/

aggiornaView()

var property_table = [
    "squadra" ,
    "vittorie" ,
    "pareggi" ,
    "sconfitte" ,
    "punti_fatti" ,
    "punti_subiti",
    "punti"
]

function aggiornaView() {
    console.log("Creando le tabelle");
    var leagues = db.collection("campionati")

    leagues.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(campionato) {

                if (campionato.exists) {
                    console.log("Document data:", campionato.data()["nome"]);

                    /*Create standing*/
                    var standing = db.collection("campionati/"+campionato.id+"/classifica").orderBy("punti","desc")

                    standing.get()
                        .then(function(squadre) {

                            var table = document.getElementById(campionato.id)
                            var tbody = document.createElement('tbody')
                            var i = 1;

                            squadre.forEach(function(doc) {

                                var tr = document.createElement('tr');

                                var td = document.createElement('td');

                                td.classList.add("posizione"); 

                                td.appendChild(document.createTextNode(i))

                                tr.appendChild(td);

                                for (var key in property_table) {

                                    td = document.createElement('td');
                                    td.classList.add(property_table[key]);  

                                    td.appendChild(document.createTextNode(doc.data()[property_table[key]]))

                                    tr.appendChild(td);
                                }

                                tbody.appendChild(tr);

                                i++;

                            })

                            table.appendChild(tbody);

                        }).catch(function(error) {
                            console.log("Error getting document:", error);
                        });


                } else {
                    // doc.data() will be undefined in this case

                    console.log("No such document!");
                }
            })
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
}

var classifiche = document.getElementsByClassName("classifica")
var dots = document.getElementsByClassName("dot")
var n = classifiche.length;
var active = 0;

$(function(){
    // Bind the swipeHandler callback function to the swipe event on classifica-slider
    console.log("swiped");
    $( "#classifica-slider" ).on( "swiperight", swipeRight );
    $( "#classifica-slider" ).on( "swipeleft", swipeLeft );
});

function swipeRight( event ){
    if (active > 0) {
        classifiche[active].classList.remove("show")
        dots[active].classList.remove("active-dot")
        active -= 1;
        classifiche[active].classList.add("show")
        dots[active].classList.add("active-dot")
    }
}

function swipeLeft( event ){
    if (active < n - 1) {
        classifiche[active].classList.remove("show")
        dots[active].classList.remove("active-dot")
        active += 1;
        classifiche[active].classList.add("show")
        dots[active].classList.add("active-dot")
    }
}