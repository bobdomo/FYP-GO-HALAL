var rest = "";

$(document).ready(function()
{
    
    
    var restjson = $.ajax(
        { type: "POST", 
          url: "php/getrest.php", 
          async: false
        }).responseText;
    
    rest = JSON.parse(restjson);
    var output = "";
    
    //alert("1 : " +rest[0].restName + "\n2 : " +rest[1].restName);
    
    for(var i = 0; i < rest.length; i++) {
                output += "<tr><td>"+
                    "<div class='container no-bottom'>"+
                    "<p style='cursor: pointer;' onclick='window.location.href='chooseMenu.html'' class='column-responsive half-bottom'>"+
                    "<img src='images/general-nature/9s.jpg' alt='img'>"+
                    "<strong>"+rest[i].restName+"</strong>"+
                    "<em>"+rest[i].restAddress+"</em>"+
                    "</p>"+                 
                    "<div class='clear'></div></div>"+                    
                    "</td></tr>";
    }
    
    $("#restlist").html(output);
});