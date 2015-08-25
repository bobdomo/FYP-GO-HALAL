var menu = "";

$(document).ready(function()
{
    var menujson = $.ajax(
        { type: "POST", 
          url: "php/getmenu.php?from=restaurant", 
          async: false
        }).responseText;
    
    menu = JSON.parse(menujson);
    var output = "";
    
    //alert("1 : " +menu[0].menuName + "\n2 : " +menu[1].menuName);
    
    for(var i = 0; i < menu.length; i++) {
                output += "<tr><td>"+
                        "<div class='event'>"+
                        "<span> #"+(i+1)+"</span>"+
                        "<div class='info'>"+
                        "For " +menu[i].menuPax+ " Pax <br>"+
                        "<h4>" +menu[i].menuName+ "</h4>"+
                        ""+menu[i].menuDetails+
                        "</div>"+
                        "<input class='detailButton' type='button' value='Show Details' onclick=\"window.location.href='index.html'\">"+                                         "<div class='price'> RM " +menu[i].menuPrice+
                        "</div></div>"+
                        "</td></tr>";
    }
    
    $("#tablemenu").html(output);
});