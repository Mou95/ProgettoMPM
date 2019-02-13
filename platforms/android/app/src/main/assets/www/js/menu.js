function goBack() {
    /*var user = firebase.auth().currentUser;
    if (user)*/
        window.history.back();
}

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    console.log(decodeURI(query))
    var vars = query.split("&");

    for (var i=0; i < vars.length; i++) {
       var pair = vars[i].split("=");
        
       if(pair[0] == variable) {
           return pair[1].replace('%20',' ');
       }
    }
    return(false);
}