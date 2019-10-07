var db = firebase.firestore();
var active_day;
var n_giornate;
var all_giornate;
var tbody_giornate;

var array_giornate = {
    A1_1920: [],
    A2_1920_est: [],
    A2_1920_ovest: []
}

var titleC = {
    A1_1920: "Serie A1 2019/20",
    A2_1920_est: "Serie A2 Est 2019/20",
    A2_1920_ovest: "Serie A2 Ovest 2019/20"
}

var tableCalendar = document.getElementById("tableGiornate");
var navCalendar = document.getElementById("ulGiornate")
var titleCalendar = document.getElementById("titleCalendar")
var loaded = false;

function loadLogicCalendar(loadNewDay) {  
    
    tbody_giornate = tableCalendar.getElementsByTagName("tbody");

    var camp = document.getElementById("selCampionato").value;
    
    var min = Number.POSITIVE_INFINITY;
   
    var data = Date.now();

    for (var i = 0; i<tbody_giornate.length; i++) {
        tbody_giornate[i].style.display = "none";
        
        console.log("DATA " +data)
        console.log(array_giornate[camp][i]["data"].toDate())
        
        if (loadNewDay) {
            var diff = dateDifference(data, array_giornate[camp][i]["data"].toDate());
            if (diff < min) {
                min = diff;
                active_day = i;
            }
        }
    }
    
    console.log(active_day)
    
    tbody_giornate[active_day].style.display = "table-row-group";
    all_giornate[active_day].classList.add("selected");
    all_giornate[active_day].scrollIntoView({behavior: "smooth", block: "end", inline: "center"})
    
    $( ".NumeroGiornata" ).on( "tap", selectTableCalendar );
    
    if (!loaded) {

        $( "#giornataIntera" ).on( "swiperight", swipeRightCalendar );
        $( "#giornataIntera" ).on( "swipeleft", swipeLeftCalendar );
        
        
        loaded = true
    }
}

function swipeRightCalendar( event ){
    if (active_day > 0) {

        tbody_giornate[active_day].style.display = "none";
        all_giornate[active_day].classList.remove("selected");
        
        active_day -= 1;
        
        tbody_giornate[active_day].style.display = "table-row-group";
        all_giornate[active_day].classList.add("selected");
        all_giornate[active_day].scrollIntoView({behavior: "smooth", block: "end", inline: "center"})
    }
}

function swipeLeftCalendar( event ){
    if (active_day < n_giornate - 1) {

        tbody_giornate[active_day].style.display = "none";
        all_giornate[active_day].classList.remove("selected");
        
        active_day += 1;
        
        tbody_giornate[active_day].style.display = "table-row-group";
        all_giornate[active_day].classList.add("selected");
        all_giornate[active_day].scrollIntoView({behavior: "smooth", block: "end", inline: "center"})
    }
}

function selectTableCalendar( event ) {
    var new_active = Array.prototype.indexOf.call(all_giornate, event.target);
    
    if (new_active != active_day) {
        
        tbody_giornate[active_day].style.display = "none";
        all_giornate[active_day].classList.remove("selected");
        
        active_day = new_active;
        
        tbody_giornate[active_day].style.display = "table-row-group";
        all_giornate[active_day].classList.add("selected");
        all_giornate[active_day].scrollIntoView({behavior: "smooth", block: "end", inline: "center"})
    } 
}

function createCalendar() {
    var giornate = db.collection("giornate").orderBy("numero", "asc");

    giornate.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "modified") {
                change.doc.data();
                changeEntryTableCalendar(change)
                refreshTabellino()

            }
            if (change.type === "added") {

                console.log("ASd")
                var add = change.doc.data()["partite"];
                add["id"] = change.doc.id;
                add["data"] = change.doc.data()["data"]

                array_giornate[change.doc.data()["campionato"]].push(add)

            }

        })
    });
    

}

