var db = firebase.firestore();
var id_giornata = getQueryVariable("idg")
var id_partita = getQueryVariable("idp")

function refreshMatches() {
    var tr = document.getElementsByTagName("tr")

    for (var i = 0; i < tr.length - 1; i += 2 ) {
        
        var w1, t, w2
        var td_sq = tr[i].getElementsByTagName("td");
        var points_1 = parseInt(tr[i+1].getElementsByTagName("td")[0].innerHTML);
        var points_2 = parseInt(tr[i+1].getElementsByTagName("td")[1].innerHTML);
        
        if (!isNaN(points_1) && !isNaN(points_2)) {
            console.log(points_1+" "+points_2)

            if (points_1 > points_2) {
                /*First team win*/
                td_sq[0].style.backgroundColor = "#99ff99";
                console.log("1")
            } else if (points_1 < points_2) {
                /*Second team win*/
                td_sq[2].style.backgroundColor = "#99ff99";
                console.log("2")
            } else {
                /*Tie game*/
                console.log("3")
                td_sq[0].style.backgroundColor = "#ffff66";
                td_sq[2].style.backgroundColor = "#ffff66";
            }
            
        }

    }
    
    /*Aggiorno il totale*/
    var tot = document.getElementById("Totale").getElementsByTagName("td");
    points_1 = parseInt(tot[0].innerHTML);
    points_2 = parseInt(tot[1].innerHTML);
    
    if (points_1 > points_2) {
        /*First team win*/
        tot[0].style.backgroundColor = "#99ff99";
        console.log("1")
    } else if (points_1 < points_2) {
        /*Second team win*/
        tot[1].style.backgroundColor = "#99ff99";
        console.log("2")
    } else {
        /*Tie game*/
        console.log("3")
        tot[0].style.backgroundColor = "#ffff66";
        tot[1].style.backgroundColor = "#ffff66";
    }

}

function countTotal() {
    
}

function addResult() {
    /*pass reference del documento nel db*/
    var open = window.open("addResult.html?idg="+id_giornata+"&idp="+id_partita, "_self")
    //open.postMessage(document.getElementById("Squadra1"), )
}

function createTabellino() {
    
    var partita = db.doc("giornate/"+id_giornata+"/partite/"+id_partita)
    
    partita.get()
    .then(function(doc) {
        
        var s_1 = doc.data()["prima_squadra"]
        var s_2 = doc.data()["seconda_squadra"]

        console.log(s_1+" "+s_2)

        var t_1 = doc.data()["punteggio_1"];
        var t_2 = doc.data()["punteggio_2"];
        document.getElementById("Squadra1").appendChild(document.createTextNode(s_1));
         document.getElementById("Squadra2").appendChild(document.createTextNode(s_2));

        document.getElementById("PrimaSquadraTot").appendChild(document.createTextNode(t_1));
         document.getElementById("SecondaSquadraTot").appendChild(document.createTextNode(t_2));

        var table = document.getElementById("TableIncontro");

        var tr = table.getElementsByTagName("tr");
        var prova = 1;

        for (var i = 0; i < tr.length - 1; i+= 2) {
            var map = doc.data()[prova]
            if (map != null) {

                var g_1 = map["g_1"]
                var g_2 = map["g_2"]
                var p_1 = map["p_1"]
                var p_2 = map["p_2"]

                var g_1_html = tr[i].getElementsByClassName("Giocatore1Squadra")[0]
                var g_2_html = tr[i].getElementsByClassName("Giocatore2Squadra")[0]
                var p_1_html = tr[i+1].getElementsByClassName("PrimoPunteggio")[0]
                var p_2_html = tr[i+1].getElementsByClassName("SecondoPunteggio")[0]

                g_1.forEach(function(giocatore) {
                    var span = document.createElement("span");
                    span.innerHTML = giocatore
                    g_1_html.appendChild(span)
                })

                g_2.forEach(function(giocatore) {
                    var span = document.createElement("span");
                    span.innerHTML = giocatore
                    g_2_html.appendChild(span)
                })

                p_1_html.appendChild(document.createTextNode(p_1));
                p_2_html.appendChild(document.createTextNode(p_2));

            }
            
            prova++
            
        }

        refreshMatches()
        
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
    
    
}

