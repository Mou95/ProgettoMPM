
var db = firebase.firestore();
var id_giornata, id_campionato, numero_giornata, numero_partita;

document.getElementsByClassName("addHalfButton")[1].addEventListener("click", function() {

    navigator.notification.prompt(
        'Descrivi l\'errore che hai trovato in questo tabellino, verrà ricontrollato e risolto',  // message
        function(results){
            if (results.buttonIndex == 1) {
                db.collection("errori").add({
                    id_camp: id_campionato,
                    numero_giornata: numero_giornata + 1,
                    numero_partita: numero_partita,
                    descrizione: results.input1
                })
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }
        },                  // callback to invoke
        'Segnalazione errore',            // title
        ['Invia','Annulla']          // buttonLabels
    );
})

document.getElementsByClassName("addHalfButton")[0].addEventListener("click", function() {
    
        document.getElementById("page_tabellino").classList.remove("page_show")
        document.getElementById("page_tabellino").classList.add("no_page_show")
        document.getElementById("page_result").classList.add("page_show")
        document.getElementById("page_result").classList.remove("no_page_show")
		
		var $footer = $('#footerResult');
        var $content = $('#formResult');
		
		console.log($(window).height() +" "	+	$footer.height())
    
        var height = $(window).height() - $footer.height() - 150;
        $content.height(height);

        logicAddResult()
        loadTeams(id_giornata, id_campionato, numero_giornata, numero_partita)

    }, false)

function logicTabellino() {
    document.getElementsByClassName("backButton")[0].addEventListener("click", closeTabellino, false);

    document.addEventListener("backbutton", closeTabellino, false); 
    
    document.getElementsByClassName("backButton")[0].style.display = "block";
    
}

function closeTabellino(e) {
    e.preventDefault(); 
    document.getElementById("page_calendario").classList.add("page_show")
    document.getElementById("page_calendario").classList.remove("no_page_show")
    
    document.getElementById("page_tabellino").classList.remove("page_show")
    document.getElementById("page_tabellino").classList.add("no_page_show")
    
    document.removeEventListener("backbutton", closeTabellino); 
    document.addEventListener("backbutton", returnIndex, false)
    document.getElementsByClassName("backButton")[0].style.display = "none";
    
}

function refreshMatches() {
    var tr = document.getElementById("TableIncontro").getElementsByTagName("tr")

    for (var i = 0; i < tr.length - 1; i += 2 ) {
        
        var w1, t, w2
        var td_sq = tr[i].getElementsByTagName("td");
        var points_1 = parseInt(tr[i+1].getElementsByTagName("td")[0].innerHTML);
        var points_2 = parseInt(tr[i+1].getElementsByTagName("td")[1].innerHTML);
        
        td_sq[0].style.backgroundColor = "white";
        td_sq[2].style.backgroundColor = "white";
        
        if (!isNaN(points_1) && !isNaN(points_2)) {
            console.log(points_1+" "+points_2)

            if (points_1 > points_2) {
                /*First team win*/
                td_sq[0].style.backgroundColor = "#33d641";
                console.log("1")
            } else if (points_1 < points_2) {
                /*Second team win*/
                td_sq[2].style.backgroundColor = "#33d641";
                console.log("2")
            } else {
                /*Tie game*/
                console.log("3")
                td_sq[0].style.backgroundColor = "#f7f302";
                td_sq[2].style.backgroundColor = "#f7f302";
            }
            
        }

    }
    
    /*Aggiorno il totale*/
    var tot = document.getElementById("Totale").getElementsByTagName("td");
    points_1 = parseInt(tot[0].innerHTML);
    points_2 = parseInt(tot[1].innerHTML);
    
    tot[0].style.backgroundColor = "white";
    tot[1].style.backgroundColor = "white";
    
    if (points_1 > points_2) {
        /*First team win*/
        tot[0].style.backgroundColor = "#33d641";
        console.log("1")
    } else if (points_1 < points_2) {
        /*Second team win*/
        tot[1].style.backgroundColor = "#33d641";
        console.log("2")
    } else {
        /*Tie game*/
        console.log("3")
        tot[0].style.backgroundColor = "#fffa00";
        tot[1].style.backgroundColor = "#fffa00";
    }

}

function createTabellino(id, camp, giornata, index) {
    var match = array_giornate[camp][giornata][index]
    
    id_giornata = id
    id_campionato = camp
    numero_giornata = giornata
    numero_partita = index
    completo = match["completo"]
    
    if (!completo) {
        console.log("Aggiungo button")
        document.getElementById("addResultButton").disabled = false;
        document.getElementById("addResultButton").style.opacity = 1;
        
    } else {
        document.getElementById("addResultButton").disabled = true;
        document.getElementById("addResultButton").style.opacity = 0.5;
    }
    
    var table = document.getElementById("TableIncontro");
    console.log(array_giornate);
    
    console.log("MATCH " +match)
        
    var s_1 = match["prima_squadra"]
    var s_2 = match["seconda_squadra"]

    console.log(s_1+" "+s_2)

    var t_1 = match["punteggio_1"];
    var t_2 = match["punteggio_2"];
    document.getElementById("Squadra1").innerHTML = s_1;
    document.getElementById("Squadra2").innerHTML = s_2;

    document.getElementById("PrimaSquadraTot").innerHTML = t_1;
    document.getElementById("SecondaSquadraTot").innerHTML = t_2;
    
    var tr = table.getElementsByTagName("tr");
    var prova = 1;

    for (var i = 0; i < tr.length - 1; i+= 2) {
        
        var g_1_html = tr[i].getElementsByClassName("Giocatore1Squadra")[0]
        var g_2_html = tr[i].getElementsByClassName("Giocatore2Squadra")[0]
        var p_1_html = tr[i+1].getElementsByClassName("PrimoPunteggio")[0]
        var p_2_html = tr[i+1].getElementsByClassName("SecondoPunteggio")[0]

        g_1_html.innerHTML = ""
        g_2_html.innerHTML = ""
        p_1_html.innerHTML = ""
        p_2_html.innerHTML = ""
        
        var map = match["tabellino"][prova]
        if (map != null) {
            
            var g_1 = map["g_1"]
            var g_2 = map["g_2"]
            var p_1 = map["p_1"]
            var p_2 = map["p_2"]

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

            p_1_html.innerHTML = p_1;
            p_2_html.innerHTML = p_2;

        }

        prova++

    }

    refreshMatches()
    
}
function refreshTabellino() {
    if (id_giornata != null) {
        createTabellino(id_giornata, id_campionato, numero_giornata, numero_partita)


        if (!completo) {
            
            document.getElementById("addResultButton").disabled = false;
            document.getElementById("addResultButton").style.opacity = 1;
        
        } else {
            document.getElementById("addResultButton").disabled = true;
            document.getElementById("addResultButton").style.opacity = 0.5;
        }
    }
    
}