function changeEntryTableCalendar(change) {
    
    console.log(change.doc.data())
    var campionato = change.doc.data()["campionato"];  
    var giornata = change.doc.data()["numero"]-1; 
    
    array_giornate[campionato][giornata] = change.doc.data()["partite"]
    array_giornate[campionato][giornata]["id"] = change.doc.id;
    array_giornate[campionato][giornata]["data"] = change.doc.data()["data"];
    
    refreshCalendar(false)
    
}

function addLi(n) {
    
    $("#ulGiornate").html("")
    
    for (var i = 0; i < n; i++) {
        var li = document.createElement("li");
        li.classList.add("NumeroGiornata");
        li.appendChild(document.createTextNode("Giornata "+ (i+1)))
        navCalendar.appendChild(li)
    }
    
    all_giornate = navCalendar.getElementsByClassName("NumeroGiornata");
}

function createTableGiornate(loadNewDay) {
    
    console.log("start")
    
    /*Tabella*/
    
    var camp = document.getElementById("selCampionato").value;
    
    n_giornate = array_giornate[camp].length;
    
    console.log(n_giornate)
    
    addLi(n_giornate);
    
    array_giornate[camp].forEach(function(partite, index_giornata) {

        console.log("new body")

        var tbody = document.createElement("tbody");

        partite.forEach(function(partita, index) {

            console.log("Id "+partite["id"]+" "+index)

            var row = tbody.insertRow(0);

            var td = row.insertCell(0);
            td.classList.add("PrimaSquadra");
            td.appendChild(document.createTextNode(partita["prima_squadra"]));

            var td = row.insertCell(1);
            td.classList.add("PunteggioPrimaSquadra");
            td.appendChild(document.createTextNode(partita["punteggio_1"]));

            var td = row.insertCell(2);
            td.classList.add("PunteggioSecondaSquadra");
            td.appendChild(document.createTextNode(partita["punteggio_2"]));

            var td = row.insertCell(3);
            td.classList.add("SecondaSquadra");
            td.appendChild(document.createTextNode(partita["seconda_squadra"]));

            row.addEventListener("click", function() {
                document.removeEventListener("backbutton", returnIndex)
                openTabellino()
                console.log("CIAO "+partite["id"]+" "+camp+" "+index_giornata+" "+index)
                createTabellino(partite["id"], camp, index_giornata, index)
            }, false)

        })
        
        var row = tbody.insertRow(0);
        var td = row.insertCell(0);
        td.id = "dataGiornata";
        td.colSpan = "4"
        
        var today = partite["data"].toDate();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; 

        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        } 
        if (mm < 10) {
          mm = '0' + mm;
        } 
        var today = dd + '/' + mm + '/' + yyyy;
        td.appendChild(document.createTextNode(today));
        
        tableCalendar.appendChild(tbody)
    })
    
    loadLogicCalendar(loadNewDay)
    
}

function openTabellino() {
    
    console.log("Open Tabellino")
    document.getElementById("page_calendario").classList.remove("page_show")
    document.getElementById("page_calendario").classList.add("no_page_show")
    
    document.getElementById("page_tabellino").classList.add("page_show")
    document.getElementById("page_tabellino").classList.remove("no_page_show")
    logicTabellino()
    
}

function refreshCalendar(reloadLogic) {
    console.log("REFRESH")
    
    tableCalendar.querySelectorAll('tbody').forEach(function(tbody) {
        tableCalendar.removeChild(tbody);
    });
    
    navCalendar.querySelectorAll('li').forEach(function(li) {
        navCalendar.removeChild(li);
    }); 
    
    console.log(titleC[document.getElementById("selCampionato").value])
    
    titleCalendar.innerHTML = titleC[document.getElementById("selCampionato").value]
    
    createTableGiornate(reloadLogic)
    
}

function dateDifference(date1, date2) {
    
    //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1;
    
  // Convert back to days and return
  return Math.abs(Math.round(difference_ms/one_day)); 

}


