$(document).ready(function() {
    var onSession = $.ajax({ type: "POST", url: "php/login.php?do=check", async: false }).responseText;
    if(onSession == "TRUE") {
        alert("You are already logged in. Please log out first to use other account.");
        window.location = "userIndex.html";
    }
});