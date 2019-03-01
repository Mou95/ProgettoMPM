var activePage = 2;
var navs = document.getElementById("navMenu").getElementsByTagName("div")

function removeButtonNavigation() {
    document.getElementsByClassName("backButton")[0].style.display = "none";
    
    document.removeEventListener("backbutton", closeTabellino); 
    document.removeEventListener("backbutton", closeResult);  
    document.removeEventListener("backbutton", returnIndex)
    document.addEventListener("backbutton", returnIndex, false)
}

function returnIndex(){
    navigator.notification.confirm("Vuoi tornare alla pagina iniziale e fare il logout?", function(buttonIndex) {

        if (buttonIndex == 1) {
            
            if (window.localStorage.getItem("email") != null) {
                window.localStorage.removeItem("email");
                window.localStorage.removeItem("psw");
            }
            firebase.auth().signOut();
            window.open("index.html", "_self")
        }

    }, "Conferma", ["Sì", "No"]) 
}

function manageNav(index) {
    console.log(navs)
    if (activePage != index) {
        /*Devo cambiare pagina*/
        navs[activePage].classList.remove("active");
        navs[activePage].id = "";
        
        activePage = index;
        
        navs[activePage].id = "changeImg";
        navs[activePage].classList.add("active");
        var show = document.getElementsByClassName("page_show")[0]
        show.classList.remove("page_show");
        show.classList.add("no_page_show");
        removeButtonNavigation()
        switch (index) {
            case 0:
                document.getElementById("page_statistiche").classList.add("page_show")
                document.getElementById("page_statistiche").classList.remove("no_page_show")
                
                var $footer = $('#footerStat');
                var $content = $('#stat-slider');

                var height = $(window).height() - $footer.height() - 140;
                $content.height(height);
                
                break;
            case 1: 
                 document.getElementById("page_calendario").classList.add("page_show")
                document.getElementById("page_calendario").classList.remove("no_page_show")
                
                var $header = $('#header_calendario');
                var $footer = $('#footerCalendar');
                var $content = $('#giornataIntera');

                var height = $(window).height() - $header.height() - $footer.height() - 140;
                $content.height(height); 
                
                refreshCalendar(true)
                
                break;
            case 2:
                document.getElementById("page_home").classList.add("page_show")
                document.getElementById("page_home").classList.remove("no_page_show")

                break;
            case 3:
                document.getElementById("page_classifiche").classList.add("page_show")
                document.getElementById("page_classifiche").classList.remove("no_page_show")
                
                var $footer = $('#footerClassifica');
                var $content = $('#classifica-slider');

                var height = $(window).height() - $footer.height() - 140;
                $content.height(height);
                
                break;
            case 4: 
                 document.getElementById("page_user").classList.add("page_show")
                document.getElementById("page_user").classList.remove("no_page_show")
                
                break;
        }
        
    }
}