var menu = "";

$(document).ready(function()
{
    var menujson = $.ajax(
        { type: "POST", 
          url: "", 
          async: false
        }).responseText;
    
    menu = JSON.parse(menujson);
    
    alert(menu);
});