 var errore = document.getElementsByClassName('errori')[0]

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("user logged")
        // User is signed in.
        var log = document.getElementById("logoutButton");
        var change = document.getElementById("pswButton");
        var conferma = document.getElementById("newPswButton");
        
        log.addEventListener("touchend", function() {
            firebase.auth().signOut();
            window.open("index.html", "_self")
        }, false);
        
        change.addEventListener("touchend", function() {
            var psw = document.getElementById("changePsw");
            errore.innerHTML = ""
            if (psw.style.display === "block")
                psw.style.display = "none";
            else
                psw.style.display = "block";
        }, false);
        
        conferma.addEventListener("touchend", changePsw, false);
        
    } else {
        //user is signed out
        console.log("user not logged")
        window.open("index.html", "_self")
    }
});


function changePsw() {
    console.log("Want to change password")
    var user = firebase.auth().currentUser;
    if (user) {
        var old_psw = document.getElementById("old_psw").value;
        var new_psw = document.getElementById("new_psw").value;
        
        firebase.auth().signInWithEmailAndPassword(user.email, old_psw).then(function() {
            
            user.updatePassword(new_psw).then(function() {
              // Update successful.
                console.log("Password updated")
                errore.style.color = "green";
                errore.innerHTML = "Password cambiata con successo"
                
            }).catch(function(error) {
              // An error happened.
                errore.style.color = "red";
                errore.innerHTML = "La nuova password deve contenere almeno 6 caratteri"
            });
            
        }).catch(function(error) {
            //Handle errors
            errore.style.color = "red";
            errore.innerHTML = "La vecchia password inserita non corrisponde"
        })

    } else {
        window.open("index.html", "_self")
    }
}