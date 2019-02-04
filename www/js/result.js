window.onload = function() {

    window.addEventListener("message", function(event) {
        console.log("MEssaggio ricevuto")
        console.log(event.data)
    }, false)
    
}