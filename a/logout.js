$(document).ready(function() {
    
    var onSession = $.ajax({ type: "POST", url: "php/login.php?do=check", async: false }).responseText;
    if(onSession == "TRUE") {
        var currUser = $.ajax({ type: "POST", url: "php/login.php?do=getUser", async: false }).responseText;
        //alert("current user : " +currUser);
        $("#emgreet").html(currUser);
        $("#greeting").html("Welcome " +currUser+ ",");
    }
    
    $("#btnLogout").click(function() {
        var status = $.ajax({ 
            type: "POST", 
            url: "php/login.php?do=logout", 
            async: false }).responseText;
        
        if(status == "LOGOUT") {
            //alert("Logging out now.");
            //window.location = "index.html";
        } else {
            alert("Failed to Logout.");
        }
    });
}); 