function loadUser(){
    var user = firebase.auth().currentUser;
    
    if (user) {
        console.log(user)

        document.getElementById("username_user").innerHTML = user.displayName;

        document.getElementById("email_user").innerHTML = user.email;
        // User is signed in.
        var log = document.getElementById("logoutButton");
        var change = document.getElementById("pswButton");
        var conferma = document.getElementById("newPswButton");

        log.addEventListener("touchend", function() {

            navigator.notification.confirm("Vuoi fare il logout?", function(buttonIndex) {

                if (buttonIndex == 1) {
                    firebase.auth().signOut();
                    window.open("index.html", "_self")
                }

            }, "Conferma", ["Sì", "No"]) 

        }, false);

        change.addEventListener("touchend", function() {
            var psw = document.getElementById("changePsw");
            if (psw.style.display === "block")
                psw.style.display = "none";
            else
                psw.style.display = "block";
        }, false);

        conferma.addEventListener("touchend", changePsw, false);

    } else {
        //user is signed out
        window.open("index.html", "_self")
        console.log("user not logged")
    }
}

function changePsw() {
               
    var user = firebase.auth().currentUser;
    if (user) {
        var old_psw = document.getElementById("old_psw").value;
        var new_psw = document.getElementById("new_psw").value;

        firebase.auth().signInWithEmailAndPassword(user.email, old_psw).then(function() {

            user.updatePassword(new_psw).then(function() {
              // Update successful.
                navigator.notification.alert("Password cambiata!", function() {
                    
                    window.open("home.html", "_self");
                    
                }, "Successo") 


            }).catch(function(error) {
              // An error happened.
                navigator.notification.alert("La nuova password deve contenere almeno 6 caratteri", function() {}, "Attenzione") 
            });

        }).catch(function(error) {
            //Handle errors
            navigator.notification.alert("La vecchia password inserita non corrisponde", function() {}, "Attenzione") 
        })

    } else {
        window.open("index.html", "_self")
    }

}