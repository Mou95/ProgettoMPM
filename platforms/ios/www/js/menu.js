var activePage = 2;
var navs = document.getElementById("navMenu").getElementsByTagName("div")

function getQueryVariable(variable) {
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

function removeButtonNavigation() {
    document.getElementsByClassName("backButton")[0].style.display = "none";
    document.getElementsByClassName("addButton")[0].style.display = "none";
}

function manageNav(index) {
    console.log(navs)
    if (activePage != index) {
        /*Devo cambiare pagina*/
        navs[activePage].classList.remove("active");
        
        activePage = index;
        navs[activePage].classList.add("active");
        var show = document.getElementsByClassName("page_show")[0]
        show.classList.remove("page_show");
        show.classList.add("no_page_show");
        removeButtonNavigation()
        switch (index) {
            case 0:
                document.getElementById("page_statistiche").classList.add("page_show")
                document.getElementById("page_statistiche").classList.remove("no_page_show")
                
                break;
            case 1: 
                 document.getElementById("page_calendario").classList.add("page_show")
                document.getElementById("page_calendario").classList.remove("no_page_show")
                createTableGiornate()
                break;
            case 2:
                document.getElementById("page_home").classList.add("page_show")
                document.getElementById("page_home").classList.remove("no_page_show")

                break;
            case 3:
                document.getElementById("page_classifiche").classList.add("page_show")
                document.getElementById("page_classifiche").classList.remove("no_page_show")
                
                break;
            case 4: 
                document.getElementById("page_user").classList.add("page_show")
                document.getElementById("page_user").classList.remove("no_page_show")
                
                break;
        }
        
    }
}