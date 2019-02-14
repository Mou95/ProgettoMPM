//TODO:
/* 
GESTIRE ERRORI DB
CREARE FUNZIONE DEDICATA A UNICO CAMPIONATO COSì PER RENDERE + SEMPLICE UPDATE
*/


var created = false;
var db = firebase.firestore();
var classifiche = document.getElementById("page_classifiche").getElementsByClassName("classifica")
var dots = document.getElementById("page_classifiche").getElementsByClassName("dot")
var n = classifiche.length;
var active_class = 0;
var title = document.getElementById("titleClass");
var backArrow = document.getElementById("backArrow_class");
var forwArrow = document.getElementById("forwArrow_class");

var property_table = [
    "squadra" ,
    "vittorie" ,
    "pareggi" ,
    "sconfitte" ,
    "punti_fatti" ,
    "punti_subiti",
    "punti"
]

var championship = [
    "Serie A1 18/19",
    "Serie A2 Est 18/19"
]

function createStandings() {
    if (!created) {
        created = true;
        console.log("Creando le tabelle");
        
        title.innerHTML = championship[active_class];
        
        var leagues = db.collection("campionati");

        leagues.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(campionato) {

                if (campionato.exists) {
                    console.log("Document data:", campionato.data()["nome"]);

                    /*Create standing*/
                    var standing = db.collection("campionati/"+campionato.id+"/classifica").orderBy("punti","desc")
                    
                    var table = document.getElementById(campionato.id)
                    var tbody = document.createElement('tbody')
                    var i = 1;
                    
                    /*Add listener to change table on database modify*/
                    standing
                    .onSnapshot(function(snapshot) {
                        snapshot.docChanges().forEach(function(change) {
                            if (change.type === "modified") {
                                console.log("Modified data: ", change.doc.data());
                                
                                changeEntryTable(campionato.id, change)
                                
                            }
                            
                            if (change.type === "added") {
                                console.log("Added data: ", change.doc.data());
                                
                                var tr = document.createElement('tr');

                                var td = document.createElement('td');

                                td.classList.add("posizione"); 

                                td.appendChild(document.createTextNode(i))

                                tr.appendChild(td);

                                for (var key in property_table) {

                                    td = document.createElement('td');
                                    td.classList.add(property_table[key]);  

                                    td.appendChild(document.createTextNode(change.doc.data()[property_table[key]]))

                                    tr.appendChild(td);
                                }

                                tbody.appendChild(tr);

                                i++; 
                            }
                        })
                        
                        table.appendChild(tbody);
                        
                    });

                } else {
                    // doc.data() will be undefined in this case
                    created = false;
                    console.log("No such document!");
                }
                
            })
        }).catch(function(error) {
            created = false;
            console.log("Error getting document:", error);
        });
    }
}

$(function(){
    // Bind the swipeHandler callback function to the swipe event on classifica-slider
    console.log("swiped");
    $( "#classifica-slider" ).on( "swiperight", swipeRight );
    $( "#classifica-slider" ).on( "swipeleft", swipeLeft );
    $( "#backArrow_class" ).on( "touchend", swipeRight );
    $( "#forwArrow_class" ).on( "touchend", swipeLeft );
});

function swipeRight( event ){
    console.log(event.message)
    
    if (active_class > 0) {
        classifiche[active_class].classList.remove("show")
        dots[active_class].classList.remove("active-dot")
        active_class -= 1;
        classifiche[active_class].classList.add("show")
        dots[active_class].classList.add("active-dot") 
        title.innerHTML = championship[active_class]
    }
    
    setArrows()
}

function swipeLeft( event ){
    if (active_class < n - 1) {
        classifiche[active_class].classList.remove("show")
        dots[active_class].classList.remove("active-dot")
        active_class += 1;
        classifiche[active_class].classList.add("show")
        dots[active_class].classList.add("active-dot")
        title.innerHTML = championship[active_class]
    }
    
    setArrows()
}

function setArrows() {
    
    if (active_class == 0) {
        backArrow.classList.remove("show");
        forwArrow.classList.add("show");
        
    } else if (active_class == n-1) {
        backArrow.classList.add("show");
        forwArrow.classList.remove("show");
        
    } else {
        /*Both arrow*/
        backArrow.classList.add("show");
        forwArrow.classList.add("show");
    } 
}

function changeEntryTable(id, change) {
    
    var squadra = change.doc.data()["squadra"];
    
    for (var key in property_table) {

        $("#"+id+ " tr:contains('"+squadra+"') td."+property_table[key]).html(change.doc.data()[property_table[key]]);
        
    }
    
    sortPoint(id)
    
}

function sortPoint(id) {
    
    var table, rows, switching, i, x, y, shouldSwitch, t;
    table = document.getElementById(id);
    switching = true;

    while (switching) {

        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[7];
            y = rows[i + 1].getElementsByTagName("TD")[7];

            if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {

                console.log(x.innerHTML.toLowerCase()+" "+y.innerHTML.toLowerCase())
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
             
            t = rows[i].getElementsByTagName("TD")[0].innerHTML;
            
            rows[i].getElementsByTagName("TD")[0].innerHTML = 
            rows[i+1].getElementsByTagName("TD")[0].innerHTML;
            
            rows[i+1].getElementsByTagName("TD")[0].innerHTML = t;
            
            console.log(rows[i].getElementsByTagName("TD")[1].innerHTML+ " "+rows[i+1].getElementsByTagName("TD")[1].innerHTML)
        
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            
            switching = true;
        }
    }

}