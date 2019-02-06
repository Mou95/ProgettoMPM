var db = firebase.firestore()
$.mobile.autoInitializePage = false;

window.onload = function() {

    window.addEventListener("message", function(event) {
        console.log("MEssaggio ricevuto")
        console.log(event.data)
    }, false)
    
    document.getElementById("inviaResult").addEventListener("touchend", sendResult, false)
    
    optionSelect()
    
}

function sendResult( event ) {
    event.preventDefault()
    
    var prova = $("#provaForm").val();
    var g_1 = $('#form1Squadra').val();
    var g_2 = $('#form2Squadra').val();
    var p_1 = parseInt($('#punteggio1Squadra').val());
    var p_2 = parseInt($('#punteggio2Squadra').val());
     
    if (prova != null && g_1 != null && g_2 != null && p_1 != null && p_2 != null) {
    
        switch(prova) {
            case "1":
                checkResult(1, 0, 40, prova, g_1, g_2, p_1, p_2);
                break;
            case "2":
            case "10":
            case "13":
                checkResult(2, 0, 13, prova, g_1, g_2, p_1, p_2);
                break;
            case "3":
            case "11":
            case "12":
                checkResult(1, 0, 13, prova, g_1, g_2, p_1, p_2);
                break;
            case "4":
                checkResult(3, 0, 13, prova, g_1, g_2, p_1, p_2);
                break;
            case "5":
                checkResult(1, 0, 65, prova, g_1, g_2, p_1, p_2);
                break;
            case "6":
            case "7":
                checkResult(1, 0, 50, prova, g_1, g_2, p_1, p_2);
                break;
            case "8":
            case "9":
                checkResult(1, 0, 55, prova, g_1, g_2, p_1, p_2);
                break;

        }
    } else {
        /*PRINT ERROR MESSAGE*/
    }
}

function checkResult(n, min, max, prova, g_1, g_2, p_1, p_2) {
    if (g_1.length == n && g_2.length == n && p_1 >= min && p_1 <= max && p_2 >= min && p_2 <= max) {
        console.log("posso inserrire il tabellino")
        /*COSE DA FARE NOW
        - aggiornare docuemnto con tabellino
        - aggioranre statistiche giocatore
        - aggioranre punteggio totale partita
        - aggioranre se tabellino completo o no
        */
    } else {
        console.log("Valori sballati")
    }
}

function optionSelect() {
    var prima_s = "BRB Ivrea"
    var seconda_s = "Borgonese"
    var prima_select = document.getElementById("form1Squadra");
    var seconda_select = document.getElementById("form2Squadra");
    
    var giocatori_1 = db.collection("giocatori").where("squadra","==",prima_s).orderBy("name")
    var giocatori_2 = db.collection("giocatori").where("squadra","==",seconda_s).orderBy("name")
    
    addOptions(giocatori_1, prima_select)
    addOptions(giocatori_2, seconda_select)
    
}

function addOptions(players, select) {
    players.get()   
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

            var option = document.createElement("option");
            option.text = doc.data()["name"];
            select.add(option);
            
        })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

