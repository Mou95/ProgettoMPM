/*document.addEventListener("offline", function() {
    navigator.notification.alert("Alcune funzionalità potrebbero non essere utilizzabili", function(){
    }, "SEI OFFLINE!")
})*/

/*document.addEventListener("online", function() {
    navigator.notification.alert("ONLINE", loadAll, "ONLINE!")
})*/

/*$(document).bind("mobileinit", function(){
    $.mobile.autoInitializePage = false;
});*/

function onLoad() {
    firebase.auth().onAuthStateChanged(function(user) {
        console.log("check user")
        if (user) {
            
            var $content = $('#homeContent');

            var height = $(window).height() - 90;
            $content.height(height);
            
            document.getElementById("page_home").classList.remove("no_page_show");
            document.getElementById("page_home").classList.add("page_show");
            
            
            
            
            createCalendar()
            createStandings()
            loadUser()
            createStats()
            
            if (window.localStorage.getItem("news") == null) {
                navigator.notification.alert("Seguendo i vostri consigli ho aggiunto alcune novità:\n- I risultati di ogni partiata sono MODIFICABILI!\n- Una volta inserito il risultato di una partita è possibile modificarlo inserendo di nuovo il punteggio (quindi ora è possibile inserire i risultati parziali es. 3,4 scarto del pto ecc..)\n\n- Le STATISTICHE e le CLASSIFICHE non verranno più aggiornate in tempo reale, ma solamente una volta che sarò certo che tutti i tabellini non contengano errori (entro la sera stessa spero)\n\n- Nella pagina dedicata all'accesso dell'utente è possibile resettare la password dell'account se ve la siete dimenticata\n\n\nGRAZIE A TUTTI E CONTINUATE AD USARE TUTTOBOCCE!!", function(){window.localStorage.setItem("news",true)}, "Cosa c'è di nuovo in TuttoBOCCE?")
            }
        

            // User is signed in.
            console.log("USER "+user)
            console.log(device.platform)
            
            document.addEventListener("backbutton", returnIndex, false)
            
            if(window.MobileAccessibility) {
                window.MobileAccessibility.usePreferredTextZoom(false);
            }
            
            if (device.platform != "iOS") {
                StatusBar.styleBlackTranslucent();
                document.documentElement.style.setProperty('--bottom', '0px');
                document.documentElement.style.setProperty('--top', '90px');
                document.getElementById("navMenu").classList.add("menuBarAndroid")
                console.log("Android")

            } else {
                document.documentElement.style.setProperty('--bottom', '50px');
                document.documentElement.style.setProperty('--top', '40px');
                document.getElementById("navMenu").classList.add("menuBarIos")
                console.log("Not Android")
            }
            
        } else {
            //user is signed out
            window.open("index.html", "_self")
        }
    });
}





