
function refreshMatches() {
    var tr = document.getElementsByTagName("tr")

    for (var i = 0; i < tr.length - 1; i += 2 ) {
        
        var w1, t, w2
        var td_sq = tr[i].getElementsByTagName("td");
        var points_1 = parseInt(tr[i+1].getElementsByTagName("td")[0].innerHTML);
        var points_2 = parseInt(tr[i+1].getElementsByTagName("td")[1].innerHTML);


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
    
    /*Aggiorno il totale*/
    var tot = document.getElementById("Totale").getElementsByTagName("td");
    points_1 = parseInt(tot[0].innerHTML);
    points_2 = parseInt(tot[1].innerHTML);
    
    console.log(points_1+" "+points_2)
    
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