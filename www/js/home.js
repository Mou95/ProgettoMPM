function onLoad() {
    
    var db = firebase.firestore()
    
    db.doc("versione/v1.1.3").get()
    .then(function(doc) {
        

        if (doc.exists) {

            firebase.auth().onAuthStateChanged(function(user) {
                console.log("check user")
                if (user) {

                    db.collection("utenti").doc(user.uid).set({
                        mail: user.email
                    })
                    .then(function() {
                        var $content = $('#homeContent');

                        var height = $(window).height() - 90;
                        $content.height(height);

                        document.getElementById("page_home").classList.remove("no_page_show");
                        document.getElementById("page_home").classList.add("page_show");


                        createCalendar()
                        createStandings()
                        loadUser()
                        createStats()

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
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });

                    /*var $content = $('#homeContent');

                    var height = $(window).height() - 90;
                    $content.height(height);

                    document.getElementById("page_home").classList.remove("no_page_show");
                    document.getElementById("page_home").classList.add("page_show");


                    createCalendar()
                    createStandings()
                    loadUser()
                    createStats()

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
                    }*/

                } else {
                    //user is signed out
                    window.open("index.html", "_self")
                }
            });
        } else {

            navigator.notification.alert("La tua app non è aggiornata all'ultima vesione. Aggiornala subito per poter continuare ad utilizzarla", function(){
                window.location.href='https://play.google.com/store/apps/details?id=com.mauro.tuttobocce';
            }, "Aggiornamento!")

        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
    
    
}





